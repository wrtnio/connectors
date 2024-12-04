import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";

export const test_api_connector_google_ads_get_ad_groups_getAdGroups = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleAds.IGetAdGroupOutput> =
    await api.functional.connector.google_ads.get_ad_groups.getAdGroups(
      connection,
      typia.random<IGoogleAds.IGetAdGroupInput>(),
    );
  typia.assert(output);
};
