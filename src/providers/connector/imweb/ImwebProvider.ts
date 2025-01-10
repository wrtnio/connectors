import { DeepStrictOmit } from "@kakasoo/deep-strict-types";
import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";
import { IShoppingSaleUnit } from "@wrtn/connector-api/lib/structures/shoppings/sales/IShoppingSaleUnit";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import axios, { AxiosError } from "axios";
import typia, { is, tags } from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { OptionProvider } from "./OptionProvider";

export namespace ImwebProvider {
  export namespace transform {}

  export async function getProducts(
    input: StrictOmit<IImweb.IGetProductInput, "secretKey"> & {
      /**
       * 기존의 키를 재사용하여 리프레시로 인한 만료를 막는다.
       *
       * @title AccessToken
       */
      accessToken: string;
    },
  ) {
    const { accessToken, ...rest } = input;
    const queryParameter = createQueryParameter(typia.assert(rest));

    const url = `https://openapi.imweb.me/products?${queryParameter}`;
    return await axios
      .get<IImweb.IGetProductOutput>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data.data);
  }

  export async function getProductDetail(input: {
    product_no: number;
    unitCode: string;
    accessToken: string;
  }): Promise<IImweb.Product | IImweb.Error> {
    const url = `https://openapi.imweb.me/products/${input.product_no}?unitCode=${input.unitCode}`;
    return axios
      .get<IImweb.ResponseForm<IImweb.Product>>(url, {
        headers: {
          Authorization: `Bearer ${input.accessToken}`,
        },
      })
      .then((res) => res.data.data)
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (typia.is<IImweb.Error>(err.response?.data)) {
            return err.response.data;
          }
        }

        throw err;
      });
  }

  export async function getUnits(input: {
    productDetail: IImweb.Product;
    unitCode: string;
    page: number;
    limit: number;
    accessToken: string;
  }): Promise<
    Array<
      DeepStrictOmit<IShoppingSaleUnit, "stocks"> &
        Pick<IShoppingSaleUnit.ISummary, "price_range">
    >
  > {
    const url = `https://openapi.imweb.me/products/${input.productDetail.prodNo}/option-details?page=${input.page}&limit=${input.limit}&unitCode=${input.unitCode}`;
    type ResponseType = IImweb.ResponseForm<IImweb.ProductOption[]>;
    const { data: options } = await axios
      .get<ResponseType>(url, {
        headers: {
          Authorization: `Bearer ${input.accessToken}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (typia.is<IImweb.Error>(err.response?.data)) {
            if (err.response.data.error.errorCode === "30019") {
              return { data: [] };
            }
          }
        }

        throw err;
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

    return OptionProvider.getUnits(options, input.productDetail.price);
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
    const imweb_products = await ImwebProvider.getProducts({
      ...input,
      accessToken,
    });

    return {
      pagination: {
        current: imweb_products.currentPage,
        limit: imweb_products.pageSize,
        pages: imweb_products.totalPage,
        records: imweb_products.totalCount,
      },
      data: await Promise.all(
        imweb_products.list.map(
          async (imweb_product): Promise<IImweb.ProductInfomation> => {
            const productDetailOrError = await ImwebProvider.getProductDetail({
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
              page: 1,
              limit: 100,
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
                highest: units.reduce((maxUnit, currentUnit) =>
                  currentUnit.price_range.highest.real >
                  maxUnit.price_range.highest.real
                    ? currentUnit
                    : maxUnit,
                ).price_range.highest,
                lowest: units.reduce((minUnit, currentUnit) =>
                  currentUnit.price_range.lowest.real <
                  minUnit.price_range.lowest.real
                    ? currentUnit
                    : minUnit,
                ).price_range.lowest,
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
    const response = await ImwebProvider.refresh({ refreshToken });
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

  export async function refresh(
    input: IImweb.IRefreshInput,
  ): Promise<IImweb.IRefreshOutput | IImweb.Error> {
    const url = `https://openapi.imweb.me/oauth2/token`;
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
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (typia.is<IImweb.Error>(err.response?.data)) {
            return err.response.data;
          }
        }

        throw err;
      });
  }
}
