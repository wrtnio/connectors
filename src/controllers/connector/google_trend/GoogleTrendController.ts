import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleTrend } from "@wrtn/connector-api/lib/structures/connector/google_trend/IGoogleTrend";
import { retry } from "../../../utils/retry";
import { GoogleTrendProvider } from "../../../providers/connector/google_trend/GoogleTrendProvider";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/google-trend")
export class GoogleTrendController {
  constructor(private readonly googleTrendProvider: GoogleTrendProvider) {}

  /**
   * Get daily search results from Google Trends.
   *
   * @summary Google Trends Daily Search
   *
   * @param input Search date
   * @returns Daily Trends Search Results
   */
  @Standalone()
  @core.TypedRoute.Post("daily")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleTrend_full.svg",
  )
  @ApiTags("Google Trends")
  async daily(
    @core.TypedBody() input: IGoogleTrend.IRequest,
  ): Promise<IGoogleTrend.IResponse[]> {
    return retry(() => this.googleTrendProvider.dailyTrend(input))();
  }
}
