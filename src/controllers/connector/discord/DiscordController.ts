import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IDiscord } from "@wrtn/connector-api/lib/structures/connector/discord/IDiscord";

import { DiscordProvider } from "../../../providers/connector/discord/DiscordProvider";

@Controller("connector/discord")
export class DiscordController {
  /**
   * 디스코드 서버에 채널을 생성합니다.
   *
   * @summary 디스코드 서버 채널 추가
   *
   * @param input 채널 이름
   *
   * @tag Discord Channel
   */
  @core.TypedRoute.Post("/channel")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/naver_cafe.svg",
  // )
  async createChannel(
    @core.TypedBody() input: IDiscord.IDiscordChannelInput,
  ): Promise<IDiscord.IDiscordChannelOutput> {
    return await DiscordProvider.createChannel(input);
  }

  @core.TypedRoute.Post("/channels")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/naver_cafe.svg",
  // )
  async getChannel(
    @core.TypedBody() input: IDiscord.IDiscordGetChannelInput,
  ): Promise<IDiscord.IDiscordGetChannelOutput[]> {
    return await DiscordProvider.getChannels(input);
  }

  @core.TypedRoute.Post("/channel/message")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/naver_cafe.svg",
  // )
  async sendMessage(
    @core.TypedBody() input: IDiscord.IDiscordMessageInput,
  ): Promise<IDiscord.IDiscordMessageOutput> {
    return await DiscordProvider.sendMessage(input);
  }

  @core.TypedRoute.Post("/channel/invite")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/naver_cafe.svg",
  // )
  async inviteChnnel(
    @core.TypedBody() input: IDiscord.IDiscordInviteChannelInput,
  ): Promise<IDiscord.IDiscordInviteChannelOutput> {
    return await DiscordProvider.inviteChannel(input);
  }

  @core.TypedRoute.Post("/channel/direct-message")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/naver_cafe.svg",
  // )
  async directMessage(
    @core.TypedBody() input: IDiscord.IDiscordDirectMessageInput,
  ): Promise<IDiscord.IDiscordDirectMessageOutput> {
    return await DiscordProvider.directMessage(input);
  }

  @core.TypedRoute.Post("/user/find-user-by-id")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/naver_cafe.svg",
  // )
  async findUserById(
    @core.TypedBody() input: IDiscord.IDiscordFindUserInput,
  ): Promise<IDiscord.IDiscordFindUserOutput> {
    return await DiscordProvider.findUserById(input);
  }
}
