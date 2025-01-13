import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { JiraController } from "../../../../../src/controllers/connector/jira/JiraController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_github_agent_4 =
  (): IFunctionCallBenchmarkScenario => ({
    title: "Github 에이전트 5",
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
