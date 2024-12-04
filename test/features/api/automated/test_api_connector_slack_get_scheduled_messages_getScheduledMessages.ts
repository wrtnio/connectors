import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_get_scheduled_messages_getScheduledMessages =
  async (connection: api.IConnection) => {
    const output: Primitive<ISlack.IGetScheduledMessageListOutput> =
      await api.functional.connector.slack.get_scheduled_messages.getScheduledMessages(
        connection,
        typia.random<ISlack.IGetScheduledMessageListInput>(),
      );
    typia.assert(output);
  };
