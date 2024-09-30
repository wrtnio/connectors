import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { retry } from "../../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/google-shopping")
export class GoogleShoppingEqlController {
  constructor(
    private readonly googleShoppingProvider: GoogleShoppingProvider,
  ) {}

  /**
   * Search for products in EQL.
   *
   * @summary EQL search
   *
   * @param input search conditions
   *
   * @returns search results
   */
  @Standalone()
  @core.TypedRoute.Post("eql")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/ECL_full.svg",
  )
  @ApiTags("EQL")
  async hansumEQL(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.hansumEQL(input))();
  }
}
