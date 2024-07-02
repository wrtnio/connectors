import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IChatbot } from "@wrtn/connector-api/lib/structures/connector/chatbot/IChatbot";

import { ChatbotProvider } from "../../../providers/connector/chatbot/ChatbotProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/chatbot")
export class ChatBotController {
  constructor(private readonly chatbotProvider: ChatbotProvider) {}

  /**
   * 쉬움 난이도로 제작된 챗봇을 사용합니다.
   *
   * @summary 난이도 쉬움 챗봇 사용
   *
   * @param input 쉬움 난이도로 제작된 챗봇을 사용하기 위한 정보
   *
   * @returns 챗봇의 답변
   *
   * @tag Chatbot
   */
  @core.TypedRoute.Post("generate/easy")
  async generateEasyChatbot(
    @core.TypedBody() input: IChatbot.IChatbotEasyGenerateInput,
  ): Promise<IChatbot.IChatbotGenerateOutput> {
    return retry(() => this.chatbotProvider.generateChat(input))();
  }

  /**
   * 어려움 난이도로 제작된 챗봇을 사용합니다.
   *
   * @summary 난이도 어려움 챗봇 사용
   *
   * @param input 어려움 난이도로 제작된 챗봇을 사용하기 위한 정보
   *
   * @returns 챗봇의 답변
   *
   * @tag Chatbot
   */
  @core.TypedRoute.Post("generate/hard")
  async generateHardChatbot(
    @core.TypedBody() input: IChatbot.IChatBotHardGenerateInput,
  ): Promise<IChatbot.IChatbotGenerateOutput> {
    return retry(() => this.chatbotProvider.generateChat(input))();
  }
}
