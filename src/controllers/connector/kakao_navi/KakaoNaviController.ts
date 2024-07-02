import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Standalone } from "@wrtn/decorators";

import { IKakaoNavi } from "@wrtn/connector-api/lib/structures/connector/kakao_navi/IKakaoNavi";

import { KakaoNaviProvider } from "../../../providers/connector/kakao_navi/KakaoNaviProvider";

@Controller("connector/kakao-navi")
export class KakaoNaviController {
  /**
   * 카카오 네비로 길을 찾습니다.
   *
   * @summary 카카오 네비 길찾기
   *
   * @param input 요청 조건
   * @returns 길 찾기 결과
   */
  @Standalone()
  @core.TypedRoute.Post("get-future-directions")
  async getFutureDirections(
    @TypedBody() input: IKakaoNavi.IGetFutureDirectionsInput,
  ) {
    return KakaoNaviProvider.getFutureDirections(input);
  }
}
