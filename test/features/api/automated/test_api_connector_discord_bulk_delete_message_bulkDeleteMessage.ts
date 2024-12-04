import typia from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_bulk_delete_message_bulkDeleteMessage =
  async (connection: api.IConnection) => {
    const output =
      await api.functional.connector.discord.bulk_delete_message.bulkDeleteMessage(
        connection,
        typia.random<IDiscord.IBulkDeleteMessagesRequest>(),
      );
    typia.assert(output);
  };
