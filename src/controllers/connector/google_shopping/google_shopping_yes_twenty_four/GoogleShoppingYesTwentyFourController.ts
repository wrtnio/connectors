import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { retry } from "../../../../utils/retry";

@Controller("connector/google-shopping")
export class GoogleShoppingYesTwentyFourController {
  constructor(
    private readonly googleShoppingProvider: GoogleShoppingProvider,
  ) {}

  /**
   * Search for products on yes24
   * yes24 is a service that allows you to purchase books.
   * Only one item should be requested per request.
   * This connector only processes one search term at a time, so if you want to search for multiple terms, you will need to call this connector separately for each search term.
   *
   * @summary yes24 search
   * @param input search conditions
   * @returns search results
   */
  @SelectBenchmark("도서 검색 좀 해줘")
  @SelectBenchmark("yes24에서 상품 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Post("yes-twenty-four")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/yes24_full.svg",
  )
  @ApiTags("yes24")
  async yes24(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.yes24(input))();
  }
}
