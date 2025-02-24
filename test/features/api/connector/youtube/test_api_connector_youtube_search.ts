import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IYoutubeSearch } from "@wrtn/connector-api/lib/structures/connector/youtube_search/IYoutubeSearch";

export const test_api_connector_youtube_search = async (
  connection: CApi.IConnection,
): Promise<IYoutubeSearch.ISearchOutput[]> => {
  const result = await CApi.functional.connector.youtube_search.search(
    connection,
    {
      and_keywords: ["뤼튼", "AI"],
      or_keywords: ["스튜디오", "생태계"],
      not_keywords: ["정치", "폭력"],
    },
  );
  typia.assert(result);
  return result;
};
