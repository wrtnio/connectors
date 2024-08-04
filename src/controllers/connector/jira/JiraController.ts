import { Controller } from "@nestjs/common";
import { JiraProvider } from "../../../providers/connector/jira/JiraProvider";
import core, { TypedBody } from "@nestia/core";
import type { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";

@Controller("connector/jira")
export class JiraController {
  constructor(private readonly jiraProvider: JiraProvider) {}

  /**
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-projects")
  async getProjects(
    @TypedBody() input: IJira.IGetProjectInput,
  ): Promise<IJira.IGetProjectOutput> {
    return this.jiraProvider.getProjects(input);
  }
}
