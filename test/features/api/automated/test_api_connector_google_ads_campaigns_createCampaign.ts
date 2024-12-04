import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";

export const test_api_connector_google_ads_campaigns_createCampaign = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleAds.IGetCampaignsOutputResult> =
    await api.functional.connector.google_ads.campaigns.createCampaign(
      connection,
      typia.random<IGoogleAds.ICreateCampaignInput>(),
    );
  typia.assert(output);
};
