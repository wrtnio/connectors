import { getJson } from "serpapi";

import { IGoogleScholar } from "@wrtn/connector-api/lib/structures/connector/google_scholar/IGoogleScholar";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { makeQuery } from "../../../utils/generate-search-query.util";

export namespace GoogleScholarProvider {
  export async function search(
    input: IGoogleScholar.ISearchInput,
  ): Promise<IGoogleScholar.ISearchOutput[]> {
    try {
      const defaultParams = {
        engine: "google_scholar",
        api_key: ConnectorGlobal.env.SERP_API_KEY,
      };

      /**
       * 한 페이지에 최대 20개의 결과물만 response되어서
       * 사용자가 원하는 결과물의 갯수가 20개 보다 많은 경우 처리하기 위함.
       */
      const maxResultPerPage: number = 20;
      let start: number = 0;

      const output: IGoogleScholar.ISearchOutput[] = [];

      const searchQuery = makeQuery(
        input.andKeyword,
        input.orKeyword ?? [],
        input.notKeyword ?? [],
      );

      while (output.length < input.max_results) {
        const params = {
          ...defaultParams,
          q: searchQuery,
          start: start,
          num: maxResultPerPage,
        };

        const res = await getJson(params);
        const results = res["organic_results"];

        for (const result of results) {
          if (output.length === input.max_results) {
            break;
          }

          const data: IGoogleScholar.ISearchOutput = {
            id: result.result_id,
            title: result.title,
            link: result.link ?? null,
            snippet: result.snippet,
            publication_info: result.publication_info.summary,
            resource:
              result.resources?.map((resource: IGoogleScholar.IResource) => ({
                title: resource.title,
                file_format: resource.file_format,
                link: resource.link,
              })) ?? null,
            citation_count: result.inline_links.cited_by.total ?? 0,
            related_pages_link: result.inline_links.related_pages_link,
            version_info: {
              version: result.inline_links.versions?.total ?? null,
              link: result.inline_links.versions?.link ?? null,
            },
          };

          output.push(data);
        }

        /**
         * 검색된 결과 갯수가 20개 보다 적은 경우
         */
        if (results.length < maxResultPerPage) {
          break;
        }

        start += maxResultPerPage;
      }

      /** 인용 횟수 높은 순서대로 정렬 */
      output.sort((a, b) => b.citation_count - a.citation_count);
      return output;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }
}
