import { BadRequestException, Injectable } from "@nestjs/common";
import { IGithub } from "@wrtn/connector-api/lib/structures/connector/github/IGithub";
import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";
import { ElementOf } from "@wrtnio/decorators";
import axios from "axios";
import typia from "typia";
import {
  docsExtensions,
  imageExtensions,
  videoExtensions,
} from "../../../utils/constants/extensions";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { StrictOmit } from "../../../utils/strictOmit";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";
import { AwsProvider } from "../aws/AwsProvider";
import { RagProvider } from "../rag/RagProvider";
import { PickPartial } from "../../../utils/types/PickPartial";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class GithubProvider {
  constructor(
    private readonly awsProvider: AwsProvider,
    private readonly ragProvider: RagProvider,
  ) {}

  async getUserOrganizations(
    input: IGithub.IGetUserOrganizationInput,
  ): Promise<IGithub.IGetUserOrganizationOutput> {
    const { username, secretKey, ...rest } = input;
    const token = await this.getToken(secretKey);
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/users/${username}/orgs?${queryParameters}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getAuthenticatedUserOrganizations(
    input: IGithub.IGetAuthenticatedUserOrganizationInput,
  ): Promise<IGithub.IGetAuthenticatedUserOrganizationOutput> {
    const { secretKey, ...rest } = input;
    const token = await this.getToken(secretKey);
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/user/orgs?${queryParameters}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async copyAllFiles(
    input: IGithub.IAnalyzeInput,
  ): Promise<IGithub.IAnalyzeOutput> {
    // 이전에 분석했던 기록이 있는지 보기 위해 유니크한 키를 만든다. (owner, repo, commit hash를 이용한다.)
    const { default_branch: commit_sha } = await this.getRepository(input);
    const head = await this.getCommitHeads({ ...input, commit_sha });
    const AWS_KEY = `connector/github/repos/analyzed/${input.owner}/${input.repo}/${head.sha}`;

    // // 이미 분석한 적 있을 경우 AWS S3에서 조회하여 갖고 온다.
    // const fileUrl = this.awsProvider.getFileUrl(AWS_KEY);
    // const isSaved = await this.awsProvider.getGetObjectUrl(fileUrl);
    // console.log(isSaved, "isSaved");
    // if (isSaved) {
    //   const counts = [0, 1, 2, 3, 4] as const;
    //   return counts
    //     .map((file_count) => `${AWS_KEY}/${file_count}.txt`)
    //     .map((key) => this.awsProvider.getFileUrl(key));
    // }

    const MAX_SIZE = 3 * 1024 * 1024;
    const MAX_DEPTH = 100;

    // 전체 폴더 구조 가져오기
    const rootFiles = await this.getRepositoryFolderStructures(
      input,
      MAX_DEPTH,
      false, // 파일을 모두 복사하여 RAG할 때에는 미디어 파일까지 가져올 필요가 없다.
    );

    // 전체 순회하며 파일인 경우 content를 가져오게 하기
    const traverseOption = {
      result: [[], [], [], [], []] as StrictOmit<
        IGithub.RepositoryFile,
        "encoding"
      >[][],
      currentIndex: 0,
      currentSize: 0,
    };

    if (rootFiles instanceof Array) {
      await Promise.allSettled(
        rootFiles
          .filter(
            (file) =>
              !file.path.includes("test") &&
              !file.path.includes("benchmark") &&
              !file.path.includes("yarn") &&
              !file.path.includes("pnp") &&
              this.isMediaFile(file) === false,
          )
          .map(async (file) => {
            if (traverseOption.currentIndex === 5) {
              return;
            }

            const path = file.path;
            if (file.type === "dir") {
              await this.traverseTree(input, file, traverseOption);
            } else {
              const detailed = await this.getFileContents({ ...input, path });
              const { content } =
                typia.assert<IGithub.RepositoryFile>(detailed);

              if (MAX_SIZE < traverseOption.currentSize + file.size) {
                traverseOption.currentSize = 0; // 사이즈 초기화
                traverseOption.currentIndex += 1; // 다음 파일 인덱스로 이전
                console.log(`${file.path} 파일을 만나서 파일 인덱스 증가 연산`);
              }

              if (traverseOption.currentIndex === 5) {
                return;
              }

              traverseOption.currentSize += file.size;
              traverseOption.result[traverseOption.currentIndex].push({
                ...file,
                content,
              });
            }
          }),
      );
    }

    const analyzedFiles = traverseOption.result.filter((el) => el.length);
    const links: string[] = [];
    if (analyzedFiles) {
      let FILE_NUM = 0;
      for await (const analyzedFile of analyzedFiles) {
        const key = `${AWS_KEY}/${FILE_NUM}.txt`;
        const link = await this.upload(analyzedFile, key);
        links.push(link);
        FILE_NUM++;
      }
    }

    return links;
  }

  async upload(
    files: Pick<IGithub.RepositoryFile, "path" | "content">[],
    key: string,
  ) {
    const stringified = files.map(({ path, content }) => ({ path, content }));
    const buffer = Buffer.from(JSON.stringify(stringified), "utf-8");
    const link = await this.awsProvider.uploadObject({
      contentType: "text/plain; charset=utf-8;",
      data: buffer,
      key,
    });

    return link;
  }

  async analyze(input: IGithub.IAnalyzeInput): Promise<IRag.IAnalysisOutput> {
    const urls = await this.copyAllFiles(input);
    return await this.ragProvider.analyze({ url: urls });
  }

  async getRepository(input: {
    owner: string;
    repo: string;
    secretKey: string;
  }): Promise<{ default_branch: string }> {
    const token = await this.getToken(input.secretKey);
    const url = `https://api.github.com/repos/${input.owner}/${input.repo}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  async call(input: IGithub.ICallInput) {
    const token = await this.getToken(input.secretKey);
    const res = await axios.get(input.url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async getCommitHeads(
    input: IGithub.IGetCommitHeadInput,
  ): Promise<IGithub.IGetCommitHeadOutput> {
    const { owner, repo, commit_sha, secretKey } = input;

    const token = await this.getToken(secretKey);
    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${commit_sha}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  async getReceivedEvents(
    input: IGithub.IGetReceivedEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const { username, secretKey, ...rest } = input;
    const token = await this.getToken(secretKey);
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });

    const url = `https://api.github.com/users/${username}/received_events?${queryParameters}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getUserOrganizationEvents(
    input: IGithub.IGetOrganizationUserEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const { organization, secretKey, ...rest } = input;
    const token = await this.getToken(secretKey);
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });

    const { login } = await this.debugToken(input);
    const url = `https://api.github.com/users/${login}/events/orgs/${organization}?${queryParameters}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async readPullRequestRequestedReviewers(
    input: IGithub.IReadPullRequestDetailInput,
  ): Promise<IGithub.IReadPullRequestRequestedReviewerOutput> {
    const { owner, repo, pull_number, secretKey } = input;
    const token = await this.getToken(secretKey);
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/requested_reviewers`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async readPullRequestReviewers(
    input: IGithub.IReadPullRequestReviewInput,
  ): Promise<IGithub.IReadPullRequestReviewOutput> {
    const { owner, repo, pull_number, secretKey, ...rest } = input;
    const queryParameter = createQueryParameter(rest);
    const token = await this.getToken(secretKey);
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/reviews?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async readPullRequestFiles(
    input: IGithub.IReadPullRequestDetailInput,
  ): Promise<IGithub.IReadPullRequestFileOutput> {
    const { owner, repo, pull_number, secretKey, ...rest } = input;
    const queryParameter = createQueryParameter(rest);
    const token = await this.getToken(secretKey);
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/files?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async readPullRequestCommits(
    input: IGithub.IReadPullRequestDetailInput,
  ): Promise<IGithub.IReadPullRequestCommitOutput> {
    const { owner, repo, pull_number, secretKey, ...rest } = input;
    const queryParameter = createQueryParameter(rest);
    const token = await this.getToken(secretKey);
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/commits?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    const commits = res.data.map((el: any) => el.commit);
    return { result: commits, ...this.getCursors(link) };
  }

  async readPullRequestDiff(
    input: IGithub.IReadPullRequestDetailInput,
  ): Promise<string> {
    try {
      const { owner, repo, pull_number, secretKey } = input;
      const token = await this.getToken(secretKey);
      const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.diff",
        },
      });

      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async readPullRequestDetail(
    input: IGithub.IReadPullRequestDetailInput,
  ): Promise<IGithub.IReadPullRequestDetailOutput> {
    const { owner, repo, pull_number, secretKey } = input;
    const token = await this.getToken(secretKey);
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async getRepositoryPullRequest(
    input: IGithub.IFetchRepositoryPullRequestInput,
  ): Promise<IGithub.IFetchRepositoryPullRequestOutput> {
    const token = await this.getToken(input.secretKey);
    const per_page = input.per_page ?? 30;
    const url = `https://api.github.com/graphql`;

    const query = `
    query($owner: String!, $repo: String!, $perPage: Int!, $after: String, $state: [PullRequestState!], $labels: [String!], $direction: OrderDirection!) {
      repository(owner: $owner, name: $repo) {
        id
        name
        pullRequests(
          after: $after,
          states: $state,
          labels: $labels,
          first: $perPage
          orderBy: {
            field: ${input.sort},
            direction: $direction
          }
        ) {
          edges {
            node {
              id
              url
              number
              state
              title
              createdAt
              updatedAt
              comments {
                totalCount
              }
              reviews {
                totalCount
              }
              reactions {
                totalCount
              }
              labels (first:10) {
                nodes {
                  name
                  description
                }
              }
              assignees (first:10) {
                nodes {
                  login
                }
              }
              author {
                login
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
    `;

    const variables = {
      owner: input.owner,
      repo: input.repo,
      perPage: per_page,
      after: input.after,
      sort: input.sort,
      direction: input.direction?.toUpperCase(),
      ...(input.state && { state: [input.state?.toUpperCase()] }), // 배열로 전달
      ...(input.labels?.length && { labels: input.labels }), // labels가 있으면 배열로, 없으면 빈 배열
    };

    const res = await axios.post(
      url,
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const response = res.data.data?.repository?.pullRequests;
    const pageInfo = response?.pageInfo;
    const pullRequests: IGithub.FetchedPullRequest[] = response.edges?.map(
      ({ node }: { node: IGithub.FetchedPullRequest }) => node,
    );

    return { pullRequests, pageInfo };
  }

  async fetchRepositoryIssues(
    input: IGithub.IFetchRepositoryInput,
  ): Promise<IGithub.IFetchRepositoryOutput> {
    const token = await this.getToken(input.secretKey);
    const per_page = input.per_page ?? 30;
    const url = `https://api.github.com/graphql`;

    const query = `
    query($owner: String!, $repo: String!, $perPage: Int!, $after: String, $state: [IssueState!], $labels: [String!]) {
      repository(owner: $owner, name: $repo) {
        id
        name
        issues(
          after: $after,
          states: $state,
          labels: $labels,
          first: $perPage
          orderBy: {
            field: ${input.sort},
            direction: ${input.direction}
          }
        ) {
          edges {
            node {
              id
              url
              number
              state
              stateReason
              title
              createdAt
              updatedAt
              comments {
                totalCount
              }
              reactions {
                totalCount
              }
              labels (first:10) {
                nodes {
                  name
                  description
                }
              }
              assignees (first:10) {
                nodes {
                  login
                }
              }
              author {
                login
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
    `;

    const variables = {
      owner: input.owner,
      repo: input.repo,
      perPage: per_page,
      after: input.after,
      direction: input.direction?.toUpperCase(),
      ...(input.state && { state: [input.state?.toUpperCase()] }), // 배열로 전달
      ...(input.labels?.length && { labels: input.labels }), // labels가 있으면 배열로, 없으면 빈 배열
    };

    const res = await axios.post(
      url,
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const issues = res.data.data?.repository?.issues;
    const pageInfo = issues?.pageInfo;
    const fetchedIssues: IGithub.FetchedIssue[] = issues.edges?.map(
      ({ node }: { node: IGithub.FetchedIssue }) => node,
    );

    return { fetchedIssues, pageInfo };
  }

  async getRepositoryIssues(
    input: IGithub.IGetRepositoryIssueInput,
  ): Promise<IGithub.IGetRepositoryIssueOutput> {
    const { secretKey, owner, repo, ...rest } = input;
    const token = await this.getToken(secretKey);
    const per_page = input.per_page ?? 30;
    const queryParameter = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/repos/${owner}/${repo}/issues?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getOrganizationIssues(
    input: IGithub.IGetOrganizationAuthenticationUserIssueInput,
  ): Promise<IGithub.IGetOrganizationAuthenticationUserIssueOutput> {
    const { secretKey, organization, ...rest } = input;
    const token = await this.getToken(secretKey);
    const per_page = input.per_page ?? 30;
    const queryParameter = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/orgs/${organization}/issues?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getOrganizationEvents(
    input: IGithub.IGetOrganizationEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const { organization, secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });

    const url = `https://api.github.com/orgs/${organization}/events?${queryParameters}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async deleteFileContents(
    input: IGithub.IDeleteFileContentInput,
  ): Promise<void> {
    const { owner, repo, path, secretKey, ...rest } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const token = await this.getToken(secretKey);
    await axios.delete(url, {
      data: { ...rest },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getCollaborators(
    input: IGithub.IGetCollaboratorInput,
  ): Promise<IGithub.IGetCollaboratorOutput> {
    const { owner, repo, secretKey } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/collaborators`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async updateFileContents(
    input: IGithub.IUpdateFileContentInput,
  ): Promise<IGithub.IUpsertFileContentOutput> {
    return await this.upsertFileContent(input);
  }

  async createFileContents(
    input: IGithub.ICreateFileContentInput,
  ): Promise<IGithub.IUpsertFileContentOutput> {
    try {
      const file = await this.getFileContentsOrNull({
        owner: input.owner,
        repo: input.repo,
        path: input.path,
        branch: input.branch,
        secretKey: input.secretKey as string,
      });

      if (file !== null) {
        throw new BadRequestException(
          "이미 해당 경로에 생성된 파일이 존재합니다.",
        );
      }

      return await this.upsertFileContent(input);
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async upsertFileContent(
    input: PickPartial<IGithub.IUpdateFileContentInput, "sha">,
  ): Promise<IGithub.IUpsertFileContentOutput> {
    const { owner, repo, path, secretKey, ...rest } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const token = await this.getToken(secretKey);
    const res = await axios.put(
      url,
      {
        ...rest,
        content: Buffer.from(input.content).toString("base64"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  }

  async getRepositoryFolderStructures(
    input: IGithub.IGetRepositoryFolderStructureInput,
    depth: number = 2,
    includeMediaFile: boolean = true,
  ): Promise<IGithub.IGetRepositoryFolderStructureOutput> {
    const rootFiles = await this.getFileContents(input);

    return this.getRepositoryFolders(input, rootFiles, depth, includeMediaFile);
  }

  async getBulkFileContents(
    input: IGithub.IGetBulkFileContentInput,
  ): Promise<IGithub.IGetBulkFileContentOutput> {
    if (!input.paths?.length) {
      return [];
    }

    return await Promise.all(
      input.paths?.map(async (path) => {
        return await this.getFileContents({ ...input, path });
      }),
    );
  }

  async getFileContentsOrNull(
    input: IGithub.IGetFileContentInput,
  ): Promise<IGithub.IGetFileContentOutput | null> {
    try {
      const data = await this.getFileContents(input);
      return data;
    } catch (err) {
      return null;
    }
  }

  async getFileContents(
    input: IGithub.IGetFileContentInput,
  ): Promise<IGithub.IGetFileContentOutput> {
    const { owner, repo, path, secretKey, branch } = input;
    const token = await this.getToken(secretKey);
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path ? path : ""}`;
    const res = await axios.get(url, {
      params: {
        ref: branch,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/vnd.github.object+json",
      },
    });

    if (res.data instanceof Array) {
      // 폴더를 조회한 경우 폴더 내부의 파일 목록이 조회된다.
      return res.data;
    } else {
      // 파일인 경우 상세 내용이 조회된다.
      const file: IGithub.RepositoryFile = res.data;
      const isMediaFile = this.isMediaFile(file);

      return {
        ...file,
        ...(file.content && {
          content: isMediaFile
            ? file.content
            : Buffer.from(file.content, "base64").toString("utf-8"),
        }),
      };
    }
  }

  async getReadmeFile(
    input: IGithub.IGetReadmeFileContentInput,
  ): Promise<IGithub.IGetReadmeFileContentOutput> {
    try {
      const { owner, repo, secretKey } = input;
      const url = `https://api.github.com/repos/${owner}/${repo}/readme`;
      const token = await this.getToken(secretKey);
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.github.object+json",
        },
      });

      return {
        ...res.data,
        ...(res.data.content && {
          content: Buffer.from(res.data.content, "base64").toString("utf-8"),
        }),
      };
    } catch (err) {
      return null;
    }
  }

  async getRepoEvents(
    input: IGithub.IGetRepoEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const { username, repo, secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });

    const url = `https://api.github.com/repos/${username}/${repo}/events?${queryParameters}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getNetworkRepoEvents(
    input: IGithub.IGetRepoEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const { username, repo, secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });

    const url = `https://api.github.com/networks/${username}/${repo}/events?${queryParameters}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getUserEvents(
    input: IGithub.IGetUserEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const { username, secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });

    const url = `https://api.github.com/users/${username}/events?${queryParameters}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getEvents(
    input: IGithub.IGetEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const { secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });

    const url = `https://api.github.com/events?${queryParameters}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async debugToken(input: IGithub.IGetMyProfileInput): Promise<IGithub.User> {
    const url = `https://api.github.com/user`;
    const token = await this.getToken(input.secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    return res.data;
  }

  async updateIssue(
    input: IGithub.IUpdateIssueInput,
  ): Promise<IGithub.IUpdateIssueOutput> {
    const { owner, repo, issue_number, ...rest } = input;
    const token = await this.getToken(input.secretKey);
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`;
    const res = await axios.patch(
      url,
      {
        title: input.title,
        body: input.body,
        assignees: input.assignees,
        labels: input.labels,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  }

  async createIssue(
    input: IGithub.ICreateIssueInput,
  ): Promise<IGithub.ICreateIssueOutput> {
    const { owner, repo } = input;
    const token = await this.getToken(input.secretKey);
    const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
    const res = await axios.post(
      url,
      {
        title: input.title,
        body: input.body,
        assignees: input.assignees,
        labels: input.labels,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  }

  async getRepositoryActivities(
    input: IGithub.IGetRepositoryActivityInput,
  ): Promise<IGithub.IGetRepositoryActivityOutput> {
    const { owner, repo, ref, secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({
      ...rest,
      per_page,
      ...(ref ? { ref: `refs/heads/${ref}` } : {}),
    });

    const url = `https://api.github.com/repos/${owner}/${repo}/activity?${queryParameters}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async updatePullRequest(
    input: IGithub.IUpdatePullRequestInput,
  ): Promise<IGithub.IUpdatePullRequestOutput> {
    const { owner, repo, pull_number, secretKey, ...rest } = input;

    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}`;
    const token = await this.getToken(secretKey);
    const res = await axios.post(
      url,
      {
        ...rest,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      id: res.data.id,
      number: res.data.number,
      title: res.data.title,
    };
  }

  async createPullRequest(
    input: IGithub.ICreatePullRequestInput,
  ): Promise<IGithub.ICreatePullRequestOutput> {
    const { owner, repo, secretKey, ...rest } = input;

    const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;
    const token = await this.getToken(secretKey);
    const res = await axios.post(
      url,
      {
        ...rest,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      id: res.data.id,
      number: res.data.number,
      title: res.data.title,
    };
  }

  async searchUser(
    input: IGithub.ISearchUserInput,
  ): Promise<IGithub.ISearchUserOutput> {
    const { secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/search/users?${queryParameters}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const link = res.headers["link"];
    return { result: res.data.items, ...this.getCursors(link) };
  }

  async getUserProfile(
    input: IGithub.IGetUserProfileInput,
  ): Promise<IGithub.IGetUserProfileOutput> {
    const { secretKey, ...rest } = input;
    const url = `https://api.github.com/users/${rest.username}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const pinned_repositories = await this.getUserPinnedRepository(input);
    const profile_repository = await this.getProfileRepository(input);
    return { ...res.data, profile_repository, pinned_repositories };
  }

  async getIssues(
    input: IGithub.IGetAuthenticatedUserIssueInput,
  ): Promise<IGithub.IGetAuthenticatedUserIssueOutput> {
    const { secretKey, ...rest } = input;
    const token = await this.getToken(secretKey);
    const per_page = input.per_page ?? 30;
    const queryParameter = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/issues?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getIssueDetail(
    input: IGithub.IGetIssueDetailInput,
  ): Promise<IGithub.IGetIssueDetailOutput> {
    const { owner, repo, issue_number, secretKey } = input;
    const token = await this.getToken(secretKey);
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    return res.data;
  }

  async getOrganizationRepositories(
    input: IGithub.IGetOrganizationRepositoryInput,
  ): Promise<IGithub.IGetOrganizationRepositoryOutput> {
    const { secretKey, organization, ...rest } = input;
    const token = await this.getToken(secretKey);
    const per_page = input.per_page ?? 30;
    const queryParameter = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/orgs/${organization}/repos?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getUserPinnedRepository(
    input: IGithub.IGetUserPinnedRepositoryInput,
  ): Promise<IGithub.IGetUserPinnedRepositoryOutput> {
    const token = await this.getToken(input.secretKey);
    const url = `https://api.github.com/graphql`;
    const res = await axios.post(
      url,
      {
        query: `
        {
          user(login: "${input.username}") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  owner {
                    login
                  },
                  name
                }
              }
            }
          }
        }`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.data.user.pinnedItems.nodes.map(
      (el: any) => `${el.owner.login}/${el.name}`,
    );
  }

  async getUserRepositories(
    input: IGithub.IGetUserRepositoryInput,
  ): Promise<IGithub.IGetUserRepositoryOutput> {
    const { secretKey, username, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameter = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/users/${username}/repos?${queryParameter}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const repsotories: IGithub.RepositoryWithReadmeFile[] = await Promise.all(
      res.data.map(async (repository: IGithub.Repository) => {
        const readme = await this.getReadmeFile({
          owner: username,
          repo: repository.name,
          secretKey: String(secretKey),
        });

        return { ...repository, readme };
      }),
    );
    const link = res.headers["link"];
    return { result: repsotories, ...this.getCursors(link) };
  }

  async getDetailedBranchInfo(
    input: IGithub.IGetBranchInput & { name: string },
  ): Promise<{ commit: { commit: IGithub.Commit } }> {
    const { owner, repo, name, secretKey } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/branches/${name}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    return res.data;
  }

  async getRepositoryBranches(
    input: IGithub.IGetBranchInput,
  ): Promise<IGithub.IGetBranchOutput> {
    const { owner, repo, secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameter = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/repos/${owner}/${repo}/branches?${queryParameter}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const link = res.headers["link"];
    const branches: IGithub.IGetBranchOutput["result"] = res.data;
    return {
      result: await Promise.all(
        branches.map(async (branch) => {
          const name = branch.name;
          const detail = await this.getDetailedBranchInfo({ ...input, name });
          const lastCommit = detail.commit.commit;
          return { ...branch, commit: lastCommit };
        }),
      ),
      ...this.getCursors(link),
    };
  }

  async createBranches(
    input: IGithub.ICreateBranchInput,
  ): Promise<IGithub.ICreateBranchOutput> {
    const { owner, repo, ref, sha, secretKey } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/git/refs`;
    const token = await this.getToken(secretKey);
    const res = await axios.post(
      url,
      {
        ref,
        sha,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  }

  async getPullRequestAssociatedWithACommit(
    input: IGithub.IGetPullRequestInput,
  ): Promise<IGithub.IGetPullRequestOutput> {
    const { owner, repo, commit_sha, secretKey } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${commit_sha}/pulls`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async getCommit(
    input: IGithub.IGetCommitInput,
  ): Promise<IGithub.IGetCommitOutput> {
    const { owner, repo, ref, secretKey } = input;

    let branch = ref;
    if (!branch) {
      const { default_branch } = await this.getRepository(input);
      branch = default_branch;
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });
    return res.data;
  }

  async getCommitDiff(input: IGithub.IGetCommitInput): Promise<string> {
    const { owner, repo, ref, secretKey } = input;

    let branch = ref;
    if (!branch) {
      const { default_branch } = await this.getRepository(input);
      branch = default_branch;
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.diff",
      },
    });
    return res.data;
  }

  async getCommitList(
    input: IGithub.IGetCommitListInput,
  ): Promise<IGithub.IGetCommitListOutput> {
    const { owner, repo, secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameter = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?${queryParameter}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.json",
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getFollowers(
    input: IGithub.IGetFollowerInput,
  ): Promise<IGithub.IGetFollowerOutput> {
    const { username, secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameter = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/users/${username}/followers?${queryParameter}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getFollowees(
    input: IGithub.IGetFolloweeInput,
  ): Promise<IGithub.IGetFolloweeOutput> {
    const { username, secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameter = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/users/${username}/following?${queryParameter}`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getLabels(
    input: IGithub.IGetLabelInput,
  ): Promise<IGithub.IGetLabelOutput> {
    const { owner, repo, secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameter = createQueryParameter({ ...rest, per_page });
    const token = await this.getToken(secretKey);
    const url = `https://api.github.com/repos/${owner}/${repo}/labels?${queryParameter}`;

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  /**
   * @param link res.headers['link']에 해당하는 문자열
   * @returns
   */
  private getCursors(link?: string): IGithub.ICommonPaginationOutput {
    if (!link) {
      return { nextPage: false };
    }

    const metadata: Omit<IGithub.ICommonPaginationOutput, "nextPage"> = link
      .split(",")
      .map((relation) => {
        const beforeRegExp = /(?<=\?before=)[^&]+(?=((&.+)|>;) rel="prev")/g;
        const before = relation.match(beforeRegExp)?.[0];

        if (typeof before === "string") {
          return { before };
        }

        const afterRegExp = /(?<=\?after=)[^&]+(?=((&.+)|>;) rel="next")/g;
        const after = relation.match(afterRegExp)?.[0];

        if (typeof after === "string") {
          return { after };
        }

        const prevRegExp = /(?<=\bpage=)\d+(?=((&.+)|>;) rel="prev")/g;
        const prev = relation.match(prevRegExp)?.[0];

        if (typeof prev === "string") {
          return { prev: Number(prev) };
        }

        const nextRegExp = /(?<=\bpage=)\d+(?=((&.+)|>;) rel="next")/g;
        const next = relation.match(nextRegExp)?.[0];

        if (typeof next === "string") {
          return { next: Number(next) };
        }

        const lastRegExp = /(?<=\bpage=)\d+(?=((&.+)|>;) rel="last")/g;
        const last = relation.match(lastRegExp)?.[0];

        if (typeof last === "string") {
          return { last: Number(last) };
        }

        const firstRegExp = /(?<=\bpage=)\d+(?=((&.+)|>;) rel="first")/g;
        const first = relation.match(firstRegExp)?.[0];

        if (typeof first === "string") {
          return { first: Number(first) };
        }

        return {};
      })
      .reduce((acc, cur) => Object.assign(acc, cur), {});

    return {
      ...metadata,
      nextPage: metadata.after || metadata.next ? true : false,
    };
  }

  /**
   * 폴더 내부를 조회한다.
   *
   * @param input
   * @param files
   * @param depth root files 이후의 조회를 시작하기 때문에 2면 최대 children이 2단계 Depth까지, 즉 폴더의 폴더의 파일들까지 조회하게 된다.
   * @returns
   */
  private async getRepositoryFolders(
    input: Pick<IGithub.IGetFileContentInput, "owner" | "repo" | "secretKey">,
    files: IGithub.IGetFileContentOutput,
    depth: number,
    includeMediaFile: boolean,
  ): Promise<IGithub.IGetRepositoryFolderStructureOutput> {
    const response: IGithub.IGetRepositoryFolderStructureOutput = [];
    if (files instanceof Array) {
      const isNotSourceFolders = ["test", "benchmark", "yarn", "pnp"] as const;
      const targets = includeMediaFile
        ? files
        : files
            .filter((file) => {
              return isNotSourceFolders.every((el) => !file.path.includes(el));
            })
            .filter((file) => {
              return !this.isMediaFile(file);
            });

      for await (const file of targets) {
        // 2단계 depth까지의 폴더만 순회하도록 하기
        if (file.type === "dir") {
          if (0 < depth) {
            const path = file.path;
            const next = depth - 1;
            const inners = await this.getFileContents({ ...input, path });
            const scanned = await this.getRepositoryFolders(
              input,
              inners,
              next,
              includeMediaFile,
            );
            const children = scanned.map((el) => typia.misc.assertClone(el));
            response.push({ ...file, children });
          } else {
            // 탐색 범위를 넘어서는 폴더기 때문에 children을 빈배열로 담는다.
            response.push({ ...file, children: [] });
          }
        } else {
          response.push(file);
        }
      }
    }
    return response;
  }

  private async getToken(secretValue: string): Promise<string> {
    const secret = await OAuthSecretProvider.getSecretValue(secretValue);
    const token =
      typeof secret === "string"
        ? secret
        : (secret as IOAuthSecret.ISecretValue).value;
    return token;
  }

  private async traverseTree(
    input: IGithub.IAnalyzeInput,
    folder: ElementOf<IGithub.IGetRepositoryFolderStructureOutput>,
    traverseOption: {
      result: any[][];
      currentIndex: number;
      currentSize: number;
    },
  ): Promise<void> {
    // 더 이상 담을 수 없는 케이스
    if (traverseOption.currentIndex === 5) {
      return;
    }

    if (folder.type !== "dir") {
      throw new Error("파일은 순회할 수 없습니다.");
    }

    await Promise.allSettled(
      folder.children
        .filter(
          (file) =>
            !file.path.includes("test") &&
            !file.path.includes("benchmark") &&
            !file.path.includes("yarn") &&
            !file.path.includes("pnp") &&
            this.isMediaFile(file) === false,
        )
        .map(async (child) => {
          if (traverseOption.currentIndex === 5) {
            return;
          }

          type E = ElementOf<IGithub.IGetRepositoryFolderStructureOutput>;
          const file = child as E;

          const path = file.path;
          if (child.type === "dir") {
            await this.traverseTree(input, child, traverseOption);
          } else {
            const detailed = await this.getFileContents({ ...input, path });
            const { content } = typia.assert<IGithub.RepositoryFile>(detailed);
            child.content = content;

            if (3 * 1024 * 1024 < traverseOption.currentSize + file.size) {
              traverseOption.currentSize = 0;
              traverseOption.currentIndex += 1;
              console.log(`${file.path} 파일을 만나서 파일 인덱스 증가 연산`);
            }

            if (traverseOption.currentIndex === 5) {
              return;
            }

            traverseOption.currentSize += file.size;
            traverseOption.result[traverseOption.currentIndex].push(child);
          }
        }),
    );
  }

  private async getProfileRepository(input: {
    username: string;
    secretKey: string;
  }): Promise<IGithub.ProfileRepository> {
    try {
      let page = 1;
      let repo: IGithub.Repository | null = null;
      while (true) {
        if (page === 10) {
          break;
        }

        const res = await this.getUserRepositories({
          username: input.username,
          secretKey: input.secretKey,
          per_page: 100,
          page,
        });

        repo = res.result.find((el) => el.name === input.username) ?? null;
        if (repo) {
          break;
        }

        if (res.nextPage === false) {
          break;
        }

        if (typeof res.next !== "number") {
          break;
        }

        page++;
      }

      if (repo) {
        const readme = await this.getReadmeFile({
          owner: input.username,
          repo: input.username,
          secretKey: input.secretKey,
        });

        return { ...repo, readme };
      }

      return null;
    } catch (err) {
      return null;
    }
  }

  private isMediaFile(
    file: Pick<IGithub.RepositoryFile | IGithub.RepositoryFolder, "path">,
  ) {
    const splited = file.path.split(".");
    const extension = splited[splited.length - 1];

    if (file.path.endsWith("package.json")) {
      // package.json만 허용한다.
      return false;
    }

    return (
      imageExtensions.some((el) => el === extension) ||
      videoExtensions.some((el) => el === extension) ||
      docsExtensions.some((el) => el === extension)
    );
  }
}
