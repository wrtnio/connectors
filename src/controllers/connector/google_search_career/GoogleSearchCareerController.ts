import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";
import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-search")
export class GoogleSearchCareerController {
  constructor(private readonly googleSearchProvider: GoogleSearchProvider) {}
  /**
   * Search for job postings on Wanted
   *
   * @summary Wanted job posting search
   * @param input Search conditions
   * @returns Wanted job posting search results
   */
  @SelectBenchmark("채용 공고 좀 찾아줘")
  @SelectBenchmark("원티드에서 채용 공고 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("wanted")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/_wanted_full.svg",
  )
  @ApiTags("Wanted")
  async searchForWanted(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForWanted(input))();
  }

  /**
   * Search for job postings on Incruit
   *
   * @summary Search Incruit job postings
   * @param input Search conditions
   * @returns Search results for Incruit job postings
   */
  @SelectBenchmark("채용 공고 좀 찾아줘")
  @SelectBenchmark("인크루트에서 채용 공고 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("incruit")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Incruit_full.svg",
  )
  @ApiTags("Incruit")
  async searchForIncruit(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForIncruit(input))();
  }

  /**
   * Search for job postings in Saramin
   *
   * @summary Search for Saramin job postings
   * @param input Search criteria
   * @returns Search for Saramin job postings results
   */
  @SelectBenchmark("채용 공고 좀 찾아줘")
  @SelectBenchmark("사람인에서 채용 공고 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("saramin")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Saramin_full.svg",
  )
  @ApiTags("Saramin")
  async searchForSaramin(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForSaramin(input))();
  }

  /**
   * Search for job postings on Jumpfit
   *
   * @summary Jumpfit job posting search
   * @param input Search conditions
   * @returns Jumpfit job posting search results
   */
  @SelectBenchmark("채용 공고 좀 찾아줘")
  @SelectBenchmark("사람인에서 채용 공고 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("jumpit")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/jumpit_full.svg",
  )
  @ApiTags("Jumpit")
  async searchForJumpit(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForJumpit(input))();
  }

  /**
   * Search for posts in Careerly
   *
   * @summary Careerly Search
   * @param input Search conditions
   * @returns Careerly Post Search Results
   */
  @SelectBenchmark("채용 공고 좀 찾아줘")
  @SelectBenchmark("커리어리에서 채용 공고 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("careerly")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/careerly_full.svg",
  )
  @ApiTags("Careerly")
  async searchForCareerly(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.googleSearchProvider.searchForCareerly(input))();
  }
}
