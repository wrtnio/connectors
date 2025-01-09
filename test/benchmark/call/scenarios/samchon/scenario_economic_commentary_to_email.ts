import { GmailController } from "../../../../../src/controllers/connector/gmail/GmailController";
import { GoogleSearchController } from "../../../../../src/controllers/connector/google_search/GoogleSearchController";
import { NaverController } from "../../../../../src/controllers/connector/naver/NaverController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_economic_commentary_to_email =
  (): IFunctionCallBenchmarkScenario => ({
    title: "경제 논평",
    prompt: `
이번 달 미국과 한국의 주요 경제 및 시사 이슈들을 정리해줘.

그리고 각 이슈에 대하여 챗봇 너의 의견을 서술해서 보내보도록 해.

마지막으로 모든 것을 정리하여 studio-test-2024@wrtn.io 으로 보내줘`,
    expected: {
      type: "array",
      items: [
        {
          type: "anyOf",
          anyOf: [
            {
              type: "standalone",
              function: NaverController.prototype.newsList,
            },
            {
              type: "standalone",
              function: GoogleSearchController.prototype.search,
            },
          ],
        },
        {
          type: "standalone",
          function: GmailController.prototype.send,
        },
      ],
    },
  });
