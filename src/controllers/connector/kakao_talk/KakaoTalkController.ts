import { Controller, Get, Query } from "@nestjs/common";

@Controller("connector/kakao")
export class KakaoTalkController {
  /**
   * @internal
   *
   * @param query Authorization Code Dto.
   */
  @Get("auth")
  authorization(@Query() query: { code: string }) {
    return query.code;
  }
}
