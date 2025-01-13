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
        units: Awaited<ReturnType<ReturnType<typeof ImwebProvider.getUnits>>>,
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

  export function getUnits(unitCode: string) {
    return async function (input: {
      productDetail: Pick<IImweb.Product, "prodNo" | "name" | "price">;

      accessToken: string;
    }): Promise<Array<IImweb.ShoppingBackend.ImwebSaleUnitSummary>> {
      const { productDetail } = input;
      const options = await APIProivder.getOptionDetails({
        productNo: productDetail.prodNo,
        accessToken: input.accessToken,
        unitCode: unitCode,
      });

      // Transform product type to shopping backend format
      return TransformProivder.toIShoppingSaleUnitSummary(productDetail)(
        options,
      );
    };
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
    (productNo: string) =>
    async (input: IImweb.ISecret): Promise<IImweb.ShoppingBackend.Sale> => {
      const authorization = await ImwebProvider.getAccessToken(input);
      const imweb_unit = await ImwebProvider.getDefaultUnit(authorization);

      const unitCode = imweb_unit.unit.unitCode;
      const productDetail = await APIProivder.getProductDetail({
        productNo: Number(productNo),
        accessToken: authorization.accessToken,
        unitCode,
      });

      if (typia.is<IImweb.Common.IError>(productDetail)) {
        throw productDetail;
      }

      const units = await ImwebProvider.getUnits(unitCode)({
        productDetail: productDetail,
        accessToken: authorization.accessToken,
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
        tags: TransformProivder.toTags(productDetail),
      };
    };

  export async function index(
    input: IImweb.IGetProductInput,
  ): Promise<IPage<IImweb.ShoppingBackend.SaleSummary>> {
    const authorization = await ImwebProvider.getAccessToken(input);
    const site = await ImwebProvider.getDefaultUnit(authorization);
    const unitCode = site.unit.unitCode;

    const categories = await APIProivder.getCategories(unitCode)(authorization);

    // 상품 조회
    const response = await APIProivder.getProducts(unitCode)({
      ...input,
      ...authorization,
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
              productNo: imweb_product.prodNo,
              unitCode,
              accessToken: authorization.accessToken,
            });

            if (typia.is<IImweb.Common.IError>(productDetailOrError)) {
              throw productDetailOrError;
            }

            const units = await ImwebProvider.getUnits(unitCode)({
              productDetail: productDetailOrError,
              accessToken: authorization.accessToken,
            });

            return {
              id: TransformProivder.toUUID(imweb_product.prodNo.toString()),
              productNo: imweb_product.prodNo,
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
                  id: TransformProivder.toUUID(unitCode),
                  code: unitCode,
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
              tags: TransformProivder.toTags(productDetailOrError),
            };
          },
        ),
      ),
    };
  }

  export async function getAccessToken(
    input: IImweb.ISecret,
  ): Promise<IImweb.IRefreshOutput["data"]> {
    const secretKey = input.secretKey;
    const refreshToken = await OAuthSecretProvider.getSecretValue(secretKey);
    const response = await APIProivder.refresh({ refreshToken });
    if (response.statusCode !== 200) {
      throw response;
    }

    const newRefreshToken = response.data.refreshToken;

    if (typia.is<string & tags.Format<"uuid">>(secretKey)) {
      await OAuthSecretProvider.updateSecretValue(secretKey, {
        value: newRefreshToken,
      });
    }

    if (process.env.NODE_ENV === "test") {
      await ConnectorGlobal.write({ IMWEB_TEST_API_SECRET: newRefreshToken });
    }

    return response.data;
  }
}
