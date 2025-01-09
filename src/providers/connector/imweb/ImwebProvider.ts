import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import axios from "axios";
import { is, tags } from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";

export namespace ImwebProvider {
  export async function getProducts(
    input: IImweb.IGetProductInput & { accessToken: string },
  ) {
    const queryParameter = createQueryParameter({
      page: input.page,
      limit: input.limit,
      unitCode: input.unitCode,
      prodType: input.prodType,
      productAddTime: input.productAddTime,
      productEditTime: input.productEditTime,
      productEditTimeType: input.productEditTimeType,
      usePreSale: input.usePreSale,
    });

    const authorization = await ImwebProvider.getAccessToken(input);
    const url = `https://openapi.imweb.me/products?${queryParameter}`;
    const { data: response } = await axios.get<IImweb.IGetProductOutput>(url, {
      headers: {
        Authorization: `Bearer ${authorization.data.accessToken}`,
      },
    });

    return response.data[0];
  }

  export async function getProductDetail(input: {
    product_no: number;
    unitCode: string;
    accessToken: string;
  }) {
    const url = `https://openapi.imweb.me/products/${input.product_no}?unitCode=${input.unitCode}`;
    const { data: response } = await axios.get<
      IImweb.ResponseForm<IImweb.Product>
    >(url, {
      headers: {
        Authorization: `Bearer ${input.accessToken}`,
      },
    });

    return response.data;
  }

  export async function index(
    input: StrictOmit<IImweb.IGetProductInput, "prodStatus">,
  ): Promise<IImweb.IResponse> {
    // 하나의 액세스 토큰을 공용으로 쓰기 위해 가장 바깥쪽 함수에서 토큰 정보를 꺼낸다.
    const authorization = await ImwebProvider.getAccessToken(input);
    const accessToken = authorization.data.accessToken;

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
            const detail = await ImwebProvider.getProductDetail({
              product_no: imweb_product.prodNo,
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
              opened_at: detail.preSaleStartDate,
              paused_at: detail.preSaleEndDate,
              price_range: {
                highest: { nominal: 0, real: 0 },
                lowest: { nominal: 0, real: 0 },
              },
              units: [],
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

    return response;
  }

  export async function refresh(
    input: IImweb.IRefreshInput,
  ): Promise<IImweb.IRefreshOutput> {
    const url = `https://openapi.imweb.me/oauth2/token`;
    const response = await axios.post(
      url,
      {
        ...input,
        clientId: ConnectorGlobal.env.IMWEB_CLIENT_ID,
        clientSecretKey: ConnectorGlobal.env.IMWEB_CLIENT_SECRET,
        grantType: "refresh_token",
      },
      {
        headers: {
          "Content-Type": "x-www-form-urlencoded",
        },
      },
    );

    return response.data;
  }
}
