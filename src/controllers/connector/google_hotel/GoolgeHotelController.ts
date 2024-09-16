import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { retry } from "../../../utils/retry";
import { GoogleHotelProvider } from "../../../providers/connector/google_hotel/GoogleHotelProvider";
import { IGoogleHotel } from "@wrtn/connector-api/lib/structures/connector/google_hotel/IGoogleHotel";

@Controller("connector/google-hotel")
export class GoogleHotelController {
  constructor(private readonly googleHotelProvider: GoogleHotelProvider) {}

  /**
   * 구글 호텔 서비스를 사용하여 숙소를 검색합니다
   *
   * @summary 구글 호텔 검색
   *
   * @param input 구글 호텔 검색 조건
   *
   * @returns 구글 호텔 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleHotel_full.svg",
  )
  async search(
    @core.TypedBody() input: IGoogleHotel.IRequest,
  ): Promise<IGoogleHotel.IResponse[]> {
    return retry(() => this.googleHotelProvider.search(input))();
  }
}
