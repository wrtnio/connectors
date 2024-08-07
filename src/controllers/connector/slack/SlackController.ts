import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ISlack } from "@wrtn/connector-api/lib/structures/connector/slack/ISlack";
import { RouteIcon } from "@wrtnio/decorators";
import typia from "typia";
import { SlackProvider } from "../../../providers/connector/slack/SlackProvider";

@Controller("connector/slack")
export class SlackController {
  constructor(private readonly slackProvider: SlackProvider) {}

  /**
   * Marks a specific message in a Slack channel as read
   *
   * You need to know both the channel ID and the ts value of the message.
   *
   * @summary Marks a specific message in a Slack channel as read
   * @param input
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("conversation/mark")
  async mark(@TypedBody() input: ISlack.IMarkInput): Promise<void> {
    const response = await this.slackProvider.mark(input);
    return typia.misc.assertClone(response);
  }

  /**
   * Create a schduled message
   *
   * By default,
   * it is not much different from sending a message except for specifying a schduled time,
   * and requires a channel ID and message content.
   * If the message you want to schedule is within a specific thread, you must pass the ts value of the parent message.
   *
   * Messages booked through this feature are not visible in the Slack desktop app and can only be canceled through the API.
   * Therefore, be careful in writing messages.
   * If you want to cancel, please refer to the message created through another connector and call the delete connector again.
   *
   * Users may be embarrassed if the message you booked is not viewed in the Slack desktop app,
   * so although it cannot be viewed in Slack before and after transmission,
   * it would be a good idea to let them know that it will actually be transmitted in our service.
   *
   * @param input
   * @returns scheduled message
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("scheduleMessage/text")
  async sendScheduleMessage(
    @TypedBody() input: ISlack.ISCheduleMessageInput,
  ): Promise<Pick<ISlack.ScheduledMessage, "post_at">> {
    const response = await this.slackProvider.sendScheduleMessage(input);
    return typia.misc.assertClone(response);
  }

  /**
   * Delete the scheduled message
   *
   * To clear a scheduled message,
   * you must get the exact id of that message, so you must first use the scheduled message lookup connector.
   * When using this connector,
   * the ID of the channel is also required, which can be retrieved from the message object by querying the channel or by querying the scheduled message.
   *
   * @summary Delete the scheduled message
   * @param input
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Delete("scheduleMessage")
  async deleteScheduleMessage(
    @TypedBody() input: ISlack.IDeleteSCheduleMessageInput,
  ): Promise<void> {
    const response = await this.slackProvider.deleteScheduleMessage(input);
    return typia.misc.assertClone(response);
  }

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
   * @returns created message
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("postMessage/text/myself")
  async sendTextToMyself(
    @TypedBody() input: ISlack.IPostMessageToMyselfInput,
  ): Promise<Pick<ISlack.Message, "ts">> {
    const response = await this.slackProvider.sendTextToMyself(input);
    return typia.misc.assertClone(response);
  }

  /**
   * send reply message to thread
   *
   * Creates a reply.
   * To reply, you must first look up the thread.
   * You can look up the thread and pass on the 'ts' value of that thread.
   * You still need the channel's ID here.
   * The channel's ID will start with a C or D and be an unknown string,
   * not a natural language name recognized by the user.
   * Therefore, if you don't know the channel ID, you should also look up the channel.
   *
   * @summary post reply message to thread
   * @param input
   * @returns created message
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("postMessage/reply")
  async sendReply(
    @TypedBody() input: ISlack.IPostMessageReplyInput,
  ): Promise<Pick<ISlack.Message, "ts">> {
    const response = await this.slackProvider.sendReply(input);
    return typia.misc.assertClone(response);
  }

  /**
   * send message to channel
   *
   * Here, you can send a message as long as you have the message and channel information you want to send.
   *
   * @summary post text message in slack
   * @param input
   * @returns created message
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("postMessage/text")
  async sendText(
    @TypedBody() input: ISlack.IPostMessageInput,
  ): Promise<Pick<ISlack.Message, "ts">> {
    const response = await this.slackProvider.sendText(input);
    return typia.misc.assertClone(response);
  }

  /**
   * Get a list of scheduled messages
   *
   * Look up the messages you booked.
   * You can use `post_at` and `post_at_date` to find out when the message will be sent.
   * If you want to clear the message, use the `id` value in the scheduled message.
   *
   * @param input
   * @returns
   */
  @TypedRoute.Post("get-scheduled-messages")
  async getScheduledMessages(
    @TypedBody() input: ISlack.IGetScheduledMessageListInput,
  ): Promise<ISlack.IGetScheduledMessageListOutput> {
    const response = await this.slackProvider.getScheduledMessages(input);
    return typia.misc.assertClone(response);
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
   * @returns Users
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("get-users")
  async getUsers(
    @TypedBody() input: ISlack.IGetUserListInput,
  ): Promise<ISlack.IGetUserListOutput> {
    const response = await this.slackProvider.getUsers(input);
    return typia.misc.assertClone(response);
  }

  /**
   * Inquire the inside of the thread in History
   *
   * If you have inquired the history of a channel,
   * you can use the 'ts' values of its history elements to query the internal thread for each history again.
   * Each channel history has a number of replies, so if this number is more than 1, it is worth looking up.
   * 'Reply' is basically no different from the 'Message'(=Channel History).
   *
   * @param input
   * @returns Replies
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/slack.svg",
  )
  @TypedRoute.Post("get-replies")
  async getReplies(
    @TypedBody() input: ISlack.IGetReplyInput,
  ): Promise<ISlack.IGetReplyOutput> {
    const response = await this.slackProvider.getReplies(input);
    return typia.misc.assertClone(response);
  }

  /**
   * get channel histories in slack
   *
   * Look up conversations that have been made in and out of the channel.
   *
   * The 'channel' received as a factor means the channel's ID and is a character string that begins with a capital 'C', 'D' and so on.
   * Therefore, if the user does not hand over the ID when looking for the conversation history of the channel,
   * it is prioritized to find the channel ID.
   * Usually, users don't know their channel ID.
   * Therefore, most users will ask for a channel by its name or with only the keywords they remember.
   * Therefore, unless it's an unknown string and begins with a 'C' or 'D' uppercase letter, look for the channel first.
   *
   * When you look up a conversation,
   * you can search only after a specific time or before a specific time in order to look up the time zone of the conversation you want to search for.
   * 
   * In the conversation history, the link and code box are abbreviated to <LINK/> and <CODE/>, respectively.
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
    const response = await this.slackProvider.getChannelHistories(input);
    return typia.misc.assertClone(response);
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
    const response = await this.slackProvider.getPrivateChannels(input);
    return typia.misc.assertClone(response);
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
    const response = await this.slackProvider.getPublicChannels(input);
    return typia.misc.assertClone(response);
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
    const response = await this.slackProvider.getImChannels(input);
    return typia.misc.assertClone(response);
  }
}
