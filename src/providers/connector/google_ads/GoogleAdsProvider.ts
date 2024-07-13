import { Injectable } from "@nestjs/common";
import { IGoogleAds } from "@wrtn/connector-api/lib/structures/connector/google_ads/IGoogleAds";
import axios, { AxiosError } from "axios";
import typia, { type tags } from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { TypedSplit } from "../../../utils/TypedSplit";
import { SelectedColumns } from "../../../utils/types/SelectedColumns";
import { Camelize } from "../../../utils/types/SnakeToCamelCaseObject";
import { StringToDeepObject } from "../../../utils/types/StringToDeepObject";
import { GoogleProvider } from "../../internal/google/GoogleProvider";
import type { ContentMediaType } from "typia/lib/tags";
import { v4 } from "uuid";

@Injectable()
export class GoogleAdsProvider {
  private readonly baseUrl = "https://googleads.googleapis.com/v17";

  constructor(private readonly googleProvider: GoogleProvider) {}

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
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  async createCampaignBudget(
    input: IGoogleAds.ICreateCampaignBudgetInput,
  ): Promise<IGoogleAds.CampaignBudget["resourceName"]> {
    try {
      const headers = await this.getHeaders();
      const url = `${this.baseUrl}/customers/${input.customerId}/campaignBudgets:mutate`;
      const res = await axios.post(
        url,
        {
          operations: [
            {
              create: {
                amountMicros: 1000000 * input.campaignBudget,
                explicitlyShared: false, // 이 예산을 공유하는 캠페인이 존재해서는 안 된다. 캠페인과 캠페인 예산은 반드시 1:1이어야 한다.
              },
            },
          ],
        },
        {
          headers,
        },
      );

      return res.data.results[0].resourceName;
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  async createAdGroup(
    input: IGoogleAds.ICreateAdGroupInput,
  ): Promise<IGoogleAds.AdGroup["resourceName"]> {
    try {
      const url = `${this.baseUrl}/customers/${input.customerId}/adGroups:mutate`;
      const headers = await this.getHeaders();
      const res = await axios.post(
        url,
        {
          operations: {
            create: {
              name: `${input.type}_${new Date().getTime()}`,
              status: "ENABLED",
              campaign: input.campaignResourceName,
              type: input.type,
            },
          },
        },
        {
          headers,
        },
      );

      return res.data.results[0].resourceName;
    } catch (err) {
      /**
       * @todo 광고 그룹 삭제 기능 추가
       */
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  async createAd(
    input: IGoogleAds.ICreateAdGroupAdInput,
  ): Promise<IGoogleAds.IGetAdGroupAdsOutputResult> {
    try {
      const adGroupResourceName = await this.createAdGroup(input);
      const headers = await this.getHeaders();
      const url = `${this.baseUrl}/customers/${input.customerId}/adGroupAds:mutate`;
      if (input.keywords.length) {
        await this.createAdGroupCriteria(adGroupResourceName, input); // Google Ads Keywords 생성
      }

      if (typia.is<IGoogleAds.ICreateAdGroupSearchAdInput>(input)) {
        await axios.post(
          url,
          {
            operations: {
              create: {
                status: "PAUSED",
                ad: {
                  final_urls: [input.finalUrl],
                  responsive_search_ad: {
                    headlines: input.headlines.map((text) => ({ text })),
                    descriptions: input.descriptions.map((text) => ({ text })),
                  },
                },
                ad_group: adGroupResourceName,
              },
            },
          },
          {
            headers,
          },
        );
      } else {
        /**
         * DISPLAY_STANDARD
         */
        const requestBody = {
          operations: {
            create: {
              status: "PAUSED",
              ad: {
                final_urls: [input.finalUrl],
                responsive_display_ad: {
                  headlines: input.headlines.map((text) => ({ text })),
                  long_headline: { text: input.longHeadline },
                  descriptions: input.descriptions.map((text) => ({ text })),
                  marketing_images: await this.createAssets({
                    cusotmerId: input.customerId,
                    images: await Promise.all(
                      input.landscapeImages.map(
                        async (image) => await this.iamgeEncoding(image),
                      ),
                    ),
                  }),
                  square_marketing_images: await this.createAssets({
                    cusotmerId: input.customerId,
                    images: await Promise.all(
                      input.squareImages.map(
                        async (image) => await this.iamgeEncoding(image),
                      ),
                    ),
                  }),
                  business_name: input.businessName,
                  youtube_videos: [],
                  square_logo_images: await this.createAssets({
                    cusotmerId: input.customerId,
                    images: await Promise.all(
                      input.logoImages.map(
                        async (image) => await this.iamgeEncoding(image),
                      ),
                    ),
                  }),
                },
              },
              ad_group: adGroupResourceName,
            },
          },
        } as const;

        await axios.post(url, requestBody, { headers });
      }

      const [result] = await this.getAds({ ...input, adGroupResourceName });
      return result;
    } catch (err) {
      /**
       * @todo 광고 삭제 기능 추가
       */
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  async createAssets(input: {
    cusotmerId: string;
    images: string[];
  }): Promise<{ asset: string }[]> {
    try {
      const url = `${this.baseUrl}/customers/${input.cusotmerId}/assets:mutate`;
      const headers = await this.getHeaders();
      const res = await axios.post(
        url,
        {
          operations: input.images.map((image) => {
            return {
              create: {
                name: v4(),
                type: "IMAGE",
                image_asset: {
                  data: image,
                },
              },
            };
          }),
        },
        {
          headers,
        },
      );

      return (
        res.data.results.map((el: { resourceName: string }) => ({
          asset: el.resourceName,
        })) ?? []
      );
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  /**
   * 이미지를 base64로 인코딩한다.
   *
   * @param url 인코딩할 이미지
   * @returns
   */
  private async iamgeEncoding(
    url: string & tags.Format<"uri"> & ContentMediaType<"image/*">,
  ) {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const image = Buffer.from(response.data, "binary");
    const encodedImage = image.toString("base64");

    return encodedImage;
  }

  async createCampaign(
    input: IGoogleAds.ICreateCampaignInput,
  ): Promise<IGoogleAds.ICreateCampaignsOutput> {
    try {
      const headers = await this.getHeaders();
      const campaignBudgetResourceName = await this.createCampaignBudget(input);
      const res = await axios.post(
        `${this.baseUrl}/customers/${input.customerId}/campaigns:mutate`,
        {
          operations: [
            {
              create: {
                name: input.campaignName,
                advertising_channel_type: input.advertisingChannelType,
                status: "ENABLED",
                campaignBudget: campaignBudgetResourceName,

                /**
                 * @todo 유저의 요구사항에 맞는 광고 효율 최적화를 진행해야 한다.
                 */
                target_spend: {},
              },
            },
          ],
        },
        {
          headers,
        },
      );

      const createdResourceName = res.data.results[0].resourceName;
      const [campaign] = await this.getCampaigns(input, createdResourceName);
      return campaign;
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  private async getAdGroups(
    input: IGoogleAds.IGetAdGroupInput,
  ): Promise<IGoogleAds.IGetAdGroupOutput> {
    try {
      const query = `
      SELECT 
        campaign.id,
        campaign.resource_name,
        campaign.status,
        ad_group.id,
        ad_group.resource_name,
        ad_group.type
      FROM ad_group
      WHERE
        campaign.status != 'REMOVED'
          AND ad_group.status != 'REMOVED'
            ${input.campaignId ? `AND campaign.id = '${input.campaignId}'` : ""}
            ${input.adGroupResourceName ? `AND ad_group.resource_name = '${input.adGroupResourceName}'` : ""}` as const;

      const adGroup = await this.searchStream(input.customerId, query);
      return adGroup;
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  /**
   * 각 캠페인에 속한 광고 그룹과 광고 그룹 광고를 찾는다.
   *
   * @todo 광고 그룹마다 키워드가 보여지게 수정해야 한다.
   *
   * @param input
   * @returns
   */
  async getAds(
    input: IGoogleAds.IGetAdGroupAdsInput,
  ): Promise<IGoogleAds.IGetAdGroupAdsOutput> {
    try {
      const adGroupsResult = await this.getAdGroups(input);

      const results = await Promise.all(
        adGroupsResult.results.map(async ({ campaign, adGroup }) => {
          const query = `
          SELECT
            ad_group_ad.resource_name,
            ad_group_ad.policy_summary.approval_status,
            ad_group_ad.policy_summary.review_status
          FROM ad_group_ad 
          WHERE 
            ad_group_ad.ad_group = '${adGroup.resourceName}'
          ` as const;

          const customerId = input.customerId;
          const adGroupAdResult = await this.searchStream(customerId, query);
          const adGroupAds = adGroupAdResult.results.map((el) => el.adGroupAd);

          return { campaign, adGroup, adGroupAds };
        }),
      );

      return results;
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  /**
   * `adGroupCriteria`를 생성한다.
   * 여기에는 구글 광고 키워드가 포함된다.
   */
  private async createAdGroupCriteria(
    adGroupResourceName: IGoogleAds.AdGroup["resourceName"],
    input: IGoogleAds.ICreateKeywordInput,
  ) {
    try {
      const url = `${this.baseUrl}/customers/${input.customerId}/adGroupCriteria:mutate`;
      const headers = await this.getHeaders();
      const res = await axios.post(
        url,
        {
          operations: input.keywords.map((keyword) => {
            return {
              create: {
                type: "KEYWORD",
                status: "ENABLED",
                ad_group: adGroupResourceName,
                keyword: {
                  text: keyword,
                  match_type: "BROAD",
                },
              },
            };
          }),
        },
        {
          headers,
        },
      );

      return res.data;
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  async getCampaigns(
    input: IGoogleAds.IGetCampaignsInput,
    resourceName?: IGoogleAds.Campaign["resourceName"],
  ): Promise<IGoogleAds.IGetCampaignsOutput> {
    try {
      const query = `SELECT 
          campaign.resource_name,
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.optimization_score,
          campaign.advertising_channel_type,
          campaign.start_date,
          campaign.end_date,
          campaign_budget.resource_name,
          campaign_budget.amount_micros
        FROM campaign
          WHERE campaign.status != 'REMOVED' ${resourceName ? ` AND campaign.resource_name = "${resourceName}"` : ""}` as const;

      const res = await this.searchStream(input.customerId, query);
      return res.results ?? [];
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  /**
   * Google Ads는 유저의 토큰이 scope를 가지고 있다고 하더라도 우리에게 위임된 계정이어야만 호출 가능하다.
   * 이 API는 유저에게, 뤼튼에게 관리자 권한을 줄 것인지에 대한 초대장을 발급한다.
   *
   * @param input
   * @param validateOnly
   * @returns
   */
  async createClientLink(
    input: { customerId: string },
    validateOnly: boolean = false,
  ): Promise<IGoogleAds.ICreateClientLinkOutput | IGoogleAds.GoogleAdsError> {
    try {
      const parentId = ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID;
      const url = `${this.baseUrl}/customers/${parentId}/customerClientLinks:mutate`;
      const res = await axios.post(url, {
        operation: {
          create: {
            clientCustomer: `customer/${input.customerId}`,
            status: "PENDING",
          },
        },
        validateOnly, // true인 경우에는 동작하지 않고 API 동작만 검증하는, 일종의 테스트 용 필드.
      });

      return res.data;
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  /**
   * 해당 토큰의 주인이 우리에게 등록된 customer clients를 가지고 있는지 체크한다.
   */
  async getCustomers(
    input: IGoogleAds.ISecret,
  ): Promise<IGoogleAds.CustomerClient[]> {
    try {
      const customers = await this.listAccessibleCustomers(input);

      /**
       * Wrtn에 등록된 클라이언트 중 customers에 포함된 것만 남겨야 한다.
       */
      const customerClients = await this.getCustomerClient();
      const res = customerClients.results
        .filter((el) => el.customerClient.currencyCode === "KRW") // 한국 돈으로 광고하는 경우만 허용한다.
        .filter((el) =>
          customers.resourceNames
            .map((name) => TypedSplit(name, "customers/")[1])
            .some((id) => id === el.customerClient.id),
        );

      return res.map((el) => el.customerClient);
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
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

  private async searchStream<T extends string>(
    customerId: `${number}`,
    query: T,
  ): Promise<{ results: Camelize<StringToDeepObject<SelectedColumns<T>>>[] }> {
    try {
      const headers = await this.getHeaders();
      const res = await axios.post(
        `${this.baseUrl}/customers/${customerId}/googleAds:search`,
        {
          query,
        },
        {
          headers,
        },
      );

      return res.data.results ? res.data : { results: [] };
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  /**
   * Wrtn 내에 등록된 고객의 수를 파악하거나 고객의 리소스 네임을 조회하는 함수
   */
  private async getCustomerClient() {
    const parentId = ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID;
    const res = await this.searchStream(
      parentId,
      `SELECT customer_client.resource_name, customer_client.id, customer_client.descriptive_name, customer_client.currency_code FROM customer_client`,
    );

    // type TypeMapper = Typing<
    //   typeof res,
    //   [
    //     [
    //       "results[*].customerClient.resourceName", // 이 위치에 있는 타입을
    //       `customers/${number}/customerClients/${number}`, // 이 타입으로 매핑한다.
    //     ],
    //     [
    //       "results[*].customerClient.id",
    //       `${number}`, // resourceName의 맨 끝 숫자 부분을 의미한다.
    //     ],
    //     [
    //       "results[*].customerClient.descriptiveName",
    //       string | undefined, // 이름이 없는 경우에는 키 자체가 존재하지 않을 수도 있다.
    //     ],
    //     [
    //       "results[*].customerClient.currencyCode",
    //       string, // 통화 단위
    //     ],
    //   ]
    // >;

    // const response = typia.assert<TypeMapper>(res);
    return res;
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
