import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_get_page_contents_readPageContents =
  async (connection: api.IConnection) => {
    const output: Primitive<INotion.IReadPageContentOutput> =
      await api.functional.connector.notion.get.page.contents.readPageContents(
        connection,
        typia.random<INotion.IReadPageContentInput>(),
      );
    typia.assert(output);
  };
