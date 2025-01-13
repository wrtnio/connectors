import { GoogleSearchController } from "../../../../../src/controllers/connector/google_search/GoogleSearchController";
import { GoogleShoppingIherbController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_iherb/GoogleShoppingIherbController";
import { GoogleShoppingOliveYoungController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_olive_young/GoogleShoppingOliveYoungController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_beauty_agent =
  (): IFunctionCallBenchmarkScenario => ({
    title: "뷰티 에이전트 4",
    prompt: `건조한 피부 때문에 고민이야. (iHerb에서) 보습에 좋은 스킨케어 제품을 알려줘.
    추천해준 제품들의 주요 성분이 어떤 효과가 있는지 알려줘.`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: GoogleSearchController.prototype.search,
        },
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
          function: GoogleSearchController.prototype.search,
        },
      ],
    },
  });
