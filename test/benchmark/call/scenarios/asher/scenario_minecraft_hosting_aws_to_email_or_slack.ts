import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { GoogleSearchController } from "../../../../../src/controllers/connector/google_search/GoogleSearchController";
import { YoutubeSearchController } from "../../../../../src/controllers/connector/youtube_search/YoutubeSearchController";
import { GmailController } from "../../../../../src/controllers/connector/gmail/GmailController";
import { SlackController } from "../../../../../src/controllers/connector/slack/SlackController";

export const scenario_minecraft_hosting_aws_to_email_or_slack =
  (): IFunctionCallBenchmarkScenario => ({
    title: "마인크래프트 호스팅 AWS",
    prompt: `
    마인크래프트 1.21 버전 로컬 서버 호스팅을 하려고 하는데 
    호스팅 해줄 수 있는 서비스 중 4gb 램을 할당 할 수 있고 
    한달에 10$가 안넘어 가는 서비스를 찾아서 md로 정리해서 
    studio-test-2024@wrtn.io 로 보내주거나 
    
    만약 한달에 10$가 넘어가는 서비스가 2개 이상 이라면 window 에서 
    로컬 마인크래프트 서버를 SKT 공유기의 포트포워딩 기능을 사용 하여 
    외부 사용자가 접속 할 수 있는 방법을 찾고 정리한 글에 유투브에서 
    마인크래프트 서버를 포트포워딩 하여 외부 사용자에게 열어줄 수 있는 
    영상을 포함하여 slack DM 으로 나 자신에게 보내줘
  `,
    expected: {
      type: "array",
      items: [
        {
          type: "anyOf",
          anyOf: [
            GoogleSearchController.prototype.search,
            YoutubeSearchController.prototype.searchVideo,
          ].map((func) => ({
            type: "standalone",
            function: func,
          })),
        },
        {
          type: "anyOf",
          anyOf: [
            GmailController.prototype.send,
            SlackController.prototype.sendTextToMyself,
            SlackController.prototype.sendText,
          ].map((func) => ({
            type: "standalone",
            function: func,
          })),
        },
      ],
    },
  });
