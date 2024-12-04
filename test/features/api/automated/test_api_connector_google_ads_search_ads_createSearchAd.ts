import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";
import type { DeepStrictMergeHelper } from "../../../../src/api/structures/types/DeepStrictMerge";

export const test_api_connector_google_ads_search_ads_createSearchAd = async (
  connection: api.IConnection,
) => {
  const output: Primitive<
    DeepStrictMergeHelper<
      IGoogleAds.IGetCampaignsOutputResult,
      IGoogleAds.AdWrapper
    >
  > = await api.functional.connector.google_ads.search_ads.createSearchAd(
    connection,
    typia.random<IGoogleAds.ICreateAdGroupSearchAdAtOnceInput>(),
  );
  typia.assert(output);
};
