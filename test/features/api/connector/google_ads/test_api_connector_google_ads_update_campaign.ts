import CApi from "@wrtn/connector-api/lib/index";
import { deepStrictEqual } from "assert";
import { test_api_connector_google_ads_get_campaigns } from "./test_api_connector_google_ads_get_campaigns";

export const test_api_connector_google_ads_update_campaign = async (
  connection: CApi.IConnection,
) => {
  /**
   * 수정할 캠페인을 조회한다.
   */
  const before = (
    await test_api_connector_google_ads_get_campaigns(connection)
  ).find((el) => el.campaign.id === "21445347960");

  /**
   * 비용을 수정한다.
   */
  await CApi.functional.connector.google_ads.campaigns.updateCampaign(
    connection,
    {
      customerId: "8655555186",
      campaignResourceName: "customers/8655555186/campaigns/21445347960",
      campaignBudget: 2,
      endDate: "2030-01-02",
    },
  );

  /**
   * 수정 후 재조회하여 테스트 통과 확인.
   */
  const after = (
    await test_api_connector_google_ads_get_campaigns(connection)
  ).find((el) => el.campaign.id === "21445347960");
  deepStrictEqual(after?.campaignBudget.amountMicros, `${2 * 1000000}`);
  deepStrictEqual(after?.campaign.endDate, `2030-01-02`);

  /**
   * 다시 원상 복귀시킨다.
   */
  await CApi.functional.connector.google_ads.campaigns.updateCampaign(
    connection,
    {
      customerId: "8655555186",
      campaignResourceName: "customers/8655555186/campaigns/21445347960",
      campaignBudget: Number(before?.campaignBudget.amountMicros) / 1000000,
      endDate: before?.campaign.endDate,
    },
  );
};
