import core, { HumanRoute, TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IKakaoNavi } from "@wrtn/connector-api/lib/structures/connector/kakao_navi/IKakaoNavi";

import { KakaoNaviProvider } from "../../../providers/connector/kakao_navi/KakaoNaviProvider";
import { retry } from "../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/kakao-navi")
export class KakaoNaviController {
  /**
   * Finding directions with Kakao Navi
   *
   * @summary Kakao Navi Directions
   * @param input Request conditions
   * @returns Directions results
   */
  @HumanRoute()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/kakao_navi.svg",
  )
  @ApiTags("Kakao Navi")
  @Standalone()
  @core.TypedRoute.Patch("get-future-directions")
  async getFutureDirections(
    @TypedBody() input: IKakaoNavi.IGetFutureDirectionsInput,
  ): Promise<IKakaoNavi.IGetFutureDirectionsOutput> {
    return retry(() => KakaoNaviProvider.getFutureDirections(input))();
  }
}
