import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";

export const test_api_internal_google_refreshAccessToken = async (
  connection: api.IConnection,
) => {
  const output: Primitive<string> =
    await api.functional.internal.google.refreshAccessToken(connection);
  typia.assert(output);
};
