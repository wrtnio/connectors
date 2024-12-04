import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_page_title_updatePageTitle = async (
  connection: api.IConnection,
) => {
  const output: Primitive<INotion.ICreatePageOutput> =
    await api.functional.connector.notion.page.title.updatePageTitle(
      connection,
      typia.random<INotion.IUpdateNotionTitleInput>(),
    );
  typia.assert(output);
};
