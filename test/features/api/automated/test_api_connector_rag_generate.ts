import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IRag } from "../../../../src/api/structures/connector/rag/IRag";

export const test_api_connector_rag_generate = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IRag.IGenerateOutput> =
    await api.functional.connector.rag.generate(
      connection,
      typia.random<IRag.IGenerateInput>(),
      typia.random<string>(),
    );
  typia.assert(output);
};
