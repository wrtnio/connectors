import typia from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_unpin_message_unpinMessage = async (
  connection: api.IConnection,
) => {
  const output =
    await api.functional.connector.discord.unpin_message.unpinMessage(
      connection,
      typia.random<IDiscord.IPinOrUnpinMessagesRequest>(),
    );
  typia.assert(output);
};
