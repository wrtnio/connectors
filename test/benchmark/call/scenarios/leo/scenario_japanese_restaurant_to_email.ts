import { GmailController } from "../../../../../src/controllers/connector/gmail/GmailController";
import { GoogleMapController } from "../../../../../src/controllers/connector/google_map/GoogleMapController";
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
          type: "standalone",
          function: GoogleMapController.prototype.search,
        },
        {
          type: "standalone",
          function: GmailController.prototype.send,
        },
      ],
    },
  });
