import { Injectable } from "@nestjs/common";
import { getJson } from "serpapi";

import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { makeQuery } from "../../../utils/generate-search-query.util";

const defaultParams = {
  engine: "google",
  api_key: ConnectorGlobal.env.SERP_API_KEY,
  safe: "active",
  hl: "ko",
  gl: "kr",
};

@Injectable()
export class GoogleSearchProvider {
  async searchResult(
    input: IGoogleSearch.IRequest,
    targetSite?: string,
  ): Promise<IGoogleSearch.IResponse[]> {
    try {
      const maxResultPerPage: number = 10;
      let start: number = 0;

      let searchQuery = makeQuery(
        input.andKeywords,
        input.orKeywords ?? [],
        input.notKeywords ?? [],
      );

      const output: IGoogleSearch.IResponse[] = [];

      /**
       * 한 페이지에 최대 10개의 결과물이 response되기 때문에
       * 사용자가 원하는 결과물의 갯수가 10개 보다 많은 경우 처리하기 위함.
       */
      while (output.length < input.max_results) {
        const params = {
          ...defaultParams,
          q: searchQuery,
          start: start,
          num: maxResultPerPage,
          ...(targetSite && { as_sitesearch: targetSite }),
        };
        const res = await getJson(params);
        const results = res["organic_results"];

        if (!results || results.length === 0) {
          return [];
        }

        for (const result of results) {
          if (output.length === input.max_results) {
            break;
          }

          const data: IGoogleSearch.IResponse = {
            title: result.title,
            link: result.link,
            snippet: result.snippet,
            thumbnail: result.thumbnail,
          };

          output.push(data);
        }

        /**
         * 검색 결과가 10개보다 적은 경우
         */
        if (results.length < maxResultPerPage) {
          break;
        }
        start += maxResultPerPage;
      }

      return output;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async search(
    input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return this.searchResult(input);
  }

  async searchForWanted(
    input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return this.searchResult(input, "https://www.wanted.co.kr");
  }

  async searchForIncruit(
    input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return this.searchResult(input, "https://www.incruit.com");
  }

  async searchForSaramin(
    input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return this.searchResult(input, "https://www.saramin.co.kr/zf_user");
  }

  async searchForJumpit(
    input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return this.searchResult(input, "https://www.jumpit.co.kr");
  }

  async searchForCareerly(
    input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return this.searchResult(input, "https://careerly.co.kr");
  }
}
