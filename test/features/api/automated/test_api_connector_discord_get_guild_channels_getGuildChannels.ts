import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_get_guild_channels_getGuildChannels =
  async (connection: api.IConnection) => {
    const output: Primitive<Array<IDiscord.IChannel>> =
      await api.functional.connector.discord.get_guild_channels.getGuildChannels(
        connection,
        typia.random<IDiscord.ISecret>(),
      );
    typia.assert(output);
  };
