import typia from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_page_image_createImage = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.notion.page.image.createImage(
    connection,
    typia.random<INotion.ICreateChildContentTypeImageInput>(),
  );
  typia.assert(output);
};
