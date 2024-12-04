import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_get_channel_histories_getChannelHistories =
  async (connection: api.IConnection) => {
    const output: Primitive<ISlack.IGetChannelHistoryOutput> =
      await api.functional.connector.slack.get_channel_histories.getChannelHistories(
        connection,
        typia.random<ISlack.IGetChannelHistoryInput>(),
      );
    typia.assert(output);
  };
