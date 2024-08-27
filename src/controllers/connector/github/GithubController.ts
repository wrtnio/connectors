import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IGithub } from "@wrtn/connector-api/lib/structures/connector/github/IGithub";
import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";
import { RouteIcon } from "@wrtnio/decorators";
import { GithubProvider } from "../../../providers/connector/github/GithubProvider";
import { StrictOmit } from "../../../utils/strictOmit";

@Controller("connector/github")
export class GithubController {
  constructor(private readonly githubProvider: GithubProvider) {}

  /**
   * @summary 레포 분석 봇 생성
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("analyze")
  async analyze(
    @TypedBody() input: IGithub.IAnalyzeInput,
  ): Promise<IRag.IAnalysisOutput> {
    return this.githubProvider.analyze(input);
  }

  /**
   * Lists organization events for the authenticated user
   *
   * This API endpoint retrieves events that have occurred within the organizations
   * the authenticated user is a member of. It includes activities such as issues,
   * pull requests, commits, and other actions taken within the organization's repositories.
   *
   * The events cover all repositories within the organization that the user has access to,
   * making it useful for tracking the organization's activity or monitoring the progress
   * of projects that the user is involved in within the team.
   *
   * @returns A list of events from the organizations the authenticated user is a member of.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("organizations/users/get-events")
  async getUserOrganizationEvents(
    @TypedBody() input: IGithub.IGetOrganizationUserEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const data = await this.githubProvider.getUserOrganizationEvents(input);
    return data;
  }

  /**
   * List public organization events
   *
   * If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
   *
   * This API endpoint retrieves a stream of public events that have occurred
   * within a specified organization. These events include activities such as
   * repository creation, issues, pull requests, and other actions taken by members
   * of the organization across all its public repositories.
   *
   * This is useful for monitoring the public activity within an organization,
   * providing insights into how the organization is managing its projects,
   * the work being done by its members, and the overall public engagement with
   * its repositories.
   *
   * @summary List public organization events.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("organizations/get-events")
  async getOrganizationEvents(
    @TypedBody() input: IGithub.IGetOrganizationEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const data = await this.githubProvider.getOrganizationEvents(input);
    return data;
  }

  /**
   * Create file content in github repository
   *
   * If the file already exists in the same path, you should use the modification API and this connector is only responsible for generation.
   * Creating file content is the same as creating a single commit.
   * Commit is a hash that must be created in github to save changes, such as uploading, modifying, deleting, and so on.
   *
   * @summary Create File content and commit
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("repos/contents")
  async createFileContents(
    @TypedBody() input: IGithub.ICreateFileContentInput,
  ): Promise<void> {
    const data = await this.githubProvider.createFileContents(input);
    return data;
  }

  /**
   * Review Repository Folder Structure
   *
   * It allows you to know the overall folder structure by traversing files in the repository.
   * This feature is intended to navigate like a DFS based on folders.
   * If this function is so vast that you cannot see the entire folder, you can pass the `path` again to inquire.
   * The `path` delivered is treated like a Root folder and continues the navigation from this folder.
   * This feature is designed to navigate to the inside two more times, up to steps 0, 1 at a time, based on the root folder.
   *
   * If you want to know the details of the file, it is recommended to use the get-contents connector.
   *
   * @summary Review Repository Folder Structure
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("repos/get-folder-structures")
  async getRepositoryFolderStructures(
    @TypedBody() input: IGithub.IGetRepositoryFolderStructureInput,
  ): Promise<IGithub.IGetRepositoryFolderStructureOutput> {
    const data = await this.githubProvider.getRepositoryFolderStructures({
      ...input,
      path: input.path ?? "",
    });

    return data;
  }

  /**
   * Look up repository files
   *
   * If the file you want to inquire is a folder, internal files are provided in an array,
   * and if it is a file, it inquires about the encoding method of the file and the body content of the file.
   * Since there may be countless files and folders in the github repository, there may be many files that exceed the rate limit.
   * In this case, you can try to solve this problem by sequentially finding the folders one by one using the corresponding connector.
   *
   * @summary Look up repository files
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("repos/get-contents")
  async getFileContents(
    @TypedBody() input: IGithub.IGetFileContentInput,
  ): Promise<IGithub.IGetFileContentOutput> {
    return this.githubProvider.getFileContents(input);
  }

  /**
   * Read the README file in the repository
   *
   * README is one of the initial settings of the project and usually records a description of this repository,
   * so it's useful if you want to see a rough description of the repository.
   *
   * @summary Read the README file
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("repos/get-readme")
  async getReadmeFile(
    @TypedBody() input: IGithub.IGetReadmeFileContentInput,
  ): Promise<IGithub.IGetReadmeFileContentOutput> {
    return this.githubProvider.getReadmeFile(input);
  }

  /**
   * List events for the authenticated user
   *
   * If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
   * You can check all events surrounding the repository, such as who inquired and who forked.
   * It is used in conjunction with a connector that inquires the activity details and is suitable for checking how active the repository is.
   *
   * @summary List events for the authenticated user
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("repos/get-events")
  async getRepoEvents(
    @TypedBody() input: IGithub.IGetRepoEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const data = await this.githubProvider.getRepoEvents(input);
    return data;
  }

  /**
   * Fetches events across all forks of a specified repository.
   *
   * This API endpoint provides a stream of events that occur in any fork
   * of the specified repository. It includes actions such as commits,
   * pull requests, issues, and other activity happening in the forked
   * repositories.
   *
   * Use this endpoint when you need to monitor the activity not just
   * in the original repository, but also in all of its forks. This can
   * be particularly useful for understanding the broader impact or
   * activity surrounding a popular project that has been forked multiple
   * times.
   *
   * @summary List public events for a network of repositories
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("networks/get-events")
  async getNetworkRepoEvents(
    @TypedBody() input: IGithub.IGetRepoEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const data = await this.githubProvider.getNetworkRepoEvents(input);
    return data;
  }

  /**
   * List events for the authenticated user
   *
   * This API endpoint retrieves a stream of events related to the authenticated user,
   * including activities such as issues, pull requests, commits, and repository actions
   * that the user has participated in or been mentioned in. The events reflect the user's
   * interactions across all repositories they have access to, both public and private (if
   * the user has appropriate permissions).
   *
   * This is useful for tracking a user's activity on GitHub, allowing you to see a
   * personalized feed of their involvement in various projects and interactions with
   * other users.
   *
   * If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
   * It looks up users' public events. Username should be your own nickname because you can usually only see your own events.
   *
   * @summary List events for the authenticated user.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("users/get-events")
  async getUserEvents(
    @TypedBody() input: IGithub.IGetUserEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const data = await this.githubProvider.getUserEvents(input);
    return data;
  }

  /**
   * List public events
   *
   * This API is not built to serve real-time use cases. Depending on the time of day, event latency can be anywhere from 30s to 6h.
   * When I look up the events, they may not be of much value to the user because they are events that occurred on github.
   *
   * @summary List public events.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
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
   * You can use it to see how active your contribution is to the repository
   * because it looks up all the activities that have occurred in the repository.
   *
   * The types of activities that can be viewed here are as follows, and you can also find out by which user it was operated.
   * push, force_push, branch_creation, branch_deletion, pr_merge, merge_queue_merge
   *
   * @summary Get Repository' activities
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("get-user-profile")
  async getUserProfile(
    @TypedBody() input: IGithub.IGetUserProfileInput,
  ): Promise<IGithub.IGetUserProfileOutput> {
    return this.githubProvider.getUserProfile(input);
  }

  /**
   * Inquire the user's repository
   *
   * Since it contains only the simplest information of the repository here, there is no way to know the lead me of the repository or detailed information.
   * It is recommended to use additional connectors to explore because other connectors have the ability to read leads or internal files in the repository.
   *
   * @summary Inquire the user's repository
   * @param input
   * @returns repositories
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("get-repositories")
  async getUserRepositories(
    @TypedBody() input: IGithub.IGetUserRepositoryInput,
  ): Promise<IGithub.IGetUserRepositoryOutput> {
    return this.githubProvider.getUserRepositories(input);
  }

  /**
   * Inquire the user's branch
   * You can look up a list of branches in a specific repository.
   * Because it says what the last commit is, and when and to whom it was made,
   * you can see which of the branches is the latest and managed.
   *
   * @summary Inquire the user's branch
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("get-branches")
  async getRepositoryBranches(
    @TypedBody() input: IGithub.IGetBranchInput,
  ): Promise<IGithub.IGetBranchOutput> {
    return this.githubProvider.getRepositoryBranches(input);
  }

  /**
   * List pull requests associated with a commit
   *
   * Fetches the pull requests (PRs) associated with a specific commit in a GitHub repository.
   * This API endpoint retrieves a list of pull requests that include the specified commit.
   * This can be useful for tracking where and how a particular change was merged into a branch.
   *
   * @summary get pull requests associated with a commit
   * @returns pull requests associated with a commit
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("get-pull-requests-associated-with-a-commit")
  async getPullRequestAssociatedWithACommit(
    @TypedBody() input: IGithub.IGetPullRequestInput,
  ): Promise<IGithub.IGetPullRequestOutput> {
    return this.githubProvider.getPullRequestAssociatedWithACommit(input);
  }

  /**
   * Lists all branches that contain the HEAD commit of a GitHub repository.
   *
   * This function utilizes the GitHub API to retrieve a list of branches where the current
   * HEAD commit (the latest commit on the checked-out branch) is included. This is useful for
   * determining which branches contain the most recent changes.
   *
   * @summary Lists all branches that contain the HEAD commit
   * @returns A promise that resolves to an array of branch names that include the specified commit.
   **/
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("get-commit-heads")
  async getCommitHeads(
    @TypedBody() input: IGithub.IGetCommitHeadInput,
  ): Promise<IGithub.IGetCommitHeadOutput> {
    return this.githubProvider.getCommitHeads(input);
  }

  /**
   * Inquire the commit details of the user
   * It contains all the history of how the file changed, so you can see the details of a single commit node.
   *
   * @summary Inquire the commit details of the user
   * @param input
   * @returns detailed commit history
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @core.TypedRoute.Post("get-my-profile")
  async getMyProfile(
    @TypedBody() input: IGithub.IGetMyProfileInput,
  ): Promise<StrictOmit<IGithub.User, "score">> {
    return this.githubProvider.debugToken(input);
  }
}
