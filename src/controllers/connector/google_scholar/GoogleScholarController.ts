import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";

import { IGoogleScholar } from "@wrtn/connector-api/lib/structures/connector/google_scholar/IGoogleScholar";

import { ApiTags } from "@nestjs/swagger";
import { GoogleScholarProvider } from "../../../providers/connector/google_scholar/GoogleScholarProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-scholar")
export class GoogleScholarController {
  /**
   * Get a list of papers in Google Scholar
   *
   * @summary Search Google Scholar paper list
   * @param input Google Scholar paper search criteria
   * @returns Google Scholar paper list
   */
  @SelectBenchmark("google scholar에서 논문 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/google_scholar.svg",
  )
  @ApiTags("Google Scholar")
  async search(
    @core.TypedBody() input: IGoogleScholar.ISearchInput,
  ): Promise<IGoogleScholar.ISearchOutput[]> {
    return retry(() => GoogleScholarProvider.search(input))();
  }
}
