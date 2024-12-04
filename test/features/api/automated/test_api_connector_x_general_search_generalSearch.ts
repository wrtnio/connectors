import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IX } from "../../../../src/api/structures/connector/x/IX";

export const test_api_connector_x_general_search_generalSearch = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<IX.IGeneralSearchResponse>> =
    await api.functional.connector.x.general_search.generalSearch(
      connection,
      typia.random<IX.IGeneralSearchRequest>(),
    );
  typia.assert(output);
};
