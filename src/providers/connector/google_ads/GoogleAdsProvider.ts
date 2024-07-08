import { Injectable } from "@nestjs/common";
import { IGoogleAds } from "@wrtn/connector-api/lib/structures/connector/google_ads/IGoogleAds";
import axios from "axios";
import typia from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { TypedSplit } from "../../../utils/TypedSplit";
import { SelectedColumns } from "../../../utils/types/SelectedColumns";
import { Camelize } from "../../../utils/types/SnakeToCamelCaseObject";
import { StringToDeepObject } from "../../../utils/types/StringToDeepObject";
import { Typing } from "../../../utils/types/Typing";
import { GoogleProvider } from "../../internal/google/GoogleProvider";

@Injectable()
export class GoogleAdsProvider {
  private readonly baseUrl = "https://googleads.googleapis.com/v17";

  constructor(private readonly googleProvider: GoogleProvider) {}

  private async searchStream<T extends string>(
    query: T,
  ): Promise<{ results: Camelize<StringToDeepObject<SelectedColumns<T>>>[] }> {
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

  /**
   * Wrtn 내에 등록된 고객의 수를 파악하거나 고객의 리소스 네임을 조회하는 함수
   */
  private async getCustomerClient() {
    const res = await this.searchStream(
      `SELECT customer_client.resource_name, customer_client.id FROM customer_client`,
    );

    type TypeMapper = Typing<
      typeof res,
      [
        [
          "results[*].customerClient.resourceName", // 이 위치에 있는 타입을
          `customers/${number}/customerClients/${number}`, // 이 타입으로 매핑한다.
        ],
        [
          "results[*].customerClient.id",
          `${number}`, // resourceName의 맨 끝 숫자 부분을 의미한다.
        ],
      ]
    >;

    return typia.assert<TypeMapper>(res);
  }

  /**
   * 원래대로라면 `parentId`가 아닌 자신의 id를 전달하는 것이 맞지만, 계정에 따른 의존성이 없는 것으로 보여 google ads secret 없이도 사용할 수 있도록 한다.
   *
   * @param input 조회하고 싶은 URL을 받는다.
   * @returns
   */
  async generateKeywordIdeas(
    input:
      | IGoogleAds.IGenerateKeywordIdeaByURLInput
      | IGoogleAds.IGenerateKeywordIdeaByKeywordsInput
      | IGoogleAds.IGenerateKeywordIdeaByKeywordsAndUrlInput,
  ): Promise<IGoogleAds.IGenerateKeywordIdeaOutput> {
    try {
      const parentId = ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID;
      const headers = await this.getHeaders();

      const endPoint = `${this.baseUrl}/customers/${parentId}:generateKeywordIdeas`;

      const res = await axios.post(
        endPoint,
        {
          ...this.getGenerateKeywordSeed(input),
          includeAdultKeywords: false, // 성인 키워드 제외
          language: "languageConstants/1012" as const, // 한국어를 의미
          geoTargetConstants: ["geoTargetConstants/2410"], // 대한민국이라는 지리적 제한을 의미

          ...(input.pageSize && { pageSize: input.pageSize }),
          ...(input.pageToken && { pageToken: input.pageToken }),
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

  async createCampaignBudget(input: {
    customerId: string;
    campaignBudget: number; // 한국돈
  }) {
    try {
      const url = `${this.baseUrl}/${input.customerId}/campaignBudgets:mutate`;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async createCampaign(input: { customerId: string }) {
    const headers = await this.getHeaders();
    try {
      await axios.post(
        `${this.baseUrl}/${input.customerId}/campaigns:mutate`,
        {},
        {
          headers,
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  /**
   * 해당 토큰의 주인이 우리에게 등록된 customer clients를 가지고 있는지 체크한다.
   */
  async getCustomers(input: IGoogleAds.ISecret) {
    try {
      const customers = await this.listAccessibleCustomers(input);

      /**
       * Wrtn에 등록된 클라이언트 중 customers에 포함된 것만 남겨야 한다.
       */
      const customerClients = await this.getCustomerClient();
      const registedClients = customerClients.results.filter((el) =>
        customers.resourceNames
          .map((name) => TypedSplit(name, "customers/")[1])
          .some((id) => id === el.customerClient.id),
      );

      return registedClients.map(
        (el) => `customers/${el.customerClient.id}` as const,
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  /**
   * 구글 계정에 속한 광고 계정을 조회한다.
   *
   * @param input 고객의 시크릿 값
   * @returns
   */
  private async listAccessibleCustomers(
    input: IGoogleAds.ISecret,
  ): Promise<IGoogleAds.IGetlistAccessibleCustomersOutput> {
    const url = `${this.baseUrl}/customers:listAccessibleCustomers`;
    const developerToken = (await this.getHeaders())["developer-token"];
    const accessToken = await this.googleProvider.refreshAccessToken(
      input.secretKey,
    );

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "developer-token": developerToken,
      },
    });

    return res.data;
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

  private getGenerateKeywordSeed(
    input:
      | IGoogleAds.IGenerateKeywordIdeaByURLInput
      | IGoogleAds.IGenerateKeywordIdeaByKeywordsInput
      | IGoogleAds.IGenerateKeywordIdeaByKeywordsAndUrlInput,
  ):
    | { keywordAndUrlSeed: { url: string; keywords: string[] } }
    | { urlSeed: { url: string } }
    | { keywordSeed: { keywords: string[] } } {
    if (typia.is<IGoogleAds.IGenerateKeywordIdeaByKeywordsAndUrlInput>(input)) {
      return {
        keywordAndUrlSeed: {
          url: input.url,
          keywords: input.keywords,
        },
      };
    } else if (typia.is<IGoogleAds.IGenerateKeywordIdeaByURLInput>(input)) {
      return {
        urlSeed: {
          url: input.url,
        },
      };
    } else {
      return {
        keywordSeed: {
          keywords: input.keywords,
        },
      };
    }
  }

  private async getHeaders() {
    const secret = ConnectorGlobal.env.GOOGLE_ADS_PARENT_SECRET; // refresh token of parent account.
    const accessToken = await this.googleProvider.refreshAccessToken(secret);

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "developer-token": ConnectorGlobal.env.GOOGLE_ADS_DEVELOPER_TOKEN, // developer token of parent account.
      "login-customer-id": ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID, // parent account id.
    };
  }
}
