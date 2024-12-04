import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_create_message_createMessage = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IDiscord.IMessage> =
    await api.functional.connector.discord.create_message.createMessage(
      connection,
      typia.random<IDiscord.ICreateMessageRequest>(),
    );
  typia.assert(output);
};
