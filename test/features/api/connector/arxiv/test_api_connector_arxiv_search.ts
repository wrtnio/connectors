import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IConnector } from "@wrtn/connector-api/lib/structures/common/IConnector";

export const test_api_connector_arxiv_search = async (
  connection: CApi.IConnection,
): Promise<IConnector.ISearchOutput> => {
  const result = await CApi.functional.connector.arxiv_search.search(
    connection,
    {
      and_keywords: ["biology", "ecosystem"],
      or_keywords: ["AI", "machine learning"],
      not_keywords: ["politics", "pollution"],
      num_results: 50,
    },
  );
  typia.assertEquals(result);
  return result;
};
