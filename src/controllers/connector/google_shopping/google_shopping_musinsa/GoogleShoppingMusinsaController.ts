import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";
import core from "@nestia/core";
import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { retry } from "../../../../utils/retry";

@Controller("connector/google-shopping")
export class GoogleShoppingMusinsaController {
  constructor(
    private readonly googleShoppingProvider: GoogleShoppingProvider,
  ) {}

  /**
   * Search for products in Musinsa.
   *
   * @summary Musinsa Search
   *
   * @param input Search conditions
   *
   * @returns Search results
   */
  @Standalone()
  @core.TypedRoute.Post("musinsa")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Musinsa_full.svg",
  )
  async musinsa(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.musinsa(input))();
  }
}
