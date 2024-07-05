import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtn/decorators";


import { retry } from "../../../utils/retry";
import { GoogleShoppingProvider } from "../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";

@Controller("connector/google-shopping")
export class GoogleShoppingController {
  constructor(private readonly googleShoppingProvider: GoogleShoppingProvider) {}

  /**
   * 상품을 무신사에서 검색합니다.
   *
   * @summary 무신사 검색
   *
   * @param input  검색 조건
   *
   * @returns  검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("musinsa")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google.svg",
  // )
  async musinsa(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.musinsa(input))();
  }
}
