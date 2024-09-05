import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_discord = async (
  connection: CApi.IConnection,
) => {
  const secretKey = ConnectorGlobal.env.DISCORD_BOT_TOKEN;

  /**
   * Get Current User
   */
  const user =
    await CApi.functional.connector.discord.get_current_user.getCurrentUser(
      connection,
    );
  typia.assertEquals(user);

  /**
   * Get Current User Guilds
   */
  const guilds =
    await CApi.functional.connector.discord.get_current_user_guilds.getCurrentUserGuilds(
      connection,
    );
  typia.assertEquals(guilds);

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
  typia.assertEquals(modifyGuild);

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
  typia.assertEquals(channels);

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
  // typia.assertEquals(members);

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
  // typia.assertEquals(removeMember);

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
  typia.assertEquals(createChannel);

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
  typia.assertEquals(modifyChannel);

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
  typia.assertEquals(pinnedMessages);

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
  typia.assertEquals(messageHistories);

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
  typia.assertEquals(sendMessage);

  /**
   * Pin Message
   */
  const pinMessage =
    await CApi.functional.connector.discord.pin_message.pinMessage(connection, {
      channelId: "1260868337467129996",
      messageId: sendMessage.id,
    });
  typia.assertEquals(pinMessage);

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
  typia.assertEquals(unpinMessage);

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
  typia.assertEquals(modifyMessage);

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
  typia.assertEquals(deleteMessage);

  const sendMessageForBulkDeleteOne =
    await CApi.functional.connector.discord.create_message.createMessage(
      connection,
      {
        channelId: "1260868337467129996",
        content: "안녕하세요!",
      },
    );
  typia.assertEquals(sendMessage);

  const sendMessageForBulkDeleteTwo =
    await CApi.functional.connector.discord.create_message.createMessage(
      connection,
      {
        channelId: "1260868337467129996",
        content: "안녕하세요!",
      },
    );
  typia.assertEquals(sendMessage);

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
  typia.assertEquals(bulkDeleteMessage);

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
  typia.assertEquals(deleteChannel);

  /**
   * Delete Guild
   */
  const deleteGuild =
    await CApi.functional.connector.discord.delete_guild.deleteGuild(
      connection,
      {
        secretKey: secretKey,
      },
    );
  typia.assertEquals(deleteGuild);
};
