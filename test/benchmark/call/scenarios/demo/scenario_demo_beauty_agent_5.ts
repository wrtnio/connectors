import { GoogleSearchController } from "../../../../../src/controllers/connector/google_search/GoogleSearchController";
import { GoogleShoppingIherbController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_iherb/GoogleShoppingIherbController";
import { GoogleShoppingOliveYoungController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_olive_young/GoogleShoppingOliveYoungController";
import { YoutubeSearchController } from "../../../../../src/controllers/connector/youtube_search/YoutubeSearchController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_beauty_agent =
  (): IFunctionCallBenchmarkScenario => ({
    title: "뷰티 에이전트 5",
    prompt: `iHerb에서 가장 인기 있는 항산화제를 알려주고, 관련 영상 리뷰를 보여줘.
      추천해준 제품들의 주요 성분이 어떤 효과가 있는지 알려줘.`,
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
          function: GoogleSearchController.prototype.search,
        },
      ],
    },
  });
