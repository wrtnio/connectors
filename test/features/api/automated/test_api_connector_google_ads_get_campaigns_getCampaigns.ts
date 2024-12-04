import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";

export const test_api_connector_google_ads_get_campaigns_getCampaigns = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleAds.IGetCampaignsOutput> =
    await api.functional.connector.google_ads.get_campaigns.getCampaigns(
      connection,
      typia.random<IGoogleAds.ISecret>(),
    );
  typia.assert(output);
};
