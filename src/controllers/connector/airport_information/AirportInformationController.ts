import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { retry } from "../../../utils/retry";
import { IAirportInformation } from "@wrtn/connector-api/lib/structures/connector/airport_information/IAirportInformation";
import { AirportInformationProvider } from "../../../providers/connector/airport_information/AirportInformationProvider";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/airport-information")
export class AirportInformationController {
  constructor(
    private readonly airportInformationProvider: AirportInformationProvider,
  ) {}

  /**
   * Search for airport information using the entered search term.
   * Only one keyword should be requested per request.
   * For example, if you need to enter Seoul and Tokyo as keywords, you should make two requests with one word, "Seoul" and "Tokyo", not "Seoul, Tokyo".
   *
   *
   * @summary Search for airport information
   * @param input Conditions for searching for airport information
   * @returns Search results for airport information
   */
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
