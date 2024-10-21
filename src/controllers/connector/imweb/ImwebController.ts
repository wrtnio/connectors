import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";

import { ApiTags } from "@nestjs/swagger";
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
   * @summary Get my sales product from `Imweb`
   *
   * @param input key and secret
   * @returns the seller's own goods
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Imweb_full.svg",
  )
  @ApiTags("Imweb")
  @Standalone()
  @core.TypedRoute.Post("get-products")
  async getProducts(
    @TypedBody() input: IImweb.IGetProductInput,
  ): Promise<IImweb.Product[]> {
    return retry(() => ImwebProvider.getProducts(input))();
  }

  /**
   * Issue Aimweb Access Token
   *
   * @internal
   *
   * @param input Request DTO for access token issuance.
   * @returns Response DTO containing access token.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Imweb_full.svg",
  )
  @ApiTags("Imweb")
  @core.TypedRoute.Post("auth")
  async authorization(
    @TypedBody() input: IImweb.Credential,
  ): Promise<IImweb.IGetAccessTokenOutput> {
    return retry(() => ImwebProvider.getAccessToken(input))();
  }
}
