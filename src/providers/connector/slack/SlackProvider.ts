import { Injectable } from "@nestjs/common";
import { ISlack } from "@wrtn/connector-api/lib/structures/connector/slack/ISlack";
import axios from "axios";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";

@Injectable()
export class SlackProvider {
  async sendReply(input: ISlack.IPostMessageReplyInput): Promise<void> {
    const url = `https://slack.com/api/chat.postMessage`;
    try {
      await axios.post(
        url,
        {
          channel: input.channel,
          thread_ts: input.ts,
          text: `이 메세지는 뤼튼 스튜디오 프로에 의해 전송됩니다.\n\n ${input.text}`,
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

  async getReplies(
    input: ISlack.IGetReplyInput,
  ): Promise<ISlack.IGetReplyOutput> {
    const { secretKey, ...rest } = input;
    const queryParameter = createQueryParameter(rest);

    const url = `https://slack.com/api/conversations.replies`;
    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const next_cursor = res.data.response_metadata?.next_cursor;
    const replies = res.data.messages.map(
      (message: ISlack.Reply): ISlack.Reply => {
        const timestampString = message.ts.split(".").at(0) + "000";
        const timestamp = Number(timestampString);

        return {
          type: message.type,
          user: message.user ?? null,
          text: message.text,
          ts: message.ts,
          tnread_ts: message.tnread_ts,
          parent_user_id: message.parent_user_id,
          tsDate: new Date(timestamp).toISOString(),
          ...(message.attachments && { attachments: message.attachments }),
        };
      },
    );

    return { replies, next_cursor: next_cursor ? next_cursor : null };
  }

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

    const next_cursor = res.data.response_metadata?.next_cursor;
    const users = res.data.members.map((el: ISlack.User) => {
      return {
        id: el.id,
        name: el.name,
        real_name: el.profile.real_name ?? null,
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
          text: `이 메세지는 뤼튼 스튜디오 프로에 의해 전송됩니다.\n\n ${input.text}`,
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
          text: `이 메세지는 뤼튼 스튜디오 프로에 의해 전송됩니다.\n\n ${input.text}`,
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

    const next_cursor = res.data.response_metadata?.next_cursor;
    const messages: ISlack.Message[] = res.data.messages.map(
      (message: ISlack.Message) => {
        const timestampString = message.ts.split(".").at(0) + "000";
        const timestamp = Number(timestampString);

        return {
          type: message.type,
          user: message.user ?? null,
          text: message.text,
          ts: message.ts,
          reply_count: message?.reply_count ?? 0,
          reply_users_count: message?.reply_users_count ?? 0,
          tsDate: new Date(timestamp).toISOString(),
          ...(message.attachments && { attachments: message.attachments }),
        };
      },
    );

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

    const next_cursor = res.data.response_metadata?.next_cursor;
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

    const next_cursor = res.data.response_metadata?.next_cursor;
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

    const next_cursor = res.data.response_metadata?.next_cursor;
    const channels = res.data.channels;

    return { channels, next_cursor: next_cursor ? next_cursor : null }; // next_cursor가 빈 문자인 경우 대비
  }
}
