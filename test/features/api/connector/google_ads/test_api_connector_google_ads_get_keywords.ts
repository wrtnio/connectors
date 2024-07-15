import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_google_ads_get_ads_by_campaign_id } from "./test_api_connector_google_ads_get_ads";

export const test_api_connector_google_ads_get_keywords = async (
  connection: CApi.IConnection,
) => {
  /**
   * 테스트 용으로 만든 캠페인을 불러온다.
   */
  const [testTarget] =
    await test_api_connector_google_ads_get_ads_by_campaign_id(connection);
  if (!testTarget || testTarget.campaign.id !== "21445347960") {
    throw new Error("테스트 용으로 생성한 캠페인을 찾지 못했습니다.");
  }

  const res =
    await CApi.functional.connector.google_ads.campaigns.ads.get_keywords.getKeywords(
      connection,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        adGroupResourceName: testTarget.adGroup.resourceName,
        customerId: "8655555186" as const,
      },
    );

  typia.assert(res);
};
