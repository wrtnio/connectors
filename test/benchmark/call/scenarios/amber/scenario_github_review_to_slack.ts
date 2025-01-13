import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { SlackController } from "../../../../../src/controllers/connector/slack/SlackController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_github_review_to_slack =
  (): IFunctionCallBenchmarkScenario => ({
    title: "GitHub PR 리뷰 및 Slack DM",
    prompt: `
내 깃허브 리포지토리 (https://github.com/DSMJung/cheajib-webview) 
를 분석해서 코드의 개선점이나, 앞으로 공부해야 할 지식들을 정리해서 
나 자신에게 Slack DM 보내줘`,
    expected: {
      type: "array",
      items: [
        {
          type: "anyOf",
          anyOf: [
            GithubController.prototype.getReadmeFile,
            GithubController.prototype.getRepositoryFolderStructures,
          ].map((func) => ({
            type: "standalone",
            function: func,
          })),
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
