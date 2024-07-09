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
   * 고객 계정의 캠페인 목록을 가져와요
   *
   * @summary 캠페인 목록을 조회합니다
   * @param input 고객 정보
   * @returns 캠페인 목록
   */
  @core.TypedRoute.Post("get-campaigns")
  async getCampaigns(
    @TypedBody() input: IGoogleAds.IGetCampaignsInput,
  ): Promise<IGoogleAds.IGetCampaignsOutput> {
    return retry(() => this.googleAdsProvider.getCampaigns(input))();
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
}
