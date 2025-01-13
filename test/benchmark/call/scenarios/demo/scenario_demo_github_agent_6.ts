import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { SlackController } from "../../../../../src/controllers/connector/slack/SlackController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_github_agent_4 =
  (): IFunctionCallBenchmarkScenario => ({
    title: "Github 에이전트 6",
    prompt: `깃허브 이슈 등록한거 슬랙으로 팀 채널에 알려줘`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: GithubController.prototype.getRepositoryIssues,
        },
        {
          type: "standalone",
          function: SlackController.prototype.sendText,
        },
      ],
    },
  });
