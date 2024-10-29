import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_google_map_search_text = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.google_map.search_text.searchText(
    connection,
    {
      textQuery: "강남역 맛집",
    },
  );

  typia.assertEquals(res);
};
