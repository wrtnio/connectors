import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { IAirportInformation } from "@wrtn/connector-api/lib/structures/connector/airport_information/IAirportInformation";
import { AirportInformationProvider } from "../../../providers/connector/airport_information/AirportInformationProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/airport-information")
export class AirportInformationController {
  constructor(
    private readonly airportInformationProvider: AirportInformationProvider,
  ) {}

  /**
   * Search for airport information using the entered search term.
   * Only one item should be requested per request.
   * This connector only processes one search term at a time, so if you want to search for multiple terms, you will need to call this connector separately for each search term.
   *
   *
   * @summary Search for airport information
   * @param input Conditions for searching for airport information
   * @returns Search results for airport information
   */
  @SelectBenchmark("공항 찾아줘")
  @Standalone()
  @core.TypedRoute.Post("search")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/AirportInformation_full.svg",
  )
  @ApiTags("Search Airport Information")
  async search(
    @core.TypedBody() input: IAirportInformation.IRequest,
  ): Promise<IAirportInformation.IResponse[]> {
    return retry(() => this.airportInformationProvider.search(input))();
  }
}
