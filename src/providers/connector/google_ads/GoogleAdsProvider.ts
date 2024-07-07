import { IGoogleAds } from "@wrtn/connector-api/lib/structures/connector/google_ads/IGoogleAds";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { SelectedColumns } from "../../../utils/types/SelectedColumns";
import { Camelize } from "../../../utils/types/SnakeToCamelCaseObject";
import { StringToDeepObject } from "../../../utils/types/StringToDeepObject";
import { GoogleProvider } from "../../internal/google/GoogleProvider";

export class GoogleAdsProvider {
  private readonly baseUrl = "https://googleads.googleapis.com/v17";

  constructor(private readonly googleProvider: GoogleProvider) {}

  async searchStream<T extends string>(
    query: T,
  ): Promise<{ result: Camelize<StringToDeepObject<SelectedColumns<T>>>[] }> {
    try {
      const parentId = ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID;
      const headers = await this.getHeaders();
      const res = await axios.post(
        `${this.baseUrl}/customers/${parentId}/googleAds:search`,
        {
          query,
        },
        {
          headers,
        },
      );

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getCustomerClient() {
    return this.searchStream(
      `SELECT customer_client.resource_name FROM customer_client`,
    );
  }

  /**
   * 원래대로라면 `parentId`가 아닌 자신의 id를 전달하는 것이 맞지만, 계정에 따른 의존성이 없는 것으로 보여 google ads secret 없이도 사용할 수 있도록 한다.
   *
   * @param input 조회하고 싶은 URL을 받는다.
   * @returns
   */
  async generateKeywordIdeas(
    input: IGoogleAds.IGenerateKeywordIdeaInput,
  ): Promise<IGoogleAds.IGenerateKeywordIdeaOutput> {
    try {
      const parentId = ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID;
      const headers = await this.getHeaders();

      const endPoint = `${this.baseUrl}/customers/${parentId}:generateKeywordIdeas`;
      const res = await axios.post(
        endPoint,
        {
          includeAdultKeywords: false,
          urlSeed: {
            url: input.url,
          },
          language: "languageConstants/1012" as const, // 한국어를 의미
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

  /**
   * 하위 계정 생성.
   * 현재로서는 사용 계획이 없다.
   *
   * @deprecated
   *
   * @param descriptive_name customer에 부여하는 유니크한 이름 (구글에서는 유니크하지 않을 수 있다.)
   * @returns
   */
  async createAccount(descriptive_name: string) {
    const headers = await this.getHeaders();
    const parentId = ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID;
    const endPoint = `${this.baseUrl}/customers/${parentId}/:createCustomerClient`;
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

  private async getHeaders() {
    const secret = ConnectorGlobal.env.GOOGLE_TEST_SECRET; // refresh token of parent account.
    const accessToken = await this.googleProvider.refreshAccessToken(secret);

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "developer-token": ConnectorGlobal.env.GOOGLE_ADS_DEVELOPER_TOKEN, // developer token of parent account.
      "login-customer-id": ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID, // parent account id.
    };
  }
}
