import typia from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_remove_guild_member_removeGuildMember =
  async (connection: api.IConnection) => {
    const output =
      await api.functional.connector.discord.remove_guild_member.removeGuildMember(
        connection,
        typia.random<IDiscord.IRemoveGuildMember>(),
      );
    typia.assert(output);
  };
