import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_google_scholar = async (connection: CApi.IConnection) => {
  const searchResult = await CApi.functional.connector.google_scholar.search(connection, {
    andKeyword: ["biology", "ecosystem"],
    orKeyword: ["AI", "machine learning"],
    notKeyword: ["pollution", "politics"],
    max_results: 25,
  });
  typia.assertEquals(searchResult);
};
