import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IHancell } from "../../../../src/api/structures/connector/hancell/IHancell";

export const test_api_connector_hancell_read = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IHancell.IReadHancellOutput> =
    await api.functional.connector.hancell.read(
      connection,
      typia.random<IHancell.IReadHancellInput>(),
    );
  typia.assert(output);
};
