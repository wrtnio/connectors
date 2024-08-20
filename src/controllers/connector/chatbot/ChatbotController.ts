import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IChatbot } from "@wrtn/connector-api/lib/structures/connector/chatbot/IChatbot";

import { ChatbotProvider } from "../../../providers/connector/chatbot/ChatbotProvider";
import { retry } from "../../../utils/retry";
import { RouteIcon } from "@wrtnio/decorators";

@Controller("connector/chatbot")
export class ChatBotController {
  constructor(private readonly chatbotProvider: ChatbotProvider) {}

  /**
   * 쉬움 난이도로 제작된 챗봇을 사용합니다.
   *
   * 이 커넥터는 특수 목적으로 제작된 커넥터로써, 일반적인 상황에는 사용되지 않습니다.
   *
   * 스튜디오 1.0에서 마이그레이션된 챗봇을 사용할 때만 사용되는 커넥터 입니다.
   *
   * 일반 워크플로우를 챗봇으로 만들 때 사용되지 않는 커넥터입니다.
   *
   * @summary 난이도 쉬움 챗봇 사용
   *
   * @param input 쉬움 난이도로 제작된 챗봇을 사용하기 위한 정보
   *
   * @returns 챗봇의 답변
   *
   * @tag Chatbot
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
   * 어려움 난이도로 제작된 챗봇을 사용합니다.
   *
   * 이 커넥터는 특수 목적으로 제작된 커넥터로써, 일반적인 상황에는 사용되지 않습니다.
   *
   * 스튜디오 1.0에서 마이그레이션된 챗봇을 사용할 때만 사용되는 커넥터 입니다.
   *
   * 일반 워크플로우를 챗봇으로 만들 때 사용되지 않는 커넥터입니다.
   *
   * @summary 난이도 어려움 챗봇 사용
   *
   * @param input 어려움 난이도로 제작된 챗봇을 사용하기 위한 정보
   *
   * @returns 챗봇의 답변
   *
   * @tag Chatbot
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
