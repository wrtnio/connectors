import ConnectorApi from "@wrtnio/connector-api";

import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_rag_articles = (): IFunctionCallBenchmarkScenario => ({
  title: "RAG 논문",
  prompt: `RAG에 대한 학술지, 논문, 뉴스 기사 내용을 찾고 표로 비교해줘`,
  operations: [
    {
      type: "union",
      elements: [
        ConnectorApi.functional.connector.google_scholar.search,
        ConnectorApi.functional.connector.google_search.search,
        ConnectorApi.functional.connector.naver.news.newsList,
      ].map((func) => ({
        type: "standalone",
        function: func,
        required: true,
      })),
      required: true,
    },
  ],
});
