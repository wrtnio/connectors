import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IX } from "../../../../src/api/structures/connector/x/IX";

export const test_api_connector_x_prepare_summarize_prepareSummary = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IX.IPrePareSummarizeTweetOutput> =
    await api.functional.connector.x.prepare_summarize.prepareSummary(
      connection,
      typia.random<IX.IPrePareSummarizeTweetInput>(),
    );
  typia.assert(output);
};
