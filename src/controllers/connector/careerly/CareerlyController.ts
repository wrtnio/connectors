import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";
import { retry } from "../../../utils/retry";
import { CareerlyProvider } from "../../../providers/connector/careerly/CarrerlyProvider";

@Controller("connector/careely")
export class CareerlyController {
  constructor(private readonly careerlyProvider: CareerlyProvider) {}
  /**
   * Search for posts in Careerly
   *
   * @summary Careerly Search
   * @param input Search conditions
   * @returns Careerly Post Search Results
   */
  @SelectBenchmark("커리어리에서 채용 공고 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/careerly.svg",
  )
  @ApiTags("Careerly")
  async searchForCareerly(
    @core.TypedBody() input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return retry(() => this.careerlyProvider.search(input))();
  }
}
