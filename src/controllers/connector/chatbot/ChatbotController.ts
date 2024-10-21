import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IChatbot } from "@wrtn/connector-api/lib/structures/connector/chatbot/IChatbot";

import { RouteIcon } from "@wrtnio/decorators";
import { ChatbotProvider } from "../../../providers/connector/chatbot/ChatbotProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/chatbot")
export class ChatBotController {
  constructor(private readonly chatbotProvider: ChatbotProvider) {}

  /**
   * Use a chatbot built with Easy difficulty
   *
   * This connector is a special purpose connector and is not used in general situations.
   * This connector is only used when using a chatbot migrated from Studio 1.0.
   * This connector is not used when creating a chatbot from a general workflow.
   *
   * @summary Use Easy difficulty chatbot
   * @param input Information for using a chatbot built with Easy difficulty
   * @returns The chatbot's response
   */
  @RouteIcon(
    "https://gh-devs-be.s3.ap-northeast-2.amazonaws.com/icon/full/_Studio1.0Chatbot_full.svg",
  )
  @core.TypedRoute.Post("generate/easy")
  async generateEasyChatbot(
    @core.TypedBody() input: IChatbot.IChatbotEasyGenerateInput,
  ): Promise<IChatbot.IChatbotGenerateOutput> {
    return retry(() => this.chatbotProvider.generateChat(input))();
  }

  /**
   * Use a chatbot built with the Hard difficulty level
   *
   * This connector is a special purpose connector and is not used in general situations.
   * This connector is only used when using a chatbot migrated from Studio 1.0.
   * This connector is not used when creating a chatbot from a general workflow.
   *
   * @summary Use a chatbot with the Hard difficulty level
   * @param input Information for using a chatbot built with the Hard difficulty level
   * @returns The chatbot's response
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/_Studio1.0Chatbot_full.svg",
  )
  @core.TypedRoute.Post("generate/hard")
  async generateHardChatbot(
    @core.TypedBody() input: IChatbot.IChatBotHardGenerateInput,
  ): Promise<IChatbot.IChatbotGenerateOutput> {
    return retry(() => this.chatbotProvider.generateChat(input))();
  }
}
