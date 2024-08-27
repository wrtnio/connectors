import { Injectable } from "@nestjs/common";
import { IGithub } from "@wrtn/connector-api/lib/structures/connector/github/IGithub";
import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";
import { ElementOf } from "@wrtnio/decorators";
import { String } from "aws-sdk/clients/acm";
import axios from "axios";
import typia from "typia";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { AwsProvider } from "../aws/AwsProvider";
import { RagProvider } from "../rag/RagProvider";

@Injectable()
export class GithubProvider {
  constructor(
    private readonly awsProvider: AwsProvider,
    private readonly ragProvider: RagProvider,
  ) {}

  async traverseTree(
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

    for await (const child of folder.children) {
      type E = ElementOf<IGithub.IGetRepositoryFolderStructureOutput>;
      const file = child as E;

      const path = file.path;

      if (child.type === "dir") {
        await this.traverseTree(input, child, traverseOption);
      } else {
        const detailed = await this.getFileContents({ ...input, path });
        const { content } = typia.assert<IGithub.RepositoryFile>(detailed);
        child.content = content;

        if (4.8 * 1024 * 1024 * 1024 < traverseOption.currentSize + file.size) {
          traverseOption.currentSize = 0;
          traverseOption.currentIndex += 1;
        }

        if (traverseOption.currentIndex === 5) {
          break;
        }

        traverseOption.currentSize += file.size;
        traverseOption.result[traverseOption.currentIndex].push(child);
      }
    }
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

    const MAX_SIZE = 4.8 * 1024 * 1024 * 1024;
    const MAX_DEPTH = 100;

    // 전체 폴더 구조 가져오기
    const rootFiles = await this.getRepositoryFolderStructures(
      input,
      MAX_DEPTH,
    );

    // 전체 순회하며 파일인 경우 content를 가져오게 하기
    const traverseOption = {
      result: [[], [], [], [], []] as any[][],
      currentIndex: 0,
      currentSize: 0,
    };

    // 한 파일 당 4.8MB 씩 5개의 파일이 되게끔 담기
    if (rootFiles instanceof Array) {
      for await (const file of rootFiles) {
        const path = file.path;
        if (file.type === "dir") {
          await this.traverseTree(input, file, traverseOption);
        } else {
          const detailed = await this.getFileContents({ ...input, path });
          const { content } = typia.assert<IGithub.RepositoryFile>(detailed);
          (file as any).content = content;

          if (MAX_SIZE < traverseOption.currentSize + file.size) {
            traverseOption.currentSize = 0; // 사이즈 초기화
            traverseOption.currentIndex += 1; // 다음 파일 인덱스로 이전
          }

          if (traverseOption.currentIndex === 5) {
            break;
          }

          traverseOption.currentSize += file.size;
          traverseOption.result[traverseOption.currentIndex].push(file);
        }
      }
    }

    const analyzedFiles = traverseOption.result.filter((el) => el.length);
    const links: string[] = [];
    if (analyzedFiles) {
      let FILE_NUM = 0;
      for await (const analyzedFile of analyzedFiles) {
        const key = `${AWS_KEY}/${FILE_NUM}.txt`;
        const buffer = Buffer.from(JSON.stringify(analyzedFile), "utf-8");
        const link = await this.awsProvider.uploadObject({
          contentType: "text/plain",
          data: buffer,
          key,
        });
        links.push(link);

        FILE_NUM++;
      }
    }

    return links;
  }

  async analyze(input: IGithub.IAnalyzeInput): Promise<IRag.IAnalysisOutput> {
    const urls = await this.copyAllFiles(input);
    return await this.ragProvider.analyze(urls.map((url) => ({ url })));
  }

  async getRepository(input: {
    owner: string;
    repo: string;
    secretKey: string;
  }): Promise<{ default_branch: String }> {
    const url = `https://api.github.com/repos/${input.owner}/${input.repo}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${input.secretKey}`,
      },
    });
    return res.data;
  }

  async call(input: IGithub.ICallInput) {
    const res = await axios.get(input.url, {
      headers: {
        Authorization: `Bearer ${input.secretKey}`,
      },
    });

    return res.data;
  }

  async getCommitHeads(
    input: IGithub.IGetCommitHeadInput,
  ): Promise<IGithub.IGetCommitHeadOutput> {
    const { owner, repo, commit_sha, secretKey } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${commit_sha}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });
    return res.data;
  }

  async getUserOrganizationEvents(
    input: IGithub.IGetOrganizationUserEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const { organization, secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });

    const { login } = await this.debugToken(input);
    const url = `https://api.github.com/users/${login}/events/orgs/${organization}?${queryParameters}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
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
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async createFileContents(
    input: IGithub.ICreateFileContentInput,
  ): Promise<void> {
    const { owner, repo, path, secretKey, ...rest } = input;

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    await axios.put(
      url,
      {
        ...rest,
        content: Buffer.from(input.content).toString("base64"),
      },
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      },
    );
  }

  async getRepositoryFolderStructures(
    input: IGithub.IGetRepositoryFolderStructureInput,
    depth: number = 2,
  ): Promise<IGithub.IGetRepositoryFolderStructureOutput> {
    const rootFiles = await this.getFileContents(input);

    return this.getRepositoryFolders(input, rootFiles, depth);
  }

  async getFileContents(
    input: IGithub.IGetFileContentInput,
  ): Promise<IGithub.IGetFileContentOutput> {
    const { owner, repo, path, secretKey, branch } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path ? path : ""}`;
    const res = await axios.get(url, {
      params: {
        ref: branch,
      },
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/vnd.github.object+json",
      },
    });

    if (res.data instanceof Array) {
      // 폴더를 조회한 경우 폴더 내부의 파일 목록이 조회된다.
      return res.data;
    } else {
      // 파일인 경우 상세 내용이 조회된다.
      return {
        ...res.data,
        ...(res.data.content && {
          content: Buffer.from(res.data.content, res.data.encoding).toString(
            "utf-8",
          ),
        }),
      };
    }
  }

  async getReadmeFile(
    input: IGithub.IGetReadmeFileContentInput,
  ): Promise<IGithub.IGetReadmeFileContentOutput> {
    const { owner, repo, secretKey } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/vnd.github.object+json",
      },
    });

    return {
      ...res.data,
      ...(res.data.content && {
        content: Buffer.from(res.data.content, "base64").toString("utf-8"),
      }),
    };
  }

  async getRepoEvents(
    input: IGithub.IGetRepoEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const { username, repo, secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });

    const url = `https://api.github.com/repos/${username}/${repo}/events?${queryParameters}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
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
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
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
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
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
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async debugToken(input: IGithub.IGetMyProfileInput): Promise<IGithub.User> {
    const url = `https://api.github.com/user`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${input.secretKey}`,
        Accept: "application/vnd.github+json",
      },
    });

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
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async searchUser(
    input: IGithub.ISearchUserInput,
  ): Promise<IGithub.ISearchUserOutput> {
    const { secretKey, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameters = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/search/users?${queryParameters}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
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
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        Accept: "application/vnd.github+json",
      },
    });
    return res.data;
  }

  async getUserRepositories(
    input: IGithub.IGetUserRepositoryInput,
  ): Promise<IGithub.IGetUserRepositoryOutput> {
    const { secretKey, username, ...rest } = input;
    const per_page = input.per_page ?? 30;
    const queryParameter = createQueryParameter({ ...rest, per_page });
    const url = `https://api.github.com/users/${username}/repos?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        Accept: "application/vnd.github+json",
      },
    });

    const link = res.headers["link"];
    return { result: res.data, ...this.getCursors(link) };
  }

  async getDetailedBranchInfo(
    input: IGithub.IGetBranchInput & { name: string },
  ): Promise<{ commit: { commit: IGithub.Commit } }> {
    const { owner, repo, name, secretKey } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/branches/${name}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
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
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
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

  async getPullRequestAssociatedWithACommit(
    input: IGithub.IGetPullRequestInput,
  ): Promise<IGithub.IGetPullRequestOutput> {
    const { owner, repo, commit_sha, secretKey } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${commit_sha}/pulls`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    return res.data;
  }

  async getCommit(
    input: IGithub.IGetCommitInput,
  ): Promise<IGithub.IGetCommitOutput> {
    const { owner, repo, ref, secretKey } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${ref}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        Accept: "application/vnd.github+json",
      },
    });
    return res.data;
  }

  async getCommitDiff(input: IGithub.IGetCommitInput): Promise<string> {
    const { owner, repo, ref, secretKey } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${ref}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
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
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
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
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
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
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        Accept: "application/vnd.github+json",
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
    depth: number = 2,
  ): Promise<IGithub.IGetRepositoryFolderStructureOutput> {
    const response: IGithub.IGetRepositoryFolderStructureOutput = [];
    if (files instanceof Array) {
      for await (const file of files) {
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
}
