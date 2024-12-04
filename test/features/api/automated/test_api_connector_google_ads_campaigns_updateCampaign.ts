import typia from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";

export const test_api_connector_google_ads_campaigns_updateCampaign = async (
  connection: api.IConnection,
) => {
  const output =
    await api.functional.connector.google_ads.campaigns.updateCampaign(
      connection,
      typia.random<IGoogleAds.IUpdateCampaignInput>(),
    );
  typia.assert(output);
};
