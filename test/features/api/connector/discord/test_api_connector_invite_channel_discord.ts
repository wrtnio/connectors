import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_invite_channel_discord = async (
  connection: CApi.IConnection,
): Promise<IDiscord.IDiscordInviteChannelOutput> => {
  const input: IDiscord.IDiscordInviteChannelInput = {
    channelId: ConnectorGlobal.env.DISCORD_TEST_CHENNELID,
  };
  const result =
    await CApi.functional.connector.discord.channel.invite.inviteChnnel(
      connection,
      input,
    );
  typia.assertEquals(result);

  return result;
};
