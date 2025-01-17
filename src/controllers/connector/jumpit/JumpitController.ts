import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";
import { retry } from "../../../utils/retry";
import { JumpitProvider } from "../../../providers/connector/jumpit/JumpitProvider";

@Controller("connector/jumpit")
export class JumpitController {
  constructor(private readonly jumpitProvider: JumpitProvider) {}
  /**
   * Search for job postings on Jumpfit
   *
   * @summary Jumpfit job posting search
   * @param input Search conditions
   * @returns Jumpfit job posting search results
   */
  @SelectBenchmark("점핏에서 채용 공고 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/jumpit.svg",
  )
  @ApiTags("Jumpit")
  async searchForJumpit(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.jumpitProvider.search(input))();
  }
}
