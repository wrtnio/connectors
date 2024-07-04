import { Injectable } from "@nestjs/common";
import { getJson } from "serpapi";

import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { makeQuery } from "../../../utils/generate-search-query.util";

@Injectable()
export class GoogleSearchProvider {
  async search(
    input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    try {
      const defaultParams = {
        engine: "google",
        api_key: ConnectorGlobal.env.SERP_API_KEY,
        safe: "active",
        hl: "ko",
        gl: "kr",
      };

      const searchQuery = makeQuery(
        input.andKeywords,
        input.orKeywords ?? [],
        input.notKeywords ?? [],
      );
      const res = await getJson({
        ...defaultParams,
        q: searchQuery,
      });
      const output = res["organic_results"];

      /**
       * output의 구조가 검색어 별로 다 다르기 때문에 any로 선언
       */
      const results: IGoogleSearch.IResponse[] = output.map((o: any) => {
        return {
          title: o.title,
          link: o.link,
          snippet: o.snippet,
          thumbnail: o.thumbnail,
        };
      });

      return results;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }
}
