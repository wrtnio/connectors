import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_slack_get_private_channels = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.slack.get_private_channels.getPrivateChannels(
      connection,
      {
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  typia.assertEquals(res);
  return res.channels;
};

export const test_api_connector_slack_get_public_channels = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.slack.get_public_channels.getPublicChannels(
      connection,
      {
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  typia.assertEquals(res);
  return res.channels;
};

export const test_api_connector_slack_get_im_channels = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.slack.get_im_channels.getImChannels(
      connection,
      {
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  typia.assertEquals(res);
  return res.channels;
};

export const test_api_connector_slack_get_channel_histories = async (
  connection: CApi.IConnection,
) => {
  const channels =
    await test_api_connector_slack_get_public_channels(connection);

  const messages =
    await CApi.functional.connector.slack.get_channel_histories.getChannelHistories(
      connection,
      {
        channel: channels[0].id as any,
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  typia.assertEquals(messages);
  return messages;
};

export const test_api_connector_slack_send_text_message_to_public = async (
  connection: CApi.IConnection,
) => {
  const [PublicChannel] =
    await test_api_connector_slack_get_public_channels(connection);
  await CApi.functional.connector.slack.postMessage.text.sendText(connection, {
    channel: PublicChannel.id as any,
    text: "hello, world",
    secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
  });
};

export const test_api_connector_slack_send_scheduled_text_message_to_public =
  async (connection: CApi.IConnection) => {
    const [PublicChannel] =
      await test_api_connector_slack_get_public_channels(connection);

    const after1m = new Date().getTime() + 60000;
    const ts = String(after1m).split("").slice(0, -3).join("");
    await CApi.functional.connector.slack.scheduleMessage.text.sendScheduleMessage(
      connection,
      {
        channel: PublicChannel.id as any,
        text: "hello, world",
        post_at: ts,
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );
  };

export const test_api_connector_slack_add_reply_scheduled_text_message_to_public =
  async (connection: CApi.IConnection) => {
    const [PublicChannel] =
      await test_api_connector_slack_get_public_channels(connection);

    const after1m = new Date().getTime() + 60000;
    const ts = String(after1m).split("").slice(0, -3).join("");

    const parent =
      await CApi.functional.connector.slack.postMessage.text.sendText(
        connection,
        {
          channel: PublicChannel.id as any,
          text: "PARENT",
          secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
        },
      );

    const res =
      await CApi.functional.connector.slack.scheduleMessage.text.sendScheduleMessage(
        connection,
        {
          channel: PublicChannel.id as any,
          text: "SCHEDULED",
          post_at: ts,
          thread_ts: parent.ts as any,
          secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
        },
      );

    typia.assertEquals(res);

    return res;
  };

export const test_api_connector_slack_get_scheduled_messages = async (
  connection: CApi.IConnection,
) => {
  const before =
    await CApi.functional.connector.slack.get_scheduled_messages.getScheduledMessages(
      connection,
      {
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  const scheduledMessage =
    await test_api_connector_slack_add_reply_scheduled_text_message_to_public(
      connection,
    );

  const after =
    await CApi.functional.connector.slack.get_scheduled_messages.getScheduledMessages(
      connection,
      {
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  typia.assertEquals(after);
  assert(
    before.scheduled_messages.length + 1 === after.scheduled_messages.length,
  );
  assert(
    after.scheduled_messages.some(
      (el) => el.post_at === scheduledMessage.post_at,
    ),
  );
};

export const test_api_connector_slack_send_text_message_to_private = async (
  connection: CApi.IConnection,
) => {
  const [PrivateChannel] =
    await test_api_connector_slack_get_private_channels(connection);
  const message =
    await CApi.functional.connector.slack.postMessage.text.sendText(
      connection,
      {
        channel: PrivateChannel.id as any,
        text: "hello, world",
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  return message;
};

export const test_api_connector_slack_mark_message = async (
  connection: CApi.IConnection,
) => {
  const [PublicChannel] =
    await test_api_connector_slack_get_public_channels(connection);

  const message =
    await CApi.functional.connector.slack.postMessage.text.sendText(
      connection,
      {
        channel: PublicChannel.id as any,
        text: "hello, world",
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  const res = await CApi.functional.connector.slack.conversation.mark(
    connection,
    {
      channel: PublicChannel.id as any,
      ts: message.ts as any,
      secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
    },
  );

  typia.assertEquals(res);
};

export const test_api_connector_slack_send_text_message_to_myself = async (
  connection: CApi.IConnection,
) => {
  const message =
    await CApi.functional.connector.slack.postMessage.text.myself.sendTextToMyself(
      connection,
      {
        text: "hello, world",
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  return message;
};

export const test_api_connector_slack_get_users = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.slack.get_users.getUsers(
    connection,
    {
      secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
    },
  );

  typia.assert(res);
  return res.users;
};

export const test_api_connector_slack_reply = async (
  connection: CApi.IConnection,
) => {
  const histories =
    await test_api_connector_slack_get_channel_histories(connection);
  const history = histories.messages[0];
  const channel = history.channel;

  const before = await CApi.functional.connector.slack.get_replies.getReplies(
    connection,
    {
      channel: channel as any,
      ts: history.ts as any,
      secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
    },
  );

  typia.assertEquals(before);

  await CApi.functional.connector.slack.postMessage.reply.sendReply(
    connection,
    {
      channel: channel as any,
      ts: history.ts as any,
      secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      text: "hello, world",
    },
  );

  const after = await CApi.functional.connector.slack.get_replies.getReplies(
    connection,
    {
      channel: channel as any,
      ts: history.ts as any,
      secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
    },
  );

  typia.assertEquals(after);

  if (before.replies.length + 1 !== after.replies.length) {
    throw new Error("Reply가 추가되지 않은 것으로 추정되는 상태");
  }
};
