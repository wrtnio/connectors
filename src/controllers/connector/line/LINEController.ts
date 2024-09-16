import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ILINE } from "@wrtn/connector-api/lib/structures/connector/line/ILINE";
import { RouteIcon } from "@wrtnio/decorators";
import { LINEProvider } from "../../../providers/connector/line/LINEProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/line")
export class LINEController {
  constructor(private readonly lineProvider: LINEProvider) {}

  /**
   * Send a message to a LINE chat
   *
   * You need to know both the chat ID and the message content.
   *
   * @summary Send a message to a LINE chat
   * @param input
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/LINE_full.svg",
  )
  @TypedRoute.Post("send-message")
  async sendMessage(@TypedBody() input: ILINE.ISendMessageInput): Promise<void> {
    return retry(() => this.lineProvider.sendMessage(input))();
  }

  /**
   * Get chat messages history
   *
   * Retrieves the history of messages in a specified LINE chat.
   *
   * @param input
   * @returns chat messages history
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/LINE_full.svg",
  )
  @TypedRoute.Post("get-chat-history")
  async getChatHistory(
    @TypedBody() input: ILINE.IGetChatHistoryInput,
  ): Promise<ILINE.IGetChatHistoryOutput> {
    return retry(() => this.lineProvider.getChatHistory(input))();
  }
}
