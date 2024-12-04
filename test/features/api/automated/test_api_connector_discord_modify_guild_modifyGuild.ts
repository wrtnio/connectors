import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_modify_guild_modifyGuild = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IDiscord.IGuild> =
    await api.functional.connector.discord.modify_guild.modifyGuild(
      connection,
      typia.random<IDiscord.IModifyGuildRequest>(),
    );
  typia.assert(output);
};
