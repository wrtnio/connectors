import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IGithub } from "@wrtn/connector-api/lib/structures/connector/github/IGithub";
import { GithubProvider } from "../../../providers/connector/github/GithubProvider";

@Controller("connector/github")
export class GithubController {
  constructor(private readonly githubProvider: GithubProvider) {}

  /**
   * List public organization events.
   * If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
   *
   * @summary List public organization events.
   */
  @core.TypedRoute.Post("orgs/get-events")
  async getOrganizationEvents(
    @TypedBody() input: IGithub.IGetOrganizationEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const data = await this.githubProvider.getOrganizationEvents(input);
    return data;
  }

  /**
   * List events for the authenticated user.
   * If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
   *
   * @summary List events for the authenticated user.
   */
  @core.TypedRoute.Post("repos/get-events")
  async getRepoEvents(
    @TypedBody() input: IGithub.IGetRepoEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const data = await this.githubProvider.getRepoEvents(input);
    return data;
  }

  /**
   * List events for the authenticated user.
   * If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
   *
   * @summary List events for the authenticated user.
   */
  @core.TypedRoute.Post("users/get-events")
  async getUserEvents(
    @TypedBody() input: IGithub.IGetUserEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const data = await this.githubProvider.getUserEvents(input);
    return data;
  }

  /**
   * List public events.
   * This API is not built to serve real-time use cases. Depending on the time of day, event latency can be anywhere from 30s to 6h.
   *
   * @summary List public events.
   */
  @core.TypedRoute.Post("get-events")
  async getEvents(
    @TypedBody() input: IGithub.IGetEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const data = await this.githubProvider.getEvents(input);
    return data;
  }

  /**
   * Get repository activities
   *
   * @summary Get Repository' activities
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("repositories/get-activities")
  async getRepositoryActivities(
    @TypedBody() input: IGithub.IGetRepositoryActivityInput,
  ): Promise<IGithub.IGetRepositoryActivityOutput> {
    return this.githubProvider.getRepositoryActivities(input);
  }

  /**
   * Search for users by keyword in github
   *
   * @summary Search for users by keyword in github
   * @param input
   * @returns list of user
   */
  @core.TypedRoute.Post("get-users")
  async searchUser(
    @TypedBody() input: IGithub.ISearchUserInput,
  ): Promise<IGithub.ISearchUserOutput> {
    return this.githubProvider.searchUser(input);
  }

  /**
   * Look up the user's detailed profile
   *
   * @summary Look up the user's detailed profile
   * @param input
   * @returns detailed profile
   */
  @core.TypedRoute.Post("get-user-profile")
  async getUserProfile(
    @TypedBody() input: IGithub.IGetUserProfileInput,
  ): Promise<IGithub.IGetUserProfileOutput> {
    return this.githubProvider.getUserProfile(input);
  }

  /**
   * Inquire the user's repository
   *
   * @summary Inquire the user's repository
   * @param input
   * @returns repositories
   */
  @core.TypedRoute.Post("get-repositories")
  async getUserRepositories(
    @TypedBody() input: IGithub.IGetUserRepositoryInput,
  ): Promise<IGithub.IGetUserRepositoryOutput> {
    return this.githubProvider.getUserRepositories(input);
  }

  /**
   * Inquire the user's branch
   *
   * @summary Inquire the user's branch
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
   * Inquire the commit details of the user
   * It contains all the history of how the file changed, so you can see the details of a single commit node.
   *
   * @summary Inquire the commit details of the user
   * @param input
   * @returns detailed commit history
   */
  @core.TypedRoute.Post("get-commit")
  async getCommit(
    @TypedBody() input: IGithub.IGetCommitInput,
  ): Promise<IGithub.IGetCommitOutput> {
    return this.githubProvider.getCommit(input);
  }

  /**
   * Inquire the commit diff of the user
   * diff is Github's own content type specification that allows you to identify changes per commit on the Github homepage.
   *
   * @summary Inquire the commit diff of the user
   * @param input
   * @returns commit diff
   */
  @core.TypedRoute.Post("get-commit-diff")
  async getCommitDiff(
    @TypedBody() input: IGithub.IGetCommitInput,
  ): Promise<string> {
    return this.githubProvider.getCommitDiff(input);
  }

  /**
   * Look up the list of commitments for a specific repo, a specific branch
   *
   * @summary Look up the list of commitments for a specific repo, a specific branch
   * @param input
   * @returns list of commit
   */
  @core.TypedRoute.Post("get-commit-list")
  async getCommitList(
    @TypedBody() input: IGithub.IGetCommitListInput,
  ): Promise<IGithub.IGetCommitListOutput> {
    return this.githubProvider.getCommitList(input);
  }

  /**
   * Inquire the followers of the user
   *
   * @summary Inquire the followers of the user
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
   * Inquire the followees of the user
   *
   * @summary Inquire the followees of the user
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-followees")
  async getFollowees(
    @TypedBody() input: IGithub.IGetFolloweeInput,
  ): Promise<IGithub.IGetFolloweeOutput> {
    return this.githubProvider.getFollowees(input);
  }

  /**
   * Get user's profile
   *
   * @summary Get my profile
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-my-profile")
  async getMyProfile(
    @TypedBody() input: IGithub.IGetMyProfileInput,
  ): Promise<IGithub.User> {
    return this.githubProvider.debugToken(input);
  }
}
