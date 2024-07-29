import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtnio/decorators";

import { retry } from "../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";
import { GoogleFlightProvider } from "../../../providers/connector/google_flight/GoogleFlightProvider";
import { IGoogleFlight } from "@wrtn/connector-api/lib/structures/connector/google_flight/IGoogleFlight";

@Controller("connector/google-flight")
export class GoogleFlightController {
  constructor(private readonly googleFlightProvider: GoogleFlightProvider) {}

  /**
   * 출발 항공편을 검색합니다.
   *
   * @summary 출발 항공편 검색
   *
   * @param input 항공편 검색에 필요한 조건
   * @returns 항공편 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("/departure")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/musinsa.svg",
  // )
  @ApiTags("Google Flight")
  async departure(
    @core.TypedBody() input: IGoogleFlight.IRequest,
  ): Promise<IGoogleFlight.IResponse> {
    return retry(() => this.googleFlightProvider.searchForDeparture(input))();
  }

  /**
   * 도착 항공편을 검색합니다.
   *
   * @summary 도착 항공편 검색
   *
   * @param departureToken 이전 단계에서 선택한 항공편의 departure token
   *
   * @param input 항공편 검색에 필요한 조건
   * @returns 항공편 검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("/arrival/:departureToken")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/musinsa.svg",
  // )
  @ApiTags("Google Flight")
  async arrival(
    @core.TypedBody() input: IGoogleFlight.IRequest,
    @Prerequisite({
      neighbor: () => GoogleFlightController.prototype.departure,
      jmesPath: "[].{value:departure_token, label:departure_token || ''}",
    })
    @core.TypedParam("departureToken")
    departureToken: string,
  ): Promise<IGoogleFlight.IResponse> {
    return retry(() =>
      this.googleFlightProvider.searchForArrival(input, departureToken),
    )();
  }

  /**
   * 최종 항공편을 검색합니다.
   * 출발, 도착 항공편을 선택한 결과를 보여줍니다.
   *
   * @summary 최종 항공편 선택 결과
   *
   * @param bookingToken 이전 단계에서 선택한 항공편의 booking token
   *
   * @param input 항공편 검색에 필요한 조건
   * @returns 항공편 선택 결과
   */
  @Standalone()
  @core.TypedRoute.Post("/final/:bookingToken")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/musinsa.svg",
  // )
  @ApiTags("Google Flight")
  async final(
    @core.TypedBody() input: IGoogleFlight.IRequest,
    @Prerequisite({
      neighbor: () => GoogleFlightController.prototype.arrival,
      jmesPath: "[].{value:booking_token, label:booking_token || ''}",
    })
    @core.TypedParam("bookingToken")
    bookingToken: string,
  ): Promise<IGoogleFlight.IFinalResponse> {
    return retry(() =>
      this.googleFlightProvider.searchForFinal(input, bookingToken),
    )();
  }
}
