import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IInnoforest } from "../../../../src/api/structures/connector/innoforest/IInnoforest";

export const test_api_connector_innoforest_search = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IInnoforest.ISearchOutput> =
    await api.functional.connector.innoforest.search(
      connection,
      typia.random<IInnoforest.ISearchInput>(),
    );
  typia.assert(output);
};
