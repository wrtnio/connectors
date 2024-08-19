import { Injectable } from "@nestjs/common";
import { IGithub } from "@wrtn/connector-api/lib/structures/connector/github/IGithub";
import axios from "axios";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";

@Injectable()
export class GithubProvider {
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
    return { result: res.data, ...this.getCursors(link) };
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
    console.log();
    console.log(link);
    console.log();
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

    const afterRegExp = /(?<=after=)[^&]+(?=((&.+)|>;) rel="next")/g;
    const after = link.match(afterRegExp)?.[0];

    const beforeRegExp = /(?<=before=)[^&]+(?=((&.+)|>;) rel="prev")/g;
    const before = link.match(beforeRegExp)?.[0];

    const prevRegExp = /(?<=\bpage=)\d+(?=((&.+)|>;) rel="prev")/g;
    const prev = link.match(prevRegExp)?.[0];

    const nextRegExp = /(?<=\bpage=)\d+(?=((&.+)|>;) rel="next")/g;
    const next = link.match(nextRegExp)?.[0];

    const lastRegExp = /(?<=\bpage=)\d+(?=((&.+)|>;) rel="last")/g;
    const last = link.match(lastRegExp)?.[0];

    const firstRegExp = /(?<=\bpage=)\d+(?=((&.+)|>;) rel="first")/g;
    const first = link.match(firstRegExp)?.[0];

    return {
      nextPage: after || next ? true : false,
      ...(after && { after }),
      ...(before && { before }),
      ...(Number(prev) && {
        prev: Number(prev),
        next: Number(last)
          ? Number(prev) + 2 < Number(last)
            ? Number(prev) + 2
            : null
          : null,
      }),
      ...(Number(next) && {
        next: Number(next),
        prev: Number(next) - 2 > 0 ? Number(next) - 2 : null,
      }),
      ...(Number(last) && { last: Number(last) }),
      ...(Number(first) && { first: Number(first) }),
    };
  }
}
