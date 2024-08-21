import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_discord = async (
  connection: CApi.IConnection,
) => {
  const secretKey = ConnectorGlobal.env.DISCORD_TEST_SECRET;

  /**
   * Get Current User
   */
  const user =
    await CApi.functional.connector.discord.get_current_user.getCurrentUser(
      connection,
      {
        secretKey: secretKey,
      },
    );
  typia.assertEquals(user);

  /**
   * Get Current User Guilds
   */
  const guilds =
    await CApi.functional.connector.discord.get_current_user_guilds.getCurrentUserGuilds(
      connection,
      {
        secretKey: secretKey,
      },
    );
  typia.assertEquals(guilds);

  const leaveGuildId = guilds[1].id;

  /**
   * Leave Guild
   */
  const leaveGuild =
    await CApi.functional.connector.discord.leave_guild.leaveGuild(connection, {
      guildId: leaveGuildId,
      secretKey: secretKey,
    });
  typia.assertEquals(leaveGuild);

  /**
   * Create Guild
   */
  const guild =
    await CApi.functional.connector.discord.create_guild.createGuild(
      connection,
      {
        name: "에코시스템",
        secretKey: secretKey,
      },
    );
  typia.assertEquals(guild);

  const guildId = guild.id;

  /**
   * Modify Guild
   */
  const modifyGuild =
    await CApi.functional.connector.discord.modify_guild.modifyGuild(
      connection,
      {
        guildId: guildId,
        name: "에코시스템2",
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
        guildId: guildId,
        secretKey: secretKey,
      },
    );
  typia.assertEquals(channels);

  /**
   * Get list Guild Members
   */
  const members =
    await CApi.functional.connector.discord.get_list_guild_members.getListGuildMembers(
      connection,
      {
        guildId: guildId,
        secretKey: secretKey,
      },
    );
  typia.assertEquals(members);

  /**
   * Create DM Channel
   */
  const dmChannel = await CApi.functional.connector.discord.create_dm.createDM(
    connection,
    {
      recipient_id: members[0].user!.id,
      secretKey: secretKey,
    },
  );
  typia.assert(dmChannel);

  /**
   * Remove Guild Member
   */
  const removeMember =
    await CApi.functional.connector.discord.remove_guild_member.removeGuildMember(
      connection,
      {
        guildId: guildId,
        userId: members[1].user!.id,
        secretKey: secretKey,
      },
    );
  typia.assertEquals(removeMember);

  /**
   * Create Guild Channel
   */
  const createChannel =
    await CApi.functional.connector.discord.create_guild_channel.createGuildChannel(
      connection,
      {
        guildId: guildId,
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
        secretKey: secretKey,
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
        secretKey: secretKey,
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
        channelId: channelId,
        secretKey: secretKey,
      },
    );
  typia.assertEquals(messageHistories);

  /**
   * Pin Message
   */
  const pinMessage =
    await CApi.functional.connector.discord.pin_message.pinMessage(connection, {
      channelId: channelId,
      messageId: messageHistories[0].id,
      secretKey: secretKey,
    });
  typia.assertEquals(pinMessage);

  /**
   * Unpin Message
   */
  const unpinMessage =
    await CApi.functional.connector.discord.unpin_message.unpinMessage(
      connection,
      {
        channelId: channelId,
        messageId: pinnedMessages[0].id,
        secretKey: secretKey,
      },
    );
  typia.assertEquals(unpinMessage);

  /**
   * Join Thread
   */
  const joinThread =
    await CApi.functional.connector.discord.join_thread.joinThread(connection, {
      channelId: channelId,
      secretKey: secretKey,
    });
  typia.assertEquals(joinThread);

  /**
   * Leave Thread
   */
  const leaveThread =
    await CApi.functional.connector.discord.leave_thread.leaveThread(
      connection,
      {
        channelId: channelId,
        secretKey: secretKey,
      },
    );
  typia.assertEquals(leaveThread);

  /**
   * Send Message
   */
  const sendMessage =
    await CApi.functional.connector.discord.create_message.createMessage(
      connection,
      {
        channelId: channelId,
        content: "안녕하세요!",
        secretKey: secretKey,
      },
    );
  typia.assertEquals(sendMessage);

  /**
   * Modify Message
   */
  const modifyMessage =
    await CApi.functional.connector.discord.edit_message.editMessage(
      connection,
      {
        channelId: channelId,
        messageId: sendMessage.id,
        content: "안녕하세요2!",
        secretKey: secretKey,
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
        channelId: channelId,
        messageId: sendMessage.id,
        secretKey: secretKey,
      },
    );
  typia.assertEquals(deleteMessage);

  /**
   * Bulk Delete Message
   */
  const bulkDeleteMessage =
    await CApi.functional.connector.discord.bulk_delete_message.bulkDeleteMessage(
      connection,
      {
        channelId: channelId,
        messages: [messageHistories[0].id, messageHistories[1].id],
        secretKey: secretKey,
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
        secretKey: secretKey,
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
        guildId: guildId,
        secretKey: secretKey,
      },
    );
  typia.assertEquals(deleteGuild);
};
