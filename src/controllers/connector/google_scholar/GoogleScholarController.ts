import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleScholar } from "@wrtn/connector-api/lib/structures/connector/google_scholar/IGoogleScholar";

import { GoogleScholarProvider } from "../../../providers/connector/google_scholar/GoogleScholarProvider";
import { retry } from "../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/google-scholar")
export class GoogleScholarController {
  /**
   * Get a list of papers in Google Scholar.
   *
   * @summary Search Google Scholar paper list
   *
   * @param input Google Scholar paper search criteria
   *
   * @returns Google Scholar paper list
   */
  @Standalone()
  @core.TypedRoute.Post()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleScholar_full.svg",
  )
  @ApiTags("Google Scholar")
  async search(
    @core.TypedBody() input: IGoogleScholar.ISearchInput,
  ): Promise<IGoogleScholar.ISearchOutput[]> {
    return retry(() => GoogleScholarProvider.search(input))();
  }
}
