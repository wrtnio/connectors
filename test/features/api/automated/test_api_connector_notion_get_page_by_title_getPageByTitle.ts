import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_get_page_by_title_getPageByTitle =
  async (connection: api.IConnection) => {
    const output: Primitive<INotion.IFindPageByTitleOutput> =
      await api.functional.connector.notion.get_page_by_title.getPageByTitle(
        connection,
        typia.random<INotion.IFindPageOrDatabaseItemInput>(),
      );
    typia.assert(output);
  };
