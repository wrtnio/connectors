import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_create_channel_discord = async (
  connection: CApi.IConnection,
): Promise<IDiscord.IDiscordDirectMessageOutput> => {
  const input: IDiscord.IDiscordDirectMessageInput = {
    userId: ConnectorGlobal.env.DISCORD_TEST_USERID,
    message: "Hello, WRTN",
  };
  const result =
    await CApi.functional.connector.discord.channel.direct_message.directMessage(
      connection,
      input,
    );
  typia.assertEquals(result);

  return result;
};
