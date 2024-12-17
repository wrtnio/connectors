import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { retry } from "../../../../utils/retry";

@Controller("connector/google-shopping")
export class GoogleShoppingOcoController {
  constructor(
    private readonly googleShoppingProvider: GoogleShoppingProvider,
  ) {}

  /**
   * Search for products in OCO
   *
   * Oco is one of the Korean companies and is a brand that advocates a brand editing shop.
   * Only one keyword should be requested per request.
   * For example, If you use "shirts" and "pants" as keywords, you must make two requests, each with separate keywords.
   *
   * @summary OCO search
   * @param input Search conditions
   * @returns Search results
   */
  @Standalone()
  @core.TypedRoute.Post("oco")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/OCO_full.svg",
  )
  @ApiTags("OCO")
  async oco(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.oco(input))();
  }
}
