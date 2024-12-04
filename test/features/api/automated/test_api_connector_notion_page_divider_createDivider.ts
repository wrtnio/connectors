import typia from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_page_divider_createDivider = async (
  connection: api.IConnection,
) => {
  const output =
    await api.functional.connector.notion.page.divider.createDivider(
      connection,
      typia.random<INotion.ICreateChildContentTypeDividerInput>(),
    );
  typia.assert(output);
};
