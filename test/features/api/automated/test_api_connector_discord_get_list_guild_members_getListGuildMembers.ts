import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_get_list_guild_members_getListGuildMembers =
  async (connection: api.IConnection) => {
    const output: Primitive<Array<IDiscord.IGuildMember>> =
      await api.functional.connector.discord.get_list_guild_members.getListGuildMembers(
        connection,
        typia.random<IDiscord.ISecret>(),
      );
    typia.assert(output);
  };
