import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { SlackController } from "../../../../../src/controllers/connector/slack/SlackController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_github_alarm_to_slack_create_issue =
  (): IFunctionCallBenchmarkScenario => ({
    title: "깃허브 이슈 슬랙 알림 에이전트",
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
