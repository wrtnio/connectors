import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_get_im_channels_getImChannels = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<ISlack.ImChannel>> =
    await api.functional.connector.slack.get_im_channels.getImChannels(
      connection,
      typia.random<ISlack.IGetChannelInput>(),
    );
  typia.assert(output);
};
