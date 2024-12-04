import typia from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_delete_channel_deleteChannel = async (
  connection: api.IConnection,
) => {
  const output =
    await api.functional.connector.discord.delete_channel.deleteChannel(
      connection,
      typia.random<IDiscord.IDeleteChannelRequest>(),
    );
  typia.assert(output);
};
