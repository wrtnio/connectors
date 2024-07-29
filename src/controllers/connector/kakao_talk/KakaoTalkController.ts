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
   * 친구에게 텍스트 타입 카카오톡 메시지를 보냅니다
   *
   * 카카오톡(KakaoTalk)은 대한민국의 모바일 메신저 애플리케이션으로, 또한 그 외 부가적인 서비스를 함께 제공하고 있습니다.
   *
   * @summary 카카오톡 친구에게 메시지 쓰기
   * @param input 메시지를 보내기 위한 조건
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
   * 카카오톡 내게 쓰기로 커머스 타입 메시지를 보냅니다
   *
   * 카카오톡 메시지를 전송할 때에는 버튼이 존재합니다.
   * 버튼에 만약 링크를 넣고 싶은 경우라면 `https://studio-pro.wrtn.ai/`로 시작되는 URL 혹은 리다이렉트하고 싶은 링크를 넣으면 됩니다.
   * `https://studio-pro.wrtn.ai/`로 시작되는 링크라면 그 페이지가 조회될 것이고, 그렇지 않다면 새 링크로 리다이렉트 시킵니다.
   * 이는 카카오톡 API 스펙 상 우리 도메인으로 등록되어 있는 링크만을 허용하기 때문입니다.
   *
   * 카카오톡(KakaoTalk)은 대한민국의 모바일 메신저 애플리케이션으로, 또한 그 외 부가적인 서비스를 함께 제공하고 있습니다.
   *
   * @summary 카카오톡 내게 쓰기
   * @param input 메시지를 보내기 위한 조건
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
   * 카카오톡 내게 쓰기로 위치 타입 메시지를 보냅니다
   *
   * 카카오톡 메시지를 전송할 때에는 버튼이 존재합니다.
   * 버튼에 만약 링크를 넣고 싶은 경우라면 `https://studio-pro.wrtn.ai/`로 시작되는 URL 혹은 리다이렉트하고 싶은 링크를 넣으면 됩니다.
   * `https://studio-pro.wrtn.ai/`로 시작되는 링크라면 그 페이지가 조회될 것이고, 그렇지 않다면 새 링크로 리다이렉트 시킵니다.
   * 이는 카카오톡 API 스펙 상 우리 도메인으로 등록되어 있는 링크만을 허용하기 때문입니다.
   *
   * 카카오톡(KakaoTalk)은 대한민국의 모바일 메신저 애플리케이션으로, 또한 그 외 부가적인 서비스를 함께 제공하고 있습니다.
   *
   * @summary 카카오톡 내게 쓰기
   * @param input 메시지를 보내기 위한 조건
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
   * 카카오톡 내게 쓰기로 리스트 타입 메시지를 보냅니다
   *
   * 카카오톡 메시지를 전송할 때에는 버튼이 존재합니다.
   * 버튼에 만약 링크를 넣고 싶은 경우라면 `https://studio-pro.wrtn.ai/`로 시작되는 URL 혹은 리다이렉트하고 싶은 링크를 넣으면 됩니다.
   * `https://studio-pro.wrtn.ai/`로 시작되는 링크라면 그 페이지가 조회될 것이고, 그렇지 않다면 새 링크로 리다이렉트 시킵니다.
   * 이는 카카오톡 API 스펙 상 우리 도메인으로 등록되어 있는 링크만을 허용하기 때문입니다.
   *
   * 카카오톡(KakaoTalk)은 대한민국의 모바일 메신저 애플리케이션으로, 또한 그 외 부가적인 서비스를 함께 제공하고 있습니다.
   *
   * @summary 카카오톡 내게 쓰기
   * @param input 메시지를 보내기 위한 조건
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
   * 카카오톡 내게 쓰기로 피드 타입 메시지를 보냅니다
   *
   * 카카오톡 메시지를 전송할 때에는 버튼이 존재합니다.
   * 버튼에 만약 링크를 넣고 싶은 경우라면 `https://studio-pro.wrtn.ai/`로 시작되는 URL 혹은 리다이렉트하고 싶은 링크를 넣으면 됩니다.
   * `https://studio-pro.wrtn.ai/`로 시작되는 링크라면 그 페이지가 조회될 것이고, 그렇지 않다면 새 링크로 리다이렉트 시킵니다.
   * 이는 카카오톡 API 스펙 상 우리 도메인으로 등록되어 있는 링크만을 허용하기 때문입니다.
   *
   * 카카오톡(KakaoTalk)은 대한민국의 모바일 메신저 애플리케이션으로, 또한 그 외 부가적인 서비스를 함께 제공하고 있습니다.
   *
   * @summary 카카오톡 내게 쓰기
   * @param input 메시지를 보내기 위한 조건
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
   * 카카오톡 내게 쓰기로 텍스트 타입 메시지를 보냅니다
   *
   * 카카오톡 메시지를 전송할 때에는 버튼이 존재합니다.
   * 버튼에 만약 링크를 넣고 싶은 경우라면 `https://studio-pro.wrtn.ai/`로 시작되는 URL 혹은 리다이렉트하고 싶은 링크를 넣으면 됩니다.
   * `https://studio-pro.wrtn.ai/`로 시작되는 링크라면 그 페이지가 조회될 것이고, 그렇지 않다면 새 링크로 리다이렉트 시킵니다.
   * 이는 카카오톡 API 스펙 상 우리 도메인으로 등록되어 있는 링크만을 허용하기 때문입니다.
   *
   * 카카오톡(KakaoTalk)은 대한민국의 모바일 메신저 애플리케이션으로, 또한 그 외 부가적인 서비스를 함께 제공하고 있습니다.
   *
   * @summary 카카오톡 내게 쓰기
   * @param input 메시지를 보내기 위한 조건
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
   * 카카오톡 캘린더에 일정을 추가합니다
   *
   * 카카오톡(KakaoTalk)은 대한민국의 모바일 메신저 애플리케이션으로, 또한 그 외 부가적인 서비스를 함께 제공하고 있습니다.
   *
   * @summary 카카오톡 캘린더 일정 추가
   * @param input 일정 생성을 위한 입력 조건
   *
   * @returns 생성된 일정 ID 조건
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
   * 카카오톡 친구 목록을 조회합니다
   *
   * 카카오톡(KakaoTalk)은 대한민국의 모바일 메신저 애플리케이션으로, 또한 그 외 부가적인 서비스를 함께 제공하고 있습니다.
   *
   * @summary 카카오톡 친구 목록 조회
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
   * 카카오톡 캘린더 일정을 조회합니다
   *
   * 유저에게 인자로 캘린더의 아이디를 받아야 합니다.
   * 캘린더를 주지 않을 경우, 기본 값으로 자기 자신의 캘린더를 조회합니다.
   * 따라서 캘린더 아이디를 지정하지 않은 경우에도 단독으로 사용 가능한 기능이기도 합니다.
   *
   * 일정 조회 조건으로는 일정을 조회하는 기간을 명시해야 합니다.
   * 이 커넥터에서는 일주일 혹은 한 달 치의 데이터를 볼 수 있도록 설계되어 있습니다.
   *
   * 카카오톡(KakaoTalk)은 대한민국의 모바일 메신저 애플리케이션으로, 또한 그 외 부가적인 서비스를 함께 제공하고 있습니다.
   *
   * @summary 카카오톡 캘린더 일정 조회
   * @param input 일정 조회를 위한 DTO.
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
   * 카카오톡 캘린더 목록들을 모두 조회합니다
   *
   * 캘린더는 두 종류로 자신의 기본 캘린더들과 내가 구독하고 있는 캘린더가 있을 수 있습니다.
   * 모든 카카오 유저들은 자기 자신의 개인 캘린더가 존재하기 때문에 1개 이상의 캘린더는 존재할 것입니다.
   * 기본 캘린더에는 아이디가 `primary` 라는 값으로 되어 있는 캘린더가 있는데, 이 캘린더는 유저 자기 자신의 캘린더입니다.
   *
   * 카카오톡(KakaoTalk)은 대한민국의 모바일 메신저 애플리케이션으로, 또한 그 외 부가적인 서비스를 함께 제공하고 있습니다.
   *
   * @summary 카카오톡 캘린더 목록 조회
   * @param input 캘린더를 조회하기 위한 요청 DTO.
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
   * 카카오톡 액세스 토큰 발급
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
}
