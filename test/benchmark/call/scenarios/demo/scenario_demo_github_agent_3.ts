import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { JiraController } from "../../../../../src/controllers/connector/jira/JiraController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_github_agent_3 =
  (): IFunctionCallBenchmarkScenario => ({
    title: "Github 에이전트 3",
    prompt: `지라에 내 앞으로 등록된 이슈들을 깃허브에 이슈로 등록해줘.`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: JiraController.prototype.getIssues,
        },
        {
          type: "standalone",
          function: GithubController.prototype.createIssue,
        },
      ],
    },
  });
