import { Controller } from "@nestjs/common";
import { GithubProvider } from "../../../providers/connector/github/GithubProvider";
import { IGithub } from "@wrtn/connector-api/lib/structures/connector/github/IGithub";
import core, { TypedBody } from "@nestia/core";
import typia from "typia";

@Controller("connector/github")
export class GithubController {
  constructor(private readonly githubProvider: GithubProvider) {}

  /**
   * @summary
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-users")
  async searchUser(
    @TypedBody() input: IGithub.ISearchUserInput,
  ): Promise<IGithub.ISearchUserOutput> {
    return this.githubProvider.searchUser(input);
  }

  /**
   * @summary
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-user-profile")
  async getUserProfile(
    @TypedBody() input: IGithub.IGetUserProfileInput,
  ): Promise<IGithub.IGetUserProfileOutput> {
    return this.githubProvider.getUserProfile(input);
  }

  /**
   * @summary
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-repositories")
  async getUserRepositories(
    @TypedBody() input: IGithub.IGetUserRepositoryInput,
  ): Promise<IGithub.IGetUserRepositoryOutput> {
    return this.githubProvider.getUserRepositories(input);
  }

  /**
   * @summary
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-branches")
  async getRepositoryBranches(
    @TypedBody() input: IGithub.IGetBranchInput,
  ): Promise<IGithub.IGetBranchOutput> {
    return this.githubProvider.getRepositoryBranches(input);
  }

  /**
   * @summary
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-commit")
  async getCommit(
    @TypedBody() input: IGithub.IGetCommitInput,
  ): Promise<IGithub.IGetCommitOutput> {
    return this.githubProvider.getCommit(input);
  }

  /**
   * @summary
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-commit-diff")
  async getCommitDiff(
    @TypedBody() input: IGithub.IGetCommitInput,
  ): Promise<IGithub.IGetCommitOutput> {
    return this.githubProvider.getCommitDiff(input);
  }

  /**
   * @summary
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-commit-list")
  async getCommitList(
    @TypedBody() input: IGithub.IGetCommitListInput,
  ): Promise<IGithub.IGetCommitListOutput> {
    const data = await this.githubProvider.getCommitList(input);
    console.log(JSON.stringify(typia.misc.validateClone(data), null, 2));
    console.log(JSON.stringify(data.result[0], null, 2));
    return data;
  }

  /**
   * @summary
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-followers")
  async getFollowers(
    @TypedBody() input: IGithub.IGetFollowerInput,
  ): Promise<IGithub.IGetFollowerOutput> {
    return this.githubProvider.getFollowers(input);
  }

  /**
   * @summary
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-followees")
  async getFollowees(
    @TypedBody() input: IGithub.IGetFolloweeInput,
  ): Promise<IGithub.IGetFolloweeOutput> {
    return this.githubProvider.getFollowees(input);
  }
}
