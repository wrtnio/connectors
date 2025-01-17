import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { retry } from "../../../../utils/retry";

@Controller("connector/google-shopping")
export class GoogleShoppingTwentyNineCentimeterController {
  constructor(
    private readonly googleShoppingProvider: GoogleShoppingProvider,
  ) {}

  /**
   * Search for products from 29cm
   * 29cm is a service that allows you to purchase clothes or shoes.
   *
   * @summary 29cm search
   * @param input search condition
   * @returns search result
   */
  @SelectBenchmark("29cm에서 상품 좀 찾아줘")
  @Standalone()
  @core.TypedRoute.Patch("twenty-nine-centimeter")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/29cm.svg",
  )
  @ApiTags("29CM")
  async twentyNineCentimeter(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() =>
      this.googleShoppingProvider.twentyNineCentimeter(input),
    )();
  }
}
