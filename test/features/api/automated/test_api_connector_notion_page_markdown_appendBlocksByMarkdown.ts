import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_page_markdown_appendBlocksByMarkdown =
  async (connection: api.IConnection) => {
    const output: Primitive<INotion.IAppendPageByMarkdownOutput> =
      await api.functional.connector.notion.page.markdown.appendBlocksByMarkdown(
        connection,
        typia.random<INotion.IAppendPageByMarkdownInput>(),
      );
    typia.assert(output);
  };
