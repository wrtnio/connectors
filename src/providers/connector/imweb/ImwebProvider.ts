import { DeepStrictOmit } from "@kakasoo/deep-strict-types";
import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";
import { IShoppingPrice } from "@wrtn/connector-api/lib/structures/shoppings/base/IShoppingPrice";
import { IShoppingSalePriceRange } from "@wrtn/connector-api/lib/structures/shoppings/sales/IShoppingSalePriceRange";
import { IShoppingSaleUnit } from "@wrtn/connector-api/lib/structures/shoppings/sales/IShoppingSaleUnit";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import axios, { AxiosError } from "axios";
import typia, { is, tags } from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";

export namespace ImwebProvider {
  const BASE_URL = "https://openapi.imweb.me" as const;

  export namespace transform {
    export const toIShoppingSaleUnitSummary =
      (product: { price: number }) =>
      (
        options: IImweb.ProductOption[],
      ): Array<
        DeepStrictOmit<IShoppingSaleUnit, "stocks"> &
          Pick<IShoppingSaleUnit.ISummary, "price_range">
      > => {
        if (options.every((el) => el.isCombine === "Y")) {
          // 조합형 옵션의 경우를 의미한다.
          return options.map((unit) => {
            return {
              id: unit.optionDetailCode,
              name: unit.optionDetailInfoList
                .map((el) => `${el.name}:${el.optionValue.optionValueName}`)
                .join("/"),
              primary: true,
              required: unit.isRequire === "Y" ? true : false,
              options: unit.optionDetailInfoList.map((option) => {
                return {
                  id: option.optionCode,
                  name: option.name,
                  variable: false,
                  type: "string",
                  candidates: [
                    {
                      id: option.optionValue.optionValueCode,
                      name: option.optionValue.optionValueName,
                    },
                  ],
                };
              }),
              price_range: {
                highest: {
                  nominal: product.price + unit.price,
                  real: product.price + unit.price,
                },
                lowest: {
                  nominal: product.price + unit.price,
                  real: product.price + unit.price,
                },
              },
            };
          });
        } else {
          // 비조합형 옵션의 경우
          throw new Error("비조합형 옵션의 경우");
        }
      };
  }

  export namespace select {
    export const getUnit =
      (type: "maximum" | "minimum") =>
      (units: { price_range: IShoppingSalePriceRange }[]): IShoppingPrice => {
        if (type === "maximum") {
          return units.reduce((maxUnit, currentUnit) =>
            currentUnit.price_range.highest.real >
            maxUnit.price_range.highest.real
              ? currentUnit
              : maxUnit,
          ).price_range.highest;
        } else {
          return units.reduce((minUnit, currentUnit) =>
            currentUnit.price_range.lowest.real <
            minUnit.price_range.lowest.real
              ? currentUnit
              : minUnit,
          ).price_range.lowest;
        }
      };
  }

  export async function getUnits(input: {
    productDetail: Pick<IImweb.Product, "prodNo" | "name" | "price">;
    unitCode: string;
    accessToken: string;
  }): Promise<
    Array<
      DeepStrictOmit<IShoppingSaleUnit, "stocks"> &
        Pick<IShoppingSaleUnit.ISummary, "price_range">
    >
  > {
    const options = await API.getOptionDetails({
      product_no: input.productDetail.prodNo,
      ...input,
    });

    if (options.length === 0) {
      return [
        {
          id: null,
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
    return transform.toIShoppingSaleUnitSummary({
      price: input.productDetail.price,
    })(options);
  }

  export async function index(
    input: StrictOmit<IImweb.IGetProductInput, "prodStatus">,
    imweb_test_secret?: string,
  ): Promise<IImweb.IResponse> {
    let accessToken = imweb_test_secret;
    if (!accessToken) {
      const authorization = await ImwebProvider.getAccessToken(input);
      accessToken = authorization.data.accessToken;
    }

    // 상품 조회
    const response = await API.getProducts({
      ...input,
      accessToken,
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
          async (imweb_product): Promise<IImweb.ProductInfomation> => {
            const productDetailOrError = await API.getProductDetail({
              product_no: imweb_product.prodNo,
              unitCode: input.unitCode,
              accessToken,
            });

            if (typia.is<IImweb.Error>(productDetailOrError)) {
              throw productDetailOrError;
            }

            const units = await ImwebProvider.getUnits({
              productDetail: productDetailOrError,
              unitCode: input.unitCode,
              accessToken,
            });

            return {
              id: imweb_product.prodCode,
              content: {
                thumbnails: imweb_product.productImages
                  .filter((image) => is<string & tags.Format<"iri">>(image))
                  .map((image) => {
                    return {
                      name: null,
                      extension: null,
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
                highest: ImwebProvider.select.getUnit("maximum")(units),
                lowest: ImwebProvider.select.getUnit("minimum")(units),
              },
              units: units,
              updated_at: imweb_product.editTime,
            };
          },
        ),
      ),
    };
  }

  export async function getAccessToken(input: { secretKey: string }) {
    const secretKey = input.secretKey;
    const refreshToken = await OAuthSecretProvider.getSecretValue(secretKey);
    const response = await API.refresh({ refreshToken });
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

  export namespace API {
    export async function refresh(
      input: IImweb.IRefreshInput,
    ): Promise<IImweb.IRefreshOutput | IImweb.Error> {
      const url = `${BASE_URL}/oauth2/token`;
      return axios
        .post<IImweb.IRefreshOutput>(
          url,
          {
            clientId: ConnectorGlobal.env.IMWEB_CLIENT_ID,
            clientSecret: ConnectorGlobal.env.IMWEB_CLIENT_SECRET,
            refreshToken: input.refreshToken,
            grantType: "refresh_token",
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        )
        .then((res) => res.data)
        .catch(API.returnOrThrowError);
    }

    /**
     * getting products as format of imweb_product
     *
     * @param input query parameter of getting products as format of imweb_product
     * @returns format of imweb_product
     */
    export async function getProducts(
      input: StrictOmit<IImweb.IGetProductInput, "secretKey"> &
        IImweb.IAccessToken,
    ) {
      const { accessToken, ...rest } = input;
      const queryParameter = createQueryParameter(typia.assert(rest));
      const url = `${BASE_URL}/products?${queryParameter}`;
      return await axios
        .get<IImweb.IGetProductOutput>(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data.data);
    }

    export async function getProductDetail(
      input: IImweb.IGetProductDetailInput,
    ): Promise<IImweb.Product | IImweb.Error> {
      const url = `${BASE_URL}/products/${input.product_no}?unitCode=${input.unitCode}`;
      return axios
        .get<IImweb.ResponseForm<IImweb.Product>>(url, {
          headers: {
            Authorization: `Bearer ${input.accessToken}`,
          },
        })
        .then((res) => res.data.data)
        .catch(API.returnOrThrowError);
    }

    export async function getOptionDetails(
      input: IImweb.IGetOptionDetailInput,
    ): Promise<IImweb.ProductOption[]> {
      const { accessToken, ...rest } = input;
      const queryParameter = createQueryParameter(typia.assert(rest));
      const url = `${BASE_URL}/products/${input.product_no}/option-details?${queryParameter}`;
      type ResponseType = IImweb.ResponseForm<IImweb.ProductOption[]>;
      return await axios
        .get<ResponseType>(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data.data)
        .catch((err) => {
          if (err instanceof AxiosError) {
            if (typia.is<IImweb.Error>(err.response?.data)) {
              if (err.response.data.error.errorCode === ("30019" as const)) {
                // 원래부터 옵션이 없는 경우는, 상품이 곧 유닛이자 옵션인 경우를 의미한다.
                return [];
              }
            }
          }

          throw err;
        });
    }

    export function returnOrThrowError(err: unknown) {
      if (err instanceof AxiosError) {
        if (typia.is<IImweb.Error>(err.response?.data)) {
          return err.response.data;
        }
      }

      throw err;
    }
  }
}
