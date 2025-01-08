import ConnectorApi from "@wrtnio/connector-api";

import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_fall_male_casual_look_combination_to_email =
  (): IFunctionCallBenchmarkScenario => ({
    title: "가을 남성 캐주얼 룩 조합",
    prompt: `
    요새 유행하는 가을 캐주얼룩 최신 남성 옷 트렌드를 검색하고 
    해당 트렌드를 기반으로 일주일 동안 입을 수 있는 남성 캐주얼룩 
    상/하의 조합을 무신사에서 검색해서 일주일 각 요일별로 조합을 정리해서 
    내 메일로 보내줘`,
    operations: [
      {
        type: "union",
        elements: [
          ConnectorApi.functional.connector.google_shopping.ali_express
            .aliExpress,
          ConnectorApi.functional.connector.google_shopping.coupang,
          ConnectorApi.functional.connector.google_shopping.musinsa,
          ConnectorApi.functional.connector.google_shopping.oco,
          ConnectorApi.functional.connector.google_shopping
            .twenty_nine_centimeter.twentyNineCentimeter,
          ConnectorApi.functional.connector.google_shopping.uniqlo,
        ].map((func) => ({
          type: "standalone",
          function: func,
          required: true,
        })),
        required: true,
      },
      {
        type: "standalone",
        function: ConnectorApi.functional.connector.google_shopping.musinsa,
        required: false,
      },
      {
        type: "standalone",
        function: ConnectorApi.functional.connector.gmail.send,
        required: true,
      },
    ],
  });
