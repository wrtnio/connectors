import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { retry } from "../../../../utils/retry";

@Controller("connector/google-shopping")
export class GoogleShoppingOliveYoungController {
  constructor(
    private readonly googleShoppingProvider: GoogleShoppingProvider,
  ) {}

  /**
   * Search for products at Olive Young
   * Olive Young is a service that allows you to purchase cosmetics.
   *
   * @summary Olive Young Search
   * @param input Search conditions
   * @returns Search results
   */
  @SelectBenchmark("올리브영에서 상품 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("olive-young")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/oliveYoung_full.svg",
  )
  @ApiTags("Olive Young")
  async oliveYoung(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.oliveYoung(input))();
  }
}
