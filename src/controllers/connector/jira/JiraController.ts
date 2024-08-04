import { Controller } from "@nestjs/common";
import { JiraProvider } from "../../../providers/connector/jira/JiraProvider";

@Controller("connector/jira")
export class JiraController {
  constructor(private readonly jiraProvider: JiraProvider) {}
}
