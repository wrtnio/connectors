import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IGoogleAds } from "@wrtn/connector-api/lib/structures/connector/google_ads/IGoogleAds";

import { GoogleAdsProvider } from "../../../providers/connector/google_ads/GoogleAdsProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-ads")
export class GoogleAdsController {
  constructor(private readonly googleAdsProvider: GoogleAdsProvider) {}

  /**
   * 구글 광고를 위한 키워드를 추천받아요!
   *
   * @summary URL을 통한 키워드 생성
   * @param input URL을 담은 객체
   * @returns 생성된 키워드
   */
  @core.TypedRoute.Post("generateKeywordIdeas/url")
  async generateKeywordIdeas(
    @TypedBody() input: IGoogleAds.IGenerateKeywordIdeaInput,
  ): Promise<IGoogleAds.IGenerateKeywordIdeaOutput> {
    return retry(() => this.googleAdsProvider.generateKeywordIdeas(input))();
  }
}
