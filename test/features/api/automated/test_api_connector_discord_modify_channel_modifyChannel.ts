import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_modify_channel_modifyChannel = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IDiscord.IChannel> =
    await api.functional.connector.discord.modify_channel.modifyChannel(
      connection,
      typia.random<IDiscord.IModifyChannelRequest>(),
    );
  typia.assert(output);
};
