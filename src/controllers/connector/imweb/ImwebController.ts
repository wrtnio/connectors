import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";

import { ImwebProvider } from "../../../providers/connector/imweb/ImwebProvider";

@Controller("connector/imweb")
export class ImwebController {
  async getProducts(
    @TypedBody() input: IImweb.IGetProductInput,
  ): Promise<IImweb.IGetProductOutput> {
    return null!;
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
    return ImwebProvider.getAccessToken(input);
  }
}
