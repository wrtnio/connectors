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
  async createChannel(
    @core.TypedBody() input: IDiscord.IDiscordChannelInput,
  ): Promise<IDiscord.IDiscordChannelOutput> {
    return await DiscordProvider.createChannel(input);
  }

  @core.TypedRoute.Post("/channels")
  async getChannel(
    @core.TypedBody() input: IDiscord.IDiscordGetChannelInput,
  ): Promise<IDiscord.IDiscordGetChannelOutput[]> {
    return await DiscordProvider.getChannels(input);
  }

  @core.TypedRoute.Post("/channel/message")
  async sendMessage(
    @core.TypedBody() input: IDiscord.IDiscordMessageInput,
  ): Promise<IDiscord.IDiscordMessageOutput> {
    return await DiscordProvider.sendMessage(input);
  }

  @core.TypedRoute.Post("/channel/invite")
  async inviteChnnel(
    @core.TypedBody() input: IDiscord.IDiscordInviteChannelInput,
  ): Promise<IDiscord.IDiscordInviteChannelOutput> {
    return await DiscordProvider.inviteChannel(input);
  }

  @core.TypedRoute.Post("/channel/direct-message")
  async directMessage(
    @core.TypedBody() input: IDiscord.IDiscordDirectMessageInput,
  ): Promise<IDiscord.IDiscordDirectMessageOutput> {
    return await DiscordProvider.directMessage(input);
  }

  @core.TypedRoute.Post("/user/:id")
  async findUserById(
    @core.TypedParam("id") userId: string,
  ): Promise<IDiscord.IDiscordFindUserOutput> {
    return await DiscordProvider.findUserById(userId);
  }
}
