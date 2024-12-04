import typia from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_page_equation_createEquation = async (
  connection: api.IConnection,
) => {
  const output =
    await api.functional.connector.notion.page.equation.createEquation(
      connection,
      typia.random<INotion.ICreateChildContentTypeEquationInput>(),
    );
  typia.assert(output);
};
