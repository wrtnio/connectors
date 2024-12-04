import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_get_public_channels_getPublicChannels =
  async (connection: api.IConnection) => {
    const output: Primitive<Array<ISlack.PublicChannel>> =
      await api.functional.connector.slack.get_public_channels.getPublicChannels(
        connection,
        typia.random<ISlack.IGetChannelInput>(),
      );
    typia.assert(output);
  };
