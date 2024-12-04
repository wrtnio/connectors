import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IDiscord } from "../../../../src/api/structures/connector/discord/IDiscord";

export const test_api_connector_discord_edit_message_editMessage = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IDiscord.IMessage> =
    await api.functional.connector.discord.edit_message.editMessage(
      connection,
      typia.random<IDiscord.IEditMessageRequest>(),
    );
  typia.assert(output);
};
