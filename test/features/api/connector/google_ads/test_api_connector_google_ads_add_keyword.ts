import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import typia from "typia";
import { v4 } from "uuid";
import { test_api_connector_google_ads_get_ads_by_campaign_id } from "./test_api_connector_google_ads_get_ads";

export const test_api_connector_google_ads_add_keyword = async (
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

  /**
   * 키워드 추가
   */
  const newKeyword = v4();
  const res =
    await CApi.functional.connector.google_ads.campaigns.ads.keywords.addKeyword(
      connection,
      {
        customerId: "8655555186" as const,
        adGroupResourceName: testTarget.adGroup.resourceName,
        keywords: [newKeyword],
      },
    );

  typia.assert(res);

  /**
   * 키워드가 추가되어 있는지를 광고를 조회하여 검증
   */
  const [after] =
    await test_api_connector_google_ads_get_ads_by_campaign_id(connection);

  assert(testTarget.keywords.every((el) => el.text !== newKeyword)); // 기존에는 해당 텍스트가 없었음
  assert(after.keywords.some((el) => el.text === newKeyword)); // 이후에는 생겨 있음
};
