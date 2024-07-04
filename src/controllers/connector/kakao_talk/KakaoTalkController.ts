import core, { TypedBody } from "@nestia/core";
import { Controller, Get, Query } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtn/decorators";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { IKakaoTalk } from "@wrtn/connector-api/lib/structures/connector/kakao_talk/IKakaoTalk";

import { KakaoTalkProvider } from "../../../providers/connector/kakao_talk/KakaoTalkProvider";
import { Try, createResponseForm } from "../../../utils/createResponseForm";
import { retry } from "../../../utils/retry";

@Controller("connector/kakao-talk")
export class KakaoTalkController {
  /**
   * 친구에게 메시지를 카카오톡 메시지를 보냅니다
   *
   * @summary 카카오톡 친구에게 메시지 쓰기
   *
   * @param input 메시지를 보내기 위한 조건
   *
   * @returns 응답 및 실패 정보
   *
   * @tag 카카오톡
   */
  @RouteIcon(`https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`)
  @core.TypedRoute.Post("message/text")
  async send(
    @TypedBody() input: IKakaoTalk.ISendKakaoTalkToFriendsInput,
  ): Promise<Try<IKakaoTalk.ISendKakaoTalkToFriendsOutput>> {
    const data = await retry(() => KakaoTalkProvider.send(input))();
    return createResponseForm(data);
  }

  /**
   * 카카오톡 내게 쓰기로 메시지를 보냅니다.
   *
   * @summary 카카오톡 내게 쓰기
   *
   * @param input 메시지를 보내기 위한 조건
   *
   * @returns 응답 코드
   *
   * @tag 카카오톡
   */
  @Standalone()
  @RouteIcon(`https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`)
  @core.TypedRoute.Post("memo/commerce")
  async commerceMemo(@TypedBody() input: IKakaoTalk.ISendKakaoTalkCommerceInput): Promise<Try<IKakaoTalk.IMemoOutput>> {
    const data = await retry(() => KakaoTalkProvider.memo(input))();
    return createResponseForm(data);
  }

  /**
   * 카카오톡 내게 쓰기로 메시지를 보냅니다.
   *
   * @summary 카카오톡 내게 쓰기
   *
   * @param input 메시지를 보내기 위한 조건
   *
   * @returns 응답 코드
   *
   * @tag 카카오톡
   */
  @Standalone()
  @RouteIcon(`https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`)
  @core.TypedRoute.Post("memo/location")
  async locationMemo(@TypedBody() input: IKakaoTalk.ISendKakaoTalkLocationInput): Promise<Try<IKakaoTalk.IMemoOutput>> {
    const data = await retry(() => KakaoTalkProvider.memo(input))();
    return createResponseForm(data);
  }

  /**
   * 카카오톡 내게 쓰기로 메시지를 보냅니다.
   *
   * @summary 카카오톡 내게 쓰기
   *
   * @param input 메시지를 보내기 위한 조건
   *
   * @returns 응답 코드
   *
   * @tag 카카오톡
   */
  @Standalone()
  @RouteIcon(`https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`)
  @core.TypedRoute.Post("memo/list")
  async listMemo(@TypedBody() input: IKakaoTalk.ISendKakaoTalkListInput): Promise<Try<IKakaoTalk.IMemoOutput>> {
    const data = await retry(() => KakaoTalkProvider.memo(input))();
    return createResponseForm(data);
  }

  /**
   * 카카오톡 내게 쓰기로 메시지를 보냅니다.
   *
   * @summary 카카오톡 내게 쓰기
   *
   * @param input 메시지를 보내기 위한 조건
   *
   * @returns 응답 코드
   *
   * @tag 카카오톡
   */
  @Standalone()
  @RouteIcon(`https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`)
  @core.TypedRoute.Post("memo/feed")
  async feedMemo(@TypedBody() input: IKakaoTalk.ISendKakaoTalkFeedInput): Promise<Try<IKakaoTalk.IMemoOutput>> {
    const data = await retry(() => KakaoTalkProvider.memo(input))();
    return createResponseForm(data);
  }

  /**
   * 카카오톡 내게 쓰기로 메시지를 보냅니다.
   *
   * @summary 카카오톡 내게 쓰기
   *
   * @param input 메시지를 보내기 위한 조건
   *
   * @returns 응답 코드
   *
   * @tag 카카오톡
   */
  @Standalone()
  @RouteIcon(`https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`)
  @core.TypedRoute.Post("memo/text")
  async textMemo(@TypedBody() input: IKakaoTalk.ISendKakaoTalkTextInput): Promise<Try<IKakaoTalk.IMemoOutput>> {
    const data = await retry(() => KakaoTalkProvider.memo(input))();
    return createResponseForm(data);
  }

  /**
   * 카카오톡 액세스 토큰 갱신.
   *
   * @internal
   *
   * @param input Refresh를 위한 요청 DTO.
   */
  @RouteIcon(`https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`)
  @core.TypedRoute.Post("refresh")
  async refresh(
    @TypedBody() input: IKakaoTalk.IRefreshAccessTokenInput,
  ): Promise<Try<IKakaoTalk.IRefreshAccessTokenOutput>> {
    const data = await retry(() => KakaoTalkProvider.refresh(input))();
    return createResponseForm(data);
  }

  /**
   * 카카오톡 캘린더에 일정을 추가합니다.
   *
   * @summary 카카오톡 캘린더 일정 추가.
   *
   * @param input 일정 생성을 위한 입력 DTO.
   *
   * @returns 생성된 일정 ID DTO.
   *
   * @tag 카카오톡
   */
  @Standalone()
  @RouteIcon(`https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`)
  @core.TypedRoute.Post("calendars/events")
  async createEvent(@TypedBody() input: IKakaoTalk.ICreateEventInput): Promise<Try<IKakaoTalk.ICreateEventOutput>> {
    const data = await retry(() => KakaoTalkProvider.createEvent(input))();
    return createResponseForm(data);
  }

  /**
   * 카카오톡 친구 목록을 조회합니다.
   *
   * @summary 카카오톡 친구 목록 조회
   *
   * @param input 친구 목록 조회 조건
   * @returns 조회한 친구 모록
   *
   * @tag 카카오톡
   */
  @Standalone()
  @RouteIcon(`https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`)
  @core.TypedRoute.Post("get-friends")
  async getFriends(@TypedBody() input: IKakaoTalk.IGetFriendsInput): Promise<Try<IKakaoTalk.IGetFriendsOutput>> {
    const data = await retry(() => KakaoTalkProvider.getFriends(input))();
    return createResponseForm(data);
  }

  /**
   * 카카오톡 캘린더 일정을 조회합니다.
   *
   * @summary 카카오톡 캘린더 일정 조회.
   *
   * @param input 일정 조회를 위한 DTO.
   *
   * @returns 일정 정보 DTO.
   *
   * @tag 카카오톡
   */
  @Standalone()
  @RouteIcon(`https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`)
  @core.TypedRoute.Post("get-events")
  async getEvents(@TypedBody() input: IKakaoTalk.IGetEventInput): Promise<Try<IKakaoTalk.IGetEventOutput>> {
    const data = await retry(() => KakaoTalkProvider.getEvents(input))();
    return createResponseForm(data);
  }

  /**
   * 카카오톡 캘린더 목록들을 모두 조회합니다.
   *
   * @summary 카카오톡 캘린더 목록 조회.
   *
   * @param input 캘린더를 조회하기 위한 요청 DTO.
   *
   * @returns 캘린더 목록 객체.
   *
   * @tag 카카오톡
   */
  @Standalone()
  @RouteIcon(`https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kakaoTalk.svg`)
  @core.TypedRoute.Post("get-calendars")
  async getCalendars(
    @TypedBody() input: ICommon.ISecret<"kakao", ["talk_calendar"]>,
  ): Promise<Try<IKakaoTalk.IGetCalendarOutput>> {
    const data = await retry(() => KakaoTalkProvider.getCalendars(input))();
    return createResponseForm(data);
  }

  /**
   * 카카오톡 액세스 토큰 발급.
   *
   * @internal
   *
   * @param query Authorization Code Dto.
   */
  @Get("auth")
  authorization(@Query() query: IKakaoTalk.IAuthorizationCode): Promise<Try<IKakaoTalk.IGetAccessTokenOutput>> {
    return null!;
  }
}
