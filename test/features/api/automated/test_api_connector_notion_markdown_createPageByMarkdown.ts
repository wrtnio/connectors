import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_markdown_createPageByMarkdown = async (
  connection: api.IConnection,
) => {
  const output: Primitive<INotion.ICreatePageOutput> =
    await api.functional.connector.notion.markdown.createPageByMarkdown(
      connection,
      typia.random<INotion.ICreatePageByMarkdownInput>(),
    );
  typia.assert(output);
};
