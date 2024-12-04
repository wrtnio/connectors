import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";

export const test_api_connector_google_ads_campaigns_ads_get_keywords_getKeywords =
  async (connection: api.IConnection) => {
    const output: Primitive<IGoogleAds.IGetKeywordsOutput> =
      await api.functional.connector.google_ads.campaigns.ads.get_keywords.getKeywords(
        connection,
        typia.random<IGoogleAds.IGetKeywordsInput>(),
      );
    typia.assert(output);
  };
