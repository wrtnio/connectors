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
   * Only one keyword should be requested per request.
   * For example, If you use "novel book" and "fairy tale book" as keywords, you must make two requests, each with separate keywords.
   *
   * @summary yes24 search
   * @param input search conditions
   * @returns search results
   */
  @SelectBenchmark("도서 검색 좀 해줘")
  @SelectBenchmark("yes24에서 상품 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("yes-twenty-four")
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
