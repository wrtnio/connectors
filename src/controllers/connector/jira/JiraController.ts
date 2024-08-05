import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import type { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import { JiraProvider } from "../../../providers/connector/jira/JiraProvider";

@Controller("connector/jira")
export class JiraController {
  constructor(private readonly jiraProvider: JiraProvider) {}

  /**
   * Find Jira issues
   * @summary Find The Jira issues.
   *
   * @param input condition of request
   * @returns paginated list of issues visible to the user
   */
  @core.TypedRoute.Post("get-issues")
  async getIssues(
    @TypedBody() input: IJira.IGetIssueInputByBasicAuth,
  ): Promise<IJira.IGetIssueOutput> {
    return this.jiraProvider.getIssuesByBasicAuth(input);
  }

  /**
   * Find the Jira projects.
   *
   * The Jira project has a unique key and can then be used to query issues with the key.
   * Returns a paginated list of projects visible to the user.
   *
   * @summary Find the Jira projects.
   * @param input condition of request
   * @returns paginated list of projects visible to the user
   */
  @core.TypedRoute.Post("get-projects")
  async getProjects(
    @TypedBody() input: IJira.IGetProjectInputByBasicAuth,
  ): Promise<IJira.IGetProjectOutput> {
    return this.jiraProvider.getProjectsByBasicAuth(input);
  }
}
