import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IGoogleAds } from "@wrtn/connector-api/lib/structures/connector/google_ads/IGoogleAds";

import { Standalone } from "@wrtn/decorators";
import { GoogleAdsProvider } from "../../../providers/connector/google_ads/GoogleAdsProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-ads")
export class GoogleAdsController {
  constructor(private readonly googleAdsProvider: GoogleAdsProvider) {}

  /**
   * 구글 광고를 위한 키워드를 추천받아요!
   *
   * @summary 키워드와 URL을 통한 키워드 생성
   * @param input URL을 담은 객체
   * @returns 생성된 키워드
   */
  @Standalone()
  @core.TypedRoute.Post("generateKeywordIdeas/keywordsAndUrl")
  async keywordsAndUrl(
    @TypedBody() input: IGoogleAds.IGenerateKeywordIdeaByKeywordsAndUrlInput,
  ) {
    return retry(() => this.googleAdsProvider.generateKeywordIdeas(input))();
  }

  /**
   * 구글 광고를 위한 키워드를 추천받아요!
   *
   * @summary 키워드를 통한 키워드 생성
   * @param input URL을 담은 객체
   * @returns 생성된 키워드
   */
  @Standalone()
  @core.TypedRoute.Post("generateKeywordIdeas/keywords")
  async keywords(
    @TypedBody() input: IGoogleAds.IGenerateKeywordIdeaByKeywordsInput,
  ) {
    return retry(() => this.googleAdsProvider.generateKeywordIdeas(input))();
  }

  /**
   * 구글 광고를 위한 키워드를 추천받아요!
   *
   * @summary URL을 통한 키워드 생성
   * @param input URL을 담은 객체
   * @returns 생성된 키워드
   */
  @Standalone()
  @core.TypedRoute.Post("generateKeywordIdeas/url")
  async url(@TypedBody() input: IGoogleAds.IGenerateKeywordIdeaByURLInput) {
    return retry(() => this.googleAdsProvider.generateKeywordIdeas(input))();
  }

  /**
   * 뤼튼에 연동된 고객의 광고 계정을 가져와요
   *
   * @summary 광고 계정을 조회합니다
   * @param input 고객 정보
   * @returns 광고 계정
   */
  @Standalone()
  @core.TypedRoute.Post("get-customers")
  async getCustomers(
    @TypedBody() input: IGoogleAds.ISecret,
  ): Promise<IGoogleAds.IGetCustomerOutput> {
    return retry(() => this.googleAdsProvider.getCustomers(input))();
  }

  /**
   * 구글 고객 계정의 캠페인 목록을 가져와요
   *
   * @summary 캠페인 목록을 조회합니다
   * @param input 고객 정보
   * @returns 캠페인 목록
   */
  @core.TypedRoute.Post("get-campaigns")
  async getCampaigns(
    @TypedBody() input: IGoogleAds.IGetCampaignsInput,
  ): Promise<IGoogleAds.IGetCampaignsOutput> {
    // const customers = await this.googleAdsProvider.getCustomers(input);
    // if (!customers.map((el) => el.id).includes(input.customerId)) {
    //   throw new Error(
    //     "뤼튼에 등록되지 않은 고객 또는 구글에서 심사 중인 고객입니다.",
    //   );
    // }

    return retry(() => this.googleAdsProvider.getCampaigns(input))();
  }

  /**
   * 구글 고객 계정의 캠페인 광고 목록을 가져와요
   *
   * @summary 캠페인 광고 목록을 조회합니다.
   * @param input 광고 목록 조회 조건
   * @returns 광고 목록
   */
  @core.TypedRoute.Post("get-ads")
  async getAds(
    @TypedBody() input: IGoogleAds.IGetAdGroupAdsInput,
  ): Promise<IGoogleAds.IGetAdGroupAdsOutput> {
    // const customers = await this.googleAdsProvider.getCustomers(input);
    // if (!customers.map((el) => el.id).includes(input.customerId)) {
    //   throw new Error(
    //     "뤼튼에 등록되지 않은 고객 또는 구글에서 심사 중인 고객입니다.",
    //   );
    // }

    return retry(() => this.googleAdsProvider.getAds(input))();
  }

  /**
   * 구글 고객 계정의 광고에 검색 키워드를 추가해요
   *
   * @summary 광고에 키워드를 추가해요
   * @param input 키워드 추가 조건
   * @returns
   */
  @core.TypedRoute.Post("campaigns/ads/get-keywords")
  async getKeywords(
    @TypedBody() input: IGoogleAds.IGetKeywordsInput,
  ): Promise<IGoogleAds.IGetKeywordsOutput> {
    return retry(() => this.googleAdsProvider.getKeywords(input))();
  }

  /**
   * 구글 고객 계정의 특정 광고에서 키워드를 삭제해요
   *
   * @summary 광고에 키워드를 삭제해요
   * @param input 키워드 삭제 조건
   * @returns
   */
  @core.TypedRoute.Delete("campaigns/ads/keywords")
  async deleteKeywords(
    @TypedBody() input: IGoogleAds.IDeleteAdGroupCriteriaInput,
  ): Promise<void> {
    return retry(() => this.googleAdsProvider.deleteKeywords(input))();
  }

  /**
   * 구글 고객 계정의 광고에 검색 키워드를 추가해요
   *
   * @summary 광고에 키워드를 추가해요
   * @param input 키워드 추가 조건
   * @returns
   */
  @core.TypedRoute.Post("campaigns/ads/keywords")
  async addKeywords(
    @TypedBody() input: IGoogleAds.ICreateAdGroupCriteriaInput,
  ): Promise<IGoogleAds.ICreateAdGroupCriteriaOutput> {
    const { adGroupResourceName, ...rest } = input;
    return this.googleAdsProvider.createAdGroupCriteria(
      adGroupResourceName,
      rest,
    );
  }

  /**
   * 구글 고객 계정의 광고를 생성해요
   *
   * @summary 광고를 생성해요
   * @param input 광고 생성 조건
   * @returns 생성된 광고 정보
   */
  @core.TypedRoute.Post("campaigns/ads")
  async appendAd(
    @TypedBody()
    input: IGoogleAds.ICreateAdGroupAdInput,
  ): Promise<IGoogleAds.IGetAdGroupAdsOutputResult> {
    // const customers = await this.googleAdsProvider.getCustomers(input);
    // if (!customers.map((el) => el.id).includes(input.customerId)) {
    //   throw new Error(
    //     "뤼튼에 등록되지 않은 고객 또는 구글에서 심사 중인 고객입니다.",
    //   );
    // }

    return this.googleAdsProvider.createAd(input);
  }

  /**
   * 구글 고객 계정의 광고 캠페인을 수정해요
   *
   * @summary 캠페인을 수정해요
   * @param input 캠페인 수정 조건
   */
  @core.TypedRoute.Patch("campaigns")
  async updateCampaign(
    @TypedBody() input: IGoogleAds.IUpdateCampaignInput,
  ): Promise<void> {
    return retry(() => this.googleAdsProvider.updateCampaign(input))();
  }

  /**
   * 구글 고객 계정의 광고 캠페인을 생성해요
   *
   * @summary 캠페인을 생성합니다
   * @param input 캠페인 생성 조건
   * @returns 생성된 캠페인 정보
   */
  @core.TypedRoute.Post("campaigns")
  async createCampaign(
    @TypedBody() input: IGoogleAds.ICreateCampaignInput,
  ): Promise<IGoogleAds.ICreateCampaignsOutput> {
    // const customers = await this.googleAdsProvider.getCustomers(input);
    // if (!customers.map((el) => el.id).includes(input.customerId)) {
    //   throw new Error(
    //     "뤼튼에 등록되지 않은 고객 또는 구글에서 심사 중인 고객입니다.",
    //   );
    // }

    return this.googleAdsProvider.createCampaign(input);
  }

  /**
   * 구글 고객 계정에 광고를 한 번에 만들어요
   *
   * @summaryh 구글 고객 계정에 광고를 한 번에 만들어요
   * @param input 캠페인부터 광고까지 한 번에 생성하는 조건
   * @returns 생성된 캠페인부터 광고까지의 정보
   */
  @core.TypedRoute.Post("search-ads")
  async createSearchAd(
    @TypedBody()
    input: IGoogleAds.ICreateAdGroupSearchAdAtOnceInput,
  ): Promise<IGoogleAds.ICreateAdGroupAdAtOnceOutput> {
    // const customers = await this.googleAdsProvider.getCustomers(input);
    // if (!customers.map((el) => el.id).includes(input.customerId)) {
    //   throw new Error(
    //     "뤼튼에 등록되지 않은 고객 또는 구글에서 심사 중인 고객입니다.",
    //   );
    // }

    const { campaign, campaignBudget } =
      await this.googleAdsProvider.createCampaign({
        ...input.campaign,
        advertisingChannelType: "SEARCH",
        customerId: input.customerId,
      });

    const ad = await this.googleAdsProvider.createAd({
      ...input.ad,
      customerId: input.customerId,
      campaignResourceName: campaign.resourceName,
      type: `SEARCH_STANDARD`,
    });

    return { campaign, campaignBudget, ad };
  }

  @core.TypedRoute.Post("display-ads")
  async createDisplayAd(
    @TypedBody()
    input: IGoogleAds.ICreateAdGroupDisplayAdAtOnceInput,
  ): Promise<IGoogleAds.ICreateAdGroupAdAtOnceOutput> {
    // const customers = await this.googleAdsProvider.getCustomers(input);
    // if (!customers.map((el) => el.id).includes(input.customerId)) {
    //   throw new Error(
    //     "뤼튼에 등록되지 않은 고객 또는 구글에서 심사 중인 고객입니다.",
    //   );
    // }

    const { campaign, campaignBudget } =
      await this.googleAdsProvider.createCampaign({
        ...input.campaign,
        advertisingChannelType: "DISPLAY",
        customerId: input.customerId,
      });

    const ad = await this.googleAdsProvider.createAd({
      ...input.ad,
      customerId: input.customerId,
      campaignResourceName: campaign.resourceName,
      type: `DISPLAY_STANDARD`,
    });

    return { campaign, campaignBudget, ad };
  }
}
