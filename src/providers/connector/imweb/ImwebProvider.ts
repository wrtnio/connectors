import { IShoppingPrice } from "@samchon/shopping-api/lib/structures/shoppings/base/IShoppingPrice";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";
import typia, { is, tags } from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { APIProivder } from "./APIProivder";
import { TransformProivder } from "./TransformProvider";

export namespace ImwebProvider {
  export namespace Select {
    export function getUnit(type: "maximum" | "minimum") {
      return function (
        units: Awaited<ReturnType<typeof ImwebProvider.getUnits>>,
      ): IShoppingPrice {
        if (type === "maximum") {
          return units
            .map((unit) => unit.price_range.highest)
            .reduce((acc, cur) => (cur.real > acc.real ? cur : acc));
        } else {
          return units
            .map((unit) => unit.price_range.lowest)
            .reduce((acc, cur) => (cur.real < acc.real ? cur : acc));
        }
      };
    }
  }

  export async function getUnits(input: {
    productDetail: Pick<IImweb.Product, "prodNo" | "name" | "price">;
    unitCode: string;
    accessToken: string;
  }): Promise<Array<IImweb.ShoppingBackend.ImwebSaleUnitSummary>> {
    const options = await APIProivder.getOptionDetails({
      product_no: input.productDetail.prodNo,
      ...input,
    });

    if (options.length === 0) {
      return [
        {
          id: TransformProivder.toUUID(null),
          name: input.productDetail.name,
          options: [],
          price_range: {
            highest: {
              nominal: input.productDetail.price,
              real: input.productDetail.price,
            },
            lowest: {
              nominal: input.productDetail.price,
              real: input.productDetail.price,
            },
          },
          primary: true,
          required: true,
        },
      ];
    }

    // Transform product type to shopping backend format
    return TransformProivder.toIShoppingSaleUnitSummary({
      price: input.productDetail.price,
    })(options);
  }

  export async function getDefaultUnit(input: IImweb.Common.IAccessToken) {
    const site = await APIProivder.getSite(input);
    const units = await Promise.all(
      site.unitList.map(async (unit) => {
        return await APIProivder.getUnit({
          unitCode: unit.unitCode,
          accessToken: input.accessToken,
        });
      }),
    );

    const defaultUnit = units.find((el) => el.isDefault === true) ?? units[0];
    return { unit: defaultUnit, site };
  }

  export const at =
    (product_no: string) =>
    async (input: IImweb.ISecret): Promise<IImweb.ShoppingBackend.Sale> => {
      const authorization = await ImwebProvider.getAccessToken(input);
      const accessToken = authorization.data.accessToken;
      const imweb_unit = await ImwebProvider.getDefaultUnit({ accessToken });

      const productDetail = await APIProivder.getProductDetail({
        product_no: Number(product_no),
        accessToken,
        unitCode: imweb_unit.unit.unitCode,
      });

      if (typia.is<IImweb.Common.IError>(productDetail)) {
        throw productDetail;
      }

      const units = await ImwebProvider.getUnits({
        productDetail: productDetail,
        unitCode: imweb_unit.unit.unitCode,
        accessToken,
      });

      return {
        id: TransformProivder.toUUID(productDetail.prodCode),
        channels: [],
        content: {
          id: TransformProivder.toUUID(null),
          title: productDetail.simpleContent ?? "",
          body: productDetail.content ?? "",
          format: "txt",
          thumbnails: [],
          files: [],
        },
        created_at: productDetail.addTime,
        latest: true,
        opened_at: productDetail.preSaleStartDate,
        paused_at: productDetail.preSaleEndDate,
        units: units,
        updated_at: productDetail.editTime,
        tags: [
          ...(productDetail.isBadgeBest ? ["best"] : []),
          ...(productDetail.isBadgeNew ? ["new"] : []),
          ...(productDetail.isBadgeMd ? ["md_pick"] : []),
          ...(productDetail.isBadgeHot ? ["hot"] : []),
        ],
      };
    };

  export async function index(
    input: IImweb.IGetProductInput,
  ): Promise<IPage<IImweb.ShoppingBackend.SaleSummary>> {
    const authorization = await ImwebProvider.getAccessToken(input);
    const accessToken = authorization.data.accessToken;

    const site = await getDefaultUnit({ accessToken });
    const categories = await APIProivder.getCategories({
      accessToken,
      unitCode: site.unit.unitCode,
    });

    // 상품 조회
    const response = await APIProivder.getProducts({
      ...input,
      accessToken,
      unitCode: site.unit.unitCode,
    });

    return {
      pagination: {
        current: response.currentPage,
        limit: response.pageSize,
        pages: response.totalPage,
        records: response.totalCount,
      },
      data: await Promise.all(
        response.list.map(
          async (
            imweb_product,
          ): Promise<IImweb.ShoppingBackend.SaleSummary> => {
            const productDetailOrError = await APIProivder.getProductDetail({
              product_no: imweb_product.prodNo,
              unitCode: site.unit.unitCode,
              accessToken,
            });

            if (typia.is<IImweb.Common.IError>(productDetailOrError)) {
              throw productDetailOrError;
            }

            const units = await ImwebProvider.getUnits({
              productDetail: productDetailOrError,
              unitCode: site.unit.unitCode,
              accessToken,
            });

            return {
              id: TransformProivder.toUUID(imweb_product.prodNo.toString()),
              product_no: imweb_product.prodNo,
              seller: {
                id: TransformProivder.toUUID(site.site.siteCode),
                type: "seller",
                citizen: {
                  mobile: site.unit.phone ?? "",
                  name: site.unit.presidentName,
                },
              },
              channels: [
                {
                  id: TransformProivder.toUUID(site.unit.unitCode),
                  code: site.unit.unitCode,
                  name: site.unit.companyName,
                  categories: (categories instanceof Array ? categories : [])
                    .filter((el) =>
                      productDetailOrError.categories.includes(el.categoryCode),
                    )
                    .map((el) => {
                      return {
                        id: TransformProivder.toUUID(el.categoryCode),
                        code: el.categoryCode,
                        name: el.name,
                        parent_id: null,
                        parent: null,
                      };
                    }),
                },
              ],
              content: {
                thumbnails: imweb_product.productImages
                  .filter((image) => is<string & tags.Format<"iri">>(image))
                  .map((image) => {
                    const splited = image.split("/");
                    const filename = splited[splited.length - 1];
                    return {
                      id: TransformProivder.toUUID(filename.split(".")[0]),
                      name: filename,
                      extension: filename.split(".")[1],
                      url: image,
                    };
                  }),
                title: imweb_product.name,
              },
              created_at: imweb_product.addTime,
              latest: true,
              opened_at: productDetailOrError.preSaleStartDate,
              paused_at: productDetailOrError.preSaleEndDate,
              price_range: {
                highest: ImwebProvider.Select.getUnit("maximum")(units),
                lowest: ImwebProvider.Select.getUnit("minimum")(units),
              },
              units: units,
              updated_at: imweb_product.editTime,
              tags: [
                ...(productDetailOrError.isBadgeBest ? ["best"] : []),
                ...(productDetailOrError.isBadgeNew ? ["new"] : []),
                ...(productDetailOrError.isBadgeMd ? ["md_pick"] : []),
                ...(productDetailOrError.isBadgeHot ? ["hot"] : []),
              ],
            };
          },
        ),
      ),
    };
  }

  export async function getAccessToken(input: { secretKey: string }) {
    const secretKey = input.secretKey;
    const refreshToken = await OAuthSecretProvider.getSecretValue(secretKey);
    const response = await APIProivder.refresh({ refreshToken });
    if (response.statusCode !== 200) {
      throw response;
    }

    const newRefreshToken = response.data.refreshToken;

    if (typia.is<string & tags.Format<"uuid">>(secretKey)) {
      await OAuthSecretProvider.updateSecretValue(input.secretKey, {
        value: newRefreshToken,
      });
    }

    if (process.env.NODE_ENV === "test") {
      await ConnectorGlobal.write({ IMWEB_TEST_API_SECRET: newRefreshToken });
    }

    return response;
  }
}
