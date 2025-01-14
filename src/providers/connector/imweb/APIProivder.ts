import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";
import axios, { AxiosError } from "axios";
import typia from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";

export namespace APIProivder {
  const BASE_URL = "https://openapi.imweb.me" as const;

  export async function refresh(
    input: IImweb.IRefreshInput,
  ): Promise<IImweb.IRefreshOutput | IImweb.Common.IError> {
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
      .catch(returnOrThrowError);
  }

  export async function getReviews(input: IImweb.IGetReviewInput) {
    const { accessToken, ...rest } = input;
    const query = createQueryParameter(rest);
    const url = `${BASE_URL}/community/qna?${query}`;
    return await axios
      .get<IImweb.IGetReviewOutput>(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => res.data.data);
  }

  /**
   * getting products as format of imweb_product
   *
   * @param input query parameter of getting products as format of imweb_product
   * @returns format of imweb_product
   */
  export function getProducts(unitCode: string) {
    return async function (
      input: Omit<IImweb.IGetProductListInput, "unitCode">,
    ) {
      const { accessToken, search, page, limit } = input;
      const query = createQueryParameter({ ...search, page, limit, unitCode });

      const url = `${BASE_URL}/products?${query}`;
      return await axios
        .get<IImweb.IGetProductListOutput>(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data.data);
    };
  }

  export async function getProductDetail(
    input: IImweb.IGetProductDetailInput,
  ): Promise<IImweb.Product | IImweb.Common.IError> {
    const url = `${BASE_URL}/products/${input.productNo}?unitCode=${input.unitCode}&page=1&limit=100`;
    return axios
      .get<IImweb.IGetProductDetailOutput>(url, {
        headers: {
          Authorization: `Bearer ${input.accessToken}`,
        },
      })
      .then((res) => res.data.data)
      .catch(returnOrThrowError);
  }

  export function getCategories(unitCode: string) {
    return async function (
      input: IImweb.IGetCategoryInput,
    ): Promise<IImweb.Category[] | IImweb.Common.IError> {
      const { accessToken } = input;
      const url = `${BASE_URL}/products/shop-categories?unitCode=${unitCode}`;
      return await axios
        .get<IImweb.IGetCategoryOutput>(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data.data)
        .catch(returnOrThrowError);
    };
  }

  export async function getSite(input: IImweb.Common.IAccessToken) {
    const { accessToken } = input;
    const url = `${BASE_URL}/site-info`;
    return await axios
      .get<
        IImweb.Common.ResponseForm<{
          siteCode: string;
          unitList: { unitCode: string; name: string }[];
        }>
      >(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => res.data.data);
  }

  export async function getUnit(input: IImweb.IGetUnitInput) {
    const { accessToken } = input;
    const url = `${BASE_URL}/site-info/unit/${input.unitCode}`;
    return await axios
      .get<IImweb.Common.ResponseForm<IImweb.IGetUnitOutput>>(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => res.data.data);
  }

  export async function getOptionDetails(
    input: IImweb.IGetOptionDetailInput,
  ): Promise<IImweb.ProductOption[]> {
    const { accessToken, ...rest } = input;
    const query = createQueryParameter(typia.assert(rest));
    const url = `${BASE_URL}/products/${input.productNo}/option-details?${query}&page=1&limit=100`;
    return await axios
      .get<IImweb.IGetOptionDetailOutput>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data.data.list)
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (typia.is<IImweb.Common.IError>(err.response?.data)) {
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
      if (typia.is<IImweb.Common.IError>(err.response?.data)) {
        return err.response.data;
      }
    }

    throw err;
  }
}
