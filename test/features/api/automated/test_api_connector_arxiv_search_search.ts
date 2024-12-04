import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IConnector } from "../../../../src/api/structures/common/IConnector";

export const test_api_connector_arxiv_search_search = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IConnector.ISearchOutput> =
    await api.functional.connector.arxiv_search.search(
      connection,
      typia.random<IConnector.ISearchInput>(),
    );
  typia.assert(output);
};
