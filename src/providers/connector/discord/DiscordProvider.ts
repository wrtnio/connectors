import { Injectable } from "@nestjs/common";
import axios from "axios";
import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class DiscordProvider {
  async getListGuildMembers(
    input: IDiscord.ISecret,
  ): Promise<IDiscord.IGuildMember[]> {
    try {
      const guildId = await this.getGuildInfo(input.secretKey);
      const res = await axios.get(
        `https://discord.com/api/v10/guilds/${guildId}/members`,
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async createDM(input: IDiscord.ICreateDMRequest): Promise<IDiscord.IChannel> {
    try {
      const res = await axios.post(
        "https://discord.com/api/v10/users/@me/channels",
        {
          recipient_id: input.recipient_id,
        },
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async modifyGuild(
    input: IDiscord.IModifyGuildRequest,
  ): Promise<IDiscord.IGuild> {
    try {
      const guildId = await this.getGuildInfo(input.secretKey);
      const res = await axios.patch(
        `https://discord.com/api/v10/guilds/${guildId}`,
        {
          name: input.name,
        },
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getGuildChannels(
    input: IDiscord.ISecret,
  ): Promise<IDiscord.IChannel[]> {
    try {
      const guildId = await this.getGuildInfo(input.secretKey);
      const res = await axios.get(
        `https://discord.com/api/v10/guilds/${guildId}/channels`,
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async createGuildChannel(
    input: IDiscord.ICreateGuildChannelRequest,
  ): Promise<IDiscord.IChannel> {
    try {
      const guildId = await this.getGuildInfo(input.secretKey);
      const res = await axios.post(
        `https://discord.com/api/v10/guilds/${guildId}/channels`,
        {
          name: input.name,
          type: input.type,
          ...(input.topic && { topic: input.topic }),
        },
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async removeGuildMember(input: IDiscord.IRemoveGuildMember): Promise<void> {
    try {
      const guildId = await this.getGuildInfo(input.secretKey);
      await axios.delete(
        `https://discord.com/api/v10/guilds/${guildId}/members/${input.userId}`,
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  /**
   * Channel
   */
  async modifyChannel(
    input: IDiscord.IModifyChannelRequest,
  ): Promise<IDiscord.IChannel> {
    try {
      const res = await axios.patch(
        `https://discord.com/api/v10/channels/${input.channelId}`,
        {
          name: input.name,
        },
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async deleteChannel(input: IDiscord.IDeleteChannelRequest): Promise<void> {
    try {
      await axios.delete(
        `https://discord.com/api/v10/channels/${input.channelId}`,
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getPinnedMessages(
    input: IDiscord.IGetPinnedMessagesRequest,
  ): Promise<IDiscord.IMessage[]> {
    try {
      const res = await axios.get(
        `https://discord.com/api/v10/channels/${input.channelId}/pins`,
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async pinMessage(input: IDiscord.IPinOrUnpinMessagesRequest): Promise<void> {
    try {
      await axios.put(
        `https://discord.com/api/v10/channels/${input.channelId}/pins/${input.messageId}`,
        {},
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async unpinMessage(
    input: IDiscord.IPinOrUnpinMessagesRequest,
  ): Promise<void> {
    try {
      await axios.delete(
        `https://discord.com/api/v10/channels/${input.channelId}/pins/${input.messageId}`,
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  /**
   * Message
   */
  async getChannelMessageHistories(
    input: IDiscord.IGetChannelMessageHistoriesRequest,
    limit: number = 100,
    before?: string,
  ): Promise<IDiscord.IMessage[]> {
    const messages: IDiscord.IMessage[] = [];
    let hasMoreMessages = true;
    let lastMessageId = before;

    try {
      while (hasMoreMessages) {
        const res = await axios.get(
          `https://discord.com/api/v10/channels/${input.channelId}/messages`,
          {
            headers: {
              Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
            },
            params: {
              limit,
              before: lastMessageId,
            },
          },
        );

        const fetchedMessages = res.data;
        if (fetchedMessages.length === 0) {
          hasMoreMessages = false; // 더 이상 메시지가 없을 경우 종료
        } else {
          messages.push(...fetchedMessages);
          lastMessageId = fetchedMessages[fetchedMessages.length - 1].id; // 가장 마지막 메시지의 ID 저장
        }
      }

      return messages;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async createMessage(
    input: IDiscord.ICreateMessageRequest,
  ): Promise<IDiscord.IMessage> {
    try {
      const res = await axios.post(
        `https://discord.com/api/v10/channels/${input.channelId}/messages`,
        {
          content: input.content,
        },
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async editMessage(
    input: IDiscord.IEditMessageRequest,
  ): Promise<IDiscord.IMessage> {
    try {
      const res = await axios.patch(
        `https://discord.com/api/v10/channels/${input.channelId}/messages/${input.messageId}`,
        {
          content: input.content,
        },
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async deleteMessage(input: IDiscord.IDeleteMessageRequest): Promise<void> {
    try {
      await axios.delete(
        `https://discord.com/api/v10/channels/${input.channelId}/messages/${input.messageId}`,
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async bulkDeleteMessages(
    input: IDiscord.IBulkDeleteMessagesRequest,
  ): Promise<void> {
    try {
      await axios.post(
        `https://discord.com/api/v10/channels/${input.channelId}/messages/bulk-delete`,
        {
          messages: input.messages,
        },
        {
          headers: {
            Authorization: `Bot ${ConnectorGlobal.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  /**
   * Discord's OAuth Bot user 사용.
   * guild 정보를 secret으로 받아옴.
   */
  private async getGuildInfo(secretValue: string): Promise<string> {
    try {
      const secret = await OAuthSecretProvider.getSecretValue(secretValue);
      const guildId =
        typeof secret === "string"
          ? secret
          : (secret as IOAuthSecret.ISecretValue).value;
      return guildId;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
