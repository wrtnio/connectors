import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_get_replies_getReplies = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ISlack.IGetReplyOutput> =
    await api.functional.connector.slack.get_replies.getReplies(
      connection,
      typia.random<ISlack.IGetReplyInput>(),
    );
  typia.assert(output);
};
