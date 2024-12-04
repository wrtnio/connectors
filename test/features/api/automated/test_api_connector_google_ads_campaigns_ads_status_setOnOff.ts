import typia from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";

export const test_api_connector_google_ads_campaigns_ads_status_setOnOff =
  async (connection: api.IConnection) => {
    const output =
      await api.functional.connector.google_ads.campaigns.ads.status.setOnOff(
        connection,
        typia.random<IGoogleAds.ISetOnOffInput>(),
      );
    typia.assert(output);
  };
