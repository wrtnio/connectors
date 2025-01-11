import { DeepStrictOmit } from "@kakasoo/deep-strict-types";
import { IShoppingPrice } from "@samchon/shopping-api/lib/structures/shoppings/base/IShoppingPrice";
import { IShoppingSalePriceRange } from "@samchon/shopping-api/lib/structures/shoppings/sales/IShoppingSalePriceRange";
import { IShoppingSaleUnit } from "@samchon/shopping-api/lib/structures/shoppings/sales/IShoppingSaleUnit";
import { IPage } from "@wrtn/connector-api/lib/structures/common/IPage";
import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import axios, { AxiosError } from "axios";
import typia, { is, tags } from "typia";
import { v5 } from "uuid";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";

export namespace ImwebProvider {
  const BASE_URL = "https://openapi.imweb.me" as const;
  const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8" as const;
  const NULL = v5("null" as const, NAMESPACE);

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
          id: NULL,
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

  export async function getDefaultUnit(input: IImweb.IAccessToken) {
    const site = await API.getSite(input);
    const units = await Promise.all(
      site.unitList.map(async (unit) => {
        return await API.getUnit({
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
    async (input: IImweb.ISecret): Promise<IImweb.Sale> => {
      const authorization = await ImwebProvider.getAccessToken(input);
      const accessToken = authorization.data.accessToken;
      const imweb_unit = await ImwebProvider.getDefaultUnit({ accessToken });

      const productDetail = await API.getProductDetail({
        product_no: Number(product_no),
        accessToken,
        unitCode: imweb_unit.unit.unitCode,
      });

      if (typia.is<IImweb.Error>(productDetail)) {
        throw productDetail;
      }

      const units = await ImwebProvider.getUnits({
        productDetail: productDetail,
        unitCode: imweb_unit.unit.unitCode,
        accessToken,
      });

      return {
        id: v5(productDetail.prodCode, NAMESPACE),
        channels: [],
        content: {
          id: NULL,
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
    input: StrictOmit<IImweb.IGetProductInput, "prodStatus">,
  ): Promise<IPage<IImweb.SaleSummary>> {
    const authorization = await ImwebProvider.getAccessToken(input);
    const accessToken = authorization.data.accessToken;

    const site = await getDefaultUnit({ accessToken });
    const categories = await API.getCategories({
      accessToken,
      unitCode: site.unit.unitCode,
    });

    // 상품 조회
    const response = await API.getProducts({
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
          async (imweb_product): Promise<IImweb.SaleSummary> => {
            const productDetailOrError = await API.getProductDetail({
              product_no: imweb_product.prodNo,
              unitCode: site.unit.unitCode,
              accessToken,
            });

            if (typia.is<IImweb.Error>(productDetailOrError)) {
              throw productDetailOrError;
            }

            const units = await ImwebProvider.getUnits({
              productDetail: productDetailOrError,
              unitCode: site.unit.unitCode,
              accessToken,
            });

            return {
              id: v5(imweb_product.prodNo.toString(), NAMESPACE),
              product_no: imweb_product.prodNo,
              seller: {
                id: v5(site.site.siteCode, NAMESPACE),
                type: "seller",
                citizen: {
                  mobile: site.unit.phone,
                  name: site.unit.presidentName,
                },
              },
              channels: [
                {
                  id: v5(site.unit.unitCode, NAMESPACE),
                  code: site.unit.unitCode,
                  name: site.unit.companyName,
                  categories: categories
                    .filter((el) =>
                      productDetailOrError.categories.includes(el.categoryCode),
                    )
                    .map((el) => {
                      return {
                        id: v5(el.categoryCode, NAMESPACE),
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
                      id: v5(filename.split(".")[0], NAMESPACE),
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
                highest: ImwebProvider.select.getUnit("maximum")(units),
                lowest: ImwebProvider.select.getUnit("minimum")(units),
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
        IImweb.IAccessToken &
        IImweb.IUnitCode,
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
      input: IImweb.IGetProductDetailInput &
        IImweb.IAccessToken &
        IImweb.IUnitCode,
    ): Promise<IImweb.Product | IImweb.Error> {
      const url = `${BASE_URL}/products/${input.product_no}?unitCode=${input.unitCode}&page=1&limit=100`;
      return axios
        .get<IImweb.ResponseForm<IImweb.Product>>(url, {
          headers: {
            Authorization: `Bearer ${input.accessToken}`,
          },
        })
        .then((res) => res.data.data)
        .catch(API.returnOrThrowError);
    }

    export async function getCategories(
      input: IImweb.IAccessToken & IImweb.IUnitCode,
    ): Promise<IImweb.Category[]> {
      const { accessToken } = input;
      const url = `${BASE_URL}/products/shop-categories?unitCode=${input.unitCode}`;
      return await axios
        .get<IImweb.ResponseForm<IImweb.Category[]>>(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data.data)
        .catch((err) => {
          console.log(
            JSON.stringify(ImwebProvider.API.returnOrThrowError(err)),
          );
          return [];
        });
    }

    export async function getSite(input: IImweb.IAccessToken) {
      const { accessToken } = input;
      const url = `${BASE_URL}/site-info`;
      return await axios
        .get<
          IImweb.ResponseForm<{
            siteCode: string;
            unitList: { unitCode: string; name: string }[];
          }>
        >(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data.data);
    }

    export async function getUnit(
      input: IImweb.IUnitCode & IImweb.IAccessToken,
    ) {
      const { accessToken } = input;
      const url = `${BASE_URL}/site-info/unit/${input.unitCode}`;
      return await axios
        .get<
          IImweb.ResponseForm<{
            unitCode: string;
            name: string;
            isDefault: boolean;
            companyName: string;
            presidentName: string;
            companyRegistrationNo: string;
            phone: string;
            email: string;
          }>
        >(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data.data);
    }

    export async function getOptionDetails(
      input: IImweb.IGetOptionDetailInput,
    ): Promise<IImweb.ProductOption[]> {
      const { accessToken, ...rest } = input;
      const queryParameter = createQueryParameter(typia.assert(rest));
      const url = `${BASE_URL}/products/${input.product_no}/option-details?${queryParameter}&page=1&limit=100`;
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
