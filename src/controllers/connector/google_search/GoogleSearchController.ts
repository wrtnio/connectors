import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";

import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { retry } from "../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/google-search")
export class GoogleSearchController {
  constructor(private readonly googleSearchProvider: GoogleSearchProvider) {}

  /**
   * Search Google for the search term you entered.
   *
   * @summary Google search
   *
   * @param input Google search terms
   *
   * @returns Google search results
   */
  @Standalone()
  @core.TypedRoute.Post("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSearch_full.svg",
  )
  @ApiTags("Google Search")
  async search(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.search(input))();
  }
}
