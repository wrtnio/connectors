import { getJson } from "serpapi";

import { IConnector } from "@wrtn/connector-api/lib/structures/common/IConnector";
import { IYoutubeSearch } from "@wrtn/connector-api/lib/structures/connector/youtube_search/IYoutubeSearch";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { makeQuery } from "../../../utils/generate-search-query.util";

export namespace YoutubeSearchProvider {
  export async function search(
    input: IYoutubeSearch.ISearchInput,
  ): Promise<IConnector.ISearchOutput> {
    const defaultParams = {
      engine: "youtube",
      api_key: ConnectorGlobal.env.SERP_API_KEY,
    };
    const searchQuery = makeQuery(
      input.and_keywords,
      input.or_keywords ?? [],
      input.not_keywords ?? [],
    );

    const params: IYoutubeSearch.ISerpApiParams = {
      ...defaultParams,
      search_query: searchQuery,
    };
    const res = await getJson(params);
    const results: IYoutubeSearch.ISerpApiVideoResult[] = res["video_results"];
    const output: IConnector.IReferenceContent[] = [];

    for (const result of results) {
      const youtubeSearch: IConnector.IReferenceContent = {
        title: result.title,
        type: "video",
        source: "youtube",
        url: result.link,
        contents: result.description,
        image: result.thumbnail.static,
        statistics: {
          view_count: Number(result.views ?? 0), // 조회 수 데이터 undefined로 결과가 나오는 경우가 있어서 0으로 처리
        },
      };
      output.push(youtubeSearch);
    }
    return {
      references: output,
    };
  }
}
