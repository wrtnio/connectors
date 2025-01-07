import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { IGoogleMap } from "@wrtn/connector-api/lib/structures/connector/google_map/IGoogleMap";
import { GoogleMapProvider } from "../../../providers/connector/google_map/GoogleMapProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-map")
export class GoogleMapController {
  constructor(private readonly googleMapProvider: GoogleMapProvider) {}

  /**
   * recommendations for automatic completion or location through a search word or a latitude coordinate value to be used with the search word.
   *
   * Since it is a text auto-completion, this feature allows you to find better search keywords.
   * However, since there is a separate connector for searching the surrounding geography, it is recommended to use that connector if you want to find a place that is not a keyword.
   * It is recommended that you use this connector to narrow down the search keyword before writing the place search connector.
   *
   * @summary Returns predictions for the given input in Google Maps
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMap_full.svg",
  )
  @ApiTags("Google Map")
  @core.TypedRoute.Patch("autocomplete")
  async autocomplete(
    @core.TypedBody() input: IGoogleMap.IAutocompleteInput,
  ): Promise<IGoogleMap.IAutocompleteOutput> {
    return retry(() => this.googleMapProvider.autocomplete(input))();
  }

  /**
   * Search for restaurant reviews selected from Google Maps
   *
   * @summary Search Google Map restaurant reviews
   * @param input Unique id of the restaurant
   * @returns Restaurant review search results
   */
  @SelectBenchmark("식당 리뷰 좀 보고 알려줘")
  @SelectBenchmark("구글 맵에서 식당 리뷰 좀 봐줘")
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMap_full.svg",
  )
  @core.TypedRoute.Patch("review")
  @ApiTags("Google Map")
  async review(
    @core.TypedBody() input: IGoogleMap.IReviewRequest,
  ): Promise<IGoogleMap.IReviewResponse[]> {
    return retry(() => this.googleMapProvider.review(input))();
  }

  /**
   * General search functionality on Google Maps
   *
   * If possible, it is recommended to use POST/connector/google-map/search-text connector rather than this.
   * Here, it is difficult to conduct additional search after providing information to users because only restaurants are searched using the Serp API and the response parameter does not provide a Google Map link.
   *
   * @summary Search by text in Google Maps
   * @param input Keyword
   * @returns
   */
  @SelectBenchmark('구글 맵에서 "강남" 이라는 키워드로 장소 검색 좀 해줘')
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMap_full.svg",
  )
  @core.TypedRoute.Patch("search-text")
  @ApiTags("Google Map")
  async searchText(
    @TypedBody() input: IGoogleMap.ISearchTextInput,
  ): Promise<IGoogleMap.ISearchTextOutput> {
    return this.googleMapProvider.searchText(input);
  }

  /**
   * Search for restaurants using Google Maps
   *
   * @summary Google Map restaurant search
   * @param input Search term to search for restaurants
   * @returns Restaurant search results
   */
  @SelectBenchmark("구글 맵에서 식당 좀 찾아줘")
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMap_full.svg",
  )
  @core.TypedRoute.Patch()
  @ApiTags("Google Map")
  async search(
    @core.TypedBody() input: IGoogleMap.IRequest,
  ): Promise<IGoogleMap.IResponse[]> {
    return retry(() => this.googleMapProvider.search(input))();
  }
}
