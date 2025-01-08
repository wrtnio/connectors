import { AISearchController } from "../../../../../src/controllers/connector/ai_search/AISearchController";
import { GoogleSearchController } from "../../../../../src/controllers/connector/google_search/GoogleSearchController";
import { GoogleTrendController } from "../../../../../src/controllers/connector/google_trend/GoogleTrendController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { scenario_google_slide_operations } from "../internal/scenario_google_slide_operations";

export const scenario_ai_research_to_google_slide =
  (): IFunctionCallBenchmarkScenario => ({
    title: "AI 연구 결과를 구글 슬라이드로 정리",
    prompt: `AI 제품 동향 리서치해서 구글 슬라이드에 정리해줘`,
    expected: {
      type: "array",
      items: [
        {
          type: "anyOf",
          anyOf: [
            {
              type: "standalone",
              function: GoogleTrendController.prototype.daily,
            },
            {
              type: "standalone",
              function: GoogleSearchController.prototype.search,
            },
            {
              type: "standalone",
              function: AISearchController.prototype.search,
            },
          ],
        },
        ...scenario_google_slide_operations().items,
      ],
    },
  });
