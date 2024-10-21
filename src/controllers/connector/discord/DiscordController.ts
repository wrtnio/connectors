import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";
import { DiscordProvider } from "../../../providers/connector/discord/DiscordProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/discord")
export class DiscordController {
  constructor(private readonly discordProvider: DiscordProvider) {}
  /**
   * Create a new DM channel
   *
   * @summary Create a DM channel
   *
   * @param input
   * @returns Channel information
   */
  @core.TypedRoute.Post("create-dm")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async createDM(
    @core.TypedBody() input: IDiscord.ICreateDMRequest,
  ): Promise<IDiscord.IChannel> {
    return retry(() => this.discordProvider.createDM(input))();
  }

  /**
   * Modify server information
   *
   * @summary Modify server information
   *
   * @param input
   * @returns Modified server information
   */
  @core.TypedRoute.Post("modify-guild")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async modifyGuild(
    @core.TypedBody() input: IDiscord.IModifyGuildRequest,
  ): Promise<IDiscord.IGuild> {
    return retry(() => this.discordProvider.modifyGuild(input))();
  }

  /**
   * Get a list of channels on the server
   *
   * @summary Get a list of channels
   *
   * @param input
   * @returns List of channels
   */
  @core.TypedRoute.Post("get-guild-channels")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async getGuildChannels(
    @core.TypedBody() input: IDiscord.ISecret,
  ): Promise<IDiscord.IChannel[]> {
    return retry(() => this.discordProvider.getGuildChannels(input))();
  }

  /**
   * Create a new channel on the server
   *
   * @summary Create a channel
   *
   * @param input
   * @returns Created channel information
   */
  @core.TypedRoute.Post("create-guild-channel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async createGuildChannel(
    @core.TypedBody() input: IDiscord.ICreateGuildChannelRequest,
  ): Promise<IDiscord.IChannel> {
    return retry(() => this.discordProvider.createGuildChannel(input))();
  }

  /**
   * Get a list of members on the server
   *
   * @summary Get a list of members
   *
   * @param input
   * @returns List of server members
   */
  @core.TypedRoute.Post("get-list-guild-members")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async getListGuildMembers(
    @core.TypedBody() input: IDiscord.ISecret,
  ): Promise<IDiscord.IGuildMember[]> {
    return retry(() => this.discordProvider.getListGuildMembers(input))();
  }

  /**
   * Kicks selected members from the server
   *
   * @summary Kick members
   *
   * @param input
   * @returns
   *
   * @internal
   */
  @core.TypedRoute.Post("remove-guild-member")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async removeGuildMember(
    @core.TypedBody() input: IDiscord.IRemoveGuildMember,
  ): Promise<void> {
    return retry(() => this.discordProvider.removeGuildMember(input))();
  }

  /**
   * Modify channel information
   *
   * @summary Modify channel information
   *
   * @param input
   * @returns Modified channel information
   */
  @core.TypedRoute.Post("modify-channel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async modifyChannel(
    @core.TypedBody() input: IDiscord.IModifyChannelRequest,
  ): Promise<IDiscord.IChannel> {
    return retry(() => this.discordProvider.modifyChannel(input))();
  }

  /**
   * Delete the selected channel
   *
   * @summary Delete channel
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("delete-channel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async deleteChannel(
    @core.TypedBody() input: IDiscord.IDeleteChannelRequest,
  ): Promise<void> {
    return retry(() => this.discordProvider.deleteChannel(input))();
  }

  /**
   * Get a list of pinned messages in a channel
   *
   * @summary Get a list of pinned messages
   *
   * @param input
   * @returns a list of pinned messages
   */
  @core.TypedRoute.Post("get-pinned-messages")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async getPinnedMessages(
    @core.TypedBody() input: IDiscord.IGetPinnedMessagesRequest,
  ): Promise<IDiscord.IMessage[]> {
    return retry(() => this.discordProvider.getPinnedMessages(input))();
  }

  /**
   * Pin a message to a channel
   *
   * @summary Pin a message
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("pin-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async pinMessage(
    @core.TypedBody() input: IDiscord.IPinOrUnpinMessagesRequest,
  ): Promise<void> {
    return retry(() => this.discordProvider.pinMessage(input))();
  }

  /**
   * Unpin a pinned message from a channel
   *
   * @summary Unpin message
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("unpin-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async unpinMessage(
    @core.TypedBody() input: IDiscord.IPinOrUnpinMessagesRequest,
  ): Promise<void> {
    return retry(() => this.discordProvider.unpinMessage(input))();
  }

  /**
   * Get the messages that exist in the channel
   *
   * @summary Get a list of messages
   *
   * @param input
   * @returns List of messages
   */
  @core.TypedRoute.Post("get-channel-message-histories")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async getChannelMessageHistories(
    @core.TypedBody() input: IDiscord.IGetChannelMessageHistoriesRequest,
  ): Promise<IDiscord.IMessage[]> {
    return retry(() =>
      this.discordProvider.getChannelMessageHistories(input),
    )();
  }

  /**
   * Send a message
   *
   * @summary Send a message
   *
   * @param input
   * @returns The generated message
   */
  @core.TypedRoute.Post("create-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async createMessage(
    @core.TypedBody() input: IDiscord.ICreateMessageRequest,
  ): Promise<IDiscord.IMessage> {
    return retry(() => this.discordProvider.createMessage(input))();
  }

  /**
   * Modify the message
   *
   * @summary Modify message
   *
   * @param input
   * @returns Modified message
   */
  @core.TypedRoute.Post("edit-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async editMessage(
    @core.TypedBody() input: IDiscord.IEditMessageRequest,
  ): Promise<IDiscord.IMessage> {
    return retry(() => this.discordProvider.editMessage(input))();
  }

  /**
   * Delete message
   *
   * @summary Delete message
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("delete-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async deleteMessage(
    @core.TypedBody() input: IDiscord.IDeleteMessageRequest,
  ): Promise<void> {
    return retry(() => this.discordProvider.deleteMessage(input))();
  }

  /**
   * Delete multiple messages
   *
   * @summary Delete multiple messages
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("bulk-delete-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  @ApiTags("Discord")
  async bulkDeleteMessage(
    @core.TypedBody() input: IDiscord.IBulkDeleteMessagesRequest,
  ): Promise<void> {
    return retry(() => this.discordProvider.bulkDeleteMessages(input))();
  }
}
