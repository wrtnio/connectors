import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";

export const test_api_connector_google_ads_generateKeywordIdeas_keywordsAndUrl =
  async (connection: api.IConnection) => {
    const output: Primitive<IGoogleAds.IGenerateKeywordIdeaOutput> =
      await api.functional.connector.google_ads.generateKeywordIdeas.keywordsAndUrl(
        connection,
        typia.random<IGoogleAds.IGenerateKeywordIdeaByKeywordsAndUrlInput>(),
      );
    typia.assert(output);
  };
