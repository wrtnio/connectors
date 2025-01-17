import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";
import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { retry } from "../../../utils/retry";
import { IncruitProvider } from "../../../providers/connector/incruit/IncruitProvider";

@Controller("connector/incruit")
export class IncruitController {
  constructor(private readonly incruitProvider: IncruitProvider) {}
  /**
   * Search for job postings on Incruit
   *
   * @summary Search Incruit job postings
   * @param input Search conditions
   * @returns Search results for Incruit job postings
   */
  @SelectBenchmark("인크루트에서 채용 공고 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/incruit.svg",
  )
  @ApiTags("Incruit")
  async searchForIncruit(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.incruitProvider.search(input))();
  }
}
