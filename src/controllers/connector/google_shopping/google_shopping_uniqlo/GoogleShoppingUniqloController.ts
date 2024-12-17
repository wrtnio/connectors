import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { retry } from "../../../../utils/retry";

@Controller("connector/google-shopping")
export class GoogleShoppingUniqloController {
  constructor(
    private readonly googleShoppingProvider: GoogleShoppingProvider,
  ) {}

  /**
   * Search for products in Uniqlo
   * Uniqlo is a service that allows you to purchase clothes or shoes.
   * Only one keyword should be requested per request.
   * For example, If you use "shirts" and "pants" as keywords, you must make two requests, each with separate keywords.
   *
   * @summary Uniqlo Search
   * @param input Search conditions
   * @returns Search results
   */
  @Standalone()
  @core.TypedRoute.Post("uniqlo")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Uniqlo_full.svg",
  )
  @ApiTags("Uniqlo")
  async uniqlo(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.uniqlo(input))();
  }
}
