import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { retry } from "../../../utils/retry";
import { IGoogleMap } from "@wrtn/connector-api/lib/structures/connector/google_map/IGoogleMap";
import { GoogleMapProvider } from "../../../providers/connector/google_map/GoogleMapProvider";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/google-map")
export class GoogleMapController {
  constructor(private readonly googleMapProvider: GoogleMapProvider) {}

  /**
   * Search for restaurants using Google Maps.
   *
   * @summary Google Map restaurant search
   *
   * @param input Search term to search for restaurants
   * @returns Restaurant search results
   */
  @Standalone()
  @core.TypedRoute.Post("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMap_full.svg",
  )
  @ApiTags("Google Map")
  async search(
    @core.TypedBody() input: IGoogleMap.IRequest,
  ): Promise<IGoogleMap.IResponse[]> {
    return retry(() => this.googleMapProvider.search(input))();
  }

  /**
   * Search for restaurant reviews selected from Google Maps.
   *
   * @summary Search Google Map restaurant reviews
   *
   * @param input Unique id of the restaurant
   * @returns Restaurant review search results
   */
  @Standalone()
  @core.TypedRoute.Post("review")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMap_full.svg",
  )
  @ApiTags("Google Map")
  async review(
    @core.TypedBody() input: IGoogleMap.IReviewRequest,
  ): Promise<IGoogleMap.IReviewResponse[]> {
    return retry(() => this.googleMapProvider.review(input))();
  }
}
