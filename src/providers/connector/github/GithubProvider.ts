import { Injectable } from "@nestjs/common";
import { IGithub } from "@wrtn/connector-api/lib/structures/connector/github/IGithub";
import axios from "axios";
import typia from "typia";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";

@Injectable()
export class GithubProvider {
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
    input: Required<IGithub.IGetRepositoryFolderStructureInput>,
  ): Promise<IGithub.IGetRepositoryFolderStructureOutput> {
    const rootFiles = await this.getFileContents(input);

    return this.getRepositoryFolders(input, rootFiles);
  }

  async getFileContents(
    input: IGithub.IGetFileContentInput,
  ): Promise<IGithub.IGetFileContentOutput> {
    const { owner, repo, path, secretKey, branch } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
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
