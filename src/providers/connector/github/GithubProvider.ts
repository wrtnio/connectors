import { Injectable } from "@nestjs/common";
import { IGithub } from "@wrtn/connector-api/lib/structures/connector/github/IGithub";
import axios from "axios";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";

@Injectable()
export class GithubProvider {
  async searchUser(
    input: IGithub.ISearchUserInput,
  ): Promise<IGithub.ISearchUserOutput> {
    const queryParameters = createQueryParameter(input);
    const url = `https://api.github.com/search/users?${queryParameters}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    const nextPage = res.data.items.length > (input.per_page ?? 30);
    return { result: res.data.items, nextPage };
  }

  async getUserProfile(
    input: IGithub.IGetUserProfileInput,
  ): Promise<IGithub.IGetUserProfileOutput> {
    const url = `https://api.github.com/users/${input.username}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });
    return res.data;
  }

  async getUserRepositories(
    input: IGithub.IGetUserRepositoryInput,
  ): Promise<IGithub.IGetUserRepositoryOutput> {
    const { username, ...rest } = input;
    const queryParameter = this.createQueryParameter({
      ...rest,
      per_page: Number(rest.per_page) ?? 30,
    });
    const url = `https://api.github.com/users/${username}/repos?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    const nextPage = res.data.length > (input.per_page ?? 30);
    return { result: res.data, nextPage };
  }

  async getRepositoryBranches(
    input: IGithub.IGetBranchInput,
  ): Promise<IGithub.IGetBranchOutput> {
    const { owner, repo, ...rest } = input;
    const queryParameter = this.createQueryParameter({
      ...rest,
      per_page: Number(rest.per_page) ?? 30,
    });
    const url = `https://api.github.com/repos/${owner}/${repo}/branches?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    const nextPage = res.data.length > (input.per_page ?? 30);
    return { result: res.data, nextPage };
  }

  async getCommit(
    input: IGithub.IGetCommitInput,
  ): Promise<IGithub.IGetCommitOutput> {
    const { owner, repo, ref } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${ref}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });
    return res.data;
  }

  async getCommitDiff(
    input: IGithub.IGetCommitInput,
  ): Promise<IGithub.IGetCommitOutput> {
    const { owner, repo, ref } = input;
    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${ref}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github+diff",
      },
    });
    return res.data;
  }

  async getCommitList(
    input: IGithub.IGetCommitListInput,
  ): Promise<IGithub.IGetCommitListOutput> {
    const { owner, repo, ...rest } = input;
    const queryParameter = this.createQueryParameter({
      ...rest,
      per_page: Number(rest.per_page) ?? 30,
    });
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    const nextPage = res.data.length > (input.per_page ?? 30);
    return { result: res.data, nextPage };
  }

  async getFollowers(
    input: IGithub.IGetFollowerInput,
  ): Promise<IGithub.IGetFollowerOutput> {
    const { username, ...rest } = input;
    const queryParameter = this.createQueryParameter({
      ...rest,
      per_page: Number(rest.per_page) ?? 30,
    });
    const url = `https://api.github.com/users/${username}/following?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    const nextPage = res.data.length > (input.per_page ?? 30);
    return { result: res.data, nextPage };
  }

  async getFollowees(
    input: IGithub.IGetFolloweeInput,
  ): Promise<IGithub.IGetFolloweeOutput> {
    const { username, ...rest } = input;
    const queryParameter = this.createQueryParameter({
      ...rest,
      per_page: Number(rest.per_page) ?? 30,
    });
    const url = `https://api.github.com/users/${username}/following?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    const nextPage = res.data.length > (input.per_page ?? 30);
    return { result: res.data, nextPage };
  }

  private createQueryParameter(input: { per_page: number }) {
    return createQueryParameter({
      ...input,
      per_page: (Number(input.per_page) ?? 30) + 1,
    });
  }
}
