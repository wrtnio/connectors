import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IChatbot } from "../../../../src/api/structures/connector/chatbot/IChatbot";

export const test_api_connector_chatbot_generate_hard_generateHardChatbot =
  async (connection: api.IConnection) => {
    const output: Primitive<IChatbot.IChatbotGenerateOutput> =
      await api.functional.connector.chatbot.generate.hard.generateHardChatbot(
        connection,
        typia.random<IChatbot.IChatBotHardGenerateInput>(),
      );
    typia.assert(output);
  };
