import { Injectable } from "@nestjs/common";
import { IGithub } from "@wrtn/connector-api/lib/structures/connector/github/IGithub";
import axios from "axios";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";

@Injectable()
export class GithubProvider {
  async searchUser(
    input: IGithub.ISearchUserInput,
  ): Promise<IGithub.ISearchUserOutput> {
    const url = `https://api.github.com/search/users?q=${input.q}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });
    return res.data;
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
    const queryParameter = createQueryParameter(rest);
    const url = `https://api.github.com/users/${username}/repos?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });
    return res.data;
  }
}
