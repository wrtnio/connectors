import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_find_item_list_getDatabaseItemList =
  async (connection: api.IConnection) => {
    const output: Primitive<Array<INotion.IDatabaseItemOutput>> =
      await api.functional.connector.notion.find_item_list.getDatabaseItemList(
        connection,
        typia.random<INotion.ISecret>(),
        typia.random<string>(),
      );
    typia.assert(output);
  };
