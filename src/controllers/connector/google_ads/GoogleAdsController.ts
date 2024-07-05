import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IGoogleAds } from "@wrtn/connector-api/lib/structures/connector/google_ads/IGoogleAds";

import { GoogleAdsProvider } from "../../../providers/connector/google_ads/GoogleAdsProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-ads")
export class GoogleAdsController {
  constructor(private readonly googleAdsProvider: GoogleAdsProvider) {}

  @core.TypedRoute.Post("generateKeywordIdeas")
  async generateKeywordIdeas(
    @TypedBody() input: IGoogleAds.IGenerateKeywordIdeaInput,
  ): Promise<IGoogleAds.IGenerateKeywordIdeaOutput> {
    return retry(() => this.googleAdsProvider.generateKeywordIdeas(input))();
  }
}
