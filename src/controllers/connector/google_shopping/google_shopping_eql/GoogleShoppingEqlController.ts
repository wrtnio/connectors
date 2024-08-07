import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { retry } from "../../../../utils/retry";

@Controller("connector/google-shopping")
export class GoogleShoppingEqlController {
  constructor(
    private readonly googleShoppingProvider: GoogleShoppingProvider,
  ) {}

  /**
   * 상품을 EQL에서 검색합니다.
   *
   * @summary EQL 검색
   *
   * @param input  검색 조건
   *
   * @returns  검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("eql")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/eql.svg",
  )
  async hansumEQL(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.hansumEQL(input))();
  }
}
