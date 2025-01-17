import core, { HumanRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark } from "@wrtnio/decorators";

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
   * @param input
   * @returns Channel information
   */
  @SelectBenchmark("디스코드 DM 채널 만들어줘")
  @HumanRoute()
  @core.TypedRoute.Post("create-dm")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns Modified server information
   */
  @SelectBenchmark("디스코드 길드 수정해줘")
  @HumanRoute()
  @core.TypedRoute.Post("modify-guild")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns List of channels
   */
  @SelectBenchmark("디스코드 길드 채널 조회해줘")
  @HumanRoute()
  @core.TypedRoute.Patch("get-guild-channels")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns Created channel information
   */
  @SelectBenchmark("디스코드 길드 채널 생성해줘")
  @HumanRoute()
  @core.TypedRoute.Post("create-guild-channel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns List of server members
   */
  @SelectBenchmark("디스코드 길드 멤버 조회해줘")
  @HumanRoute()
  @core.TypedRoute.Patch("get-list-guild-members")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns
   */
  @SelectBenchmark("디스코드 길드 멤버 지워줘")
  @SelectBenchmark("디스코드 길드 멤버 추방해줘")
  @HumanRoute()
  @core.TypedRoute.Post("remove-guild-member")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns Modified channel information
   */
  @SelectBenchmark("디스코드 채널 수정해줘")
  @SelectBenchmark("디스코드 채널 정보 수정해줘")
  @HumanRoute()
  @core.TypedRoute.Post("modify-channel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns
   */
  @SelectBenchmark("디스코드 채널 삭제해줘")
  @HumanRoute()
  @core.TypedRoute.Post("delete-channel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns a list of pinned messages
   */
  @SelectBenchmark("디스코드 핀꽂은 메세지만 조회해줘")
  @SelectBenchmark("디스코드 메세지 고정해둔 것들 조회해줘")
  @HumanRoute()
  @core.TypedRoute.Patch("get-pinned-messages")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns
   */
  @SelectBenchmark("디스코드 메시지 고정해줘")
  @HumanRoute()
  @core.TypedRoute.Post("pin-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns
   */
  @SelectBenchmark("디스코드 메시지 고정 해제해줘")
  @HumanRoute()
  @core.TypedRoute.Post("unpin-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns List of messages
   */
  @SelectBenchmark("디스코드 메시지 조회해줘")
  @HumanRoute()
  @core.TypedRoute.Patch("get-channel-message-histories")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns The generated message
   */
  @SelectBenchmark("디스코드 메시지 보내줘")
  @HumanRoute()
  @core.TypedRoute.Post("create-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns Modified message
   */
  @SelectBenchmark("디스코드 메시지 수정해줘")
  @HumanRoute()
  @core.TypedRoute.Post("edit-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns
   */
  @SelectBenchmark("디스코드 메시지 삭제해줘")
  @SelectBenchmark("디스코드 메시지 취소해줘")
  @SelectBenchmark("디스코드 메시지 전송 취소해줘")
  @HumanRoute()
  @core.TypedRoute.Post("delete-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
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
   * @param input
   * @returns
   */
  @SelectBenchmark("디스코드 메시지 삭제해줘")
  @SelectBenchmark("디스코드 메시지 취소해줘")
  @SelectBenchmark("디스코드 메시지 전송 취소해줘")
  @HumanRoute()
  @core.TypedRoute.Post("bulk-delete-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/discord.svg",
  )
  @ApiTags("Discord")
  async bulkDeleteMessage(
    @core.TypedBody() input: IDiscord.IBulkDeleteMessagesRequest,
  ): Promise<void> {
    return retry(() => this.discordProvider.bulkDeleteMessages(input))();
  }
}
