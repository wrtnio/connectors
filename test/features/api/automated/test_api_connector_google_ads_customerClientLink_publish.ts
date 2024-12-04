import typia from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";

export const test_api_connector_google_ads_customerClientLink_publish = async (
  connection: api.IConnection,
) => {
  const output =
    await api.functional.connector.google_ads.customerClientLink.publish(
      connection,
      typia.random<IGoogleAds.ISecret>(),
    );
  typia.assert(output);
};
