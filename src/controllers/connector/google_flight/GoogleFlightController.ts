import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { IGoogleFlight } from "@wrtn/connector-api/lib/structures/connector/google_flight/IGoogleFlight";
import { GoogleFlightProvider } from "../../../providers/connector/google_flight/GoogleFlightProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-flight")
export class GoogleFlightController {
  constructor(private readonly googleFlightProvider: GoogleFlightProvider) {}

  /**
   * Search for one-way flights
   *
   * @summary Search for one-way flights
   * @param input Conditions required to search for flights
   * @returns Search results for one-way flights
   */
  @SelectBenchmark("구글에서 편도 항공권 조회해줘")
  @Standalone()
  @core.TypedRoute.Patch("/one-way")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleFlight_full.svg",
  )
  @ApiTags("Google Flight")
  async oneWay(
    @core.TypedBody() input: IGoogleFlight.IRequest,
  ): Promise<IGoogleFlight.IFinalResponse> {
    return retry(() => this.googleFlightProvider.searchOneWay(input))();
  }

  /**
   * Search for round-trip flights
   *
   * @summary Search for round-trip flights
   * @param departureToken The departure token of the flight selected in the previous step
   * @param input The conditions required to search for flights
   * @returns The results of the round-trip flight search
   */
  @SelectBenchmark("구글에서 왕복 항공권 조회해줘")
  @Standalone()
  @core.TypedRoute.Patch("/round-trip")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleFlight_full.svg",
  )
  @ApiTags("Google Flight")
  async roundTrip(
    @core.TypedBody() input: IGoogleFlight.IRequest,
  ): Promise<IGoogleFlight.IFinalResponse> {
    return retry(() => this.googleFlightProvider.searchRoundTrip(input))();
  }
}
