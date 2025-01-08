import ConnectorApi from "@wrtnio/connector-api";

import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { scenario_google_slide_operations } from "../internal/scenario_google_slide_operations";

export const scenario_ai_research_to_google_slide =
  (): IFunctionCallBenchmarkScenario => ({
    title: "AI 연구 결과를 구글 슬라이드로 정리",
    prompt: `AI 제품 동향 리서치해서 구글 슬라이드에 정리해줘`,
    operations: [
      {
        type: "union",
        elements: [
          {
            type: "standalone",
            function: ConnectorApi.functional.connector.google_trend.daily,
            required: true,
          },
          {
            type: "standalone",
            function: ConnectorApi.functional.connector.google_search.search,
            required: true,
          },
          {
            type: "standalone",
            function: ConnectorApi.functional.connector.ai_search.search,
            required: true,
          },
        ],
        required: true,
      },
      ...scenario_google_slide_operations(),
    ],
  });
