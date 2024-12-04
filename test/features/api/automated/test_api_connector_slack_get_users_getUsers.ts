import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_get_users_getUsers = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ISlack.IGetUserListOutput> =
    await api.functional.connector.slack.get_users.getUsers(
      connection,
      typia.random<ISlack.IGetUserListInput>(),
    );
  typia.assert(output);
};
