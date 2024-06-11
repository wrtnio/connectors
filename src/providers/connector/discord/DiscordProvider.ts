import axios from "axios";

import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace DiscordProvider {
  const DISCORD_BOT_TOKEN = ConnectorGlobal.env.DISCORD_BOT_TOKEN;
  const DISCORD_API_BASE_URL = "https://discord.com/api/v10";
  const headers = {
    Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
    "Content-Type": "application/json",
  };

  export async function createChannel(
    input: IDiscord.IDiscordChannelInput,
  ): Promise<IDiscord.IDiscordChannelOutput> {
    try {
      const response = await axios.post(
        `${DISCORD_API_BASE_URL}/guilds/${input.guildId}/channels`,
        { name: input.channelName },
        { headers },
      );
      return response.data;
    } catch (error) {
      // @ts-ignore
      console.error("Error creating channel:", error.response.data);
      throw error;
      // res.status(error.response.status).json(error.response.data);
    }
  }

  export async function getChannels(
    input: IDiscord.IDiscordGetChannelInput,
  ): Promise<IDiscord.IDiscordGetChannelOutput[]> {
    try {
      const response = await axios.get(
        `${DISCORD_API_BASE_URL}/guilds/${input.guildId}/channels`,
        { headers },
      );
      // response.data.forEach((item: { last_message_id: any }) => {
      //   console.log(item.last_message_id);
      // });
      return response.data;
    } catch (error) {
      // @ts-ignore
      console.error("Error finding channels:", error.response.data);
      throw error;
    }
  }

  export async function sendMessage(
    input: IDiscord.IDiscordMessageInput,
  ): Promise<IDiscord.IDiscordMessageOutput> {
    try {
      const response = await axios.post(
        `${DISCORD_API_BASE_URL}/channels/${input.channelId}/messages`,
        { content: input.message },
        { headers },
      );
      return response.data;
    } catch (error) {
      // @ts-ignore
      console.error("Error sending channel message:", error.response.data);
      throw error;
    }
  }

  export async function inviteChannel(
    input: IDiscord.IDiscordInviteChannelInput,
  ): Promise<IDiscord.IDiscordInviteChannelOutput> {
    const maxAge = 86400,
      maxUses = 0;

    try {
      const response = await axios.post(
        `${DISCORD_API_BASE_URL}/channels/${input.channelId}/invites`,
        {
          max_age: maxAge,
          max_uses: maxUses,
        },
        { headers },
      );
      response.data.url = `https://discord.gg/${response.data.code}`;
      return response.data;
    } catch (error) {
      // @ts-ignore
      console.error("Error creating invite:", error.response.data);
      throw error;
    }
  }

  export async function directMessage(
    input: IDiscord.IDiscordDirectMessageInput,
  ): Promise<IDiscord.IDiscordDirectMessageOutput> {
    try {
      // Create DM channel
      const dmChannelResponse = await axios.post(
        `${DISCORD_API_BASE_URL}/users/@me/channels`,
        { recipient_id: input.userId },
        { headers },
      );

      const dmChannelId = dmChannelResponse.data.id;

      // Send message to DM channel
      const response = await axios.post(
        `${DISCORD_API_BASE_URL}/channels/${dmChannelId}/messages`,
        { content: input.message },
        { headers },
      );
      return response.data;
    } catch (error) {
      // @ts-ignore
      console.error("Error sending direct message:", error.response.data);
      throw error;
    }
  }

  export async function findUserById(
    userId: string,
  ): Promise<IDiscord.IDiscordFindUserOutput> {
    try {
      const response = await axios.get(
        `${DISCORD_API_BASE_URL}/users/${userId}`,
        { headers },
      );
      return response.data;
    } catch (error) {
      // @ts-ignore
      console.error("Error finding user by ID:", error.response.data);
      throw error;
    }
  }
}
