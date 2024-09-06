import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtnio/decorators";

import { DiscordProvider } from "../../../providers/connector/discord/DiscordProvider";
import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";
import { retry } from "../../../utils/retry";

@Controller("connector/discord")
export class DiscordController {
  constructor(private readonly discordProvider: DiscordProvider) {}
  /**
   * 새로운 DM 채널을 만듭니다.
   *
   * @summary DM 채널 만들기
   *
   * @param input
   * @returns 채널 정보
   */
  @core.TypedRoute.Post("create-dm")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async createDM(
    @core.TypedBody() input: IDiscord.ICreateDMRequest,
  ): Promise<IDiscord.IChannel> {
    return retry(() => this.discordProvider.createDM(input))();
  }

  /**
   * 서버 정보를 수정합니다.
   *
   * @summary 서버 정보 수정하기
   *
   * @param input
   * @returns 수정된 서버 정보
   */
  @core.TypedRoute.Post("modify-guild")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async modifyGuild(
    @core.TypedBody() input: IDiscord.IModifyGuildRequest,
  ): Promise<IDiscord.IGuild> {
    return retry(() => this.discordProvider.modifyGuild(input))();
  }

  /**
   * 서버에 있는 채널 목록을 가져옵니다.
   *
   * @summary 채널 목록 가져오기
   *
   * @param input
   * @returns 채널 목록
   */
  @core.TypedRoute.Post("get-guild-channels")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async getGuildChannels(
    @core.TypedBody() input: IDiscord.ISecret,
  ): Promise<IDiscord.IChannel[]> {
    return retry(() => this.discordProvider.getGuildChannels(input))();
  }

  /**
   * 서버에 새로운 채널을 생성합니다.
   *
   * @summary 채널 생성하기
   *
   * @param input
   * @returns 생성된 채널 정보
   */
  @core.TypedRoute.Post("create-guild-channel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async createGuildChannel(
    @core.TypedBody() input: IDiscord.ICreateGuildChannelRequest,
  ): Promise<IDiscord.IChannel> {
    return retry(() => this.discordProvider.createGuildChannel(input))();
  }

  /**
   * 서버에 있는 멤버 목록을 가져옵니다.
   *
   * @summary 멤버 목록 가져오기
   *
   * @param input
   * @returns 서버 멤버 목록
   */
  @core.TypedRoute.Post("get-list-guild-members")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async getListGuildMembers(
    @core.TypedBody() input: IDiscord.ISecret,
  ): Promise<IDiscord.IGuildMember[]> {
    return retry(() => this.discordProvider.getListGuildMembers(input))();
  }

  /**
   * 서버에서 선택한 멤버를 추방합니다.
   *
   * @summary 멤버 추방하기
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
  async removeGuildMember(
    @core.TypedBody() input: IDiscord.IRemoveGuildMember,
  ): Promise<void> {
    return retry(() => this.discordProvider.removeGuildMember(input))();
  }

  /**
   * 채널 정보를 수정합니다.
   *
   * @summary 채널 정보 수정하기
   *
   * @param input
   * @returns 수정된 채널 정보
   */
  @core.TypedRoute.Post("modify-channel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async modifyChannel(
    @core.TypedBody() input: IDiscord.IModifyChannelRequest,
  ): Promise<IDiscord.IChannel> {
    return retry(() => this.discordProvider.modifyChannel(input))();
  }

  /**
   * 선택한 채널을 삭제합니다.
   *
   * @summary 채널 삭제하기
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("delete-channel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async deleteChannel(
    @core.TypedBody() input: IDiscord.IDeleteChannelRequest,
  ): Promise<void> {
    return retry(() => this.discordProvider.deleteChannel(input))();
  }

  /**
   * 채널에 고정된 메세지 목록을 가져옵니다.
   *
   * @summary 고정된 메세지 목록 가져오기
   *
   * @param input
   * @returns 고정된 메세지 목록
   */
  @core.TypedRoute.Post("get-pinned-messages")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async getPinnedMessages(
    @core.TypedBody() input: IDiscord.IGetPinnedMessagesRequest,
  ): Promise<IDiscord.IMessage[]> {
    return retry(() => this.discordProvider.getPinnedMessages(input))();
  }

  /**
   * 채널에 메세지를 고정합니다.
   *
   * @summary 메세지 고정하기
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("pin-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async pinMessage(
    @core.TypedBody() input: IDiscord.IPinOrUnpinMessagesRequest,
  ): Promise<void> {
    return retry(() => this.discordProvider.pinMessage(input))();
  }

  /**
   * 채널에 고정된 메세지를 고정 해제합니다.
   *
   * @summary 메세지 고정 해제하기
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("unpin-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async unpinMessage(
    @core.TypedBody() input: IDiscord.IPinOrUnpinMessagesRequest,
  ): Promise<void> {
    return retry(() => this.discordProvider.unpinMessage(input))();
  }

  /**
   * 채널에 존재하는 메세지들을 가져옵니다.
   *
   * @summary 메세지 목록 가져오기
   *
   * @param input
   * @returns 메세지 목록
   */
  @core.TypedRoute.Post("get-channel-message-histories")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async getChannelMessageHistories(
    @core.TypedBody() input: IDiscord.IGetChannelMessageHistoriesRequest,
  ): Promise<IDiscord.IMessage[]> {
    return retry(() =>
      this.discordProvider.getChannelMessageHistories(input),
    )();
  }

  /**
   * 메세지를 보냅니다.
   *
   * @summary 메세지 보내기
   *
   * @param input
   * @returns 생성된 메세지
   */
  @core.TypedRoute.Post("create-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async createMessage(
    @core.TypedBody() input: IDiscord.ICreateMessageRequest,
  ): Promise<IDiscord.IMessage> {
    return retry(() => this.discordProvider.createMessage(input))();
  }

  /**
   * 메세지를 수정합니다.
   *
   * @summary 메세지 수정하기
   *
   * @param input
   * @returns 수정된 메세지
   */
  @core.TypedRoute.Post("edit-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async editMessage(
    @core.TypedBody() input: IDiscord.IEditMessageRequest,
  ): Promise<IDiscord.IMessage> {
    return retry(() => this.discordProvider.editMessage(input))();
  }

  /**
   * 메세지를 삭제합니다.
   *
   * @summary 메세지 삭제하기
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("delete-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async deleteMessage(
    @core.TypedBody() input: IDiscord.IDeleteMessageRequest,
  ): Promise<void> {
    return retry(() => this.discordProvider.deleteMessage(input))();
  }

  /**
   * 메세지를 여러개 삭제합니다.
   *
   * @summary 메세지 여러개 삭제하기
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("bulk-delete-message")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/discord.svg",
  )
  async bulkDeleteMessage(
    @core.TypedBody() input: IDiscord.IBulkDeleteMessagesRequest,
  ): Promise<void> {
    return retry(() => this.discordProvider.bulkDeleteMessages(input))();
  }
}
