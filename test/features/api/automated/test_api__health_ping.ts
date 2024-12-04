import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";

export const test_api__health_ping = async (connection: api.IConnection) => {
  const output: Primitive<false | true> =
    await api.functional._health.ping(connection);
  typia.assert(output);
};
