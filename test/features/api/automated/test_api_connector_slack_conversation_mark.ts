import typia from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_conversation_mark = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.slack.conversation.mark(
    connection,
    typia.random<ISlack.IMarkInput>(),
  );
  typia.assert(output);
};
