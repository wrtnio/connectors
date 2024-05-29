import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ISelectorLlmResponse } from "@wrtn/connector-api/lib/structures/connector/llm/ILlm";

export async function test_selector_llm(
  connection: CApi.IConnection,
): Promise<ISelectorLlmResponse> {
  const generated =
    await CApi.functional.connector.llm.selector_llm.selectorLlm(connection, {
      candidates: [
        { title: "Fashion trends in 2024", type: "video" },
        { title: "Whatever you want in 20 minutes", type: "video" },
        { title: "History 101", type: "video" },
        { title: "Business 101", type: "text" },
      ],
      num_select: 1,
      context: {
        request: "I want to catch up on recent trends",
      },
    });
  typia.assertEquals(generated);
  return generated;
}
