import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleTrend } from "@wrtn/connector-api/lib/structures/connector/google_trend/IGoogleTrend";
import { retry } from "../../../utils/retry";
import { GoogleTrendProvider } from "../../../providers/connector/google_trend/GoogleTrendProvider";

@Controller("connector/google-trend")
export class GoogleTrendController {
  constructor(private readonly googleTrendProvider: GoogleTrendProvider) {}

  /**
   * 구글 트렌드에서 데일리 검색 결과를 가져옵니다.
   *
   * @summary 구글 트렌드 데일리 검색
   *
   * @param input 검색 날짜
   * @returns 데일리 트렌드 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("daily")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_trend.svg",
  )
  async daily(
    @core.TypedBody() input: IGoogleTrend.IRequest,
  ): Promise<IGoogleTrend.IResponse[]> {
    return retry(() => this.googleTrendProvider.dailyTrend(input))();
  }
}
