import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { GmailController } from "../../../../../src/controllers/connector/gmail/GmailController";
import { SlackController } from "../../../../../src/controllers/connector/slack/SlackController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_github_agent_3 =
  (): IFunctionCallBenchmarkScenario => ({
    title: "Github 에이전트",
    prompt: `방금 올린 프로젝트를 보고 개선 해야 할 점을 이슈로 등록하고 slack으로 우리팀 채널에 전파해줘.`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: GithubController.prototype.readPullRequestDetail,
        },
        {
          type: "anyOf",
          anyOf: [
            {
              type: "standalone",
              function: SlackController.prototype.sendTextToMyself,
            },
            {
              type: "standalone",
              function: SlackController.prototype.sendText,
            },
          ],
        },
      ],
    },
  });
