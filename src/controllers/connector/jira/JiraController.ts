import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import type { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import { RouteIcon } from "@wrtnio/decorators";
import { JiraProvider } from "../../../providers/connector/jira/JiraProvider";

@Controller("connector/jira")
export class JiraController {
  constructor(private readonly jiraProvider: JiraProvider) {}

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

  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/Jira.svg`,
  )
  @core.TypedRoute.Post("get-issue-types")
  async getIssueTypes(
    @TypedBody() input: IJira.IGetIssueTypeInput,
  ): Promise<IJira.IGetIssueTypeOutput> {
    return this.jiraProvider.getIssueTypes(input);
  }
}
