import { GithubController } from "../../../../../src/controllers/connector/github/GithubController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_github_review_to_slack =
  (): IFunctionCallBenchmarkScenario => ({
    title: "GitHub PR 리뷰 및 Slack DM",
    prompt: `
    내 깃허브 리포지토리 (https://github.com/DSMJung/cheajib-webview) 
    를 분석해서 코드의 개선점이나, 앞으로 공부해야 할 지식들을 정리해서 
    슬랙 디엠으로 보내줘`,
    expected: {
      type: "sequential",
      allOf: [
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
          type: "standalone",
          function:
            ConnectorApi.functional.connector.slack.get_im_channels
              .getImChannels,
        },
        {
          type: "anyOf",
          anyOf: [
            {
              type: "standalone",
              function:
                ConnectorApi.functional.connector.slack.postMessage.text.myself
                  .sendTextToMyself,
            },
            {
              type: "standalone",
              function:
                ConnectorApi.functional.connector.slack.postMessage.text
                  .sendText,
            },
          ],
        },
      ],
    },
  });
