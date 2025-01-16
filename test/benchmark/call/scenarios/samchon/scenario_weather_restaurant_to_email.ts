import { GmailController } from "../../../../../src/controllers/connector/gmail/GmailController";
import { GoogleMapController } from "../../../../../src/controllers/connector/google_map/GoogleMapController";
import { KakaoMapController } from "../../../../../src/controllers/connector/kakao_map/KakaoMapController";
import { OpenDataController } from "../../../../../src/controllers/connector/open_data/OpenDataController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_weather_restaurant_to_email =
  (): IFunctionCallBenchmarkScenario => ({
    title: "날씨 기반 음식/식당 추천",
    prompt: `
오늘 저녁 날씨를 검색하고, 그 날씨에 알맞는 음식들을 추천해.

그리고 그 중 가장 영양학적으로 적절하다 생각하는 음식을 니가 스스로 판단하고, 
그 음식을 판매하는 식당을 강남역 인근에서 추천해줘.

이후 이러한 내용들을 모두 조리있게 요약하여, 나에게 메일로 보내다오.
나의 메일은 studio-test-2024@wrtn.io 야`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: OpenDataController.prototype.getShortTermForecast,
        },
        {
          type: "anyOf",
          anyOf: [
            {
              type: "standalone",
              function: GoogleMapController.prototype.search,
            },
            {
              type: "standalone",
              function: KakaoMapController.prototype.search,
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
