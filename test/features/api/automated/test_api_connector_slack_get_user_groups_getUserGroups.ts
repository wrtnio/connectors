import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_get_user_groups_getUserGroups = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ISlack.IGetUserGroupOutput> =
    await api.functional.connector.slack.get_user_groups.getUserGroups(
      connection,
      typia.random<ISlack.ISecret>(),
    );
  typia.assert(output);
};
