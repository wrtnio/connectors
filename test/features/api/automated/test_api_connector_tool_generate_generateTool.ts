import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ITool } from "../../../../src/api/structures/connector/tool/ITool";

export const test_api_connector_tool_generate_generateTool = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ITool.IGenerateOutput> =
    await api.functional.connector.tool.generate.generateTool(
      connection,
      typia.random<string>(),
      typia.random<ITool.IGenerateInput>(),
    );
  typia.assert(output);
};
