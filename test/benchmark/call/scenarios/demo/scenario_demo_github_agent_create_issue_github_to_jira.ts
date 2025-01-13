import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { JiraController } from "../../../../../src/controllers/connector/jira/JiraController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_github_create_issue_github_to_jira =
  (): IFunctionCallBenchmarkScenario => ({
    title: "Github 이슈 지라 이슈로 등록 에이전트",
    prompt: `깃허브 이슈 등록한거 지라에도 등록해줘`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: GithubController.prototype.getRepositoryIssues,
        },
        {
          type: "standalone",
          function: JiraController.prototype.createIssueByMarkdown,
        },
      ],
    },
  });
