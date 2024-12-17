import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { retry } from "../../../../utils/retry";

@Controller("connector/google-shopping")
export class GoogleShoppingMarketKurlyController {
  constructor(
    private readonly googleShoppingProvider: GoogleShoppingProvider,
  ) {}

  /**
   * Search for products on Market Kurly
   * Market Kurly is a service where you can purchase groceries.
   * Only one item should be requested per request.
   * This connector only processes one search term at a time, so if you want to search for multiple terms, you will need to call this connector separately for each search term.
   *
   * @summary Market Kurly Search
   * @param input Search conditions
   * @returns Search results
   */
  @SelectBenchmark("마켓컬리에서 상품 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Post("market-kurly")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Kurly_full.svg",
  )
  @ApiTags("Market Kurly")
  async marketKurly(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.marketKurly(input))();
  }
}
