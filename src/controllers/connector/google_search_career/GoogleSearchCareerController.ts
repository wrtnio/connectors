import { Controller } from "@nestjs/common";
import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { RouteIcon, Standalone } from "@wrtnio/decorators";
import core from "@nestia/core";
import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";
import { retry } from "../../../utils/retry";

@Controller("connector/google-search")
export class GoogleSearchCareerController {
  constructor(private readonly googleSearchProvider: GoogleSearchProvider) {}
  /**
   * Search for job postings on Wanted.
   *
   * @summary Wanted job posting search
   *
   * @param input Search conditions
   *
   * @returns Wanted job posting search results
   */
  @Standalone()
  @core.TypedRoute.Post("wanted")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/_wanted_full.svg",
  )
  async searchForWanted(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForWanted(input))();
  }

  /**
   * Search for job postings on Incruit.
   *
   * @summary Search Incruit job postings
   *
   * @param input Search conditions
   *
   * @returns Search results for Incruit job postings
   */
  @Standalone()
  @core.TypedRoute.Post("incruit")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Incruit_full.svg",
  )
  async searchForIncruit(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForIncruit(input))();
  }

  /**
   * Search for job postings in Saramin.
   *
   * @summary Search for Saramin job postings
   *
   * @param input Search criteria
   *
   * @returns Search for Saramin job postings results
   */
  @Standalone()
  @core.TypedRoute.Post("saramin")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Saramin_full.svg",
  )
  async searchForSaramin(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForSaramin(input))();
  }

  /**
   * Search for job postings on Jumpfit.
   *
   * @summary Jumpfit job posting search
   *
   * @param input Search conditions
   *
   * @returns Jumpfit job posting search results
   */
  @Standalone()
  @core.TypedRoute.Post("jumpit")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/jumpit_full.svg",
  )
  async searchForJumpit(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForJumpit(input))();
  }

  /**
   * Search for posts in Careerly.
   *
   * @summary Careerly Search
   *
   * @param input Search conditions
   *
   * @returns Careerly Post Search Results
   */
  @Standalone()
  @core.TypedRoute.Post("careerly")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/careerly_full.svg",
  )
  async searchForCareerly(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForCareerly(input))();
  }
}
