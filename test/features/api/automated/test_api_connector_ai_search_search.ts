import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IAISearch } from "../../../../src/api/structures/connector/ai_search/IAISearch";

export const test_api_connector_ai_search_search = async (
  connection: api.IConnection,
) => {
  const output: Primitive<any> =
    await api.functional.connector.ai_search.search(
      connection,
      typia.random<IAISearch.IRequest>(),
    );
  typia.assert(output);
};
