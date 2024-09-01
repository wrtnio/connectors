import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { retry } from "../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";
import { IGoogleMap } from "@wrtn/connector-api/lib/structures/connector/google_map/IGoogleMap";
import { GoogleMapProvider } from "../../../providers/connector/google_map/GoogleMapProvider";

@Controller("connector/google-map")
export class GoogleMapController {
  constructor(private readonly googleMapProvider: GoogleMapProvider) {}

  /**
   * 구글맵을 사용하여 맛집을 검색합니다.
   *
   * @summary 구글맵 맛집 검색
   *
   * @param input 맛집을 검색할 검색어
   * @returns 맛집 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMap_full.svg",
  )
  @ApiTags("Google map")
  async search(
    @core.TypedBody() input: IGoogleMap.IRequest,
  ): Promise<IGoogleMap.IResponse[]> {
    return retry(() => this.googleMapProvider.search(input))();
  }

  /**
   * 구글맵에서 선택한 맛집 리뷰를 검색합니다.
   *
   * @summary 구글맵 맛집 리뷰 검색
   *
   * @param input 맛집의 고유 id
   * @returns 맛집 리뷰 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("review")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMap_full.svg",
  )
  @ApiTags("Google map")
  async review(
    @core.TypedBody() input: IGoogleMap.IReviewRequest,
  ): Promise<IGoogleMap.IReviewResponse[]> {
    return retry(() => this.googleMapProvider.review(input))();
  }
}
