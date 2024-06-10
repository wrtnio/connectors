import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_create_channel_discord = async (
  connection: CApi.IConnection,
): Promise<IDiscord.IDiscordChannelOutput> => {
  const input: IDiscord.IDiscordChannelInput = {
    guildId: ConnectorGlobal.env.DISCORD_TEST_GUILDID,
    channelName: "new-channel",
  };
  const result = await CApi.functional.connector.discord.channel.createChannel(
    connection,
    input,
  );
  typia.assertEquals(result);

  return result;
};
