import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IPrompt } from "../../../../src/api/structures/connector/prompt/IPrompt";

export const test_api_connector_prompt_generate = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IPrompt.IResponse> =
    await api.functional.connector.prompt.generate(
      connection,
      typia.random<IPrompt.IRequest>(),
    );
  typia.assert(output);
};
