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
    const res = await this.slackProvider.getChannelHistories(input);
    return res;
  }

  @TypedRoute.Post("get-private-channels")
  async getPrivateChannels(
    @TypedBody() input: ISlack.IGetChannelInput,
  ): Promise<ISlack.IGetPrivateChannelOutput> {
    const res = await this.slackProvider.getPrivateChannels(input);
    return res;
  }

  @TypedRoute.Post("get-public-channels")
  async getPublicChannels(
    @TypedBody() input: ISlack.IGetChannelInput,
  ): Promise<ISlack.IGetPublicChannelOutput> {
    const res = await this.slackProvider.getPublicChannels(input);
    return res;
  }

  @TypedRoute.Post("get-im-channels")
  async getImChannels(
    @TypedBody() input: ISlack.IGetChannelInput,
  ): Promise<ISlack.IGetImChannelOutput> {
    const res = await this.slackProvider.getImChannels(input);
    return res;
  }
}
