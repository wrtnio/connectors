import { GoogleShoppingMusinsaController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_musinsa/GoogleShoppingMusinsaController";
import { KakaoTalkController } from "../../../../../src/controllers/connector/kakao_talk/KakaoTalkController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_date_fall_musinsa_to_kakaotalk =
  (): IFunctionCallBenchmarkScenario => ({
    title: "데이트룩 추천",
    prompt: `데이트 할 때 입기 좋은 가을 옷을 무신사에서 찾은 다음, 내 카카오톡 메시지로 보내줘`,
    expected: {
      type: "sequential",
      allOf: [
        {
          type: "standalone",
          function: GoogleShoppingMusinsaController.prototype.musinsa,
        },
        {
          type: "standalone",
          function: KakaoTalkController.prototype.getFriends,
        },
        {
          type: "anyOf",
          anyOf: [
            KakaoTalkController.prototype.textMemo,
            KakaoTalkController.prototype.feedMemo,
            KakaoTalkController.prototype.commerceMemo,
            KakaoTalkController.prototype.listMemo,
          ].map((func) => ({
            type: "standalone",
            function: func,
          })),
        },
      ],
    },
  });
