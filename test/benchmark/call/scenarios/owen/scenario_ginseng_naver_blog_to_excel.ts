import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { ExcelController } from "../../../../../src/controllers/connector/excel/ExcelController";
import { GoogleSheetController } from "../../../../../src/controllers/connector/google-sheet/GoogleSheetController";
import { CsvController } from "../../../../../src/controllers/connector/csv/CsvController";
import { NaverBlogController } from "../../../../../src/controllers/connector/naver_blog/NaverBlogController";

export const scenario_ginseng_naver_blog_to_excel =
  (): IFunctionCallBenchmarkScenario => ({
    title: "산삼 네이버 블로그 검색",
    prompt: `
네이버 블로그에 백진삼을 검색하고 네이버 블로그에서 백진삼이 어떤 내용으로 소개되고 있는지 알려줘. 

블로그는 10개 소개해줘. 이 때 게시글 요약 말고 그 게시글에서 백진삼에 대해 어떻게 소개하고 있는지 
본문 내용을 보다 구체적으로 알려줘. 

그리고 이걸 엑셀 파일에 정리해줘`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: NaverBlogController.prototype.blogList,
        },
        {
          type: "anyOf",
          anyOf: [
            ExcelController.prototype.createSheets,
            GoogleSheetController.prototype.createGoogleSheet,
            CsvController.prototype.write,
            CsvController.prototype.csvToExcel,
          ].map((func) => ({
            type: "standalone",
            function: func,
          })),
        },
      ],
    },
  });
