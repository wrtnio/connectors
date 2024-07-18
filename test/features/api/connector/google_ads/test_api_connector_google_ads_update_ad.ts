import CApi from "@wrtn/connector-api/lib/index";
import { deepStrictEqual } from "assert";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_ads_update_ad = async (
  connection: CApi.IConnection,
) => {
  /**
   * 광고를 실행 후 상태를 조회하여 동일한지 확인한다.
   */
  await CApi.functional.connector.google_ads.campaigns.ads.status.setOnOff(
    connection,
    {
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
      customerId: "8655555186",
      adGroupAdResourceName:
        "customers/8655555186/adGroupAds/161670049861~705918049667",
      status: "ENABLED",
    },
  );

  const detail1 =
    await CApi.functional.connector.google_ads.campaigns.ads.get_details.getAdGroupAdDetail(
      connection,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        customerId: "8655555186",
        adGroupAdResourceName:
          "customers/8655555186/adGroupAds/161670049861~705918049667",
      },
    );

  deepStrictEqual(detail1.status, "ENABLED");

  /**
   * 광고를 종료 후 상태를 조회하여 동일한지 확인한다.
   */
  await CApi.functional.connector.google_ads.campaigns.ads.status.setOnOff(
    connection,
    {
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
      customerId: "8655555186",
      adGroupAdResourceName:
        "customers/8655555186/adGroupAds/161670049861~705918049667",
      status: "PAUSED",
    },
  );

  const detail2 =
    await CApi.functional.connector.google_ads.campaigns.ads.get_details.getAdGroupAdDetail(
      connection,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        customerId: "8655555186",
        adGroupAdResourceName:
          "customers/8655555186/adGroupAds/161670049861~705918049667",
      },
    );

  deepStrictEqual(detail2.status, "PAUSED");
};
