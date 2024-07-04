import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Standalone } from "@wrtn/decorators";

import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";

import { ImwebProvider } from "../../../providers/connector/imweb/ImwebProvider";
import { Try, createResponseForm } from "../../../utils/createResponseForm";
import { retry } from "../../../utils/retry";

@Controller("connector/imweb")
export class ImwebController {
  /**
   * 아임웹에서 판매자의 상품들을 불러온다.
   *
   * @summary 자신의 상품 조회.
   *
   * @param input 상품을 조회하기 위한 조건 DTO.
   * @returns 액세스 토큰을 담은 응답 DTO.
   */
  @Standalone()
  @core.TypedRoute.Post("get-products")
  async getProducts(@TypedBody() input: IImweb.IGetProductInput): Promise<Try<IImweb.IGetProductOutput>> {
    const data = await retry(() => ImwebProvider.getProducts(input))();
    return createResponseForm(data);
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
  async authorization(@TypedBody() input: IImweb.Credential): Promise<Try<IImweb.IGetAccessTokenOutput>> {
    const data = await retry(() => ImwebProvider.getAccessToken(input))();
    return createResponseForm(data);
  }
}
