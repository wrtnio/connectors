import ConnectorApi from "@wrtnio/connector-api";

import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { scenario_google_slide_operations } from "../internal/scenario_google_slide_operations";

export const scenario_musinsa_clothes_to_google_slide =
  (): IFunctionCallBenchmarkScenario => ({
    title: `무신사 옷을 구글 슬라이드로 정리`,
    prompt: `
    무신사에서 옷을 검색한 다음 그거 이미지랑 상품 정보랑 
    구글 슬라이드에 정리 좀 해줘봐`,
    operations: [
      {
        type: "standalone",
        function: ConnectorApi.functional.connector.google_shopping.musinsa,
        required: true,
      },
      ...scenario_google_slide_operations(),
    ],
  });
