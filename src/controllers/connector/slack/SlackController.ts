import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ISlack } from "@wrtn/connector-api/lib/structures/connector/slack/ISlack";
import { SlackProvider } from "../../../providers/connector/slack/SlackProvider";

@Controller("connector/slack")
export class SlackController {
  constructor(private readonly slackProvider: SlackProvider) {}

  @TypedRoute.Post("get-channel-histories")
  async getChannelHistories(
    @TypedBody() input: ISlack.IGetChannelHistoryInput,
  ): Promise<ISlack.IGetChannelHistoryOutput> {
    return this.slackProvider.getChannelHistories(input);
  }

  @TypedRoute.Post("get-private-channels")
  async getPrivateChannels(
    @TypedBody() input: ISlack.IGetChannelInput,
  ): Promise<ISlack.IGetPrivateChannelOutput> {
    return this.slackProvider.getPrivateChannels(input);
  }

  @TypedRoute.Post("get-public-channels")
  async getPublicChannels(
    @TypedBody() input: ISlack.IGetChannelInput,
  ): Promise<ISlack.IGetPublicChannelOutput> {
    return this.slackProvider.getPublicChannels(input);
  }

  @TypedRoute.Post("get-im-channels")
  async getImChannels(
    @TypedBody() input: ISlack.IGetChannelInput,
  ): Promise<ISlack.IGetImChannelOutput> {
    return this.slackProvider.getImChannels(input);
  }
}
