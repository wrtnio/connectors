import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IGoogleAds } from "@wrtn/connector-api/lib/structures/connector/google_ads/IGoogleAds";

import { GoogleAdsProvider } from "../../../providers/connector/google_ads/GoogleAdsProvider";
import { GoogleProvider } from "../../../providers/internal/google/GoogleProvider";

@Controller("connector/google-ads")
export class GoogleAdsController {
  constructor(private readonly googleProvider: GoogleProvider) {}

  @core.TypedRoute.Post("generateKeywordIdeas")
  async generateKeywordIdeas(
    @TypedBody() input: IGoogleAds.IGenerateKeywordIdeaInput,
  ): Promise<IGoogleAds.IGenerateKeywordIdeaOutput> {
    return GoogleAdsProvider.generateKeywordIdeas(input);
  }
}
