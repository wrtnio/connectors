import typia from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_pin_message_pinMessage = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.discord.pin_message.pinMessage(
    connection,
    typia.random<IDiscord.IPinOrUnpinMessagesRequest>(),
  );
  typia.assert(output);
};
