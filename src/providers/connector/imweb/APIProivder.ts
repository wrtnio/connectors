import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import axios, { AxiosError } from "axios";
import typia from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { ImwebProvider } from "./ImwebProvider";

export namespace APIProivder {
  const BASE_URL = "https://openapi.imweb.me" as const;

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
    const { accessToken, search } = input;
    const queryParameter = createQueryParameter(typia.assert(search));
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
        console.log(JSON.stringify(ImwebProvider.API.returnOrThrowError(err)));
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

  export async function getUnit(input: IImweb.IUnitCode & IImweb.IAccessToken) {
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
          phone?: string;
          email?: string;
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
    type ResponseType = IImweb.ResponseForm<{ list: IImweb.ProductOption[] }>;
    return await axios
      .get<ResponseType>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data.data.list)
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (typia.is<IImweb.Error>(err.response?.data)) {
            if (err.response.data.error.errorCode === ("30019" as const)) {
              // 원래부터 옵션이 없는 경우는, 상품이 곧 유닛이자 옵션인 경우를 의미한다.
              console.log(JSON.stringify(err.response.data.error));
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
