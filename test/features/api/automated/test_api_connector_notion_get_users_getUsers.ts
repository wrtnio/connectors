import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INotion } from "../../../../src/api/structures/connector/notion/INotion";

export const test_api_connector_notion_get_users_getUsers = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<INotion.IUserOutput>> =
    await api.functional.connector.notion.get.users.getUsers(
      connection,
      typia.random<INotion.ISecret>(),
    );
  typia.assert(output);
};
