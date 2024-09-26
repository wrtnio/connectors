import typia from "typia";

import CApi from "@wrtn/connector-api";
import { ITool } from "@wrtn/connector-api/lib/structures/connector/tool/ITool";

export const test_studio1_tool_generate = async (
  connection: CApi.IConnection,
) => {
  const output = await CApi.functional.connector.tool.generate.generateTool(
    connection,
    "6543620b701512655d753aa7",
    {
      맛: ["초코"],
    },
  );

  typia.assert<ITool.IGenerateOutput>(output);
};
