import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";
import qs from "qs";

@Injectable()
export class DiscordProvider {
  /**
   * User
   */
  async getCurrentUser(input: IDiscord.ISecret): Promise<IDiscord.IUser> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.get("https://discord.com/api/v10/users/@me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async getCurrentUserGuilds(
    input: IDiscord.ISecret,
  ): Promise<IDiscord.IGuild[]> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.get(
        "https://discord.com/api/v10/users/@me/guilds",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async leaveGuild(input: IDiscord.ILeaveGuildRequest): Promise<void> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      await axios.delete(
        `https://discord.com/api/v10/users/@me/guilds/${input.guildId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async createDM(input: IDiscord.ICreateDMRequest): Promise<IDiscord.IChannel> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.post(
        "https://discord.com/api/v10/users/@me/channels",
        {
          recipient_id: input.recipient_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  /**
   * Guild
   */
  async createGuild(
    input: IDiscord.ICreateGuildRequest,
  ): Promise<IDiscord.IGuild> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.post(
        "https://discord.com/api/v10/guilds",
        {
          name: input.name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.patch(
        `https://discord.com/api/v10/guilds/${input.guildId}`,
        {
          name: input.name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async deleteGuild(input: IDiscord.IDeleteGuildRequest): Promise<void> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      await axios.delete(
        `https://discord.com/api/v10/guilds/${input.guildId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getGuildChannels(
    input: IDiscord.IGetGuildChannelsRequest,
  ): Promise<IDiscord.IChannel[]> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.get(
        `https://discord.com/api/v10/guilds/${input.guildId}/channels`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.post(
        `https://discord.com/api/v10/guilds/${input.guildId}/channels`,
        {
          name: input.name,
          type: input.type,
          ...(input.topic && { topic: input.topic }),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getListGuildMembers(
    input: IDiscord.IGetListGuildMembersRequest,
  ): Promise<IDiscord.IGuildMember[]> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.get(
        `https://discord.com/api/v10/guilds/${input.guildId}/members`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      const accessToken = await this.refresh(input.secretKey);
      await axios.delete(
        `https://discord.com/api/v10/guilds/${input.guildId}/members/${input.userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.patch(
        `https://discord.com/api/v10/channels/${input.channelId}`,
        {
          name: input.name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      const accessToken = await this.refresh(input.secretKey);
      await axios.delete(
        `https://discord.com/api/v10/channels/${input.channelId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.get(
        `https://discord.com/api/v10/channels/${input.channelId}/pins`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      const accessToken = await this.refresh(input.secretKey);
      await axios.put(
        `https://discord.com/api/v10/channels/${input.channelId}/pins/${input.messageId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      const accessToken = await this.refresh(input.secretKey);
      await axios.delete(
        `https://discord.com/api/v10/channels/${input.channelId}/pins/${input.messageId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async joinThread(input: IDiscord.IJoinOrLeaveThreadRequest): Promise<void> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      await axios.put(
        `https://discord.com/api/v10/channels/${input.channelId}/thread-members/@me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async leaveThread(input: IDiscord.IJoinOrLeaveThreadRequest): Promise<void> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      await axios.delete(
        `https://discord.com/api/v10/channels/${input.channelId}/thread-members/@me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
  ): Promise<IDiscord.IMessage[]> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.get(
        `https://discord.com/api/v10/channels/${input.channelId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async createMessage(
    input: IDiscord.ICreateMessageRequest,
  ): Promise<IDiscord.IMessage> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.post(
        `https://discord.com/api/v10/channels/${input.channelId}/messages`,
        {
          content: input.content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async crossPostMessage(
    input: IDiscord.ICrossPostMessageRequest,
  ): Promise<IDiscord.IMessage> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.post(
        `https://discord.com/api/v10/channels/${input.channelId}/messages/${input.messageId}/crosspost`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      const accessToken = await this.refresh(input.secretKey);
      const res = await axios.patch(
        `https://discord.com/api/v10/channels/${input.channelId}/messages/${input.messageId}`,
        {
          content: input.content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      const accessToken = await this.refresh(input.secretKey);
      await axios.delete(
        `https://discord.com/api/v10/channels/${input.channelId}/messages/${input.messageId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      const accessToken = await this.refresh(input.secretKey);
      await axios.post(
        `https://discord.com/api/v10/channels/${input.channelId}/messages/bulk-delete`,
        {
          messages: input.messages,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  private async refresh(secretValue: string): Promise<string> {
    try {
      const secret = await OAuthSecretProvider.getSecretValue(secretValue);
      const refreshToken =
        typeof secret === "string"
          ? secret
          : (secret as IOAuthSecret.ISecretValue).value;
      const res = await axios.post(
        "https://discord.com/api/v10/oauth2/token",
        qs.stringify({
          client_id: ConnectorGlobal.env.DISCORD_CLIENT_ID,
          client_secret: ConnectorGlobal.env.DISCORD_CLIENT_SECRET,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      /**
       * Refresh Token이 일회용이므로 값 업데이트
       */
      await OAuthSecretProvider.updateSecretValue(
        (secret as IOAuthSecret.ISecretValue).id,
        {
          value: res.data.refresh_token,
        },
      );

      return res.data.access_token;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
