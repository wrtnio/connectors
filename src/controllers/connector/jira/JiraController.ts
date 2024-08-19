import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import type { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import { RouteIcon } from "@wrtnio/decorators";
import { JiraProvider } from "../../../providers/connector/jira/JiraProvider";
import { StrictOmit } from "../../../utils/strictOmit";

@Controller("connector/jira")
export class JiraController {
  constructor(private readonly jiraProvider: JiraProvider) {}

  /**
   * Delete the comment
   *
   * Delete the comments on the issue.
   * In order to delete the comments on the issue, you need the issue ID or key and the ID of the comment to be deleted.
   * Please be careful because deleted comments will not be able to be viewed again.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary delete comment
   * @param input
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Delete("issues/comments")
  async deleteComment(
    @TypedBody()
    input: StrictOmit<IJira.IDeleteCommentInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<void> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.deleteComment({ ...input, ...authorization });
  }

  /**
   * modify comment
   *
   * Modify the comment. You can only modify the body of the comment here.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary modify comment body
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Put("issues/comments")
  async updateComment(
    @TypedBody()
    input: StrictOmit<IJira.IUpdateCommentInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<void> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.updateComment({ ...input, ...authorization });
  }

  /**
   * Creates a comment on an issue
   * Here, user can write the body of the comment you want to write with the ID or key of the issue.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary creates a comment on an issue
   * @param input condition of creation
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("issues/comments")
  async createComment(
    @TypedBody()
    input: StrictOmit<IJira.ICreateCommentInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<IJira.ICreateCommentOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.createComment({ ...input, ...authorization });
  }

  /**
   * Get comments by issue id or key
   *
   * This connector uses the issue's key or ID value to query the comments written on the issue.
   * Comments are also visible when looking up issues,
   * but not all comments inside are visible,
   * so user have to use this connector to look up them in pagination.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary get comments by issue id or key
   * @param input issue id or key
   * @returns comments of this issue
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("issues/get-comments")
  async getComments(
    @TypedBody()
    input: StrictOmit<IJira.IGetCommentInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetCommentOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.getComments({ ...input, ...authorization });
  }

  /**
   * Inquire the transition of an issue, which is an edge on a workflow that allows you to change the status of an issue
   * If the person who designed the workflow for the project defined three states that could be moved from the current state, there would be three edges.
   * In Jira, just because there is a status that can be viewed in a project or issue does not mean that you can change the status unconditionally.
   * When designing an edge, for example, you can also design an issue in the 'backoff' state to go through the 'in progress' state once.
   * In this case, you need to move two edges to turn the backoff issue into 'done'.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   *
   * @summary Inquire the transition of an issue
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("issues/get-transitions")
  async getTransitions(
    @TypedBody()
    input: StrictOmit<IJira.IGetTransitionInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetTransitionOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.getTransitions({ ...input, ...authorization });
  }

  /**
   * Unassign the assignee from the Jira issue
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @symmary Unaasign the assignee
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Delete("issues/asignee")
  async unassign(
    @TypedBody()
    input: StrictOmit<IJira.IUnAssignInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<void> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.unassign({ ...input, ...authorization });
  }

  /**
   * Assign the assignee from the Jira issue
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary assign the assignee
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Put("issues/asignee")
  async assign(
    @TypedBody()
    input: StrictOmit<IJira.IAssignInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<void> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.assign({ ...input, ...authorization });
  }

  /**
   * Change issue status
   *
   * Changing the status of an issue must be done after inquiring about changeable Transitions from the current issue.
   * This is forced by the person who designed the workflow in the project, so you must change the status in the order set.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary change issue status
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Put("issues/status")
  async updateIssueStatus(
    @TypedBody()
    input: StrictOmit<IJira.IUpdateStatusInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<void> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.updateIssueStatus({ ...input, ...authorization });
  }

  /**
   * Update an issue
   *
   * You can modify any element in the field.
   * It can be used to modify the issue type, person in charge, summary, and description.
   *
   * In order to write the body of an issue, you must create the body as if you were assembling several blocks.
   * There are pre-designated content types, so please check this type information carefully.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary update issue in jira
   * @param id issue id to update
   * @param input fields to update
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Put("issues/:id")
  async updateIssue(
    @TypedParam("id") id: IJira.Issue["id"],
    @TypedBody()
    input: StrictOmit<IJira.IUpdateIssueInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<void> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.updateIssue(id, { ...input, ...authorization });
  }

  /**
   * Create an issue
   *
   * Issue type, project, and summary are essential properties.
   * If you don't know the issue type or priority type's id for generating the issue, you can look it up through other connectors.
   *
   * In order to write the body of an issue, you must create the body as if you were assembling several blocks.
   * There are pre-designated content types, so please check this type information carefully.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary create issue in jira
   * @param input issue information to create
   * @returns id and key of created issue
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("issues")
  async createIssue(
    @TypedBody()
    input: StrictOmit<IJira.ICreateIssueInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<IJira.ICreateIssueOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.createIssue({ ...input, ...authorization });
  }

  /**
   * Get detailed issue information
   *
   * Provides more accurate and detailed information, including the title and body of the issue
   *
   * It can be used to look up the issue list first, or if you already know the key or ID of the issue.
   * If you do not know the key or ID, it is recommended to use the issue inquiry connector first.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary get detailed Issue Information
   * @param input
   * @returns Detailed Issue Information
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("get-issue-detail")
  async getIssueDetail(
    @TypedBody()
    input: StrictOmit<
      IJira.IGetIssueDetailInput,
      "domain" | "email" | "token"
    > &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetIssueDetailOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.getIssueDetail({ ...input, ...authorization });
  }

  /**
   * Find Jira issues
   *
   * In order to inquire about any issues within the project, you must first inquire about the project and find out the key of the project.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary Find The Jira issues.
   * @param input condition of request
   * @returns paginated list of issues visible to the user
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("get-issues")
  async getIssues(
    @TypedBody()
    input: StrictOmit<
      IJira.IGetIssueInputByBasicAuth,
      "domain" | "email" | "token"
    > &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetIssueOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.getIssues({ ...input, ...authorization });
  }

  /**
   * Find the Jira projects
   *
   * The Jira project has a unique key and can then be used to query issues with the key.
   * Returns a paginated list of projects visible to the user.
   *
   * In order to inquire about any issues within the project, you must first inquire about the project and find out the key of the project.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary Find the Jira projects.
   * @param input condition of request
   * @returns paginated list of projects visible to the user
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("get-projects")
  async getProjects(
    @TypedBody()
    input: StrictOmit<
      IJira.IGetProjectInputByBasicAuth,
      "domain" | "email" | "token"
    > &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetProjectOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.getProjects({ ...input, ...authorization });
  }

  /**
   * Find issue labels
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary Find issue labels
   * @param input
   * @returns paginated list of labels
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("get-issue-labels")
  async getIssueLabels(
    @TypedBody()
    input: StrictOmit<IJira.IGetIssueLabelInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetIssueLabelOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.getIssueLabels({ ...input, ...authorization });
  }

  /**
   * Find issue types
   *
   * In order for the user to inquire about the issue type, the ID of the project is required.
   * If the user mentioned the key or name of the project,
   * it is necessary to first inquire the project and get the correct project ID.
   * The ID of the project is a numeric character type.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary Find issue types
   * @param input
   * @returns issue types
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("get-issue-types")
  async getIssueTypes(
    @TypedBody()
    input: StrictOmit<IJira.IGetIssueTypeInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetIssueTypeOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.getIssueTypes({ ...input, ...authorization });
  }

  /**
   * Find issue statuses for searching issue
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary Find issue statuses
   * @param input
   * @returns issue statuses
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("get-issue-statuses")
  async getIssueStatus(
    @TypedBody()
    input: StrictOmit<
      IJira.IGetIssueStatusInput,
      "domain" | "email" | "token"
    > &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetIssueStatusOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.getIssueStatuses({ ...input, ...authorization });
  }

  /**
   * There are five priorities: 'Highest', 'High', 'Medium', 'Low', and 'Lowest'.
   * Therefore, it can be used as an enum value without requesting this API,
   * and this API is already deprecated on the Jira REST API document.
   * However, for projects that can already be specified by creating a priority level, this connector is added just in case.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary Inquire the priority levels that can be assigned to the issue.
   * @param input
   * @returns issue priorities
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("get-issue-priorities")
  async getIssuePriorities(
    @TypedBody()
    input: StrictOmit<
      IJira.IGetIssuePriorityInput,
      "domain" | "email" | "token"
    > &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetIssuePriorityOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.getIssuePriorities({ ...input, ...authorization });
  }

  /**
   * Find a person within the issue who can be assigned as assignee.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary Find assignable users in issue
   * @param input
   * @returns assignable users
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("issues/get-users-assignable")
  async getUsersAssignableInIssue(
    @TypedBody()
    input: StrictOmit<
      IJira.IGetIssueAssignableInput,
      "domain" | "email" | "token"
    > &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetIssueAssignableOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.getUsersAssignableInIssue({
      ...input,
      ...authorization,
    });
  }

  /**
   * Find a person within the project who can be assigned as assignee.
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary Find assignable users in project
   * @param input
   * @returns assignable users
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("projects/get-users-assignable")
  async getUsersAssignableInProject(
    @TypedBody()
    input: StrictOmit<
      IJira.IGetProjectAssignableInput,
      "domain" | "email" | "token"
    > &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetProjectAssignableOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.getUsersAssignableInProject({
      ...input,
      ...authorization,
    });
  }

  /**
   * Get status categories
   *
   * This always requires the user's email address and api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   * Users may not know that they need to hand over these credentials to use Jira APIs.
   * This information cannot be resolved by adding any value, so you should be able to ask directly and get it from the user.
   *
   * @summary get status categories
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("get-status-categories")
  async getStatusCategories(
    @TypedBody()
    input: StrictOmit<
      IJira.IGetStatusCategoryInput,
      "domain" | "email" | "token"
    > &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetStatusCategoryOutput> {
    const authorization = this.jiraProvider.parseSecretKey(input);
    return this.jiraProvider.getStatusCategories({
      ...input,
      ...authorization,
    });
  }
}
