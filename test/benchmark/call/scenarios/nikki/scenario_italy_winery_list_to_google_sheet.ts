import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { GoogleMapController } from "../../../../../src/controllers/connector/google_map/GoogleMapController";
import { ExcelController } from "../../../../../src/controllers/connector/excel/ExcelController";
import { GoogleSheetController } from "../../../../../src/controllers/connector/google-sheet/GoogleSheetController";

export const scenario_italy_winery_list_to_excel =
  (): IFunctionCallBenchmarkScenario => ({
    title: "이탈리아 피에몬테 지역 와이너리 검색 (구글 시트)",
    prompt: `
    구글맵에서 이탈리아 피에몬테 지역에 위치한 와이너리 중 리뷰가 100개 이상이고, 리뷰 평점이 4.0 이상인 와이너리를 찾아줘. 
    와이너리를 찾으면 주소와 영업시간, 테이스팅 프로그램 제공 여부, 아그리투리스모 제공 여부 등을 찾아 구글 시트를 새로 생성해서 정리해줘.
    `,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: GoogleMapController.prototype.search,
        },
        {
          type: "anyOf",
          anyOf: [
            ExcelController.prototype.createSheets,
            GoogleSheetController.prototype.createGoogleSheet,
          ].map((func) => ({
            type: "standalone",
            function: func,
          })),
        },
      ],
    },
  });
