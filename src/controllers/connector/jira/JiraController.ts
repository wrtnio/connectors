import { Controller } from "@nestjs/common";
import { JiraProvider } from "../../../providers/connector/jira/JiraProvider";
import core, { TypedBody } from "@nestia/core";
import type { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";

@Controller("connector/jira")
export class JiraController {
  constructor(private readonly jiraProvider: JiraProvider) {}

  @core.TypedRoute.Post("get-issues")
  async getIssues(
    @TypedBody() input: IJira.IGetIssueInput,
  ): Promise<IJira.IGetIssueOutput> {
    return this.jiraProvider.getIssues(input);
  }

  @core.TypedRoute.Post("get-projects")
  async getProjects(
    @TypedBody() input: IJira.IGetProjectInput,
  ): Promise<IJira.IGetProjectOutput> {
    return this.jiraProvider.getProjects(input);
  }
}
