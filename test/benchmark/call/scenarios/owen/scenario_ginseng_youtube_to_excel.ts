import { ExcelController } from "../../../../../src/controllers/connector/excel/ExcelController";
import { GoogleSheetController } from "../../../../../src/controllers/connector/google-sheet/GoogleSheetController";
import { YoutubeSearchController } from "../../../../../src/controllers/connector/youtube_search/YoutubeSearchController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_ginseng_youtube_to_excel =
  (): IFunctionCallBenchmarkScenario => ({
    title: "산삼 유튜브 동영상 검색 후 구글 시트에 정리",
    prompt: `
백진삼에 대한 구글 유튜브를 알려줘. 

이 때 제목 / 조회수 / 설명 각각 열로 만들어서 구글 시트에 등록해줘`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: YoutubeSearchController.prototype.search,
        },
        {
          type: "anyOf",
          anyOf: [
            ExcelController.prototype.createSheets,
            GoogleSheetController.prototype.createGoogleSheet,
          ].map((func) => ({
            type: "standalone",
            function: func,
            required: true,
          })),
        },
      ],
    },
  });
