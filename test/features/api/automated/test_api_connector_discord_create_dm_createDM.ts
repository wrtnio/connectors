import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_create_dm_createDM = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IDiscord.IChannel> =
    await api.functional.connector.discord.create_dm.createDM(
      connection,
      typia.random<IDiscord.ICreateDMRequest>(),
    );
  typia.assert(output);
};
