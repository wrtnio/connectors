import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_get_pinned_messages_getPinnedMessages =
  async (connection: api.IConnection) => {
    const output: Primitive<Array<IDiscord.IMessage>> =
      await api.functional.connector.discord.get_pinned_messages.getPinnedMessages(
        connection,
        typia.random<IDiscord.IGetPinnedMessagesRequest>(),
      );
    typia.assert(output);
  };
