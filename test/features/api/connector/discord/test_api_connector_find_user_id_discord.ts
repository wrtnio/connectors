import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_find_user_id_discord = async (
  connection: CApi.IConnection,
): Promise<IDiscord.IDiscordFindUserOutput> => {
  const input: IDiscord.IDiscordFindUserInput = {
    userId: ConnectorGlobal.env.DISCORD_TEST_USERID,
  };
  const result =
    await CApi.functional.connector.discord.user.find_user_by_id.findUserById(
      connection,
      input,
    );
  typia.assertEquals(result);

  return result;
};
