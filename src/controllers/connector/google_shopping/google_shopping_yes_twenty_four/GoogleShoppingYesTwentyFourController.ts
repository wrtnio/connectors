import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";
import { retry } from "../../../../utils/retry";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Controller("connector/google-shopping")
export class GoogleShoppingYesTwentyFourController {
  constructor(
    private readonly googleShoppingProvider: GoogleShoppingProvider,
  ) {}

  /**
   * 상품을 yes24에서 검색합니다.
   *
   * @summary yes24 검색
   *
   * @param input  검색 조건
   *
   * @returns  검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("yes-twenty-four")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/yes_twentyfour.svg",
  )
  async yes24(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.yes24(input))();
  }
}
