import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";
import { retry } from "../../../utils/retry";
import { WantedProvider } from "../../../providers/connector/wanted/WantedProvider";

@Controller("connector/wanted")
export class WantedController {
  constructor(private readonly wantedProvider: WantedProvider) {}
  /**
   * Search for job postings on Wanted
   *
   * @summary Wanted job posting search
   * @param input Search conditions
   * @returns Wanted job posting search results
   */
  @SelectBenchmark("원티드에서 채용 공고 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/wanted.svg",
  )
  @ApiTags("Wanted")
  async searchForWanted(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.wantedProvider.search(input))();
  }
}
