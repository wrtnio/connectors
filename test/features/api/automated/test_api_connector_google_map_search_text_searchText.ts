import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleMap } from "../../../../src/api/structures/connector/google_map/IGoogleMap";

export const test_api_connector_google_map_search_text_searchText = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleMap.ISearchTextOutput> =
    await api.functional.connector.google_map.search_text.searchText(
      connection,
      typia.random<IGoogleMap.ISearchTextInput>(),
    );
  typia.assert(output);
};
