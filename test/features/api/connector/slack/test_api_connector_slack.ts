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

  typia.assert(res);
  return res;
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

  typia.assert(res);
  return res;
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

  typia.assert(res);
  return res;
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

  typia.assert(messages);
  return messages;
};

export const test_api_connector_slack_get_channel_histories_with_date_time =
  async (connection: CApi.IConnection) => {
    const channels =
      await test_api_connector_slack_get_public_channels(connection);

    const messages =
      await CApi.functional.connector.slack.get_channel_histories.getChannelHistories(
        connection,
        {
          channel: channels[0].id as any,
          secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
          oldestDateTime: new Date("2024-08-30").toISOString(),
          latestDateTime: new Date("2024-08-31").toISOString(),
        },
      );

    typia.assert(messages);
    return messages;
  };

export const test_api_connector_slack_send_text_message_to_public = async (
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

  await CApi.functional.connector.slack.message.updateMessage(connection, {
    thread_ts: message.ts,
    channel: PublicChannel.id as any,
    text: "hello, world[updated]",
    secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
  });
};

export const test_api_connector_slack_send_scheduled_text_message_to_public =
  async (connection: CApi.IConnection) => {
    const [PublicChannel] =
      await test_api_connector_slack_get_public_channels(connection);
    const after1m = new Date().getTime() + 60000;
    const ts = String(after1m).split("").slice(0, -3).join("");
    const res =
      await CApi.functional.connector.slack.scheduleMessage.text.sendScheduleMessage(
        connection,
        {
          channel: PublicChannel.id as any,
          text: "hello, world",
          post_at: ts,
          secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
        },
      );

    return typia.assert(res);
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

    typia.assert(res);

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

  typia.assert(after);
  assert(
    before.scheduled_messages.length + 1 === after.scheduled_messages.length,
  );
  assert(
    after.scheduled_messages.some(
      (el) => el.post_at === scheduledMessage.post_at,
    ),
  );
};

export const test_api_connector_slack_delete_scheduled_message = async (
  connection: CApi.IConnection,
) => {
  /**
   * 테스트 용으로 일단 예약 메시지를 생성한다.
   */
  const [PublicChannel] =
    await test_api_connector_slack_get_public_channels(connection);
  const after1m = new Date().getTime() + 60000 * 60;
  const ts = String(after1m).split("").slice(0, -3).join("");
  const scheduledMessage =
    await CApi.functional.connector.slack.scheduleMessage.text.sendScheduleMessage(
      connection,
      {
        channel: PublicChannel.id as any,
        text: "hello, world",
        post_at: ts,
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  /**
   * 테스트하기 전 전체 내역을 조회하여 메세지가 있는지 체크한다.
   */
  const before =
    await CApi.functional.connector.slack.get_scheduled_messages.getScheduledMessages(
      connection,
      {
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );
  const justScheduledMessage = before.scheduled_messages.find(
    (el) => el.post_at === scheduledMessage.post_at,
  );

  if (!justScheduledMessage) {
    throw new Error("삭제 테스트를 위한 예약 메세지 추가 실패");
  }
  /**
   * 생성했던 예약 메세지를 삭제한다.
   */
  await CApi.functional.connector.slack.scheduleMessage.deleteScheduleMessage(
    connection,
    {
      secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      channel: justScheduledMessage?.channel as string,
      scheduled_message_id: justScheduledMessage?.id as string,
    },
  );

  const after =
    await CApi.functional.connector.slack.get_scheduled_messages.getScheduledMessages(
      connection,
      {
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  /**
   * 삭제 후에는 목록에서 찾을 수 없어야 한다.
   */
  assert(
    after.scheduled_messages.every(
      (el) => el.post_at !== scheduledMessage.post_at,
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

  await CApi.functional.connector.slack.message.updateMessage(connection, {
    thread_ts: message.ts,
    channel: PrivateChannel.id as any,
    text: "hello, world[updated]",
    secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
  });

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

  typia.assert(res);
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

  typia.assert(before);

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

  typia.assert(after);

  if (before.replies.length + 1 !== after.replies.length) {
    throw new Error("Reply가 추가되지 않은 것으로 추정되는 상태");
  }
};

export const test_api_connector_slack_get_channel_link_histories = async (
  connection: CApi.IConnection,
) => {
  const [PublicChannel] =
    await test_api_connector_slack_get_public_channels(connection);
  await CApi.functional.connector.slack.postMessage.text.sendText(connection, {
    channel: PublicChannel.id as any,
    text: "1. [뤼튼 홈페이지](https://wrtn.ai)\n2. [뤼튼 홈페이지](https://wrtn.io)",
    secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
  });

  const res =
    await CApi.functional.connector.slack.get_channel_link_histories.getChannelLinkHistories(
      connection,
      {
        channel: PublicChannel.id as string,
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  assert(res.messages.length > 0);
  typia.assert(res);
};

export const test_api_connector_slack_get_user_details = async (
  connection: CApi.IConnection,
) => {
  const users = await CApi.functional.connector.slack.get_users.getUsers(
    connection,
    { secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET },
  );

  assert(users.users.length >= 1);
  for await (const user of users.users) {
    const detail =
      await CApi.functional.connector.slack.get_user_details.getUserDetails(
        connection,
        {
          userIds: [user.id],
          secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
        },
      );
    typia.assert(detail);
  }
};

export const test_api_connector_slack_get_one_user_detail = async (
  connection: CApi.IConnection,
) => {
  const detail =
    await CApi.functional.connector.slack.get_user_details.getUserDetails(
      connection,
      {
        userIds: ["U07EDKF5EKZ"],
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  typia.assert(detail);
  assert(detail.length === 1);
};

export const test_api_connector_slack_get_files = async (
  connection: CApi.IConnection,
) => {
  const pages = [1, 2, 3, 4, 5];
  for await (const page of pages) {
    const files = await CApi.functional.connector.slack.get_files.getFiles(
      connection,
      {
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
        page: page,
      },
    );

    typia.assert(files);
  }
};

export const test_api_connector_slack_get_image_and_pdf_files = async (
  connection: CApi.IConnection,
) => {
  const pages = [1, 2, 3, 4, 5];
  for await (const page of pages) {
    const files = await CApi.functional.connector.slack.get_files.getFiles(
      connection,
      {
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
        types: {
          images: true,
          pdfs: true,
        },
        page: page,
      },
    );

    typia.assert(files);
  }
};
