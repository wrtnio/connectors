import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IRanker } from "../../../../src/api/structures/connector/sort/IRanker";

export const test_api_connector_rank = async (connection: api.IConnection) => {
  const output: Primitive<IRanker.IRankOutput> =
    await api.functional.connector.rank(
      connection,
      typia.random<IRanker.IRankInput>(),
    );
  typia.assert(output);
};
