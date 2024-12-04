import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IChatbot } from "../../../../src/api/structures/connector/chatbot/IChatbot";

export const test_api_connector_chatbot_generate_easy_generateEasyChatbot =
  async (connection: api.IConnection) => {
    const output: Primitive<IChatbot.IChatbotGenerateOutput> =
      await api.functional.connector.chatbot.generate.easy.generateEasyChatbot(
        connection,
        typia.random<IChatbot.IChatbotEasyGenerateInput>(),
      );
    typia.assert(output);
  };
