import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_discord = async (
  connection: CApi.IConnection,
) => {
  const secretKey = "1260868337467129989";
  /**
   * Modify Guild
   */
  const modifyGuild =
    await CApi.functional.connector.discord.modify_guild.modifyGuild(
      connection,
      {
        name: "뤼튼 스튜디오 길드",
        secretKey: secretKey,
      },
    );
  typia.assert(modifyGuild);

  /**
   * Get Guild Channels
   */
  const channels =
    await CApi.functional.connector.discord.get_guild_channels.getGuildChannels(
      connection,
      {
        secretKey: secretKey,
      },
    );
  typia.assert(channels);

  // /**
  //  * Get list Guild Members
  //  *
  //  * Cannot Bot
  //  */
  // const members =
  //   await CApi.functional.connector.discord.get_list_guild_members.getListGuildMembers(
  //     connection,
  //     {
  //       secretKey: secretKey,
  //     },
  //   );
  // typia.assert(members);

  // /**
  //  * Create DM Channel
  //  *
  //  * Wait
  //  */
  // const dmChannel = await CApi.functional.connector.discord.create_dm.createDM(
  //   connection,
  //   {
  //     recipient_id: members[0].user!.id,
  //     secretKey: secretKey,
  //   },
  // );
  // typia.assert(dmChannel);

  // /**
  //  * Remove Guild Member
  //  *
  //  * Wait
  //  */
  // const removeMember =
  //   await CApi.functional.connector.discord.remove_guild_member.removeGuildMember(
  //     connection,
  //     {
  //       userId: members[1].user!.id,
  //       secretKey: secretKey,
  //     },
  //   );
  // typia.assert(removeMember);

  /**
   * Create Guild Channel
   */
  const createChannel =
    await CApi.functional.connector.discord.create_guild_channel.createGuildChannel(
      connection,
      {
        name: "스튜디오 채널",
        type: 0,
        secretKey: secretKey,
      },
    );
  typia.assert(createChannel);

  const channelId = createChannel.id;

  /**
   * Modify Guild Channel
   */
  const modifyChannel =
    await CApi.functional.connector.discord.modify_channel.modifyChannel(
      connection,
      {
        channelId: channelId,
        name: "스튜디오 채널2",
      },
    );
  typia.assert(modifyChannel);

  /**
   * Get Pinned Messages
   */
  const pinnedMessages =
    await CApi.functional.connector.discord.get_pinned_messages.getPinnedMessages(
      connection,
      {
        channelId: channelId,
      },
    );
  typia.assert(pinnedMessages);

  /**
   * Get Channel Message Histories
   */
  const messageHistories =
    await CApi.functional.connector.discord.get_channel_message_histories.getChannelMessageHistories(
      connection,
      {
        channelId: "1260868337467129996",
      },
    );
  typia.assert(messageHistories);

  /**
   * Send Message
   */
  const sendMessage =
    await CApi.functional.connector.discord.create_message.createMessage(
      connection,
      {
        channelId: "1260868337467129996",
        content: "안녕하세요!",
      },
    );
  typia.assert(sendMessage);

  /**
   * Pin Message
   */
  const pinMessage =
    await CApi.functional.connector.discord.pin_message.pinMessage(connection, {
      channelId: "1260868337467129996",
      messageId: sendMessage.id,
    });
  typia.assert(pinMessage);

  /**
   * Unpin Message
   */
  const unpinMessage =
    await CApi.functional.connector.discord.unpin_message.unpinMessage(
      connection,
      {
        channelId: "1260868337467129996",
        messageId: sendMessage.id,
      },
    );
  typia.assert(unpinMessage);

  /**
   * Modify Message
   */
  const modifyMessage =
    await CApi.functional.connector.discord.edit_message.editMessage(
      connection,
      {
        channelId: "1260868337467129996",
        messageId: sendMessage.id,
        content: "안녕하세요2!",
      },
    );
  typia.assert(modifyMessage);

  /**
   * Delete Message
   */
  const deleteMessage =
    await CApi.functional.connector.discord.delete_message.deleteMessage(
      connection,
      {
        channelId: "1260868337467129996",
        messageId: sendMessage.id,
      },
    );
  typia.assert(deleteMessage);

  const sendMessageForBulkDeleteOne =
    await CApi.functional.connector.discord.create_message.createMessage(
      connection,
      {
        channelId: "1260868337467129996",
        content: "안녕하세요!",
      },
    );
  typia.assert(sendMessage);

  const sendMessageForBulkDeleteTwo =
    await CApi.functional.connector.discord.create_message.createMessage(
      connection,
      {
        channelId: "1260868337467129996",
        content: "안녕하세요!",
      },
    );
  typia.assert(sendMessage);

  /**
   * Bulk Delete Message
   */
  const bulkDeleteMessage =
    await CApi.functional.connector.discord.bulk_delete_message.bulkDeleteMessage(
      connection,
      {
        channelId: "1260868337467129996",
        messages: [
          sendMessageForBulkDeleteOne.id,
          sendMessageForBulkDeleteTwo.id,
        ],
      },
    );
  typia.assert(bulkDeleteMessage);

  /**
   * Delete Guild Channel
   */
  const deleteChannel =
    await CApi.functional.connector.discord.delete_channel.deleteChannel(
      connection,
      {
        channelId: channelId,
      },
    );
  typia.assert(deleteChannel);
};
