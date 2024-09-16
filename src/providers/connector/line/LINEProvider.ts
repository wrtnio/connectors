import { Injectable } from "@nestjs/common";
import { ILINE } from "@wrtn/connector-api/lib/structures/connector/line/ILINE";
import axios from "axios";
import { tags } from "typia";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";

@Injectable()
export class LINEProvider {
  async sendMessage(input: ILINE.ISendMessageInput): Promise<void> {
    try {
      const url = `https://api.line.me/v2/bot/message/push`;
      const { secretKey, ...rest } = input;
      const token = await this.getToken(secretKey);

      await axios.post(
        url,
        {
          to: rest.to,
          messages: rest.messages,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8;",
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getChatHistory(
    input: ILINE.IGetChatHistoryInput,
  ): Promise<ILINE.IGetChatHistoryOutput> {
    const url = `https://api.line.me/v2/bot/message/${input.chatId}/history`;
    try {
      const { secretKey, ...rest } = input;
      const queryParameter = createQueryParameter(rest);
      const token = await this.getToken(secretKey);

      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8;",
        },
      });

      const messages = res.data.messages.map((message: any) => ({
        id: message.id,
        type: message.type,
        text: message.text,
        createdTime: message.createdTime,
        from: message.from,
      }));

      return { messages };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  private async getToken(secretValue: string): Promise<string> {
    const secret = await OAuthSecretProvider.getSecretValue(secretValue);
    const token =
      typeof secret === "string"
        ? secret
        : (secret as IOAuthSecret.ISecretValue).value;

    return token;
  }
}
