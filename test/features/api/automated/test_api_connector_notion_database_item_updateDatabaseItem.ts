import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_database_item_updateDatabaseItem =
  async (connection: api.IConnection) => {
    const output: Primitive<INotion.IDatabaseItemOutput> =
      await api.functional.connector.notion.database_item.updateDatabaseItem(
        connection,
        typia.random<INotion.IUpdateDatabaseItemInput>(),
        typia.random<string>(),
      );
    typia.assert(output);
  };
