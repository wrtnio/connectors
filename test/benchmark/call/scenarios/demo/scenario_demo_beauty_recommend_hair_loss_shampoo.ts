import { GoogleSearchController } from "../../../../../src/controllers/connector/google_search/GoogleSearchController";
import { GoogleShoppingIherbController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_iherb/GoogleShoppingIherbController";
import { GoogleShoppingOliveYoungController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_olive_young/GoogleShoppingOliveYoungController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_demo_recommend_hair_loss_shampoo =
  (): IFunctionCallBenchmarkScenario => ({
    title: "탈모 샴푸 추천 및 효과 분석 에이전트",
    prompt: `요즘 머리가 자주 빠져. (iHerb에서) 탈모 완화에 도움 되는 샴푸를 추천해줘. 
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
