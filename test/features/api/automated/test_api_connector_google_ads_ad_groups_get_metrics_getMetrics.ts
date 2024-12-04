import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";

export const test_api_connector_google_ads_ad_groups_get_metrics_getMetrics =
  async (connection: api.IConnection) => {
    const output: Primitive<Array<IGoogleAds.IGetMetricOutputResult>> =
      await api.functional.connector.google_ads.ad_groups.get_metrics.getMetrics(
        connection,
        typia.random<IGoogleAds.IGetMetricInput>(),
      );
    typia.assert(output);
  };
