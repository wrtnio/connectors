import { Injectable } from "@nestjs/common";
import { WebClient } from "@slack/web-api";
import { ISlack } from "@wrtn/connector-api/lib/structures/connector/slack/ISlack";
import { PickPartial } from "@wrtn/connector-api/lib/structures/types/PickPartial";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import axios from "axios";
import { randomUUID } from "node:crypto";
import slackifyMarkdown from "slackify-markdown";
import typia, { tags } from "typia";
import { ElementOf } from "../../../api/structures/types/ElementOf";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { retry } from "../../../utils/retry";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";
import { SlackTemplateProvider } from "./SlackTemplateProvider";

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
          text: `${input.text}\n\n\n\n> Sent by Action Agent in Wrtn Studio Pro`,
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

  async interactivity(input: ISlack.InteractiveComponentInput): Promise<any[]> {
    const { user, actions, message, channel } = input.payload;

    const block_id = actions.at(0)?.block_id;
    const value = actions.at(0)?.value;
    const blocks = message?.blocks;
    if (channel && blocks && value) {
      const selectedItemIdx = blocks.findIndex(
        (block) => block.block_id === block_id,
      );

      const [_, secretKey] = value.split("/");

      const users = await this.getAllUsers({ secretKey });
      const userDetail = users.find((el) => el.id === user.id);

      if (userDetail && selectedItemIdx && selectedItemIdx !== -1) {
        // 눌린 버튼의 다음 번 객체가 context block 이기 때문에 + 1을 더한다.
        const contextBlockIdx = selectedItemIdx + 1;
        const contextBlock = blocks.at(contextBlockIdx);
        const uniqueUserId = `${userDetail.display_name}(${userDetail.id})`;
        if (typia.is<ISlack.NoVoted>(contextBlock)) {
          contextBlock.elements = [
            {
              type: "image",
              image_url: userDetail.profile_image,
              alt_text: uniqueUserId,
            },
          ] as any;
        } else if (typia.is<ISlack.Voted>(contextBlock)) {
          const alreadyVoted = contextBlock.elements.findIndex(
            (voter) => voter.alt_text === uniqueUserId,
          );

          if (alreadyVoted !== -1) {
            // 이미 투표를 한 경우, 투표자 명단에서 제거한다.
            contextBlock.elements.splice(alreadyVoted, 1);
            if (contextBlock.elements.length === 0) {
              blocks[contextBlockIdx] = {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: "No votes",
                  },
                ],
              };
            }
          } else {
            // 아직 투표를 안한 경우, 투표자 명단에서 추가한다.
            contextBlock.elements.push({
              type: "image",
              image_url: userDetail.profile_image,
              alt_text: uniqueUserId,
            });
          }
        }
      }

      await new WebClient(secretKey).chat.update({
        channel: channel.id,
        blocks: blocks,
        ts: message.ts,
      });
    }

    return blocks ?? [];
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
    return this.sendMessage({
      channel: input.channel,
      secretKey: input.secretKey,
      text: input.text,
      thread_ts: input.ts,
    });
  }

  async getReplies(
    input: ISlack.IGetReplyInput,
  ): Promise<ISlack.IGetReplyOutput> {
    const { secretKey, ...rest } = input;
    const queryParameter = createQueryParameter(rest);

    const url = `https://slack.com/api/conversations.replies?pretty=1`;
    const token = await this.getToken(secretKey);

    const [{ url: workspaceUrl }, allMembers, { usergroups }, res] =
      await Promise.all([
        this.authTest(input),
        this.getAllUsers(input),
        this.getUserGroups(input),
        axios.get(`${url}&${queryParameter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8;",
          },
        }),
      ]);

    const link_count = 0;
    const next_cursor = res.data.response_metadata?.next_cursor;
    const replies: ISlack.ChannelHistory[] = res.data.messages
      .slice(1) // 0번째 인덱스는 부모 스레드가 나오기 때문
      .map(
        (message: ISlack.Reply): ISlack.ChannelHistory =>
          this.convertMessageFormat({
            message: { ...message, channel: input.channel },
            channel: input.channel,
            link_count,
            allMembers,
            workspaceUrl,
            allUsergroups: usergroups,
          }),
      );

    const includedUsergroups = this.extract("usergroup")?.({
      response: replies,
      allUserGroup: usergroups,
    });

    const userIds = Array.from(
      new Set(replies.map((message) => message.user).filter(Boolean)),
    );

    const members = userIds
      .map((userId) => {
        const member = allMembers.find((el) => el.id === userId);
        return member;
      })
      .filter(Boolean) as Pick<ISlack.IGetUserOutput, "id" | "display_name">[];

    return {
      replies,
      next_cursor: next_cursor ? next_cursor : null,
      members,
      usergroups: includedUsergroups ?? [],
      channel: await this.getChannelName(input),
    };
  }

  extract(target: "usergroup") {
    if (target === "usergroup") {
      return function (input: {
        response: Pick<ISlack.Message, "text">[];
        allUserGroup: ISlack.UserGroup[];
      }): ISlack.UserGroup[] {
        const refinedTags = Array.from(
          new Set(
            ...input.response.flatMap((message) => {
              const tags = message.text.match(/<!subteam\^\w+>/g);
              const refinedTags: string[] = tags
                ? Array.from(new Set(tags))
                : [];
              return refinedTags;
            }),
          ),
        );
        const includedUsergroups = input.allUserGroup.filter((usergroup) => {
          return refinedTags.includes(`<!subteam^${usergroup.id}>`);
        });

        return includedUsergroups;
      };
    }

    throw new Error("invalid target.");
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

  async getUserDetails(
    input: ISlack.IGetUserDetailInput,
  ): Promise<ISlack.IGetUserDetailOutput[]> {
    const response = [];

    const fetch = async (userId: string) => {
      const url = `https://slack.com/api/users.profile.get?include_labels=true&user=${userId}`;
      const token = await this.getToken(input.secretKey);
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;",
          },
        });

        if (typia.is<{ ok: false; error: "ratelimited" }>(res.data)) {
          throw new Error(res.data.error);
        }

        const fields = this.getUserProfileFields(res.data.profile);
        return { ...res.data.profile, fields };
      } catch (err) {
        console.error(JSON.stringify(err));
        throw err;
      }
    };

    for await (const userId of input.userIds) {
      const fetched = await retry(() => fetch(userId))();
      response.push({ ...fetched, id: userId });
    }

    return response;
  }

  async getUsers(
    input: ISlack.IGetUserListInput,
  ): Promise<ISlack.IGetUserListOutput> {
    const { secretKey, ...rest } = input;
    const queryParameter = createQueryParameter(rest);
    const im_channels = await this.__getAllImChannels(input);

    const url = `https://slack.com/api/users.list?pretty=1`;
    const token = await this.getToken(secretKey);
    const res = await axios.get(`${url}&${queryParameter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8;",
      },
    });

    const next_cursor = res.data.response_metadata?.next_cursor;
    type User = StrictOmit<ISlack.IGetUserOutput, "fields">;
    const users: User[] = res.data.members.map((el: ISlack.User): User => {
      const im_channel = im_channels.find((channel) => channel.user === el.id);
      return {
        id: el.id,
        slack_team_id: el.team_id,
        im_channel_id: im_channel?.id ?? null,
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
    const { channels } = await this.getImChannels(input);
    const auth = await this.authTest(input);
    const channel = channels.find((el) => el.user === auth.user_id);
    return this.sendMessage({
      channel: channel?.id as string,
      secretKey: input.secretKey,
      text: input.text,
    });
  }

  async updateMessage(
    input: ISlack.IUpdateMessageInput,
  ): Promise<ISlack.IUpdateMessageOutput> {
    const token = await this.getToken(input.secretKey);
    const client = new WebClient(token);
    const preconfiged = `${input.text}\n\n\n\n> Sent by Action Agent in Wrtn Studio Pro`;
    const text = slackifyMarkdown(preconfiged);
    const res = await client.chat.update({
      channel: input.channel,
      text: text.replaceAll("\\n", "\n"), // 줄바꿈 문자를 잘못 입력했을 경우에 대비한다.
      token,
      ts: input.thread_ts,
      attachments: [],
    });

    if (!res.ts) {
      throw new Error("Failed to update slack message");
    }

    return { ts: res.ts };
  }

  async getTeamInfo(input: ISlack.ISecret): Promise<{
    id: string;
    name: String;
    domain: string;
    email_domain: string;
    enterprise_id: string;
    enterprise_name: string;
  }> {
    const url = `https://slack.com/api/team.info`;
    const token = await this.getToken(input.secretKey);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.team;
  }

  private async sendMessage(input: {
    channel: string;
    text: string;
    secretKey: string;
    thread_ts?: string;
  }): Promise<Pick<ISlack.Message, "ts">> {
    const url = `https://slack.com/api/chat.postMessage`;
    const token = await this.getToken(input.secretKey);
    try {
      const preconfiged = `${input.text}\n\n\n\n> Sent by Action Agent in Wrtn Studio Pro`;
      const text = slackifyMarkdown(preconfiged);
      const res = await axios.post(
        url,
        {
          channel: input.channel,
          text: text.replaceAll("\\n", "\n"), // 줄바꿈 문자를 잘못 입력했을 경우에 대비한다.
          ...(input.thread_ts && { thread_ts: input.thread_ts }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const ts = res.data.ts;
      if (!ts) {
        throw new Error("Failed to send slack message.");
      }

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
    return this.sendMessage({
      channel: input.channel,
      secretKey: input.secretKey,
      text: input.text,
    });
  }

  async getChannelLinkHistories(
    input: ISlack.IGetChannelHistoryInput,
  ): Promise<ISlack.IGetChannelLinkHistoryOutput> {
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
    const [{ url: workspaceUrl }, allMembers, { usergroups }, res] =
      await Promise.all([
        this.authTest(input),
        this.getAllUsers(input),
        this.getUserGroups(input),
        axios.get(`${url}&${queryParameter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8;",
          },
        }),
      ]);

    const link_count = 0;
    const next_cursor = res.data.response_metadata?.next_cursor;
    const messages: ISlack.ChannelHistory[] = res.data.messages
      .map(
        (message: ISlack.Message): ISlack.ChannelHistory =>
          this.convertMessageFormat({
            message,
            channel: input.channel,
            link_count,
            allMembers,
            workspaceUrl,
            allUsergroups: usergroups,
          }),
      )
      .filter((message: ISlack.LinkMessage) => {
        return message.links.length !== 0;
      });

    const includedUsergroups = this.extract("usergroup")?.({
      response: messages,
      allUserGroup: usergroups,
    });

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
      usergroups: includedUsergroups ?? [],
      channel: await this.getChannelName(input),
    }; // next_cursor가 빈 문자인 경우 대비
  }

  async getChannelName(
    input: Pick<
      ISlack.IGetChannelHistoryInput,
      "channel_type" | "channel" | "secretKey"
    >,
  ): Promise<{ name: string | null }> {
    const { channel_type, channel: channel_id, secretKey } = input;
    if (channel_type === "public" || channel_type === undefined) {
      const channel = (await this.getAllPublicChannels({ secretKey })).find(
        (el) => el.id === channel_id,
      );
      if (channel) return { name: channel.name };
    } else if (channel_type === "private" || channel_type === undefined) {
      const channel = (await this.getAllPrivateChannels({ secretKey })).find(
        (el) => el.id === channel_id,
      );
      if (channel) return { name: channel.name };
    } else if (channel_type === "im" || channel_type === undefined) {
      const channel = (await this.getAllImChannels({ secretKey })).find(
        (el) => el.id === channel_id,
      );
      if (channel) return { name: channel.username ?? null };
    }

    return { name: null };
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
    const [{ url: workspaceUrl }, allMembers, { usergroups }, res] =
      await Promise.all([
        this.authTest(input),
        this.getAllUsers(input),
        this.getUserGroups(input),
        axios.get(`${url}&${queryParameter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8;",
          },
        }),
      ]);

    const link_count = 0;
    const next_cursor = res.data.response_metadata?.next_cursor;
    const messages: ISlack.ChannelHistory[] = res.data.messages.map(
      (message: ISlack.Message): ISlack.ChannelHistory =>
        this.convertMessageFormat({
          message,
          channel: input.channel,
          link_count,
          allMembers,
          workspaceUrl,
          allUsergroups: usergroups,
        }),
    );

    const includedUsergroups = this.extract("usergroup")?.({
      response: messages,
      allUserGroup: usergroups,
    });

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
      usergroups: includedUsergroups ?? [],
      channel: await this.getChannelName(input),
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
    const users = await this.getAllUsers(input);
    const response: Awaited<ReturnType<typeof this.getImChannels>>["channels"] =
      await this.__getAllImChannels(input);

    return response.map((channel) => {
      const user = users.find((user): boolean => user.id === channel.user);
      channel.username = user?.name ?? null;
      return channel;
    });
  }

  async __getAllImChannels(input: { secretKey: string }) {
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
    const { secretKey } = input;
    const queryParameter = createQueryParameter({ secretKey, types: "im" });
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

  async getFiles(input: ISlack.IGetFileInput): Promise<ISlack.IGetFileOutput> {
    const url = `https://slack.com/api/files.list`;
    const queryParameters = createQueryParameter({
      channel: input.channel,
      count: input.limit,
      page: input.page,
      ...(input.latestDateTime && {
        ts_to: this.transformDateTimeToTs(input.latestDateTime),
      }),
      ...(input.oldestDateTime && {
        ts_from: this.transformDateTimeToTs(input.oldestDateTime),
      }),
      ...(input.types && {
        types: Object.entries(input.types)
          .filter(([key, value]) => value === true)
          .map(([key]) => key)
          .join(","),
      }),
      user: input.user,
    });

    const token = await this.getToken(input.secretKey);
    const res = await axios.get(`${url}?${queryParameters}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8;",
      },
    });

    return res.data;
  }

  async vote(input: ISlack.IHoldVoteInput): Promise<ISlack.IHoldVoteOutput> {
    const token = await this.getToken(input.secretKey);
    const client = new WebClient(token);
    const auth = await client.auth.test();
    const user = await client.users.profile.get({ user: auth.user_id });

    const requester = user.profile?.display_name
      ? user.profile?.display_name
      : (user.profile?.real_name ?? "");

    const res = await client.chat.postMessage({
      channel: input.channel,
      blocks: SlackTemplateProvider.voteTemplate({
        secretKey: token,
        requester,
        title: input.title,
        items: input.items,
      }),
    });

    const ts = res.ts;
    if (ts) {
      return { ts, blocks: res.message?.blocks };
    }

    throw new Error("슬랙 템플릿 메시지 전송 실패");
  }

  async getUserGroups(
    input: ISlack.IGetUserGroupInput,
  ): Promise<ISlack.IGetUserGroupOutput> {
    try {
      const url = `https://slack.com/api/usergroups.list?include_users=true`;
      const token = await this.getToken(input.secretKey);
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8;",
        },
      });

      if (res.data.ok === false) {
        // Missing scope error
        throw new Error(JSON.stringify(res.data));
      }

      return res.data;
    } catch (err) {
      return { usergroups: [], ok: false };
    }
  }

  private getUserProfileFields(profile: { fields: Record<string, string> }) {
    if (profile?.fields) {
      const fields = Object.values(profile.fields)
        .map((el: any) => {
          return { [el.label]: el.value };
        })
        .reduce((acc, cur) => Object.assign(acc, cur), {});

      return fields;
    }

    return {};
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

  private convertMessageFormat(input: {
    message: PickPartial<ISlack.Message, "reply_count" | "reply_users_count">;
    channel: ISlack.Channel["id"];
    link_count: number;
    allMembers: StrictOmit<ISlack.IGetUserOutput, "fields">[];
    allUsergroups: ISlack.UserGroup[];
    workspaceUrl: string & tags.Format<"uri">;
  }): ISlack.ChannelHistory {
    function extractLinks(text: string): string[] {
      // URL 패턴을 찾는 정규식
      /**
       * <LINK|ALT>에서 LINK만 뽑도록 정의한 RegExp
       */
      const linkRegex = /(?<=<)https?:\/\/[^>|]+(?=>|)/g;

      // 입력 문자열에서 URL을 추출
      const links = text.match(linkRegex);

      // 링크가 없다면 빈 문자열 반환
      return links ? Array.from(new Set(links)) : [];
    }

    const timestamp = this.transformTsToTimestamp(input.message.ts);
    const speaker = input.allMembers.find((el) => el.id === input.message.user);
    const links = extractLinks(input.message.text);
    return {
      // type: input.message.type,
      user: input.message.user ?? null,
      username: speaker?.display_name ?? null,
      user_profile: speaker?.profile_image ?? null,
      text: input.message.text
        .replaceAll(/```[\s\S]+?```/g, "<CODE/>")
        .replaceAll(/<https?:\/\/[^\>]+>/g, () => {
          return `<LINK${input.link_count++}/>`;
        })
        .replace(/<!subteam\^(\w+)>/g, (_, id) => {
          const usergroup = input.allUsergroups.find(
            (usergroup) => usergroup.id === id,
          );
          return usergroup ? `@${usergroup.handle}` : `@${id}`; // 멤버가 없으면 원래 아이디를 유지
        })
        .replace(/@(\w+)/g, (_, id) => {
          const member = input.allMembers.find((member) => member.id === id);
          return member ? `@${member.name}` : `@${id}`; // 멤버가 없으면 원래 아이디를 유지
        }),
      links,
      ts: String(input.message.ts),
      channel: input.channel,
      reply_count: input.message?.reply_count ?? 0,
      reply_users_count: input.message?.reply_users_count ?? 0,
      ts_date: new Date(timestamp).toISOString(),
      link: `${input.workspaceUrl}archives/${input.channel}/p${input.message.ts.replace(".", "")}`,
      // usergroups,
      // ...(input.message.attachments && { attachments: input.message.attachments }),
    };
  }

  private async getToken(secretValue: string): Promise<string> {
    const secret = await OAuthSecretProvider.getSecretValue(secretValue);
    const token =
      typeof secret === "string"
        ? secret
        : (secret as IOAuthSecret.ISecretValue).value;

    return token;
  }

  async getOneSlackUserDetail(
    external_user_id: string,
    secretKey: string,
  ): Promise<
    StrictOmit<ISlack.IGetUserDetailOutput, "id"> & {
      profile_image: string | null;
    }
  > {
    const url = `https://slack.com/api/users.profile.get?include_labels=true&user=${external_user_id}`;
    const token = await this.getToken(secretKey);
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;",
        },
      });

      if (typia.is<{ ok: false; error: "ratelimited" }>(res.data)) {
        throw new Error(res.data.error);
      }

      const fields = this.getUserProfileFields(res.data.profile);
      return {
        ...res.data.profile,
        slack_team_id: res.data.team_id,
        profile_image: res.data.profile.image_original ?? null,
        fields,
      };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getOneOrCreateTeam(external_team_id: string) {
    const team = await ConnectorGlobal.prisma.slack_team.findFirst({
      where: { external_team_id },
    });

    if (!team) {
      return await ConnectorGlobal.prisma.slack_team.create({
        select: {
          id: true,
          external_team_id: true,
        },
        data: {
          id: randomUUID(),
          external_team_id,
        },
      });
    }

    return team;
  }

  async findMany(external_team_id: string) {
    const users = await ConnectorGlobal.prisma.slack_users.findMany({
      select: {
        id: true,
        slack_team_id: true,
        external_user_id: true,
        status_text: true,
        slack_last_snapshot: {
          select: {
            slack_user_snapshot: {
              select: {
                id: true,
                fields: true,
                display_name: true,
                real_name: true,
                deleted: true,
                profile_image: true,
                snapshot_at: true,
              },
            },
          },
        },
      },
      where: {
        slack_team: {
          external_team_id: external_team_id,
        },
      },
      orderBy: {
        slack_last_snapshot: {
          slack_user_snapshot: {
            snapshot_at: "asc", // 오래 전에 스냅샷된 것부터 조회한다.
          },
        },
      },
    });

    return users.length
      ? users.map((user) => {
          const slack_last_snapshot =
            user.slack_last_snapshot?.slack_user_snapshot;
          const fields = slack_last_snapshot?.fields;
          return {
            id: user.id,
            slack_team_id: user.slack_team_id,
            external_user_id: user.external_user_id,
            status_text: user.status_text,
            fields: JSON.parse(typeof fields === "string" ? fields : "{}"),
            display_name: slack_last_snapshot?.display_name ?? null,
            real_name: slack_last_snapshot?.real_name ?? null,
            deleted: slack_last_snapshot?.deleted ?? null,
            profile_image: slack_last_snapshot?.profile_image ?? null,
          };
        })
      : [];
  }

  async update(
    slack_user_id: string,
    input: StrictOmit<ISlack.IGetUserDetailOutput, "id"> & {
      profile_image: string | null;
    },
  ) {
    try {
      const snapshot = await ConnectorGlobal.prisma.slack_user_snapshots.create(
        {
          select: {
            id: true,
          },
          data: {
            id: randomUUID(),
            display_name: input.display_name,
            profile_image: input.profile_image,
            real_name: input.real_name,
            fields: JSON.stringify(input.fields),
            slack_user_id,
            deleted: false,
            snapshot_at: new Date(),
          },
        },
      );

      await ConnectorGlobal.prisma.slack_last_snapshots.update({
        data: {
          slack_user_snapshot_id: snapshot.id,
        },
        where: {
          slack_user_id,
        },
      });
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  }

  async create(
    team_id: string,
    external_user_id: string,
    input: StrictOmit<ISlack.IGetUserDetailOutput, "id"> & {
      profile_image: string | null;
    },
  ): Promise<void> {
    try {
      const id = randomUUID();
      await ConnectorGlobal.prisma.slack_users.create({
        data: {
          id: id,
          slack_team_id: team_id,
          external_user_id: external_user_id,
          slack_last_snapshot: {
            create: {
              slack_user_snapshot: {
                create: {
                  id: randomUUID(),
                  slack_user_id: id,
                  fields: JSON.stringify(input.fields),
                  display_name: input.display_name,
                  real_name: input.real_name,
                  profile_image: input.profile_image,
                  deleted: false,
                },
              },
            },
          },
        },
      });
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  }
}
