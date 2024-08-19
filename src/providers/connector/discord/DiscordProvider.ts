import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";

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
  ): Promise<IDiscord.IGuildResponse[]> {
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

  async LeaveGuild(input: IDiscord.ILeaveGuildRequest): Promise<void> {
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
          recipient_id: input.recepient_id,
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
  async createGuild(input: IDiscord.ICreateGuild): Promise<IDiscord.IGuild> {
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
    input: IDiscord.IModifyGuildReqeust,
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
  async getChannel() {}

  async modifyChannel() {}

  async deleteChannel() {}

  async createChannelInvite() {}

  async pinMessage() {}

  async unpinMessage() {}

  /**
   * Message
   */
  async getChannelMessageHistories() {}

  async createMessage() {}

  async crossPortMessage() {}

  async editMessage() {}

  async deleteMessage() {}

  async bulkDeleteMessages() {}

  private async refresh(refreshToken: string): Promise<string> {
    const res = await axios.post(
      "https://discord.com/api/v10/oauth2/token",
      {
        client_id: ConnectorGlobal.env.DISCORD_CLIENT_ID,
        client_secret: ConnectorGlobal.env.DISCORD_CLIENT_SECRET,
        refresh_token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return res.data.access_token;
  }
}
