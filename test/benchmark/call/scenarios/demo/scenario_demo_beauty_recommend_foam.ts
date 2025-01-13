import { GmailController } from "../../../../../src/controllers/connector/gmail/GmailController";
import { GoogleShoppingIherbController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_iherb/GoogleShoppingIherbController";
import { GoogleShoppingOliveYoungController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_olive_young/GoogleShoppingOliveYoungController";
import { YoutubeSearchController } from "../../../../../src/controllers/connector/youtube_search/YoutubeSearchController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_beauty_recommend_foam =
  (): IFunctionCallBenchmarkScenario => ({
    title: "여드름 폼클렌징 추천 및 리뷰 검색 후 메일 전송 에이전트",
    prompt: `
요즘 여드름이 나서 걱정이야, 여드름에 잘 맞는 폼클렌징 추천해줘.
추천해준 제품 유튜브에서 영상으로 찾아줘.
제품 리스트와 후기들을 내 이메일로 보내줘.`,
    expected: {
      type: "array",
      items: [
        {
          type: "anyOf",
          anyOf: [
            GoogleShoppingOliveYoungController.prototype.oliveYoung,
            GoogleShoppingIherbController.prototype.iherb,
          ].map((func) => ({
            type: "standalone",
            function: func,
          })),
        },
        {
          type: "standalone",
          function: YoutubeSearchController.prototype.search,
        },
        {
          type: "standalone",
          function: GmailController.prototype.send,
        },
      ],
    },
  });
