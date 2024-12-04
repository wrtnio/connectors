import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_get_database_info_getDatabaseInfo =
  async (connection: api.IConnection) => {
    const output: Primitive<INotion.IDatabaseInfo> =
      await api.functional.connector.notion.get.database_info.getDatabaseInfo(
        connection,
        typia.random<INotion.ISecret>(),
        typia.random<string>(),
      );
    typia.assert(output);
  };
