import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { GoogleMapController } from "../../../../../src/controllers/connector/google_map/GoogleMapController";

export const scenario_spain_barcelona_restaurant_list =
  (): IFunctionCallBenchmarkScenario => ({
    title: "바르셀로나에 한국인들이 많이 가는 식당",
    prompt: `
구글맵에서 바르셀로나에 한국인 리뷰가 가장 많은 식당 10개를 찾아줘.

그리고 한국인이 쓴 리뷰 중 가장 최근 리뷰도 함께 보여주면 좋을 것 같아.
    `,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: GoogleMapController.prototype.search,
        },
        {
          type: "standalone",
          function: GoogleMapController.prototype.review,
        },
      ],
    },
  });
