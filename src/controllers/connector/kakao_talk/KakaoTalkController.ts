import core, { TypedBody } from "@nestia/core";
import { Controller, Get, Query } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { IKakaoTalk } from "@wrtn/connector-api/lib/structures/connector/kakao_talk/IKakaoTalk";

import { KakaoTalkProvider } from "../../../providers/connector/kakao_talk/KakaoTalkProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/kakao-talk")
export class KakaoTalkController {
  /**
   * Sends a text type KakaoTalk message to a friend
   *
   * KakaoTalk is a mobile messenger application in South Korea, which also provides various additional services.
   *
   * @summary Send a message to a KakaoTalk friend
   * @param input Conditions for sending the message
   * @returns Response and failure information
   *
   * @tag KakaoTalk
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`,
  )
  @core.TypedRoute.Post("message/text")
  async send(
    @TypedBody() input: IKakaoTalk.ISendKakaoTalkToFriendsInput,
  ): Promise<IKakaoTalk.ISendKakaoTalkToFriendsOutput> {
    return retry(() => KakaoTalkProvider.send(input))();
  }

  /**
   * Sends a commerce type message to myself on KakaoTalk
   *
   * When sending a KakaoTalk message, there are buttons. If you want to add a link to the button, you should use a URL starting with `https://studio-pro.wrtn.ai/` or a redirect link. If the link starts with `https://studio-pro.wrtn.ai/`, the page will be viewed, otherwise, it will redirect to the new link. This is because only links registered in our domain are allowed according to the KakaoTalk API specifications.
   *
   * KakaoTalk is a mobile messenger application in South Korea, which also provides various additional services.
   *
   * @summary Send a message to myself on KakaoTalk
   * @param input Conditions for sending the message
   * @returns Response code
   *
   * @tag KakaoTalk
   */
  @Standalone()
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`,
  )
  @core.TypedRoute.Post("memo/commerce")
  async commerceMemo(
    @TypedBody() input: IKakaoTalk.ISendKakaoTalkCommerceInput,
  ): Promise<IKakaoTalk.IMemoOutput> {
    return retry(() => KakaoTalkProvider.memo(input))();
  }

  /**
   * Sends a location type message to myself on KakaoTalk
   *
   * When sending a KakaoTalk message, there are buttons. If you want to add a link to the button, you should use a URL starting with `https://studio-pro.wrtn.ai/` or a redirect link. If the link starts with `https://studio-pro.wrtn.ai/`, the page will be viewed, otherwise, it will redirect to the new link. This is because only links registered in our domain are allowed according to the KakaoTalk API specifications.
   *
   * KakaoTalk is a mobile messenger application in South Korea, which also provides various additional services.
   *
   * @summary Send a message to myself on KakaoTalk
   * @param input Conditions for sending the message
   * @returns Response code
   *
   * @tag KakaoTalk
   */
  @Standalone()
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`,
  )
  @core.TypedRoute.Post("memo/location")
  async locationMemo(
    @TypedBody() input: IKakaoTalk.ISendKakaoTalkLocationInput,
  ): Promise<IKakaoTalk.IMemoOutput> {
    return retry(() => KakaoTalkProvider.memo(input))();
  }

  /**
   * Sends a list type message to myself on KakaoTalk
   *
   * When sending a KakaoTalk message, there are buttons. If you want to add a link to the button, you should use a URL starting with `https://studio-pro.wrtn.ai/` or a redirect link. If the link starts with `https://studio-pro.wrtn.ai/`, the page will be viewed, otherwise, it will redirect to the new link. This is because only links registered in our domain are allowed according to the KakaoTalk API specifications.
   *
   * KakaoTalk is a mobile messenger application in South Korea, which also provides various additional services.
   *
   * @summary Send a message to myself on KakaoTalk
   * @param input Conditions for sending the message
   * @returns Response code
   *
   * @tag KakaoTalk
   */
  @Standalone()
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`,
  )
  @core.TypedRoute.Post("memo/list")
  async listMemo(
    @TypedBody() input: IKakaoTalk.ISendKakaoTalkListInput,
  ): Promise<IKakaoTalk.IMemoOutput> {
    return retry(() => KakaoTalkProvider.memo(input))();
  }

  /**
   * Sends a feed type message to myself on KakaoTalk
   *
   * When sending a KakaoTalk message, there are buttons. If you want to add a link to the button, you should use a URL starting with `https://studio-pro.wrtn.ai/` or a redirect link. If the link starts with `https://studio-pro.wrtn.ai/`, the page will be viewed, otherwise, it will redirect to the new link. This is because only links registered in our domain are allowed according to the KakaoTalk API specifications.
   *
   * KakaoTalk is a mobile messenger application in South Korea, which also provides various additional services.
   *
   * @summary Send a message to myself on KakaoTalk
   * @param input Conditions for sending the message
   * @returns Response code
   *
   * @tag KakaoTalk
   */
  @Standalone()
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`,
  )
  @core.TypedRoute.Post("memo/feed")
  async feedMemo(
    @TypedBody() input: IKakaoTalk.ISendKakaoTalkFeedInput,
  ): Promise<IKakaoTalk.IMemoOutput> {
    return retry(() => KakaoTalkProvider.memo(input))();
  }

  /**
   * Sends a text type message to myself on KakaoTalk
   *
   * When sending a KakaoTalk message, there are buttons. If you want to add a link to the button, you should use a URL starting with `https://studio-pro.wrtn.ai/` or a redirect link. If the link starts with `https://studio-pro.wrtn.ai/`, the page will be viewed, otherwise, it will redirect to the new link. This is because only links registered in our domain are allowed according to the KakaoTalk API specifications.
   *
   * KakaoTalk is a mobile messenger application in South Korea, which also provides various additional services.
   *
   * @summary Send a message to myself on KakaoTalk
   * @param input Conditions for sending the message
   * @returns Response code
   *
   * @tag KakaoTalk
   */
  @Standalone()
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`,
  )
  @core.TypedRoute.Post("memo/text")
  async textMemo(
    @TypedBody() input: IKakaoTalk.ISendKakaoTalkTextInput,
  ): Promise<IKakaoTalk.IMemoOutput> {
    return retry(() => KakaoTalkProvider.memo(input))();
  }

  /**
   * Adds an event to the KakaoTalk calendar
   *
   * KakaoTalk is a mobile messenger application in South Korea, which also provides various additional services.
   *
   * @summary Add an event to the KakaoTalk calendar
   * @param input Input conditions for creating an event
   *
   * @returns Created event ID condition
   *
   * @tag KakaoTalk
   */
  @Standalone()
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`,
  )
  @core.TypedRoute.Post("calendars/events")
  async createEvent(
    @TypedBody() input: IKakaoTalk.ICreateEventInput,
  ): Promise<IKakaoTalk.ICreateEventOutput> {
    return retry(() => KakaoTalkProvider.createEvent(input))();
  }

  /**
   * Retrieves the list of friends on KakaoTalk
   *
   * KakaoTalk is a mobile messenger application in South Korea, which also provides various additional services.
   *
   * @summary Retrieve the list of friends on KakaoTalk
   * @param input Conditions for retrieving the friend list
   * @returns Retrieved friend list
   *
   * @tag KakaoTalk
   */
  @Standalone()
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`,
  )
  @core.TypedRoute.Post("get-friends")
  async getFriends(
    @TypedBody() input: IKakaoTalk.IGetFriendsInput,
  ): Promise<IKakaoTalk.IGetFriendsOutput> {
    return retry(() => KakaoTalkProvider.getFriends(input))();
  }

  /**
   * Retrieves KakaoTalk calendar events.
   *
   * The user needs to provide the calendar ID as an input parameter.
   * If no calendar is provided, it defaults to retrieving the user's own calendar.
   * Therefore, this feature can be used even if no calendar ID is specified.
   *
   * The conditions for retrieving events include specifying the period for which events are to be fetched.
   * This connector is designed to view data for either a week or a month.
   *
   * KakaoTalk is a mobile messaging application in South Korea, and it also provides additional services.
   *
   * @summary Retrieve KakaoTalk calendar events
   * @param input DTO for event retrieval.
   * @returns DTO containing event information.
   *
   * @tag KakaoTalk
   */
  @Standalone()
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`,
  )
  @core.TypedRoute.Post("get-events")
  async getEvents(
    @TypedBody() input: IKakaoTalk.IGetEventInput,
  ): Promise<IKakaoTalk.IGetEventOutput> {
    return retry(() => KakaoTalkProvider.getEvents(input))();
  }

  /**
   * Retrieves all KakaoTalk calendar lists
   *
   * There are two types of calendars: your primary calendars and calendars you are subscribed to.
   * All Kakao users have their own personal calendars, so there will be at least one calendar.
   * The primary calendar has an ID of `primary`, which is the user's own calendar.
   *
   * KakaoTalk is a mobile messenger application from South Korea that also provides additional services.
   *
   * @summary Retrieve KakaoTalk calendar lists
   * @param input Request DTO to retrieve calendars.
   * @returns Calendar list object.
   *
   * @tag KakaoTalk
   */
  @Standalone()
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`,
  )
  @core.TypedRoute.Post("get-calendars")
  async getCalendars(
    @TypedBody() input: ICommon.ISecret<"kakao", ["talk_calendar"]>,
  ): Promise<IKakaoTalk.IGetCalendarOutput> {
    return retry(() => KakaoTalkProvider.getCalendars(input))();
  }

  /**
   * Issues a KakaoTalk access token
   *
   * @internal
   *
   * @param query Authorization Code DTO.
   */
  @Get("auth")
  authorization(
    @Query() query: IKakaoTalk.IAuthorizationCode,
  ): Promise<IKakaoTalk.IGetAccessTokenOutput> {
    return null!;
  }

  /**
   * Refreshes the KakaoTalk access token
   *
   * @internal
   *
   * @param input Request DTO for refresh.
   */
  @RouteIcon(
    `https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`,
  )
  @core.TypedRoute.Post("refresh")
  async refresh(
    @TypedBody() input: IKakaoTalk.IRefreshAccessTokenInput,
  ): Promise<IKakaoTalk.IRefreshAccessTokenOutput> {
    return retry(() => KakaoTalkProvider.refresh(input))();
  }
}
