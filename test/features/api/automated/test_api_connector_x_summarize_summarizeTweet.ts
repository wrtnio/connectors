import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IX } from "../../../../src/api/structures/connector/x/IX";

export const test_api_connector_x_summarize_summarizeTweet = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IX.IGetChunkDocumentOutput> =
    await api.functional.connector.x.summarize.summarizeTweet(
      connection,
      typia.random<IX.ISummarizeTweetInput>(),
    );
  typia.assert(output);
};
