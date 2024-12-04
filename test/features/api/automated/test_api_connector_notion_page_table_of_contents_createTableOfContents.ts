import typia from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_page_table_of_contents_createTableOfContents =
  async (connection: api.IConnection) => {
    const output =
      await api.functional.connector.notion.page.table_of_contents.createTableOfContents(
        connection,
        typia.random<INotion.ICreateChildContentTypeTableOfContentsInput>(),
      );
    typia.assert(output);
  };
