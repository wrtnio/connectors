import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_get_channels_discord = async (
  connection: CApi.IConnection,
): Promise<IDiscord.IDiscordGetChannelOutput[]> => {
  const input: IDiscord.IDiscordGetChannelInput = {
    guildId: ConnectorGlobal.env.DISCORD_TEST_GUILDID,
  };
  const result = await CApi.functional.connector.discord.channels.getChannel(
    connection,
    input,
  );
  typia.assertEquals(result);

  return result;
};
