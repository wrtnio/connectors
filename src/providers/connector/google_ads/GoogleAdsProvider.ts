import { Injectable } from "@nestjs/common";
import { IGoogleAds } from "@wrtn/connector-api/lib/structures/connector/google_ads/IGoogleAds";
import axios, { AxiosError } from "axios";
import { randomUUID } from "crypto";
import typia from "typia";
import { v4 } from "uuid";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { TypedSplit } from "../../../utils/TypedSplit";
import { SelectedColumns } from "../../../api/structures/types/SelectedColumns";
import { Camelize } from "../../../api/structures/types/SnakeToCamelCaseObject";
import { StringToDeepObject } from "../../../api/structures/types/StringToDeepObject";
import { GoogleProvider } from "../../internal/google/GoogleProvider";
import { ImageProvider } from "../../internal/ImageProvider";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";

@Injectable()
export class GoogleAdsProvider {
  private readonly baseUrl = "https://googleads.googleapis.com/v17";

  constructor(private readonly googleProvider: GoogleProvider) {}

  /**
   * 유저의 시크릿 키와 유저가 사용하고자 하는 광고 계정이 유효한지 검사합니다.
   * 만약 광고 계정의 아이디를 전달하지 않은 경우, 광고 계정 목록의 length가 1인 경우에 한하여 선택하지 않아도 통과시켜 줍니다.
   *
   * @param input
   * @returns
   */
  async getTargetCustomerId(
    input: IGoogleAds.ISecret,
  ): Promise<IGoogleAds.Customer["id"]> {
    const customers = await this.getCustomers(input);
    let customerId: string | null = input.customerId ?? null;
    if (input.customerId) {
      if (!customers.map((el) => el.id).includes(input.customerId)) {
        throw new Error(
          "뤼튼에 등록되지 않은 고객 또는 구글에서 심사 중인 고객입니다.",
        );
      }
    } else {
      if (customers.length > 1 && !input.customerId) {
        throw new Error("고객 계정 중 어떤 것을 사용할지 명시해주어야 합니다.");
      } else if (customers.length === 1) {
        customerId = customers[0].id;
      }
    }

    if (!customerId) {
      throw new Error("고객 계정이 지정되지 않았습니다.");
    }

    return customerId;
  }

  async publish(input: IGoogleAds.ISecret): Promise<void> {
    try {
      const customers = await this.listAccessibleCustomers(input);
      for await (const resourceName of customers.resourceNames) {
        await this.createClientLink({ resourceName: resourceName });
      }
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
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
      const headers = await this.getHeaders();
      const endPoint = `${this.baseUrl}/customers/${input.customerId}:generateKeywordIdeas`;

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
    input: Omit<IGoogleAds.ICreateAdGroupInput, "campaignResourceName"> & {
      campaignResourceName: string;
    },
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

  /**
   * 광고 소재 수정 전에 원래의 전체 형태를 조회하기 위한 용도
   */
  async getAdGroupAdDetail(
    input: Omit<IGoogleAds.IGetAdGroupAdDetailInput, "customerId"> & {
      customerId: string;
    },
  ): Promise<IGoogleAds.IGetAdGroupAdDetailOutput> {
    const query = `
    SELECT
      ad_group_ad.resource_name,
      ad_group_ad.ad.resource_name,
      ad_group_ad.status,
      ad_group_ad.ad.responsive_search_ad.descriptions,
      ad_group_ad.ad.responsive_search_ad.headlines,
      ad_group_ad.ad.responsive_display_ad.headlines,
      ad_group_ad.ad.responsive_display_ad.long_headline,
      ad_group_ad.ad.responsive_display_ad.business_name,
      ad_group_ad.ad.responsive_display_ad.descriptions,
      ad_group_ad.ad.responsive_display_ad.marketing_images,
      ad_group_ad.ad.responsive_display_ad.square_marketing_images,
      ad_group_ad.ad.responsive_display_ad.square_logo_images
    FROM ad_group_ad
    WHERE ad_group_ad.resource_name = '${input.adGroupAdResourceName}'` as const;

    const res = await this.searchStream(input.customerId, query);
    const adGroupAd = res.results[0].adGroupAd;

    const detail =
      adGroupAd.ad.responsiveSearchAd || adGroupAd.ad.responsiveDisplayAd;

    return {
      resourceName: adGroupAd.resourceName,
      status: adGroupAd.status,
      ad: { resourceName: adGroupAd.ad.resourceName, detail },
    };
  }

  async updateAd(input: IGoogleAds.ISetOnOffInput) {
    try {
      const headers = await this.getHeaders();
      const url = `${this.baseUrl}/customers/${input.customerId}/adGroupAds:mutate`;

      await axios.post(
        url,
        {
          operations: {
            update_mask: "status",
            update: {
              status: input.status,
              resource_name: input.adGroupAdResourceName,
            },
          },
        },
        {
          headers,
        },
      );
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  async createAd(
    input: Omit<
      IGoogleAds.ICreateAdGroupAdInputCommon,
      "campaignResourceName"
    > & {
      campaignResourceName: string;
    },
  ): Promise<IGoogleAds.IGetAdGroupsOutputResult> {
    try {
      const adGroupResourceName = await this.createAdGroup(input);
      const headers = await this.getHeaders();
      const url = `${this.baseUrl}/customers/${input.customerId}/adGroupAds:mutate`;
      if (input.keywords.length) {
        await this.createAdGroupCriteria(adGroupResourceName, input); // Google Ads Keywords 생성
      }

      if (input.type === "SEARCH_STANDARD") {
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
        const asserted =
          typia.assert<IGoogleAds.ICreateAdGroupDisplayAdInput>(input);
        /**
         * DISPLAY_STANDARD
         */
        await axios.post(
          url,
          {
            operations: {
              create: {
                status: "PAUSED",
                ad: {
                  final_urls: [asserted.finalUrl],
                  responsive_display_ad: {
                    headlines: asserted.headlines.map((text) => ({ text })),
                    long_headline: { text: asserted.longHeadline },
                    descriptions: asserted.descriptions.map((text) => ({
                      text,
                    })),
                    marketing_images: await this.createAssets({
                      cusotmerId: asserted.customerId,
                      images: await Promise.all(
                        asserted.landscapeImages.map((el) =>
                          this.cropImage(el, 1.91),
                        ),
                      ),
                    }),
                    square_marketing_images: await this.createAssets({
                      cusotmerId: asserted.customerId,
                      images: await Promise.all(
                        asserted.squareImages.map((el) =>
                          this.cropImage(el, 1),
                        ),
                      ),
                    }),
                    business_name: asserted.businessName,
                    youtube_videos: [],
                    square_logo_images: await this.createAssets({
                      cusotmerId: asserted.customerId,
                      images: await Promise.all(
                        asserted.logoImages.map((el) => this.cropImage(el, 1)),
                      ),
                    }),
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
      }

      const [result] = await this.getAdGroupDetails({
        ...input,
        adGroupResourceName,
      });
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

  async cropImage(
    image: string &
      typia.tags.Format<"uri"> &
      typia.tags.ContentMediaType<"image/*">,
    ratio: 1 | 1.91 | 0.8,
  ): Promise<string> {
    const imageFile = await ImageProvider.getImageFile(image);
    const size = ImageProvider.getSize(imageFile.size, ratio);
    const cropped = await imageFile.image.extract(size).toBuffer();

    return cropped.toString("base64");
  }

  async createAssets(input: {
    cusotmerId: string;
    images: string[]; // base64 encoded images
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

  async updateCampaign(
    input: Omit<IGoogleAds.IUpdateCampaignInput, "secretKey"> & {
      customerId: string;
    },
  ): Promise<void> {
    try {
      const { customerId, campaignResourceName, campaignBudget, ...rest } =
        input;
      const url = `${this.baseUrl}/customers/${customerId}/campaigns:mutate`;
      const headers = await this.getHeaders();

      const [campaign] = await this.getCampaigns(
        input,
        input.campaignResourceName,
      );

      if (campaignBudget) {
        await this.updateCampaignBudget(
          input.customerId,
          campaign.campaignBudget.resourceName,
          campaignBudget,
        );
      }

      if (JSON.stringify(rest) != "{}") {
        await axios.post(
          url,
          {
            operations: {
              update: {
                resource_name: campaignResourceName,
                ...(input.campaignName && { name: input.campaignName }),
                ...(input.endDate && { end_date: input.endDate }),
              },
              update_mask: Object.keys(rest).join(","),
            },
          },
          {
            headers,
          },
        );
      }
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  private async updateCampaignBudget(
    customerId: IGoogleAds.CustomerClient["id"],
    campaignBudgetResourceName: IGoogleAds.CampaignBudget["resourceName"],
    campaignBudget: number, // 한국 돈 단위
  ) {
    try {
      const url = `${this.baseUrl}/customers/${customerId}/campaignBudgets:mutate`;
      const headers = await this.getHeaders();

      await axios.post(
        url,
        {
          operations: {
            update_mask: "amount_micros",
            update: {
              resource_name: campaignBudgetResourceName,
              amount_micros: campaignBudget * 1000000,
            },
          },
        },
        { headers },
      );
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  async createCampaign(
    input: Omit<IGoogleAds.ICreateCampaignInput, "secretKey"> & {
      customerId: string;
    },
  ): Promise<IGoogleAds.ICreateCampaignsOutput> {
    try {
      const url = `${this.baseUrl}/customers/${input.customerId}/campaigns:mutate`;
      const headers = await this.getHeaders();
      const campaignBudgetResourceName = await this.createCampaignBudget(input);
      const res = await axios.post(
        url,
        {
          operations: [
            {
              create: {
                name: input.campaignName ?? randomUUID(),
                advertising_channel_type: input.advertisingChannelType,
                status: "ENABLED",
                campaignBudget: campaignBudgetResourceName,

                /**
                 * @todo 유저의 요구사항에 맞는 광고 효율 최적화를 진행해야 한다.
                 */
                target_spend: {},
                ...(input.startDate && { start_date: input.startDate }),
                ...(input.endDate && { end_date: input.endDate }),
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
    input: Omit<IGoogleAds.IGetAdGroupInput, "secretKey" | "customerId"> & {
      customerId: string;
    },
  ): Promise<IGoogleAds.IGetGoogleAdGroupOutput> {
    try {
      const query = `
      SELECT 
        campaign.id,
        campaign.resource_name,
        campaign.status,
        ad_group.id,
        ad_group.resource_name,
        ad_group.name,
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

  async deleteKeywords(
    input: IGoogleAds.IDeleteAdGroupCriteriaInput,
  ): Promise<void> {
    try {
      const url = `${this.baseUrl}/customers/${input.customerId}/adGroupCriteria:mutate`;
      const headers = await this.getHeaders();
      await axios.post(
        url,
        {
          operations: input.resourceNames.map((resourceName) => ({
            remove: resourceName,
          })),
        },
        {
          headers,
        },
      );
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  async getKeywords(input: {
    customerId: string;
    adGroupResourceName: string;
  }): Promise<IGoogleAds.IGetKeywordsOutput> {
    const query = `
    SELECT
      ad_group_criterion.criterion_id,
      ad_group_criterion.resource_name,
      ad_group_criterion.type,
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      ad_group_criterion.status
    FROM ad_group_criterion
      WHERE ad_group_criterion.type = "KEYWORD" AND ad_group.resource_name = '${input.adGroupResourceName}' AND ad_group_criterion.status != "REMOVED"` as const;

    const keywords = await this.searchStream(input.customerId, query);
    return keywords.results.map((el) => {
      return {
        ...el,
        adGroupCriterion: {
          ...el.adGroupCriterion,
          ...el.adGroupCriterion.keyword,
        },
      };
    });
  }

  async getMetrics(input: Required<IGoogleAds.IGetMetricInput>) {
    const query = `
    SELECT
      metrics.average_page_views, 
      metrics.impressions, 
      metrics.clicks, 
      metrics.cost_micros, 
      metrics.video_views, 
      metrics.video_quartile_p25_rate, 
      metrics.video_quartile_p50_rate, 
      metrics.video_quartile_p75_rate, 
      metrics.video_quartile_p100_rate,
      ad_group_ad.resource_name
    FROM 
      ad_group_ad
    WHERE
      segments.date = '${input.date}'` as const;

    const response = await this.searchStream(input.customerId, query);
    return response.results;
  }

  async getAdGroupAds(input: {
    customerId: string;
    adGroupResourceName?: string;
  }): Promise<IGoogleAds.IGetAdGroupAdOutput> {
    const query = `
    SELECT
      ad_group_ad.resource_name,
      ad_group_ad.status,
      ad_group_ad.policy_summary.approval_status,
      ad_group_ad.policy_summary.review_status
    FROM ad_group_ad 
    WHERE 
      ad_group.status != 'REMOVED'
      ${input.adGroupResourceName ? `AND ad_group_ad.ad_group = '${input.adGroupResourceName}'` : ""}
    ` as const;

    const customerId = input.customerId;
    const response = await this.searchStream(customerId, query);

    return response.results.map((el) => el.adGroupAd);
  }

  /**
   * 각 캠페인에 속한 광고 그룹과 광고 그룹 광고를 찾는다.
   *
   * @todo 광고 그룹마다 키워드가 보여지게 수정해야 한다.
   *
   * @param input
   * @returns
   */
  async getAdGroupDetails(
    input: Omit<IGoogleAds.IGetAdGroupInput, "secretKey" | "customerId"> & {
      customerId: string;
    },
  ): Promise<IGoogleAds.IGetAdGroupOutput> {
    try {
      const adGroupsResult = await this.getAdGroups(input);

      const response = [];
      for await (const { campaign, adGroup } of adGroupsResult.results) {
        const adGroupResourceName = adGroup.resourceName;
        const adGroupAds = await this.getAdGroupAds({
          ...input,
          adGroupResourceName,
        });

        const adGroupCriterions = await this.getKeywords({
          customerId: input.customerId,
          adGroupResourceName,
        });

        response.push({
          campaign,
          adGroup,
          adGroupAds,
          keywords: (adGroupCriterions ?? []).map((result) => ({
            criterionId: result.adGroupCriterion.criterionId,
            resourceName: result.adGroupCriterion.resourceName,
            ...result.adGroupCriterion.keyword,
          })),
        });
      }

      return response;
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
  async createAdGroupCriteria(
    adGroupResourceName: IGoogleAds.AdGroup["resourceName"],
    input: IGoogleAds.ICreateKeywordInput,
  ): Promise<IGoogleAds.ICreateAdGroupCriteriaOutput> {
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

      return (
        res.data.results.map(
          (el: Pick<IGoogleAds.AdGroupCriterion, "resourceName">) =>
            el.resourceName,
        ) ?? []
      );
    } catch (err) {
      console.error(
        JSON.stringify(err instanceof AxiosError ? err.response?.data : err),
      );
      throw err;
    }
  }

  async getCampaigns(
    input: Omit<IGoogleAds.IGetCampaignsInput, "secretKey" | "customerId"> & {
      customerId: string;
    },
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
  async createClientLink(input: {
    resourceName: IGoogleAds.Customer["resourceName"];
  }): Promise<void> {
    try {
      const parentId = ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID;
      const url = `${this.baseUrl}/customers/${parentId}/customerClientLinks:mutate`;
      const headers = await this.getHeaders();
      await axios.post(
        url,
        {
          operation: {
            create: {
              clientCustomer: input.resourceName,
              status: "PENDING",
            },
          },
        },
        {
          headers,
        },
      );
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
    input: IGoogleAds.IGetCustomerInput,
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
    input: IGoogleAds.IGetCustomerInput,
  ): Promise<IGoogleAds.IGetlistAccessibleCustomersOutput> {
    const url = `${this.baseUrl}/customers:listAccessibleCustomers`;
    const developerToken = (await this.getHeaders())["developer-token"];
    const secretValue = await OAuthSecretProvider.getSecretValue(
      input.secretKey,
    );
    const refreshToken =
      typeof secretValue === "string"
        ? secretValue
        : (secretValue as IOAuthSecret.ISecretValue).value;

    const accessToken =
      await this.googleProvider.refreshAccessToken(refreshToken);

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
    customerId: string,
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
