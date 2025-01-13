import { GmailController } from "../../../../../src/controllers/connector/gmail/GmailController";
import { GoogleMapController } from "../../../../../src/controllers/connector/google_map/GoogleMapController";
import { GoogleSearchController } from "../../../../../src/controllers/connector/google_search/GoogleSearchController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_japanese_restaurant_to_email =
  (): IFunctionCallBenchmarkScenario => ({
    title: "일식당 이메일",
    prompt: `
삿포로 여행을 갈건데 삿포로 맛집을 찾아서 
리뷰가 높은 순서대로 10개만 내 메일로 보내줘`,
    expected: {
      type: "array",
      items: [
        {
          type: "anyOf",
          anyOf: [
            GoogleMapController.prototype.search,
            GoogleSearchController.prototype.search,
          ].map((func) => ({
            type: "standalone",
            function: func,
          })),
        },
        {
          type: "standalone",
          function: GoogleMapController.prototype.review,
        },
        {
          type: "standalone",
          function: GmailController.prototype.send,
        },
      ],
    },
  });
