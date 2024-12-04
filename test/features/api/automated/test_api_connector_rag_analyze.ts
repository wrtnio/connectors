import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IRag } from "../../../../src/api/structures/connector/rag/IRag";

export const test_api_connector_rag_analyze = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IRag.IAnalysisOutput> =
    await api.functional.connector.rag.analyze(
      connection,
      typia.random<IRag.IAnalyzeInput>(),
    );
  typia.assert(output);
};
