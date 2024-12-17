import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { retry } from "../../../../utils/retry";

@Controller("connector/google-shopping")
export class GoogleShoppingAladinController {
  constructor(
    private readonly googleShoppingProvider: GoogleShoppingProvider,
  ) {}

  /**
   * Search for products in Aladdin
   * Aladdin is a service that allows you to purchase used books.
   * Only one keyword should be requested per request.
   * For example, If you use "novel book" and "fairy tale book" as keywords, you must make two requests, each with separate keywords.
   *
   * @summary Aladdin Search
   * @param input Search conditions
   * @returns Search results
   */
  @Standalone()
  @core.TypedRoute.Post("aladine")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/aladin_full.svg",
  )
  @ApiTags("Aladin")
  async aladine(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.aladine(input))();
  }
}
