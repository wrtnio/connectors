import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";

import { IConnector } from "@wrtn/connector-api/lib/structures/common/IConnector";

import { ApiTags } from "@nestjs/swagger";
import { ArxivSearchProvider } from "../../../providers/connector/arxiv_search/ArxivSearchProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/arxiv-search")
export class ArxivSearchController {
  /**
   * Searches the archive for papers based on the search criteria you entered
   *
   * @summary Archive Paper Search
   * @param input Archive Paper Search Criteria
   * @returns A list of papers found in the archive based on the search criteria.
   */
  @SelectBenchmark("논문 찾아줘")
  @Standalone()
  @core.TypedRoute.Post()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Arxiv_full.svg",
  )
  @ApiTags("Arxiv")
  async search(
    @core.TypedBody() input: IConnector.ISearchInput,
  ): Promise<IConnector.ISearchOutput> {
    return retry(() => ArxivSearchProvider.search(input))();
  }
}
