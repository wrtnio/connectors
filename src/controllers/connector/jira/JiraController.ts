import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import type { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import { RouteIcon } from "@wrtnio/decorators";
import { JiraProvider } from "../../../providers/connector/jira/JiraProvider";

@Controller("connector/jira")
export class JiraController {
  constructor(private readonly jiraProvider: JiraProvider) {}

  /**
   * Create an issue.
   * Issue type, project, and summary are essential properties.
   * If you don't know the issue type or priority type for generating the issue, you can look it up through other connectors.
   * In order to write the body of an issue,
   * you must create the body as if you were assembling several blocks.
   * There are pre-designated content types,
   * so please check this type information carefully.
   *
   * This always requires the user's api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   *
   * @summary create issue in jira
   * @param input issue information to create
   * @returns id and key of created issue
   */
  @core.TypedRoute.Post("issues")
  async createIssue(
    @TypedBody() input: IJira.ICreateIssueInput,
  ): Promise<IJira.ICreateIssueOutput> {
    return this.jiraProvider.createIssue(input);
  }

  /**
   * Provides more accurate and detailed information, including the title and body of the issue
   *
   * It can be used to look up the issue list first, or if you already know the key or ID of the issue.
   * If you do not know the key or ID, it is recommended to use the issue inquiry connector first.
   *
   * This always requires the user's api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
   *
   * @summary get detailed Issue Information
   * @param input
   * @returns Detailed Issue Information
   */
  @core.TypedRoute.Post("get-issue-detail")
  async getIssueDetail(
    @TypedBody() input: IJira.IGetIssueDetailInput,
  ): Promise<IJira.IGetIssueDetailOutput> {
    return this.jiraProvider.getIssueDetail(input);
  }

  /**
   * Find Jira issues
   *
   * In order to inquire about any issues within the project, you must first inquire about the project and find out the key of the project.
   *
   * This always requires the user's api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
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
    @TypedBody() input: IJira.IGetIssueInputByBasicAuth,
  ): Promise<IJira.IGetIssueOutput> {
    return this.jiraProvider.getIssues(input);
  }

  /**
   * Find the Jira projects.
   *
   * The Jira project has a unique key and can then be used to query issues with the key.
   * Returns a paginated list of projects visible to the user.
   *
   * In order to inquire about any issues within the project, you must first inquire about the project and find out the key of the project.
   *
   * This always requires the user's api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
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
    @TypedBody() input: IJira.IGetProjectInputByBasicAuth,
  ): Promise<IJira.IGetProjectOutput> {
    return this.jiraProvider.getProjects(input);
  }

  /**
   * Find issue labels like as 'story', 'bug' and so on.
   *
   * This always requires the user's api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
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
    @TypedBody() input: IJira.IGetIssueLabelInput,
  ): Promise<IJira.IGetIssueLabelOutput> {
    return this.jiraProvider.getIssueLabels(input);
  }

  /**
   * Find issue types like as 'story', 'bug' and so on.
   *
   * In order for the user to inquire about the issue type, the ID of the project is required.
   * If the user mentioned the key or name of the project,
   * it is necessary to first inquire the project and get the correct project ID.
   * The ID of the project is a numeric character type.
   *
   * This always requires the user's api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
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
    @TypedBody() input: IJira.IGetIssueTypeInput,
  ): Promise<IJira.IGetIssueTypeOutput> {
    return this.jiraProvider.getIssueTypes(input);
  }

  /**
   * Find issue statuses for searching issue
   *
   * This always requires the user's api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
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
    @TypedBody() input: IJira.IGetIssueStatusInput,
  ): Promise<IJira.IGetIssueStatusOutput> {
    return this.jiraProvider.getIssueStatuses(input);
  }

  /**
   * There are five priorities: 'Highest', 'High', 'Medium', 'Low', and 'Lowest'.
   * Therefore, it can be used as an enum value without requesting this API,
   * and this API is already deprecated on the Jira REST API document.
   * However, for projects that can already be specified by creating a priority level, this connector is added just in case.
   *
   * This always requires the user's api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
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
    @TypedBody() input: IJira.IGetIssuePriorityInput,
  ): Promise<IJira.IGetIssuePriorityOutput> {
    return this.jiraProvider.getIssuePriorities(input);
  }

  /**
   * Find a person within the issue who can be assigned as assignee.
   *
   * This always requires the user's api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
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
    @TypedBody() input: IJira.IGetIssueAssignableInput,
  ): Promise<IJira.IGetIssueAssignableOutput> {
    return this.jiraProvider.getUsersAssignableInIssue(input);
  }

  /**
   * Find a person within the project who can be assigned as assignee.
   *
   * This always requires the user's api token for authentication.
   * User will also need your domain address and email from Jira.
   * Domain means 'http://*.atlassian.net' format.
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
    @TypedBody() input: IJira.IGetProjectAssignableInput,
  ): Promise<IJira.IGetProjectAssignableOutput> {
    return this.jiraProvider.getUsersAssignableInProject(input);
  }
}
