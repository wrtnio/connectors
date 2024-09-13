import { Injectable } from "@nestjs/common";
import { IAISearch } from "@wrtn/connector-api/lib/structures/connector/ai_search/IAISearch";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import axios from "axios";
import { v4 } from "uuid";

@Injectable()
export class AISearchProvider {
  async search(input: IAISearch.IRequest): Promise<any> {
    try {
      const res = await axios.post(
        `${ConnectorGlobal.env.BROWSING_AGENT_PLAYGROUND_SERVER_URL}/tools/browsing_tool/v1`,
        {
          use_rag: true,
          /**
           * reranker_option 옵션.
           * - naive: reranker를 사용하지 않습니다.
           * - cohere-v3-rerank: cohere-v3-rerank를 사용합니다.
           * - cohere-v3-rerank-nimble: cohere-v3-rerank-nimble를 사용합니다.
           * - sionic-ai-rerank: sionic-ai-rerank를 사용합니다.
           */
          reranker_option: "cohere-v3-rerank",
          /**
           * thresholding 옵션.
           * - dynamic: 동적 thresholding을 사용합니다. 예를 들어, threshold가 0.5라면 p50에 해당하는 결과만을 제공합니다
           * - static: 정적 thresholding을 사용합니다. 예를 들어, threshold가 0.5라면 0.5 이상의 reranking score에 해당하는 검색 결과만을 제공합니다
           * - average: 평균 thresholding을 사용합니다. 이 경우에는 threshold 값이 무시됩니다. 전체 검색 결과 중 reranking score의 평균값을 기준으로 thresholding을 수행합니
           */
          thresholding_option: "static",
          locale: "ko-KR",
          question: null, // reranker_option naive 아닐 때만 사용 가능
          search_query: input.search_query,
          start: 0,
          num: input.max_results, // 검색 결과 갯수 default 10, maximum 100
          threshold: 0.5, // thresholding을 할 때 사용할 threshold 값. 0~1 사이의 floating point만 허용
        },
        {
          headers: {
            "wrtn-locale": "ko-KR",
            "x-service-id": "eco_browsing_tool",
            "x-request-id": v4(),
          },
        },
      );

      console.log("data", res.data);

      if (res.data === null) {
        return [];
      }

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
