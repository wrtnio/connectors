import typia from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_page_embed_createEmbed = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.notion.page.embed.createEmbed(
    connection,
    typia.random<INotion.ICreateChildContentTypeEmbedInput>(),
  );
  typia.assert(output);
};
