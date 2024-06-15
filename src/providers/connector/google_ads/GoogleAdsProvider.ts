import axios from "axios";

import { IGoogleAds } from "@wrtn/connector-api/lib/structures/connector/google_ads/IGoogleAds";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { GoogleProvider } from "../../internal/google/GoogleProvider";

export namespace GoogleAdsProvider {
  export const baseUrl = "https://googleads.googleapis.com/v16";

  export async function generateKeywordIdeas(
    input: IGoogleAds.IGenerateKeywordIdeaInput,
  ): Promise<IGoogleAds.IGenerateKeywordIdeaOutput> {
    try {
      const headers = await GoogleAdsProvider.getHeaders();
      const customerId = input.customerId;

      const endPoint = `${GoogleAdsProvider.baseUrl}/customers/${customerId}:generateKeywordIdeas`;
      const res = await axios.post(
        endPoint,
        {
          url: input.url,
        },
        {
          headers,
        },
      );
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  export async function createAccount(descriptive_name: string) {
    const headers = await GoogleAdsProvider.getHeaders();
    const parentId = ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID;
    const endPoint = `${GoogleAdsProvider.baseUrl}/customers/${parentId}/:createCustomerClient`;
    const res = await axios.post(
      endPoint,
      {
        customer_id: parentId,
        customer_client: {
          /**
           * @todo 유저에게 맵핑할 수 있는 유니크한 이름 정하기
           */
          descriptive_name: descriptive_name,
          currency_code: "KRW",
          time_zone: "Asia/Seoul",
        },
      },
      {
        headers,
      },
    );

    return res.data;
  }

  export async function getHeaders() {
    const secret = ConnectorGlobal.env.GOOGLE_ADS_TEST_SECRET; // refresh token of parent account.
    const accessToken = await GoogleProvider.refreshAccessToken(secret);

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "developer-token": ConnectorGlobal.env.DEVELOPER_TOKEN, // developer token of parent account.
      "login-customer-id": ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID, // parent account id.
    };
  }
}
