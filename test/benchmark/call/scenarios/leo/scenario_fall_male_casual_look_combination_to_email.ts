import { GmailController } from "../../../../../src/controllers/connector/gmail/GmailController";
import { GoogleShoppingAliexpressController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_aliexpress/GoogleShoppingAliexpressController";
import { GoogleShoppingCoupangController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_coupang/GoogleShoppingCoupangController";
import { GoogleShoppingMusinsaController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_musinsa/GoogleShoppingMusinsaController";
import { GoogleShoppingOcoController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_oco/GoogleShoppingOcoController";
import { GoogleShoppingTwentyNineCentimeterController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_twenty_nine_cenetimeter/GoogleShoppingTwentyNineCentimeterController";
import { GoogleShoppingUniqloController } from "../../../../../src/controllers/connector/google_shopping/google_shopping_uniqlo/GoogleShoppingUniqloController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_fall_male_casual_look_combination_to_email =
  (): IFunctionCallBenchmarkScenario => ({
    title: "가을 남성 캐주얼 룩 조합",
    prompt: `
    요새 유행하는 가을 캐주얼룩 최신 남성 옷 트렌드를 검색하고 
    해당 트렌드를 기반으로 일주일 동안 입을 수 있는 남성 캐주얼룩 
    상/하의 조합을 무신사에서 검색해서 일주일 각 요일별로 조합을 정리해서 
    내 메일로 보내줘`,
    expected: {
      type: "array",
      items: [
        {
          type: "anyOf",
          anyOf: [
            GoogleShoppingAliexpressController.prototype.aliExpress,
            GoogleShoppingCoupangController.prototype.coupang,
            GoogleShoppingMusinsaController.prototype.musinsa,
            GoogleShoppingOcoController.prototype.oco,
            GoogleShoppingTwentyNineCentimeterController.prototype
              .twentyNineCentimeter,
            GoogleShoppingUniqloController.prototype.uniqlo,
          ].map((func) => ({
            type: "standalone",
            function: func,
          })),
        },
        {
          type: "standalone",
          function: GoogleShoppingMusinsaController.prototype.musinsa,
        },
        {
          type: "standalone",
          function: GmailController.prototype.send,
        },
      ],
    },
  });
