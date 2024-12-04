import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_get_page_readPageList = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<INotion.IReadPageOutput>> =
    await api.functional.connector.notion.get.page.readPageList(
      connection,
      typia.random<INotion.ISecret>(),
    );
  typia.assert(output);
};
