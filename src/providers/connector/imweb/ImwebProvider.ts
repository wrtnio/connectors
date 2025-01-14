import { IShoppingPrice } from "@samchon/shopping-api/lib/structures/shoppings/base/IShoppingPrice";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";
import typia, { tags } from "typia";
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
      detail: Pick<IImweb.Product, "prodNo" | "name" | "price">;
      accessToken: string;
    }): Promise<Array<IImweb.ShoppingBackend.ImwebSaleUnitSummary>> {
      const { detail } = input;
      const options = await APIProivder.getOptionDetails({
        productNo: detail.prodNo,
        accessToken: input.accessToken,
        unitCode: unitCode,
      });

      // Transform product type to shopping backend format
      return TransformProivder.toSaleUnits(detail)(options);
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
      const detail = await APIProivder.getProductDetail({
        productNo: Number(productNo),
        accessToken: authorization.accessToken,
        unitCode,
      });

      if (typia.is<IImweb.Common.IError>(detail)) {
        throw detail;
      }

      const units = await ImwebProvider.getUnits(unitCode)({
        detail: detail,
        accessToken: authorization.accessToken,
      });

      return {
        id: TransformProivder.toUUID(detail.prodCode),
        productNo: Number(productNo),
        channels: [],
        content: {
          id: TransformProivder.toUUID(null),
          title: detail.simpleContent ?? "",
          body: detail.content ?? "",
          format: "txt",
          thumbnails: detail.productImages.map((imageUrl) =>
            TransformProivder.toImage(imageUrl),
          ),
          files: [],
        },
        created_at: detail.addTime,
        latest: true,
        opened_at: detail.preSaleStartDate,
        paused_at: detail.preSaleEndDate,
        units: units,
        updated_at: detail.editTime,
        tags: TransformProivder.toTags(detail),
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

    const fetched = await Promise.all(
      response.list.map(async (product) => {
        const detail = await APIProivder.getProductDetail({
          productNo: product.prodNo,
          unitCode,
          accessToken: authorization.accessToken,
        });

        if (isError(detail)) {
          throw detail;
        }

        const units = await ImwebProvider.getUnits(unitCode)({
          detail: detail,
          accessToken: authorization.accessToken,
        });

        return { product, detail, units };
      }),
    );

    return {
      pagination: {
        current: response.currentPage,
        limit: response.pageSize,
        pages: response.totalPage,
        records: response.totalCount,
      },
      data: fetched.map((input): IImweb.ShoppingBackend.SaleSummary => {
        return TransformProivder.toSaleSummary(site)({
          ...input,
          categories: isError(categories) ? [] : categories,
        });
      }),
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

  export const isError = typia.createIs<IImweb.Common.IError>();
}
