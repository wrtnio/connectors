import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ISlack } from "@wrtn/connector-api/lib/structures/connector/slack/ISlack";
import { RouteIcon } from "@wrtnio/decorators";
import { SlackProvider } from "../../../providers/connector/slack/SlackProvider";

@Controller("connector/slack")
export class SlackController {
  constructor(private readonly slackProvider: SlackProvider) {}

  /**
   * send message to myself
   *
   * Here, you can send a message as long as you have the message.
   * This feature identifies who the token's users are inside and sends a message to themselves.
   * Therefore, even if you don't specify a channel,
   * you send a message to the `im` channel that corresponds to your own user id.
   *
   * @summary post text message to myself in slack
   * @param input
   * @returns channel histories
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("postMessage/text/myself")
  async sendTextToMyself(
    @TypedBody() input: ISlack.IPostMessageToMyselfInput,
  ): Promise<void> {
    return this.slackProvider.sendTextToMyself(input);
  }

  /**
   * send message to channel
   *
   * Here, you can send a message as long as you have the message and channel information you want to send.
   *
   * @summary post text message in slack
   * @param input
   * @returns channel histories
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("postMessage/text")
  async sendText(@TypedBody() input: ISlack.IPostMessageInput): Promise<void> {
    return this.slackProvider.sendText(input);
  }

  /**
   * Look up the list of users in Slack.
   *
   * Users include bots and refer to all users in the team who are looking up.
   * Here, you can look up the user's ID and name, the name the user wanted to display, the profile image, and whether the user has been deleted.
   * If you look up the user here, you can send a message to your colleagues on a specific direct channel, such as an `im` ( = channel type. )
   *
   * This connector is essential because the `im` channel query only shows the user's ID and does not know who the direct channel is talking to.
   *
   * The user has a separate display name.
   * A display name is a name that the user has chosen to show.
   * Therefore, it would be best to use this name as a courtesy.
   *
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Get("get-users")
  async getUsers(
    input: ISlack.IGetUserListInput,
  ): Promise<ISlack.IGetUserListOutput> {
    return this.slackProvider.getUsers(input);
  }

  /**
   * get channel histories in slack
   *
   * Look up conversations that have been made in and out of the channel.
   * When you look up a conversation,
   * you can search only after a specific time or before a specific time in order to look up the time zone of the conversation you want to search for.
   *
   * @summary get channel histories in slack
   * @param input
   * @returns channel histories
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("get-channel-histories")
  async getChannelHistories(
    @TypedBody() input: ISlack.IGetChannelHistoryInput,
  ): Promise<ISlack.IGetChannelHistoryOutput> {
    return this.slackProvider.getChannelHistories(input);
  }

  /**
   * get private channels in slack
   *
   * View channels in Slack.
   * This connector will only look up its own `private` channel.
   * The channel ID is required to look up the conversation history within the channel later.
   * `private` channel is a locked channel that can only be viewed by those invited to the channel.
   *
   * @summary get private channels in slack
   * @param input
   * @returns private channels
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("get-private-channels")
  async getPrivateChannels(
    @TypedBody() input: ISlack.IGetChannelInput,
  ): Promise<ISlack.IGetPrivateChannelOutput> {
    return this.slackProvider.getPrivateChannels(input);
  }

  /**
   * get public channels in slack
   *
   * View channels in Slack.
   * This connector will only look up its own `public` channel.
   * The channel ID is required to look up the conversation history within the channel later.
   * The `public` channel is anyone's accessible.
   * This does not require an invitation process, and users can join the channel themselves if necessary.
   *
   * @summary get public channels in slack
   * @param input
   * @returns public channels
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("get-public-channels")
  async getPublicChannels(
    @TypedBody() input: ISlack.IGetChannelInput,
  ): Promise<ISlack.IGetPublicChannelOutput> {
    return this.slackProvider.getPublicChannels(input);
  }

  /**
   * get im channels in slack
   *
   * View channels in Slack.
   * This connector will only look up its own `im` channel.
   * The channel ID is required to look up the conversation history within the channel later.
   * `im` channel is a conversation that takes place in one's profile and refers to a personal channel that can only be viewed by oneself.
   * Users also use chat as storage or notepad, such as storing files and images here.
   *
   * @summary get im channels in slack
   * @param input
   * @returns im channels
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("get-im-channels")
  async getImChannels(
    @TypedBody() input: ISlack.IGetChannelInput,
  ): Promise<ISlack.IGetImChannelOutput> {
    return this.slackProvider.getImChannels(input);
  }
}
