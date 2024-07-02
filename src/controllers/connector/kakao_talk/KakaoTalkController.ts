import core, { TypedBody } from "@nestia/core";
import { Controller, Get, Query } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtn/decorators";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { IKakaoTalk } from "@wrtn/connector-api/lib/structures/connector/kakao_talk/IKakaoTalk";

import { KakaoTalkProvider } from "../../../providers/connector/kakao_talk/KakaoTalkProvider";
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
   * 카카오톡 액세스 토큰 갱신.
   *
   * @internal
   *
   * @param input Refresh를 위한 요청 DTO.
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
   * 카카오톡 액세스 토큰 발급.
   *
   * @internal
   *
   * @param query Authorization Code Dto.
   */
  @Get("auth")
  authorization(
    @Query() query: IKakaoTalk.IAuthorizationCode,
  ): Promise<IKakaoTalk.IGetAccessTokenOutput> {
    return null!;
  }
}
