import typia from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_scheduleMessage_deleteScheduleMessage =
  async (connection: api.IConnection) => {
    const output =
      await api.functional.connector.slack.scheduleMessage.deleteScheduleMessage(
        connection,
        typia.random<ISlack.IDeleteSCheduleMessageInput>(),
      );
    typia.assert(output);
  };
