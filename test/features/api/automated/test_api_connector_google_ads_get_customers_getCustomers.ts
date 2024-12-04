import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleAds } from "../../../../src/api/structures/connector/google_ads/IGoogleAds";

export const test_api_connector_google_ads_get_customers_getCustomers = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleAds.IGetCustomerOutput> =
    await api.functional.connector.google_ads.get_customers.getCustomers(
      connection,
      typia.random<IGoogleAds.IGetCustomerInput>(),
    );
  typia.assert(output);
};
