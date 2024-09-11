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
   * @summary delete comment
   * @param input
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Delete("issues/comments")
  async deleteComment(
    @TypedBody()
    input: StrictOmit<IJira.IDeleteCommentInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<void> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.deleteComment({ ...input, ...authorization });
  }

  /**
   * modify comment
   *
   * Modify the comment. You can only modify the body of the comment here.
   *
   * @summary modify comment body
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Put("issues/comments")
  async updateComment(
    @TypedBody()
    input: StrictOmit<IJira.IUpdateCommentInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<void> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.updateComment({ ...input, ...authorization });
  }

  /**
   * Creates a comment on an issue
   * Here, user can write the body of the comment you want to write with the ID or key of the issue.
   *
   * @summary creates a comment on an issue
   * @param input condition of creation
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Post("issues/comments")
  async createComment(
    @TypedBody()
    input: StrictOmit<IJira.ICreateCommentInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<IJira.ICreateCommentOutput> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
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
   * @summary get comments by issue id or key
   * @param input issue id or key
   * @returns comments of this issue
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Post("issues/get-comments")
  async getComments(
    @TypedBody()
    input: StrictOmit<IJira.IGetCommentInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetCommentOutput> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.getComments({ ...input, ...authorization });
  }

  /**
   * Inquire the transition of an issue, which is an edge on a workflow that allows you to change the status of an issue
   * If the person who designed the workflow for the project defined three states that could be moved from the current state, there would be three edges.
   * In Jira, just because there is a status that can be viewed in a project or issue does not mean that you can change the status unconditionally.
   * When designing an edge, for example, you can also design an issue in the 'backoff' state to go through the 'in progress' state once.
   * In this case, you need to move two edges to turn the backoff issue into 'done'.
   *
   *
   * @summary Inquire the transition of an issue
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Post("issues/get-transitions")
  async getTransitions(
    @TypedBody()
    input: StrictOmit<IJira.IGetTransitionInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetTransitionOutput> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.getTransitions({ ...input, ...authorization });
  }

  /**
   * Unassign the assignee from the Jira issue
   *
   * @symmary Unaasign the assignee
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Delete("issues/asignee")
  async unassign(
    @TypedBody()
    input: StrictOmit<IJira.IUnAssignInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<void> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.unassign({ ...input, ...authorization });
  }

  /**
   * Assign the assignee from the Jira issue
   *
   * @summary assign the assignee
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Put("issues/asignee")
  async assign(
    @TypedBody()
    input: StrictOmit<IJira.IAssignInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<void> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.assign({ ...input, ...authorization });
  }

  /**
   * Change issue status
   *
   * Changing the status of an issue must be done after inquiring about changeable Transitions from the current issue.
   * This is forced by the person who designed the workflow in the project, so you must change the status in the order set.
   *
   * @summary change issue status
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Put("issues/status")
  async updateIssueStatus(
    @TypedBody()
    input: StrictOmit<IJira.IUpdateStatusInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<void> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
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
   * @summary update issue in jira
   * @param id issue id to update
   * @param input fields to update
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Put("issues/:id")
  async updateIssue(
    @TypedParam("id") id: IJira.Issue["id"],
    @TypedBody()
    input: StrictOmit<IJira.IUpdateIssueInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<void> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.updateIssue(id, { ...input, ...authorization });
  }

  /**
   * Create an issue by markdown
   *
   * Issue type, project, and summary are essential properties.
   * If you don't know the issue type or priority type's id for generating the issue, you can look it up through other connectors.
   *
   * In order to write the body of an issue, you must create the body as if you were assembling several blocks.
   * There are pre-designated content types, so please check this type information carefully.
   *
   * @summary create issue by markdown in jira
   * @param input issue information to create
   * @returns id and key of created issue
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Post("issues/markdown")
  async createIssueByMarkdown(
    @TypedBody() input: IJira.ICreateIssueByMarkdownInput,
  ): Promise<IJira.ICreateIssueOutput> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.createIssueByMarkdown({
      ...input,
      ...authorization,
    });
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
   * @summary create issue in jira
   * @param input issue information to create
   * @returns id and key of created issue
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Post("issues")
  async createIssue(
    @TypedBody() input: IJira.ICreateIssueInputWithBasicAuth,
  ): Promise<IJira.ICreateIssueOutput> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
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
   * @summary get detailed Issue Information
   * @param input
   * @returns Detailed Issue Information
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
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
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.getIssueDetail({ ...input, ...authorization });
  }

  /**
   * Find Jira issues
   *
   * In order to inquire about any issues within the project, you must first inquire about the project and find out the key of the project.
   *
   * @summary Find The Jira issues.
   * @param input condition of request
   * @returns paginated list of issues visible to the user
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
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
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
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
   * @summary Find the Jira projects.
   * @param input condition of request
   * @returns paginated list of projects visible to the user
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
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
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.getProjects({ ...input, ...authorization });
  }

  /**
   * Find issue labels
   *
   * @summary Find issue labels
   * @param input
   * @returns paginated list of labels
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Post("get-issue-labels")
  async getIssueLabels(
    @TypedBody()
    input: StrictOmit<IJira.IGetIssueLabelInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetIssueLabelOutput> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
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
   * @summary Find issue types
   * @param input
   * @returns issue types
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @core.TypedRoute.Post("get-issue-types")
  async getIssueTypes(
    @TypedBody()
    input: StrictOmit<IJira.IGetIssueTypeInput, "domain" | "email" | "token"> &
      IJira.IBasicSecret,
  ): Promise<IJira.IGetIssueTypeOutput> {
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.getIssueTypes({ ...input, ...authorization });
  }

  /**
   * Find issue statuses for searching issue
   *
   * @summary Find issue statuses
   * @param input
   * @returns issue statuses
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
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
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.getIssueStatuses({ ...input, ...authorization });
  }

  /**
   * There are five priorities: 'Highest', 'High', 'Medium', 'Low', and 'Lowest'.
   * Therefore, it can be used as an enum value without requesting this API,
   * and this API is already deprecated on the Jira REST API document.
   * However, for projects that can already be specified by creating a priority level, this connector is added just in case.
   *
   * @summary Inquire the priority levels that can be assigned to the issue.
   * @param input
   * @returns issue priorities
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
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
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.getIssuePriorities({ ...input, ...authorization });
  }

  /**
   * Find a person within the issue who can be assigned as assignee.
   *
   * @summary Find assignable users in issue
   * @param input
   * @returns assignable users
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
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
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.getUsersAssignableInIssue({
      ...input,
      ...authorization,
    });
  }

  /**
   * Find a person within the project who can be assigned as assignee.
   *
   * @summary Find assignable users in project
   * @param input
   * @returns assignable users
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
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
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.getUsersAssignableInProject({
      ...input,
      ...authorization,
    });
  }

  /**
   * Get status categories
   *
   * @summary get status categories
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
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
    const secretValue = await this.jiraProvider.getToken(input.secretKey);
    const authorization = this.jiraProvider.parseSecretKey({
      secretKey: secretValue,
    });
    return this.jiraProvider.getStatusCategories({
      ...input,
      ...authorization,
    });
  }
}
