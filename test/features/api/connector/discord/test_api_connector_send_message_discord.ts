import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_send_message_discord = async (
  connection: CApi.IConnection,
): Promise<IDiscord.IDiscordMessageOutput> => {
  const input: IDiscord.IDiscordMessageInput = {
    channelId: ConnectorGlobal.env.DISCORD_TEST_CHENNELID,
    message: "test",
  };
  const result =
    await CApi.functional.connector.discord.channel.message.sendMessage(
      connection,
      input,
    );
  typia.assertEquals(result);

  return result;
};
