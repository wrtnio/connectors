import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import { RouteIcon } from "@wrtnio/decorators";
import { JiraProvider } from "../../../providers/connector/jira/JiraProvider";

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
  @ApiTags("Jira")
  @core.TypedRoute.Delete("issues/comments")
  async deleteComment(
    @TypedBody() input: IJira.IDeleteCommentInput,
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
   * To create comment in issue, Just write markdown string format contents.
   *
   * @summary modify comment body
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @ApiTags("Jira")
  @core.TypedRoute.Put("issues/comments/markdown")
  async updateComment(
    @TypedBody() input: IJira.IUpdateCommentByMarkdownInput,
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
  @ApiTags("Jira")
  @core.TypedRoute.Post("issues/comments/markdown")
  async createComment(
    @TypedBody() input: IJira.ICreateCommentByMarkdownInput,
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
  @ApiTags("Jira")
  @core.TypedRoute.Patch("issues/get-comments")
  async getComments(
    @TypedBody() input: IJira.IGetCommentInput,
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
   * @summary Inquire the transition of an issue
   * @param input
   * @returns
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @ApiTags("Jira")
  @core.TypedRoute.Patch("issues/get-transitions")
  async getTransitions(
    @TypedBody() input: IJira.IGetTransitionInput,
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
  @ApiTags("Jira")
  @core.TypedRoute.Delete("issues/asignee")
  async unassign(@TypedBody() input: IJira.IUnAssignInput): Promise<void> {
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
  @ApiTags("Jira")
  @core.TypedRoute.Put("issues/asignee")
  async assign(@TypedBody() input: IJira.IAssignInput): Promise<void> {
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
  @ApiTags("Jira")
  @core.TypedRoute.Put("issues/status")
  async updateIssueStatus(
    @TypedBody() input: IJira.IUpdateStatusInput,
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
  @ApiTags("Jira")
  @core.TypedRoute.Put("issues/:id")
  async updateIssue(
    @TypedParam("id") id: IJira.Issue["id"],
    @TypedBody() input: IJira.IUpdateIssueInput,
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
   * To prioritize, make sure that the project manager has set it up so that the project can be prioritized.
   * Depending on the project settings, it may not be possible to prioritize issues.
   * If there is an error when creating an issue, I recommend that you remove the priority and recreate it.
   * Even if a user wants to assign Assignees, they will need to check if Assignees exists.
   * A user cannot assign a user to Assignees that does not exist.
   * Assignees cannot be guaranteed to be the same nickname or ID as Slack or any other service name.
   * Be sure to check how the name is defined within the Jira service.
   * The issue type, project ID, and key are all the same.
   * If the error continues, first create a basic issue type using only the project key, ID, and text content,
   * and then try updating the person in charge or priorities one by one.
   * That way, you can create an issue and suggest that users check the issue with a link.
   * The content of the proposal will include asking you to check whether assignee or priorities are really allocable attributes.
   *
   * @summary create issue by markdown in jira
   * @param input issue information to create
   * @returns id and key of created issue
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/JIraCloud_full.svg`,
  )
  @ApiTags("Jira")
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
  @ApiTags("Jira")
  @core.TypedRoute.Patch("get-issue-detail")
  async getIssueDetail(
    @TypedBody() input: IJira.IGetIssueDetailInput,
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
  @ApiTags("Jira")
  @core.TypedRoute.Patch("get-issues")
  async getIssues(
    @TypedBody()
    input: IJira.IGetIssueInputByBasicAuth,
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
  @ApiTags("Jira")
  @core.TypedRoute.Patch("get-projects")
  async getProjects(
    @TypedBody()
    input: IJira.IGetProjectInputByBasicAuth,
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
  @ApiTags("Jira")
  @core.TypedRoute.Patch("get-issue-labels")
  async getIssueLabels(
    @TypedBody() input: IJira.IGetIssueLabelInput,
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
  @ApiTags("Jira")
  @core.TypedRoute.Patch("get-issue-types")
  async getIssueTypes(
    @TypedBody() input: IJira.IGetIssueTypeInput,
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
  @ApiTags("Jira")
  @core.TypedRoute.Patch("get-issue-statuses")
  async getIssueStatus(
    @TypedBody() input: IJira.IGetIssueStatusInput,
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
  @ApiTags("Jira")
  @core.TypedRoute.Patch("get-issue-priorities")
  async getIssuePriorities(
    @TypedBody() input: IJira.IGetIssuePriorityInput,
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
  @ApiTags("Jira")
  @core.TypedRoute.Patch("issues/get-users-assignable")
  async getUsersAssignableInIssue(
    @TypedBody() input: IJira.IGetIssueAssignableInput,
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
  @ApiTags("Jira")
  @core.TypedRoute.Patch("projects/get-users-assignable")
  async getUsersAssignableInProject(
    @TypedBody() input: IJira.IGetProjectAssignableInput,
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
  @ApiTags("Jira")
  @core.TypedRoute.Patch("get-status-categories")
  async getStatusCategories(
    @TypedBody() input: IJira.IGetStatusCategoryInput,
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
