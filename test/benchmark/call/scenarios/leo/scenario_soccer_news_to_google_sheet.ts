import { GoogleSheetController } from "../../../../../src/controllers/connector/google-sheet/GoogleSheetController";
import { NaverController } from "../../../../../src/controllers/connector/naver/NaverController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_soccer_news_to_google_sheet =
  (): IFunctionCallBenchmarkScenario => ({
    title: "축구 뉴스 (구글 시트)",
    prompt: `
축구협회 키워드로 네이버뉴스에서 최신순으로 뉴스를 검색해서 
10개를 구글 시트를 새로 생성해서 정리해줘.`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: NaverController.prototype.newsList,
        },
        {
          type: "standalone",
          function: GoogleSheetController.prototype.createGoogleSheet,
        },
        {
          type: "standalone",
          function: GoogleSheetController.prototype.appendGoogleSheet,
        },
      ],
    },
  });
