import { Injectable } from "@nestjs/common";
import { ISlack } from "@wrtn/connector-api/lib/structures/connector/slack/ISlack";
import axios from "axios";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";

@Injectable()
export class SlackProvider {
  async getUsers(
    input: ISlack.IGetUserListInput,
  ): Promise<ISlack.IGetUserListOutput> {
    const { secretKey, ...rest } = input;
    const queryParameter = createQueryParameter(rest);

    const url = `https://slack.com/api/users.list?pretty=1`;
    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const next_cursor = res.data.response_metadata?.next_coursor;
    const users = res.data.members.map((el: ISlack.User) => {
      return {
        id: el.id,
        name: el.name,
        real_name: el.real_name,
        display_name: el.profile.display_name,
        deleted: el.deleted,
        profile_image: el.profile.image_original
          ? el.profile.image_original
          : null,
      };
    });

    return { users, next_cursor: next_cursor ? next_cursor : null };
  }

  async sendTextToMyself(
    input: ISlack.IPostMessageToMyselfInput,
  ): Promise<void> {
    const url = `https://slack.com/api/chat.postMessage`;
    try {
      const { channels } = await this.getImChannels(input);
      const auth = await this.authTest(input);
      const mySelf = channels.find((el) => el.user === auth.user_id);
      await axios.post(
        url,
        {
          channel: mySelf?.id,
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

  async authTest(input: {
    secretKey: string;
  }): Promise<ISlack.IAuthTestOutput> {
    const res = await axios.get("https://slack.com/api/auth.test", {
      headers: {
        Authorization: `Bearer ${input.secretKey}`,
      },
    });

    return res.data;
  }

  async sendText(input: ISlack.IPostMessageInput): Promise<void> {
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
    const queryParameter = createQueryParameter(rest);

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
    const queryParameter = createQueryParameter({
      ...rest,
      types: "private_channel",
    });

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
    const queryParameter = createQueryParameter({
      ...rest,
      types: "public_channel",
    });

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
    const queryParameter = createQueryParameter({
      ...rest,
      types: "im",
    });

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
