import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IKakaoNavi } from "@wrtn/connector-api/lib/structures/connector/kakao_navi/IKakaoNavi";

import { KakaoNaviProvider } from "../../../providers/connector/kakao_navi/KakaoNaviProvider";
import { retry } from "../../../utils/retry";

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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/KakaoNavi.svg",
  )
  @Standalone()
  @core.TypedRoute.Post("get-future-directions")
  async getFutureDirections(
    @TypedBody() input: IKakaoNavi.IGetFutureDirectionsInput,
  ): Promise<IKakaoNavi.IGetFutureDirectionsOutput> {
    return retry(() => KakaoNaviProvider.getFutureDirections(input))();
  }
}
