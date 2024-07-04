import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";

export const test_api_connector_google_search = async (
  connection: CApi.IConnection,
): Promise<IGoogleSearch.IResponse[]> => {
  const result = await CApi.functional.connector.google_search.search(
    connection,
    {
      andKeywords: ["애완견 동반 가능한 강원도 숙소 찾아줘"],
      orKeywords: [],
      notKeywords: [],
    },
  );
  typia.assertEquals(result);
  return result;
};
