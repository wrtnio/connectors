import typia from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_delete_message_deleteMessage = async (
  connection: api.IConnection,
) => {
  const output =
    await api.functional.connector.discord.delete_message.deleteMessage(
      connection,
      typia.random<IDiscord.IDeleteMessageRequest>(),
    );
  typia.assert(output);
};
