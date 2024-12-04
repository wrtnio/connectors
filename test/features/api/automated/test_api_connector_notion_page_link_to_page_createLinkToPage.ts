import typia from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_page_link_to_page_createLinkToPage =
  async (connection: api.IConnection) => {
    const output =
      await api.functional.connector.notion.page.link_to_page.createLinkToPage(
        connection,
        typia.random<INotion.ICreateChildContentTypeLinkToPageInput>(),
      );
    typia.assert(output);
  };
