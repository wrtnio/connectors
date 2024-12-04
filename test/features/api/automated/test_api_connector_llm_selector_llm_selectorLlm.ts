import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type {
  ISelectorLlmRequest,
  ISelectorLlmResponse,
} from "../../../../src/api/structures/connector/llm/ILlm";

export const test_api_connector_llm_selector_llm_selectorLlm = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ISelectorLlmResponse> =
    await api.functional.connector.llm.selector_llm.selectorLlm(
      connection,
      typia.random<ISelectorLlmRequest>(),
    );
  typia.assert(output);
};
