import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { GoogleScholarController } from "../../../../../src/controllers/connector/google_scholar/GoogleScholarController";
import { GoogleSearchController } from "../../../../../src/controllers/connector/google_search/GoogleSearchController";
import { NaverController } from "../../../../../src/controllers/connector/naver/NaverController";
import { ExcelController } from "../../../../../src/controllers/connector/excel/ExcelController";
import { GoogleSheetController } from "../../../../../src/controllers/connector/google-sheet/GoogleSheetController";

export const scenario_ai_hci_to_google_sheet =
  (): IFunctionCallBenchmarkScenario => ({
    title: "AI-HCI 논문",
    prompt: `
AI 분야의 주요한 HCI 논문 읽어야 하는 것 30개 정리해서 
구글 시트를 생성해서 기록해줘.

각각 논문 이름, 저자, 게시 날짜, 내용 요약, 조회수 등의 지표를 
적어야 하는데 논문과 저자 이름 빼고는 다 한글이어야 해.`,
    expected: {
      type: "array",
      items: [
        {
          type: "anyOf",
          anyOf: [
            GoogleScholarController.prototype.search,
            GoogleSearchController.prototype.search,
            NaverController.prototype.newsList,
          ].map((func) => ({
            type: "standalone",
            function: func,
          })),
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
