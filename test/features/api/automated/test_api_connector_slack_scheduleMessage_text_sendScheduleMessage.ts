import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";
import type { MyPick } from "../../../../src/api/structures/types/MyPick";

export const test_api_connector_slack_scheduleMessage_text_sendScheduleMessage =
  async (connection: api.IConnection) => {
    const output: Primitive<MyPick<ISlack.ScheduledMessage, "post_at">> =
      await api.functional.connector.slack.scheduleMessage.text.sendScheduleMessage(
        connection,
        typia.random<ISlack.ISCheduleMessageInput>(),
      );
    typia.assert(output);
  };
