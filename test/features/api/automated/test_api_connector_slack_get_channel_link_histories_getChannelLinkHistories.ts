import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_get_channel_link_histories_getChannelLinkHistories =
  async (connection: api.IConnection) => {
    const output: Primitive<ISlack.IGetChannelLinkHistoryOutput> =
      await api.functional.connector.slack.get_channel_link_histories.getChannelLinkHistories(
        connection,
        typia.random<ISlack.IGetChannelHistoryInput>(),
      );
    typia.assert(output);
  };
