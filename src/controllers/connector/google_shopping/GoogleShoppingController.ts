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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/musinsa.svg",
  )
  async musinsa(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.musinsa(input))();
  }


  /**
   * 상품을 29cm에서 검색합니다.
   *
   * @summary 29cm 검색
   *
   * @param input  검색 조건
   *
   * @returns  검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("twenty-nine-centimeter")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/twentynine_centimeter.svg",
  )
  async twentyNineCentimeter(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.twentyNineCentimeter(input))();
  }


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


  /**
   * 상품을 OCO에서 검색합니다.
   *
   * @summary OCO 검색
   *
   * @param input  검색 조건
   *
   * @returns  검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("oco")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/oco.svg",
  )
  async oco(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.oco(input))();
  }


  /**
   * 상품을 유니클로에서 검색합니다.
   *
   * @summary 유니클로 검색
   *
   * @param input  검색 조건
   *
   * @returns  검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("uniqlo")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/uniqlo.svg",
  )
  async uniqlo(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.uniqlo(input))();
  }


  // /**
  //  * 상품을 W Concept에서 검색합니다.
  //  *
  //  * @summary W Concept 검색
  //  *
  //  * @param input  검색 조건
  //  *
  //  * @returns  검색 결과
  //  */
  // @Standalone()
  // @core.TypedRoute.Post("wconcept")
  // // @RouteIcon(
  // //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google.svg",
  // // )
  // async wconcept(
  //   @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  // ): Promise<IGoogleShopping.IResponse[]> {
  //   return retry(() => this.googleShoppingProvider.wconcept(input))();
  // }


  /**
   * 상품을 쿠팡에서 검색합니다.
   *
   * @summary 쿠팡 검색
   *
   * @param input  검색 조건
   *
   * @returns  검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("coupang")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/coupang.svg",
  )
  async coupang(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.coupang(input))();
  }


  /**
   * 상품을 마켓컬리에서 검색합니다.
   *
   * @summary 마켓컬리 검색
   *
   * @param input  검색 조건
   *
   * @returns  검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("market-kurly")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/kurly.svg",
  )
  async marketKurly(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.marketKurly(input))();
  }


  /**
   * 상품을 아이허브에서 검색합니다.
   *
   * @summary 아이허브 검색
   *
   * @param input  검색 조건
   *
   * @returns  검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("iherb")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/iherb.svg",
  )
  async iherb(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.iherb(input))();
  }


  /**
   * 상품을 알리 익스프레스에서 검색합니다.
   *
   * @summary 알리 익스프레스 검색
   *
   * @param input  검색 조건
   *
   * @returns  검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("ali-express")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/ali_express.svg",
  )
  async aliExpress(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.aliExpress(input))();
  }


  /**
   * 상품을 올리브영에서 검색합니다.
   *
   * @summary 올리브영 검색
   *
   * @param input  검색 조건
   *
   * @returns  검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("olive-young")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/olive_young.svg",
  )
  async oliveYoung(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.oliveYoung(input))();
  }


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


  /**
   * 상품을 알라딘에서 검색합니다.
   *
   * @summary 알라딘 검색
   *
   * @param input  검색 조건
   *
   * @returns  검색 결과
   */
  @Standalone()
  @core.TypedRoute.Post("aladine")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/aladin.svg",
  )
  async aladine(
    @core.TypedBody() input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return retry(() => this.googleShoppingProvider.aladine(input))();
  }
}
