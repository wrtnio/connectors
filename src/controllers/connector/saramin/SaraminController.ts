import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";
import { retry } from "../../../utils/retry";
import { SaraminProvider } from "../../../providers/connector/saramin/SaraminProvider";

@Controller("connector/saramin")
export class SaraminController {
  constructor(private readonly saraminProvider: SaraminProvider) {}
  /**
   * Search for job postings in Saramin
   *
   * @summary Search for Saramin job postings
   * @param input Search criteria
   * @returns Search for Saramin job postings results
   */
  @SelectBenchmark("사람인에서 채용 공고 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/saramin.svg",
  )
  @ApiTags("Saramin")
  async searchForSaramin(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.saraminProvider.search(input))();
  }
}
