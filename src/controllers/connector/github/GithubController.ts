import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IGithub } from "@wrtn/connector-api/lib/structures/connector/github/IGithub";
import { RouteIcon } from "@wrtnio/decorators";
import { GithubProvider } from "../../../providers/connector/github/GithubProvider";

@Controller("connector/github")
export class GithubController {
  constructor(private readonly githubProvider: GithubProvider) {}

  /**
   * RAG analysis for a particular repo
   *
   * This RAG analysis makes the repository's code all five files and analyzes them, allowing the chatbot to learn more about the repository and deliver more detailed information.
   * This will be useful when users want to analyze the repository.
   *
   * @internal
   * @deprecated The RAG part will add a function so that chatbots can do it themselves
   *
   * @summary Analysis for a github repository
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  // )
  // @ApiTags("Github")
  // @core.TypedRoute.Post("analyze")
  // async analyze(
  //   @TypedBody() input: IGithub.IAnalyzeInput,
  // ): Promise<IRag.IAnalysisOutput> {
  //   return this.githubProvider.analyze(input);
  // }

  /**
   * List events received by the authenticated user
   *
   * These are events that you've received by watching repositories and following users.
   * If you are authenticated as the given user, you will see private events. Otherwise, you'll only see public events.
   * In this case, the "received" event includes the repository that the user is interested in or the activity of the user who is following,
   * for example, if the user has pushed to the repository, or if an issue has been created from the repository that the user is interested in.
   *
   * @summary List events received by the authenticated user
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("users/get-received-events")
  async getReceivedEvents(
    @TypedBody() input: IGithub.IGetReceivedEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    return this.githubProvider.getReceivedEvents(input);
  }

  /**
   * Inquire the user's pinned repositories
   *
   * Inquire up to 6 repositories where the user has pinned.
   * Here, only the name of the repository is searched, so if necessary, find detailed information about the repository by pageing the user's repository list.
   * Placing a pin in a repository is most likely a repository that users are most confident in.
   *
   * @summary Inquire the user's pinned repository names
   * @param input
   * @returns repositories
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("users/get-pinned-repositories")
  async getUserPinnedRepositories(
    @TypedBody() input: IGithub.IGetUserPinnedRepositoryInput,
  ): Promise<IGithub.IGetUserPinnedRepositoryOutput> {
    return this.githubProvider.getUserPinnedRepository(input);
  }

  /**
   * Inquire the user's repositories
   *
   * Since it contains only the simplest information of the repository here, there is no way to know the lead me of the repository or detailed information.
   * It is recommended to use additional connectors to explore because other connectors have the ability to read leads or internal files in the repository.
   *
   * @summary Inquire the user's repositories
   * @param input
   * @returns repositories
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("users/get-repositories")
  async getUserRepositories(
    @TypedBody() input: IGithub.IGetUserRepositoryInput,
  ): Promise<IGithub.IGetUserRepositoryOutput> {
    return this.githubProvider.getUserRepositories(input);
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
   * @summary Lists organization events for the authenticated user
   * @returns A list of events from the organizations the authenticated user is a member of.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("organizations/users/get-events")
  async getUserOrganizationEvents(
    @TypedBody() input: IGithub.IGetOrganizationUserEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const data = await this.githubProvider.getUserOrganizationEvents(input);
    return data;
  }

  /**
   * List organization issues assigned to the authenticated user
   *
   * Similar to the 'get-issues' connector, it is suitable for inquiring only about issues assigned within a specific organization.
   * Naturally, the user will have to be a member of that organization.
   *
   * Here, the result value can be inquired together with PR because PR on GitHub is essentially an issue-like object.
   * If you want to see the issue separately, you should use a connector that looks up the issue in the repo, not the organization.
   *
   * @summary List organization issues assigned to the authenticated user
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("organizations/get-issues")
  async getOrganizationIssues(
    @TypedBody() input: IGithub.IGetOrganizationAuthenticationUserIssueInput,
  ): Promise<IGithub.IGetOrganizationAuthenticationUserIssueOutput> {
    return this.githubProvider.getOrganizationIssues(input);
  }

  /**
   * List organization repositories
   *
   * This endpoint allows you to list all repositories that belong to a specified organization on GitHub.
   * It's useful for viewing all the repositories under an organization’s account, including both public and private repositories, depending on your access level.
   *
   * @summary List organization repositories
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("organizations/get-repositories")
  async getOrganizationRepositories(
    @TypedBody() input: IGithub.IGetOrganizationEventInput,
  ): Promise<IGithub.IGetOrganizationRepositoryOutput> {
    return this.githubProvider.getOrganizationRepositories(input);
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
  @ApiTags("Github")
  @core.TypedRoute.Post("organizations/get-events")
  async getOrganizationEvents(
    @TypedBody() input: IGithub.IGetOrganizationEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const data = await this.githubProvider.getOrganizationEvents(input);
    return data;
  }

  /**
   * List repository collaborators
   *
   * For organization-owned repositories, the list of collaborators includes outside collaborators,
   * organization members that are direct collaborators, organization members with access through team memberships,
   * organization members with access through default organization permissions, and organization owners.
   * Organization members with write, maintain, or admin privileges on the organization-owned repository can use this endpoint.
   * Team members will include the members of child teams.
   *
   * You can refer to it before specifying a person in charge of the issue or a reviewer for PR.
   *
   * @summary List repository collaborators
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repos/get-collaborators")
  async getCollaborators(
    @TypedBody() input: IGithub.IGetCollaboratorInput,
  ): Promise<IGithub.IGetCollaboratorOutput> {
    return this.githubProvider.getCollaborators(input);
  }

  /**
   * Delete file content in github repository
   *
   * To delete file content is the same as creating a single commit.
   * Commit is a hash that must be created in github to save changes, such as uploading, modifying, deleting, and so on.
   *
   * As the sha value of the file to be modified, a conflict may occur if it is not the latest sha value among the sha values of the file.
   * It's safe when you look up a list of files through API to check sha and put in a value, or want to re-modify the sha value of a file you just created.
   *
   * If the user directly asks you to add, modify, or delete a file for a specific PR or specific branch, this connector should be considered.
   * Many repositories are working on commit conventions. Before committing, it's a good idea to look up the commit-list to see how you leave the commit message.
   *
   * @summary Delete file content and commit
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Delete("repos/commits/contents")
  async deleteFileContents(
    @TypedBody() input: IGithub.IDeleteFileContentInput,
  ): Promise<void> {
    const data = await this.githubProvider.deleteFileContents(input);
    return data;
  }

  /**
   * Update file content in github repository
   *
   * Updating file content is the same as creating a single commit.
   * Commit is a hash that must be created in github to save changes, such as uploading, modifying, deleting, and so on.
   *
   * As the sha value of the file to be modified, a conflict may occur if it is not the latest sha value among the sha values of the file.
   * It's safe when you look up a list of files through API to check sha and put in a value, or want to re-modify the sha value of a file you just created.
   *
   * If you modify a file, it's not like appending the code to the file, it's like overwriting the file.
   * Generally, if a user says he wants to modify it, it means that he wants to add the code to a specific file or refact it,
   * so it's right to check the existing code and then change some of the contents to the original to reflect it.
   * In addition, it is recommended to receive confirmation from the user every time about the content and then modify or add it.
   *
   * If the user directly asks you to add, modify, or delete a file for a specific PR or specific branch, this connector should be considered.
   * Many repositories are working on commit conventions. Before committing, it's a good idea to look up the commit-list to see how you leave the commit message.
   *
   * @summary Update File content and commit
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Put("repos/commits/contents")
  async updateFileContents(
    @TypedBody() input: IGithub.IUpdateFileContentInput,
  ): Promise<IGithub.IUpsertFileContentOutput> {
    const data = await this.githubProvider.updateFileContents(input);
    return data;
  }

  /**
   * Create file content in github repository
   *
   * If the file already exists in the same path, you should use the modification API and this connector is only responsible for generation.
   * Creating file content is the same as creating a single commit.
   * Commit is a hash that must be created in github to save changes, such as uploading, modifying, deleting, and so on.
   *
   * If someone says they want to add a file to the repo it's like they want to commit.
   * However, in this case, you should check which branch you want to add the file to, and you should not create it in the default branch if you do not specify the branch.
   * Users value branches that reflect their commitments.
   * In addition, it is recommended to receive confirmation from the user every time about the content and then modify or add it.
   *
   * If the user directly asks you to add, modify, or delete a file for a specific PR or specific branch, this connector should be considered.
   *
   * @summary Create File content and commit
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repos/commits/contents")
  async createFileContents(
    @TypedBody() input: IGithub.ICreateFileContentInput,
  ): Promise<IGithub.IUpsertFileContentOutput> {
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
  @ApiTags("Github")
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
   * Look up repository files(bulk)
   *
   * If the file you want to inquire is a folder, internal files are provided in an array,
   * and if it is a file, it inquires about the encoding method of the file and the body content of the file.
   * Since there may be countless files and folders in the github repository, there may be many files that exceed the rate limit.
   * In this case, you can try to solve this problem by sequentially finding the folders one by one using the corresponding connector.
   * You can pass multiple file paths to view multiple files at the same time.
   * There is no limit to the number of files.
   *
   * This is suitable for viewing files on specific branches, but if the user is for the purpose of viewing details of code reviews or PR, it is recommended to use a different connector.
   * There are connectors that view the list of files changed in PR, or see the changes.
   *
   * @summary Look up repository files(bulk)
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repos/get-contents/bulk")
  async getBulkFileContents(
    @TypedBody() input: IGithub.IGetBulkFileContentInput,
  ): Promise<IGithub.IGetBulkFileContentOutput> {
    return this.githubProvider.getBulkFileContents(input);
  }

  /**
   * Look up repository files
   *
   * If the file you want to inquire is a folder, internal files are provided in an array,
   * and if it is a file, it inquires about the encoding method of the file and the body content of the file.
   * Since there may be countless files and folders in the github repository, there may be many files that exceed the rate limit.
   * In this case, you can try to solve this problem by sequentially finding the folders one by one using the corresponding connector.
   *
   * This is suitable for viewing files on specific branches, but if the user is for the purpose of viewing details of code reviews or PR, it is recommended to use a different connector.
   * There are connectors that view the list of files changed in PR, or see the changes.
   *
   * @summary Look up repository files
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
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
  @ApiTags("Github")
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
  @ApiTags("Github")
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
  @ApiTags("Github")
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
  @ApiTags("Github")
  @core.TypedRoute.Post("users/get-events")
  async getUserEvents(
    @TypedBody() input: IGithub.IGetUserEventInput,
  ): Promise<IGithub.IGetEventOutput> {
    const data = await this.githubProvider.getUserEvents(input);
    return data;
  }

  /**
   * List organizations for a user
   *
   * Look up the user's organization list, but since you can't look up the user's private organization here,
   * you can't really conclude that there isn't an empty array.
   *
   * @summary List organizations for a user
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("users/get-organizations")
  async getUserOrganizations(
    @TypedBody() input: IGithub.IGetUserOrganizationInput,
  ): Promise<IGithub.IGetUserOrganizationOutput> {
    return this.githubProvider.getUserOrganizations(input);
  }

  /**
   * List public events
   *
   * This API is not built to serve real-time use cases. Depending on the time of day, event latency can be anywhere from 30s to 6h.
   * When I look up the events, they may not be of much value to the user because they are events that occurred on github.
   *
   * It's looking up public events, and it's looking at events that occur on github regardless of the specific user.
   * Therefore, it may not be of much use unless it is a special case.
   * If you want to get your information, it would be more advantageous to use the 'user/get-events' connector.
   *
   * @summary List public events.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
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
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/get-activities")
  async getRepositoryActivities(
    @TypedBody() input: IGithub.IGetRepositoryActivityInput,
  ): Promise<IGithub.IGetRepositoryActivityOutput> {
    return this.githubProvider.getRepositoryActivities(input);
  }

  /**
   * Update pull request
   *
   * Use to change the title or body of a PR, or draft status or open-close status.
   * It can also be used for overwriting labels or modifying them.
   * It can also be used to close or reopen pull request.
   *
   * @param input Update pull request
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Put("repositories/pull-requests")
  async updatePullRequest(
    @TypedBody() input: IGithub.IUpdatePullRequestInput,
  ): Promise<IGithub.IUpdatePullRequestOutput> {
    return this.githubProvider.updatePullRequest(input);
  }

  /**
   * Create pull request
   *
   * Creates a pull request from a branch to a particular branch.
   * If the branch has already generated a pull request to the base branch, an error of 422 may occur.
   * This error indicates a collision because only one pull request from branch to another branch can exist open at the same time.
   *
   * If the user wants to see each PR unit, this connector will be suitable.
   *
   * When creating a PR, be sure to specify the base branch and the head branch, and even if it can be omitted, be sure to include Titles and bodies as much as possible.
   * You can also create a pull request in draft state if necessary.
   *
   * In order to create PR, you may need to refer to the PULL_REQUEST_TEMPLATE.md file that you specified in the .github folder in advance, in which case refer to the connector 'POST /connector/github/repos/get-contents'.
   *
   * @param input Create pull request
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/pull-requests")
  async createPullRequest(
    @TypedBody() input: IGithub.ICreatePullRequestInput,
  ): Promise<IGithub.ICreatePullRequestOutput> {
    return this.githubProvider.createPullRequest(input);
  }

  /**
   * List pull request comments
   *
   * You can use the REST API to list comments on issues and pull requests. Every pull request is an issue, but not every issue is a pull request.
   * In any case, you can also view comments with the number on pull request.
   * Issue comments are ordered by ascending ID.
   *
   * This is actually the same as connector POST '/connector/github/repositories/issues/get-comments'.
   * Comments and reviews on PR are separate, you can only see comments on this connector.
   *
   * @summary List pull request comments
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/pull-requests/get-comments")
  async getPullRequestComments(
    @TypedBody() input: IGithub.IGetPullRequestCommentsInput,
  ): Promise<IGithub.IGetIssueCommentsOutput> {
    return this.githubProvider.getPullRequestComments(input);
  }

  /**
   * Create an pull request comment
   *
   * @summary Create an pull request comment
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/pull-requests/comments")
  async createPullRequestComments(
    @TypedBody() input: IGithub.ICreateIssueCommentInput,
  ): Promise<IGithub.ICreateIssueCommentOutput> {
    return this.githubProvider.createIssueComments(input);
  }

  /**
   * Get all requested reviewers
   *
   * Gets the users or teams whose review is requested for a pull request.
   * Once a requested reviewer submits a review, they are no longer considered a requested reviewer.
   * Their review will instead be returned by the List reviews for a pull request operation.
   *
   * The requested_reviewers are the ones who have been asked to review, but not yet.
   * So when you see someone who has reviewed a PR, if that person is someone who has already finished a review, he/she will be part of the reviewers, not the requested_reviewers.
   * Therefore, when you look at a reviewer, you should look at it separately between someone who has not yet reviewed it and one person who has reviewed it, which you should also call other features to see together.
   * Refer to connector `:post /connector/github/repositories/pull-requests/get-reviews`.
   *
   * @summary Get all requested reviewers for a pull request
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/pull-requests/get-requested-reviewers")
  async readPullRequestRequestedReviewers(
    @TypedBody() input: IGithub.IReadPullRequestDetailInput,
  ): Promise<IGithub.IReadPullRequestRequestedReviewerOutput> {
    return this.githubProvider.readPullRequestRequestedReviewers(input);
  }

  /**
   * Removes review requests from a pull request for a given set of users and/or teams
   *
   * You should check the person who has already been requested as a reviewer, i.e., requested_reviewers, and then send out the delete request.
   * Even if you don't do that, there will be no error, but it doesn't mean anything if you delete the person who hasn't been requested as a reviewer.
   *
   * @summary Remove requested reviewers from a pull request
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Delete("repositories/pull-requests/requested-reviewers")
  async removeRequestedReviewers(
    @TypedBody() input: IGithub.IRequestReviewerInput,
  ): Promise<void> {
    return this.githubProvider.removeRequestedReviewers(input);
  }

  /**
   * Request reviewers for a pull request
   *
   * Requests reviews for a pull request from a given set of users and/or teams. This endpoint triggers notifications.
   * You can specify a reviewer by the user's name alone, but not by anyone, so use a connector that looks up collaborators first.
   *
   * @summary Request reviewers for a pull request
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/pull-requests/requested-reviewers")
  async requestReviewers(
    @TypedBody() input: IGithub.IRequestReviewerInput,
  ): Promise<void> {
    return this.githubProvider.requestReviewers(input);
  }

  /**
   * List comments for a pull request review
   *
   * Lists comments for a specific pull request review.
   *
   * @summary List comments for a pull request review
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/pull-requests/reviews/get-comments")
  async readReviewComments(
    @TypedBody() input: IGithub.IGetReviewCommentInput,
  ): Promise<IGithub.IGetReviewCommentOutput> {
    return this.githubProvider.readReviewComments(input);
  }

  /**
   * List reviews for a pull request
   *
   * Pull Request Reviews are groups of pull request review comments on a pull request, grouped together with a state and optional body comment.
   * Lists all reviews for a specified pull request. The list of reviews returns in chronological order.
   * Since github distinguishes requested_reviewers from those who have already completed the review,
   * if you want to see a review for any PR, you should look up both of these connectors.
   *
   * @summary List reviews for a pull request
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/pull-requests/get-reviews")
  async readReviews(
    @TypedBody() input: IGithub.IReadPullRequestReviewInput,
  ): Promise<IGithub.IReadPullRequestReviewOutput> {
    return this.githubProvider.readReviews(input);
  }

  /**
   * Create a review for a pull request
   *
   * Pull request reviews created in the PENDING state are not submitted and therefore do not include the submitted_at property in the response. To create a pending review for a pull request, leave the event parameter blank.
   * The position value equals the number of lines down from the first "@@" hunk header in the file you want to add a comment. The line just below the "@@" line is position 1, the next line is position 2, and so on. The position in the diff continues to increase through lines of whitespace and additional hunks until the beginning of a new file.
   *
   * @summary Create a review for a pull request
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/pull-requests/reviews")
  async reviewPullRequest(
    @TypedBody() input: IGithub.IReviewPullRequestInput,
  ): Promise<IGithub.IReviewPullRequestOutput> {
    return this.githubProvider.reviewPullRequest(input);
  }

  /**
   * List pull requests files
   *
   * This is useful to see what files are contained in that PR.
   * Each file's patch contains the entire format of the file.
   * However, if you want to know the changes, you should look up diff, which is implemented with a different connector, so you'd better refer to it.
   *
   * If the user wants to see each PR unit, this connector will be suitable.
   *
   * @summary List pull requests files
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/pull-requests/get-files")
  async readPullRequestFiles(
    @TypedBody() input: IGithub.IReadPullRequestFileInput,
  ): Promise<IGithub.IReadPullRequestFileOutput> {
    return this.githubProvider.readPullRequestFiles(input);
  }

  /**
   * List commits on a pull request
   *
   * Lists a maximum of 250 commits for a pull request.
   * To receive a complete commit list for pull requests with more than 250 commits, use the List commits endpoint.
   *
   * If the user wants to see each PR unit, this connector will be suitable.
   *
   * @sumary List commits on a pull request
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/pull-requests/get-commits")
  async readPullRequestCommits(
    @TypedBody() input: IGithub.IReadPullRequestCommitInput,
  ): Promise<IGithub.IReadPullRequestCommitOutput> {
    return this.githubProvider.readPullRequestCommits(input);
  }

  /**
   * Get a diff of pull-request info
   *
   * This is the same as PR's ability to query files,
   * but the format that this function returns is a string, which is more suitable for identifying changes to each file than viewing each file object,
   * and in github, this is called the application/vnd.github.diff format.
   * This helps you see at a glance what codes have disappeared and been added in a form suitable for code review.
   *
   * If the user wants to see each PR unit, this connector will be suitable.
   *
   * If there are too many changes, the connector can export a 406 error.
   * In this case, it may be difficult to determine each change, but it is recommended to use the List pull requests connector.
   *
   * @summary Get a diff of pull request
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/pull-requests/get-diff")
  async readPullRequestDiff(
    @TypedBody() input: IGithub.IReadPullRequestDetailInput,
  ): Promise<string> {
    return this.githubProvider.readPullRequestDiff(input);
  }

  /**
   * Get a deatiled pull-request info
   *
   * You can view detailed PR information using the PR number.
   * Here, you can see the branch to be merged and the information on the branch it points to, and you can see information such as the status of the PR, the time of each state, and the person who created the PR.
   * However, it should be used with other connectors because it provides information close to the header of PR and does not provide information about each file or commit of PR.
   *
   * If the user wants to see each PR unit, this connector will be suitable.
   *
   * @summary Get a pull request
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/pull-requests/get-detail")
  async readPullRequestDetail(
    @TypedBody() input: IGithub.IReadPullRequestDetailInput,
  ): Promise<IGithub.IReadPullRequestDetailOutput> {
    return this.githubProvider.readPullRequestDetail(input);
  }

  /**
   * List repository pull requests
   *
   * Query pool requests to specific repositories.
   * Here, you can filter issues and see only pool requests, and you can sort them by creation and inquiry dates, or filter by open or closed status.
   * The content of the body is omitted, so if you want to see it, you should use the detailed lookup connector.
   * If the user wants to see the body property, '/connector/github/repositories/pull-requests/get-detail' connector must be called.
   *
   * @summary Get Repository' pull request
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/get-pull-requests")
  async getRepositoryPullRequest(
    @TypedBody() input: IGithub.IFetchRepositoryPullRequestInput,
  ): Promise<IGithub.IFetchRepositoryPullRequestOutput> {
    return this.githubProvider.getRepositoryPullRequest(input);
  }

  /**
   * Get a deatiled issue info
   *
   * Unlike the body omitted from the issue list inquiry, it is suitable for viewing details as it can inquire all the contents.
   * However, this connector alone cannot see all the comments or timelines inside, and other connectors must be used.
   *
   * @summary Get a issue
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/issues/get-detail")
  async getIssueDetail(
    @TypedBody() input: IGithub.IGetIssueDetailInput,
  ): Promise<IGithub.IGetIssueDetailOutput> {
    return this.githubProvider.getIssueDetail(input);
  }

  /**
   * List issue comments
   *
   * You can use the REST API to list comments on issues and pull requests. Every pull request is an issue, but not every issue is a pull request.
   * In any case, you can also view comments with the number on pull request.
   * Issue comments are ordered by ascending ID.
   *
   * @summary List issue comments
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/issues/get-comments")
  async getIssueComments(
    @TypedBody() input: IGithub.IGetIssueCommentsInput,
  ): Promise<IGithub.IGetIssueCommentsOutput> {
    return this.githubProvider.getIssueComments(input);
  }

  /**
   * Create an issue comment
   *
   * Add a comment. If you put an issue number, you can add a comment to the issue, where the issue number is also the number of PR.
   * In other words, both issue and PR can add a comment through this connector.
   *
   * @summary Create an issue comment
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/issues/comments")
  async createIssueComments(
    @TypedBody() input: IGithub.ICreateIssueCommentInput,
  ): Promise<IGithub.ICreateIssueCommentOutput> {
    return this.githubProvider.createIssueComments(input);
  }

  /**
   * List repository issues
   *
   * List issues in a repository.
   * This connector is perfect if you want to see the issue of the repository because it can be viewed without being authenticated.
   * Information on the issue comes out, but only 10 people and labels attached to the issue are provided.
   * Therefore, if you want more detailed information, it's a good idea to look at it with a connector that looks at the details of the issue.
   * When looking up an issue, you can view open and closed issues and sort them by creation time, correction time, comment count, and reaction count.
   * For more information, you should check the properties part of the request type.
   *
   * The content of the body is omitted, so if you want to see it, you should use the detailed lookup connector.
   * If the user wants to see the body property, '/connector/github/repositories/issues/get-detail' connector must be called.
   *
   * @summary List repository issues
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("repositories/get-issues")
  async getRepositoryIssues(
    @TypedBody() input: IGithub.IFetchRepositoryInput,
  ): Promise<IGithub.IFetchRepositoryOutput> {
    return this.githubProvider.fetchRepositoryIssues(input);
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
  @ApiTags("Github")
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
  @ApiTags("Github")
  @core.TypedRoute.Post("get-user-profile")
  async getUserProfile(
    @TypedBody() input: IGithub.IGetUserProfileInput,
  ): Promise<IGithub.IGetUserProfileOutput> {
    return this.githubProvider.getUserProfile(input);
  }

  /**
   * List organizations for the authenticated user
   *
   * Inquire the user's repository.
   * Here, the user is an authenticated user, which means a user of that token.
   * If a user does not select an organization at login or ask the organization's admin to link it,
   * the resource might not be viewed even if the token scope has permissions.
   *
   * @summary List organizations for the authenticated user
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("get-organizations")
  async getAuthenticatedUserOrganizations(
    @TypedBody() input: IGithub.IGetAuthenticatedUserOrganizationInput,
  ): Promise<IGithub.IGetAuthenticatedUserOrganizationOutput> {
    return this.githubProvider.getAuthenticatedUserOrganizations(input);
  }

  /**
   * Inquire the user's branch
   * You can look up a list of branches in a specific repository.
   * Because it says what the last commit is, and when and to whom it was made,
   * you can see which of the branches is the latest and managed.
   *
   * You shouldn't call the main branch arbitrarily because there may be people who use the master branch.
   *
   * @summary Inquire the user's branch
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("get-branches")
  async getRepositoryBranches(
    @TypedBody() input: IGithub.IGetBranchInput,
  ): Promise<IGithub.IGetBranchOutput> {
    return this.githubProvider.getRepositoryBranches(input);
  }

  /**
   * Create branch
   *
   * Creates a reference for your repository. You are unable to create new references for empty repositories, even if the commit SHA-1 hash used exists. Empty repositories are repositories without branches.
   * You need to know the sha of the commit, so if you want to create a branch, you should first call another connector that looks up the commit list or header commitments to find out the sha value.
   * If you want to copy the branch, you should also look up the commit history of the branch and then retrieve the sha value from the branch's HEAD commit.
   *
   * @summary Create branch
   * @param input
   * @returns
   */
  @ApiTags("Github")
  @core.TypedRoute.Post("branches")
  async createBranches(
    @TypedBody() input: IGithub.ICreateBranchInput,
  ): Promise<IGithub.ICreateBranchOutput> {
    return this.githubProvider.createBranches(input);
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
  @ApiTags("Github")
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
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("get-commit-heads")
  async getCommitHeads(
    @TypedBody() input: IGithub.IGetCommitHeadInput,
  ): Promise<IGithub.IGetCommitHeadOutput> {
    return this.githubProvider.getCommitHeads(input);
  }

  /**
   * Inquire the commit details of the user
   * It contains all the history of how the file changed, so you can see the details of a single commit node.
   * If you do not deliver ref, look up based on default_branch.
   *
   * @summary Inquire the commit details of the user
   * @param input
   * @returns detailed commit history
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("get-commit")
  async getCommit(
    @TypedBody() input: IGithub.IGetCommitInput,
  ): Promise<IGithub.IGetCommitOutput> {
    return this.githubProvider.getCommit(input);
  }

  /**
   * Inquire the commit diff of the user
   * diff is Github's own content type specification that allows you to identify changes per commit on the Github homepage.
   * If you do not deliver ref, look up based on default_branch.
   *
   * @summary Inquire the commit diff of the user
   * @param input
   * @returns commit diff
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("get-commit-diff")
  async getCommitDiff(
    @TypedBody() input: IGithub.IGetCommitInput,
  ): Promise<string> {
    return this.githubProvider.getCommitDiff(input);
  }

  /**
   * Look up the list of commitments for a specific repo, a specific branch
   *
   * This function can be used in general because it sees the commit list in units of branches, but if the user wants to see it in units of PR, it is better to use another connector.
   * If the user specifies to view in PR units, use other connectors because there are connectors for viewing files, commit lists, and changes in PR units elsewhere.
   *
   * @summary Look up the list of commitments for a specific repo, a specific branch
   * @param input
   * @returns list of commit
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("get-commit-list")
  async getCommitList(
    @TypedBody() input: IGithub.IGetCommitListInput,
  ): Promise<IGithub.IGetCommitListOutput> {
    return this.githubProvider.getCommitList(input);
  }

  /**
   * Inquire the followers of the user
   *
   * This value can be viewed by about 100 people at a time because it is a page-nated result.
   * If you have someone you're looking for, it's important to keep looking for the next page, even if you haven't found the value on the first page.
   *
   * @summary Inquire the followers of the user
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("get-followers")
  async getFollowers(
    @TypedBody() input: IGithub.IGetFollowerInput,
  ): Promise<IGithub.IGetFollowerOutput> {
    return this.githubProvider.getFollowers(input);
  }

  /**
   * Inquire the followees of the user
   *
   * This value can be viewed by about 100 people at a time because it is a page-nated result.
   * If you have someone you're looking for, it's important to keep looking for the next page, even if you haven't found the value on the first page.
   *
   * @summary Inquire the followees of the user
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("get-followees")
  async getFollowees(
    @TypedBody() input: IGithub.IGetFolloweeInput,
  ): Promise<IGithub.IGetFolloweeOutput> {
    return this.githubProvider.getFollowees(input);
  }

  /**
   * List labels for a repository
   *
   * View a list of issues created and used in that repository.
   * Each issue will only have labels that are already registered in this repository.
   * Of course, it doesn't necessarily mean that you have to use only the labels here when creating issues,
   * but it would be beneficial to assign them by referring to the labels here.
   *
   * @summary List labels for a repository
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("get-labels")
  async getLabels(
    @TypedBody() input: IGithub.IGetLabelInput,
  ): Promise<IGithub.IGetLabelOutput> {
    return this.githubProvider.getLabels(input);
  }

  /**
   * Update an issue in the repository
   *
   * Update an issue, where you can enter labels and assignes together.
   * The information you must enter is who will create the issue in the owner's repository and under what title.
   * The information in the text should follow the markdown grammar allowed by github.
   *
   * In some cases, if you are not the owner of this repository, you may not be able to make any marking on issues such as labels, assignees, milestones, etc.
   * It can also be used to close or reopen issues.
   *
   * @summary Update an issue
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Patch("issues")
  async updateIssue(
    @TypedBody() input: IGithub.IUpdateIssueInput,
  ): Promise<IGithub.IUpdateIssueOutput> {
    return this.githubProvider.updateIssue(input);
  }

  /**
   * Leave an issue in the repository
   *
   * Create an issue, where you can enter labels and assignes together.
   * The information you must enter is who will create the issue in the owner's repository and under what title.
   * The information in the text should follow the markdown grammar allowed by github.
   *
   * In some cases, if you are not the owner of this repository, you may not be able to make any marking on issues such as labels, assignees, milestones, etc.
   *
   * In order to create issue, you may need to refer to the issue template files that you specified in the .github folder in advance, in which case refer to the connector 'POST /connector/github/repos/get-contents'.
   *
   * @summary Create an issue
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/github.svg",
  )
  @ApiTags("Github")
  @core.TypedRoute.Post("issues")
  async createIssue(
    @TypedBody() input: IGithub.ICreateIssueInput,
  ): Promise<IGithub.ICreateIssueOutput> {
    return this.githubProvider.createIssue(input);
  }

  /**
   * @internal
   */
  @ApiTags("Github")
  @core.TypedRoute.Post("upload")
  async upload(@TypedBody() input: IGithub.UploadFileInput): Promise<string> {
    return await this.githubProvider.upload(input.files, input.key);
  }
}
