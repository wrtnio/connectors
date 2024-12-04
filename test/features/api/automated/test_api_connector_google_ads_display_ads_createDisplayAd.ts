import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";
import type { DeepStrictMergeHelper } from "../../../../src/api/structures/types/DeepStrictMerge";

export const test_api_connector_google_ads_display_ads_createDisplayAd = async (
  connection: api.IConnection,
) => {
  const output: Primitive<
    DeepStrictMergeHelper<
      IGoogleAds.IGetCampaignsOutputResult,
      IGoogleAds.AdWrapper
    >
  > = await api.functional.connector.google_ads.display_ads.createDisplayAd(
    connection,
    typia.random<IGoogleAds.ICreateAdGroupDisplayAdAtOnceInput>(),
  );
  typia.assert(output);
};
