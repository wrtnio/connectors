import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { retry } from "../../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/google-shopping")
export class GoogleShoppingAladinController {
  constructor(
    private readonly googleShoppingProvider: GoogleShoppingProvider,
  ) {}

  /**
   * Search for products in Aladdin.
   *
   * @summary Aladdin Search
   *
   * @param input Search conditions
   *
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
