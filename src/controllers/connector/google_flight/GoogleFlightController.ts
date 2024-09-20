import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { retry } from "../../../utils/retry";
import { GoogleFlightProvider } from "../../../providers/connector/google_flight/GoogleFlightProvider";
import { IGoogleFlight } from "@wrtn/connector-api/lib/structures/connector/google_flight/IGoogleFlight";

@Controller("connector/google-flight")
export class GoogleFlightController {
  constructor(private readonly googleFlightProvider: GoogleFlightProvider) {}

  /**
   * Search for one-way flights.
   *
   * @summary Search for one-way flights
   *
   * @param input Conditions required to search for flights
   * @returns Search results for one-way flights
   */
  @Standalone()
  @core.TypedRoute.Post("/one-way")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleFlight_full.svg",
  )
  async oneWay(
    @core.TypedBody() input: IGoogleFlight.IRequest,
  ): Promise<IGoogleFlight.IFinalResponse> {
    return retry(() => this.googleFlightProvider.searchOneWay(input))();
  }

  /**
   * Search for round-trip flights.
   *
   * @summary Search for round-trip flights
   *
   * @param departureToken The departure token of the flight selected in the previous step
   *
   * @param input The conditions required to search for flights
   * @returns The results of the round-trip flight search
   */
  @Standalone()
  @core.TypedRoute.Post("/round-trip")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleFlight_full.svg",
  )
  async roundTrip(
    @core.TypedBody() input: IGoogleFlight.IRequest,
  ): Promise<IGoogleFlight.IFinalResponse> {
    return retry(() => this.googleFlightProvider.searchRoundTrip(input))();
  }
}
