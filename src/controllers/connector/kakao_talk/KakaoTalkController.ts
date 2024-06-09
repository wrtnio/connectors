import core, { TypedBody } from "@nestia/core";
import { Controller, Get, Query } from "@nestjs/common";

import { IKakaoTalk } from "@wrtn/connector-api/lib/structures/connector/kakao_talk/IKakaoTalk";

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
   * @internal
   *
   * @param query Authorization Code Dto.
   */
  @Get("auth")
  authorization(@Query() query: IKakaoTalk.IAuthorizationCode) {
    return query.code;
  }
}
