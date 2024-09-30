import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleScholar } from "@wrtn/connector-api/lib/structures/connector/google_scholar/IGoogleScholar";

export const test_api_connector_google_scholar = async (
  connection: CApi.IConnection,
) => {
  const searchResult: IGoogleScholar.ISearchOutput[] =
    await CApi.functional.connector.google_scholar.search(connection, {
      andKeyword: ["biology", "ecosystem"],
      orKeyword: ["AI", "machine learning"],
      notKeyword: ["pollution", "politics"],
      max_results: 25,
    });
  typia.assert<IGoogleScholar.ISearchOutput[]>(searchResult);
};
