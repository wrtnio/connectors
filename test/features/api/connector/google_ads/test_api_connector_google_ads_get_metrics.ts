import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_ads_get_metrics = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.google_ads.get_metrics.getMetrics(
    connection,
    {
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
      customerId: "8655555186",
      date: "2024-07-17",
    },
  );

  typia.assert(res);
};
