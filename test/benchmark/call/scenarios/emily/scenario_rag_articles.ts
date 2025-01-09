import { GoogleScholarController } from "../../../../../src/controllers/connector/google_scholar/GoogleScholarController";
import { GoogleSearchController } from "../../../../../src/controllers/connector/google_search/GoogleSearchController";
import { NaverController } from "../../../../../src/controllers/connector/naver/NaverController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_rag_articles = (): IFunctionCallBenchmarkScenario => ({
  title: "RAG 논문",
  prompt: `RAG에 대한 학술지, 논문, 뉴스 기사 내용을 찾고 표로 비교해줘`,
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
    ],
  },
});
