import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";

export const test_api_connector_google_ads_campaigns_ads_keywords_addKeywords =
  async (connection: api.IConnection) => {
    const output: Primitive<IGoogleAds.ICreateAdGroupCriteriaOutput> =
      await api.functional.connector.google_ads.campaigns.ads.keywords.addKeywords(
        connection,
        typia.random<IGoogleAds.ICreateAdGroupCriteriaInput>(),
      );
    typia.assert(output);
  };
