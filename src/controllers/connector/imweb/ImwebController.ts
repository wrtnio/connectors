import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Standalone } from "@wrtnio/decorators";

import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";

import { ImwebProvider } from "../../../providers/connector/imweb/ImwebProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/imweb")
export class ImwebController {
  /**
   * Look up the sales product
   *
   * The `Imweb` seller uses the seller's authentication key and secret to import his or her product.
   * `Imweb` is a Korean webbuilder site that offers a similar experience to the service called Wix.
   * If a commerce site is opened using `Imweb`,
   * sellers can register the items they are selling,
   * which is only available to sellers who open `Imweb` pages and is intended to bring up their products.
   * Sellers must provide their API keys and secrets to import `Imweb` products.
   *
   * @summary 자신의 상품 조회
   *
   * @param input 상품을 조회하기 위한 조건 DTO.
   * @returns 액세스 토큰을 담은 응답 DTO.
   */
  @Standalone()
  @core.TypedRoute.Post("get-products")
  async getProducts(
    @TypedBody() input: IImweb.IGetProductInput,
  ): Promise<IImweb.IGetProductOutput> {
    return retry(() => ImwebProvider.getProducts(input))();
  }

  /**
   * 아임웹 액세스 토큰 발급.
   *
   * @internal
   *
   * @param input 액세스 토큰 발급을 위한 요청 DTO.
   * @returns 액세스 토큰을 담은 응답 DTO.
   */
  @core.TypedRoute.Post("auth")
  async authorization(
    @TypedBody() input: IImweb.Credential,
  ): Promise<IImweb.IGetAccessTokenOutput> {
    return retry(() => ImwebProvider.getAccessToken(input))();
  }
}
