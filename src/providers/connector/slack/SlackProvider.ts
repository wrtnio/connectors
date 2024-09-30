import { Injectable } from "@nestjs/common";
import { ISlack } from "@wrtn/connector-api/lib/structures/connector/slack/ISlack";
import axios from "axios";
import { tags } from "typia";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { ElementOf } from "../../../api/structures/types/ElementOf";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";

@Injectable()
export class SlackProvider {
  async deleteScheduleMessage(
    input: ISlack.IDeleteSCheduleMessageInput,
  ): Promise<void> {
    try {
      const url = `https://slack.com/api/chat.deleteScheduledMessage`;
      const { secretKey, ...rest } = input;
      const token = await this.getToken(secretKey);

      await axios.post(
        url,
        {
          ...rest,
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

  async getScheduledMessages(
    input: ISlack.IGetScheduledMessageListInput,
  ): Promise<ISlack.IGetScheduledMessageListOutput> {
    const url = `https://slack.com/api/chat.scheduledMessages.list`;
    try {
      const { secretKey, ...rest } = input;
      const queryParameter = createQueryParameter(rest);
      const token = await this.getToken(secretKey);

      const res = await axios.post(
        `${url}?${queryParameter}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8;",
          },
        },
      );

      const { url: workspaceUrl } = await this.authTest(input);
      const next_cursor = res.data.response_metadata?.next_cursor;
      const scheduled_messages = res.data.scheduled_messages.map(
        (
          message: any,
        ): ElementOf<
          ISlack.IGetScheduledMessageListOutput["scheduled_messages"]
        > => {
          const timestampString =
            String(message.post_at).split(".").at(0) + "000";
          const timestamp = Number(timestampString);

          return {
            id: message.id,
            channel: message.channel_id,
            post_at: String(message.post_at) as string,
            post_at_date: new Date(timestamp).toISOString(),
            date_created: String(message.date_created),
            text: message.text,
          };
        },
      );

      return { scheduled_messages, next_cursor };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async sendScheduleMessage(
    input: ISlack.ISCheduleMessageInput,
  ): Promise<Pick<ISlack.ScheduledMessage, "post_at">> {
    const url = `https://slack.com/api/chat.scheduleMessage`;
    const token = await this.getToken(input.secretKey);

    try {
      const res = await axios.post(
        url,
        {
          channel: input.channel,
          text: `이 메세지는 뤼튼 스튜디오 프로에 의해 전송됩니다.\n\n ${input.text}`,
          post_at: input.post_at,
          ...(input.thread_ts && { thread_ts: input.thread_ts }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return { post_at: String(res.data.post_at) };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async mark(input: ISlack.IMarkInput): Promise<void> {
    const url = `https://slack.com/api/conversations.mark`;
    const token = await this.getToken(input.secretKey);

    try {
      await axios.post(
        url,
        {
          channel: input.channel,
          ts: input.ts,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async sendReply(
    input: ISlack.IPostMessageReplyInput,
  ): Promise<Pick<ISlack.Message, "ts">> {
    const url = `https://slack.com/api/chat.postMessage`;
    const token = await this.getToken(input.secretKey);

    try {
      const res = await axios.post(
        url,
        {
          channel: input.channel,
          thread_ts: input.ts,
          text: `이 메세지는 뤼튼 스튜디오 프로에 의해 전송됩니다.\n\n ${input.text}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return { ts: res.data.ts };
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

    const url = `https://slack.com/api/conversations.replies?pretty=1`;
    const token = await this.getToken(secretKey);

    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8;",
      },
    });

    const next_cursor = res.data.response_metadata?.next_cursor;
    const replies = res.data.messages
      .slice(1)
      .map((message: ISlack.Reply): ISlack.Reply => {
        const timestamp = this.transformTsToTimestamp(message.ts);

        return {
          type: message.type,
          user: message.user ?? null,
          text: message.text,
          ts: String(message.ts),
          thread_ts: message.thread_ts,
          parent_user_id: message.parent_user_id ?? null,
          ts_date: new Date(timestamp).toISOString(),
          ...(message.attachments && { attachments: message.attachments }),
        };
      });

    return { replies, next_cursor: next_cursor ? next_cursor : null };
  }

  async getAllUsers(input: {
    secretKey: string;
  }): Promise<Awaited<ReturnType<typeof this.getUsers>>["users"]> {
    let nextCursor: string | null = null;
    let response: Awaited<ReturnType<typeof this.getUsers>>["users"] = [];
    do {
      const { next_cursor, users } = await this.getUsers({
        secretKey: input.secretKey,
        ...(nextCursor ? { cursor: nextCursor } : {}),
        limit: 1000,
      });

      response = response.concat(users);
      nextCursor = next_cursor;
    } while (nextCursor);

    return response;
  }

  async getUsers(
    input: ISlack.IGetUserListInput,
  ): Promise<ISlack.IGetUserListOutput> {
    const { secretKey, ...rest } = input;
    const queryParameter = createQueryParameter(rest);

    const url = `https://slack.com/api/users.list?pretty=1`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8;",
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
  ): Promise<Pick<ISlack.Message, "ts">> {
    const url = `https://slack.com/api/chat.postMessage`;
    const token = await this.getToken(input.secretKey);
    try {
      const { channels } = await this.getImChannels(input);
      const auth = await this.authTest(input);
      const mySelf = channels.find((el) => el.user === auth.user_id);
      const res = await axios.post(
        url,
        {
          channel: mySelf?.id,
          text: `이 메세지는 뤼튼 스튜디오 프로에 의해 전송됩니다.\n\n ${input.text}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return { ts: res.data.ts };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async authTest(input: {
    secretKey: string;
  }): Promise<ISlack.IAuthTestOutput> {
    const token = await this.getToken(input.secretKey);
    const res = await axios.get("https://slack.com/api/auth.test", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async sendText(
    input: ISlack.IPostMessageInput,
  ): Promise<Pick<ISlack.Message, "ts">> {
    const url = `https://slack.com/api/chat.postMessage`;
    const token = await this.getToken(input.secretKey);
    try {
      const res = await axios.post(
        url,
        {
          channel: input.channel,
          text: `이 메세지는 뤼튼 스튜디오 프로에 의해 전송됩니다.\n\n ${input.text}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return { ts: res.data.ts };
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
    const queryParameter = createQueryParameter({
      channel: rest.channel,
      cursor: rest.cursor,
      limit: rest.limit,
      ...(input.latestDateTime && {
        latest: this.transformDateTimeToTs(input.latestDateTime),
      }),
      ...(input.oldestDateTime && {
        oldest: this.transformDateTimeToTs(input.oldestDateTime),
      }),
    });

    const token = await this.getToken(secretKey);

    const { url: workspaceUrl } = await this.authTest(input);
    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8;",
      },
    });

    const allMembers = await this.getAllUsers(input);

    const next_cursor = res.data.response_metadata?.next_cursor;
    const messages: ISlack.Message[] = res.data.messages.map(
      (message: ISlack.Message): ISlack.Message => {
        const timestamp = this.transformTsToTimestamp(message.ts);
        const text = message.text
          .replaceAll(/\`\`\`(.)+\`\`\`/gs, "<CODE/>")
          .replaceAll(/<https:\/\/(.)+>/gs, "<LINK/>")
          .replaceAll(/\n/gs, " ")
          .replace(/@(\w+)/g, (_, id) => {
            const member = allMembers.find((member) => member.id === id);
            return member ? `@${member.name}` : `@${id}`; // 멤버가 없으면 원래 아이디를 유지
          });

        return {
          type: message.type,
          user: message.user ?? null,
          text: text,
          ts: String(message.ts),
          channel: input.channel,
          reply_count: message?.reply_count ?? 0,
          reply_users_count: message?.reply_users_count ?? 0,
          ts_date: new Date(timestamp).toISOString(),
          link: `${workspaceUrl}archives/${input.channel}/p${message.ts.replace(".", "")}`,
          ...(message.attachments && { attachments: message.attachments }),
        };
      },
    );

    const userIds = Array.from(
      new Set(messages.map((message) => message.user).filter(Boolean)),
    );

    const members = userIds
      .map((userId) => {
        const member = allMembers.find((el) => el.id === userId);
        return member;
      })
      .filter(Boolean) as Pick<ISlack.IGetUserOutput, "id" | "display_name">[];

    return {
      messages,
      next_cursor: next_cursor ? next_cursor : null,
      members,
    }; // next_cursor가 빈 문자인 경우 대비
  }

  async getAllPrivateChannels(input: { secretKey: string }) {
    let nextCursor: string | null = null;
    let response: Awaited<
      ReturnType<typeof this.getPrivateChannels>
    >["channels"] = [];
    do {
      const { next_cursor, channels } = await this.getPrivateChannels({
        secretKey: input.secretKey,
        ...(nextCursor ? { cursor: nextCursor } : {}),
        limit: 1000,
      });

      response = response.concat(channels);
      nextCursor = next_cursor;
    } while (nextCursor);

    return response;
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

    const token = await this.getToken(secretKey);

    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8;",
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

  async getAllPublicChannels(input: { secretKey: string }) {
    let nextCursor: string | null = null;
    let response: Awaited<
      ReturnType<typeof this.getPublicChannels>
    >["channels"] = [];
    do {
      const { next_cursor, channels } = await this.getPublicChannels({
        secretKey: input.secretKey,
        ...(nextCursor ? { cursor: nextCursor } : {}),
        limit: 1000,
      });

      response = response.concat(channels);
      nextCursor = next_cursor;
    } while (nextCursor);

    return response;
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

    const token = await this.getToken(secretKey);
    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8;",
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

  async getAllImChannels(input: { secretKey: string }) {
    let nextCursor: string | null = null;
    let response: Awaited<ReturnType<typeof this.getImChannels>>["channels"] =
      [];
    do {
      const { next_cursor, channels } = await this.getImChannels({
        secretKey: input.secretKey,
        ...(nextCursor ? { cursor: nextCursor } : {}),
        limit: 1000,
      });

      response = response.concat(channels);
      nextCursor = next_cursor;
    } while (nextCursor);

    return response;
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

    const token = await this.getToken(secretKey);
    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8;",
      },
    });

    const next_cursor = res.data.response_metadata?.next_cursor;
    const channels = res.data.channels;

    return { channels, next_cursor: next_cursor ? next_cursor : null }; // next_cursor가 빈 문자인 경우 대비
  }

  private transformTsToTimestamp(ts: string) {
    const timestampString = ts.split(".").at(0) + "000";
    const timestamp = Number(timestampString);
    return timestamp;
  }

  private transformDateTimeToTs(dateTime: string & tags.Format<"date-time">) {
    const timestamp = new Date(dateTime).getTime();
    return this.transformTimestampToTs(timestamp);
  }

  private transformTimestampToTs(timestamp: number) {
    return String(timestamp).split("").slice(0, -3).join("");
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
