import core, { TypedBody } from "@nestia/core";
import { Controller, Get, Query } from "@nestjs/common";

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
    @TypedBody() input: IKakaoTalk.ITextMemoInput,
  ): Promise<IKakaoTalk.IMemoOutput> {
    return null!;
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
    return await KakaoTalkProvider.refresh(input);
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
