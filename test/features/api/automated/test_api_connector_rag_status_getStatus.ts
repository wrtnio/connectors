import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IRag } from "../../../../src/api/structures/connector/rag/IRag";

export const test_api_connector_rag_status_getStatus = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IRag.IStatusOutput> =
    await api.functional.connector.rag.status.getStatus(
      connection,
      typia.random<string>(),
    );
  typia.assert(output);
};
