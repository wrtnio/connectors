import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_ads_get_details = async (
  connection: CApi.IConnection,
) => {
  const displayAd =
    await CApi.functional.connector.google_ads.campaigns.ads.get_details.getAdGroupAdDetail(
      connection,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        customerId: "8655555186",
        adGroupAdResourceName:
          "customers/8655555186/adGroupAds/161670049861~705918049667",
      },
    );

  typia.assert(displayAd);

  const searchAd =
    await CApi.functional.connector.google_ads.campaigns.ads.get_details.getAdGroupAdDetail(
      connection,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        customerId: "8655555186",
        adGroupAdResourceName:
          "customers/8655555186/adGroupAds/166101426442~705408475349",
      },
    );

  typia.assert(searchAd);
};
