import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtnio/decorators";

import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";

import { ApiTags } from "@nestjs/swagger";
import { IShoppingSale } from "@samchon/shopping-api/lib/structures/shoppings/sales/IShoppingSale";
import { ImwebProvider } from "../../../providers/connector/imweb/ImwebProvider";

@Controller("connector/imweb")
export class ImwebController {
  /**
   * [Imweb] Get a sale info.
   *
   * Get a {@link IShoppingSale sale} with detailed information.
   *
   * If you're a {@link IShoppingSeller seller}, you can only access to the
   * your own {@link IShoppingSale sale}. Otherwise you're a
   * {@link IShoppingCustomer customer}, you can access to only the operating
   * sales in the market. You can't access to the unopened, closed, or suspended
   * sales.
   *
   * @param product_no Target sale's {@link IImweb.ProductSummary.prodNo}
   * @returns Detailed sale information
   * @tag Sale
   *
   * @author Samchon
   */
  @core.TypedRoute.Patch("customers/sales/:product_no")
  public async at(
    @core.TypedParam("product_no") product_no: string,
    @core.TypedBody() input: IImweb.ISecret,
  ): Promise<IImweb.Sale> {
    return await ImwebProvider.at(product_no)(input);
  }

  /**
   * [Imweb] List up every summarized sales.
   *
   * List up every {@link IShoppingSale.ISummary summarized sales}.
   *
   * As you can see, returned sales are summarized, not detailed. If you want
   * to get the detailed information of a sale, use {@link at} function for
   * each sale.
   *
   * For reference, if you're a {@link IShoppingSeller seller}, you can only
   * access to the your own {@link IShoppingSale sale}s. Otherwise you're a
   * {@link IShoppingCustomer customer}, you can see only the operating
   * sales in the market. Instead, you can't see the unopened, closed, or
   * suspended sales.
   *
   * By the way, if you want, you can limit the result by configuring
   * {@link IShoppingSale.IRequest.search search condition} in the request
   * body. Also, it is possible to customize sequence order of records by
   * configuring {@link IShoppingSale.IRequest.sort sort condition}.
   *
   * @param input Request info of pagination, searching and sorting
   * @returns Paginated sales with summarized information
   * @tag Sale
   *
   * @author Samchon
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Imweb_full.svg",
  )
  @ApiTags("Imweb")
  @core.TypedRoute.Patch("customers/sales")
  async getProducts(
    @TypedBody() input: IImweb.IGetProductInput,
  ): Promise<IImweb.IResponse> {
    return ImwebProvider.index(input);
  }
}
