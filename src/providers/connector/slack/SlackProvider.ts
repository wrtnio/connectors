import { Injectable } from "@nestjs/common";
import { ISlack } from "@wrtn/connector-api/lib/structures/connector/slack/ISlack";
import axios from "axios";

@Injectable()
export class SlackProvider {
  async textMessage(input: ISlack.IPostMessageInput): Promise<void> {
    const url = `https://slack.com/api/chat.postMessage`;
    try {
      await axios.post(
        url,
        {
          channel: input.channel,
          text: input.text,
        },
        {
          headers: {
            Authorization: `Bearer ${input.secretKey}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getChannelHistories(
    input: ISlack.IGetChannelHistoryInput,
  ): Promise<ISlack.IGetChannelHistoryOutput> {
    const url = `https://slack.com/api/conversations.history?&pretty=1`;
    const { secretKey, ...rest } = input;
    const queryParameter = Object.entries({ ...rest })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const next_cursor = res.data.response_metadata?.next_coursor;
    const messages = res.data.messages.map((message: ISlack.Message) => {
      return {
        type: message.type,
        user: message.user,
        text: message.user,
        ts: message.ts,
        ...(message.attachments && { attachments: message.attachments }),
      };
    });

    return { messages, next_cursor: next_cursor ? next_cursor : null }; // next_cursor가 빈 문자인 경우 대비
  }

  async getPrivateChannels(
    input: ISlack.IGetChannelInput,
  ): Promise<ISlack.IGetPrivateChannelOutput> {
    const url = `https://slack.com/api/conversations.list?pretty=1`;
    const { secretKey, ...rest } = input;
    const queryParameter = Object.entries({ ...rest, types: "private_channel" })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const next_cursor = res.data.response_metadata?.next_coursor;
    const channels = res.data.channels.map((channel: ISlack.PrivateChannel) => {
      return {
        id: channel.id,
        name: channel.name,
      };
    });
    return { channels, next_cursor: next_cursor ? next_cursor : null }; // next_cursor가 빈 문자인 경우 대비
  }

  async getPublicChannels(
    input: ISlack.IGetChannelInput,
  ): Promise<ISlack.IGetPublicChannelOutput> {
    const url = `https://slack.com/api/conversations.list?pretty=1`;
    const { secretKey, ...rest } = input;
    const queryParameter = Object.entries({ ...rest, types: "public_channel" })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const next_cursor = res.data.response_metadata?.next_coursor;
    const channels = res.data.channels.map((channel: ISlack.PublicChannel) => {
      return {
        id: channel.id,
        name: channel.name,
      };
    });
    return { channels, next_cursor: next_cursor ? next_cursor : null }; // next_cursor가 빈 문자인 경우 대비
  }

  async getImChannels(
    input: ISlack.IGetChannelInput,
  ): Promise<ISlack.IGetImChannelOutput> {
    const url = `https://slack.com/api/conversations.list?pretty=1`;
    const { secretKey, ...rest } = input;
    const queryParameter = Object.entries({ ...rest, types: "im" })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const next_cursor = res.data.response_metadata?.next_coursor;
    const channels = res.data.channels;

    return { channels, next_cursor: next_cursor ? next_cursor : null }; // next_cursor가 빈 문자인 경우 대비
  }
}
