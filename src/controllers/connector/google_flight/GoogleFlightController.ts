import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { retry } from "../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";
import { GoogleFlightProvider } from "../../../providers/connector/google_flight/GoogleFlightProvider";
import { IGoogleFlight } from "@wrtn/connector-api/lib/structures/connector/google_flight/IGoogleFlight";

@Controller("connector/google-flight")
export class GoogleFlightController {
  constructor(private readonly googleFlightProvider: GoogleFlightProvider) {}

  /**
   * 편도 항공편을 검색합니다.
   *
   * @summary 편도 항공편 검색
   *
   * @param input 항공편 검색에 필요한 조건
   * @returns 편도 항공편 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("/one-way")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_flight.svg",
  )
  @ApiTags("Google Flight")
  async oneWay(
    @core.TypedBody() input: IGoogleFlight.IRequest,
  ): Promise<IGoogleFlight.IFinalResponse> {
    return retry(() => this.googleFlightProvider.searchOneWay(input))();
  }

  /**
   * 왕복 항공편을 검색합니다.
   *
   * @summary 왕복 항공편 검색
   *
   * @param departureToken 이전 단계에서 선택한 항공편의 departure token
   *
   * @param input 항공편 검색에 필요한 조건
   * @returns 왕복 항공편 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("/round-trip")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_flight.svg",
  )
  @ApiTags("Google Flight")
  async roundTrip(
    @core.TypedBody() input: IGoogleFlight.IRequest,
  ): Promise<IGoogleFlight.IFinalResponse> {
    return retry(() => this.googleFlightProvider.searchRoundTrip(input))();
  }
}
