import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IYoutubeSearch } from "../../../../src/api/structures/connector/youtube_search/IYoutubeSearch";

export const test_api_connector_youtube_search_search = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<IYoutubeSearch.ISearchOutput>> =
    await api.functional.connector.youtube_search.search(
      connection,
      typia.random<IYoutubeSearch.ISearchInput>(),
    );
  typia.assert(output);
};
