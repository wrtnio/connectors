import { ArxivSearchController } from "../../../../../src/controllers/connector/arxiv_search/ArxivSearchController";
import { GoogleScholarController } from "../../../../../src/controllers/connector/google_scholar/GoogleScholarController";
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
          ArxivSearchController.prototype.search,
        ].map((func) => ({
          type: "standalone",
          function: func,
        })),
      },
    ],
  },
});
