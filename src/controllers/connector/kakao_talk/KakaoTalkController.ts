import core, { TypedBody } from "@nestia/core";
import { Controller, Get, Query } from "@nestjs/common";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { IKakaoTalk } from "@wrtn/connector-api/lib/structures/connector/kakao_talk/IKakaoTalk";

import { KakaoTalkProvider } from "../../../providers/connector/kakao_talk/KakaoTalkProvider";

@Controller("connector/kakao-talk")
export class KakaoTalkController {
  /**
   * 카카오톡 내게 쓰기로 메시지를 보냅니다.
   *
   * @summary 카카오톡 내게 쓰기.
   *
   * @param input 메시지를 보내기 위한 요청 DTO.
   *
   * @returns 응답 코드.
   *
   * @tag 카카오톡
   */
  @core.TypedRoute.Post("memo")
  async memo(
    @TypedBody() input: IKakaoTalk.ISendKakaoTalkInput,
  ): Promise<IKakaoTalk.IMemoOutput> {
    return KakaoTalkProvider.memo(input);
  }

  /**
   * 카카오톡 액세스 토큰 갱신.
   *
   * @internal
   *
   * @param input Refresh를 위한 요청 DTO.
   */
  @core.TypedRoute.Post("refresh")
  async refresh(
    @TypedBody() input: IKakaoTalk.IRefreshAccessTokenInput,
  ): Promise<IKakaoTalk.IRefreshAccessTokenOutput> {
    return KakaoTalkProvider.refresh(input);
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
  @core.TypedRoute.Post("calendars/events")
  async createEvent(
    @TypedBody() input: IKakaoTalk.ICreateEventInput,
  ): Promise<IKakaoTalk.ICreateEventOutput> {
    return KakaoTalkProvider.createEvent(input);
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
  @core.TypedRoute.Post("get-events")
  async getEvents(
    @TypedBody() input: IKakaoTalk.IGetEventInput,
  ): Promise<IKakaoTalk.IGetEventOutput> {
    return KakaoTalkProvider.getEvents(input);
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
  @core.TypedRoute.Post("get-calendars")
  async getCalendars(
    @TypedBody() input: ICommon.ISecret<"kakao", ["talk_calendar"]>,
  ): Promise<IKakaoTalk.IGetCalendarOutput> {
    return KakaoTalkProvider.getCalendars(input);
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
