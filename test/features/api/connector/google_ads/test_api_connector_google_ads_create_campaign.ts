import CApi from "@wrtn/connector-api/lib/index";
import { deepStrictEqual } from "assert";
import typia from "typia";
import { test_api_connector_google_ads_get_clients } from "./test_api_connector_google_ads_get_clients";

export const test_api_connector_google_ads_create_campaign_search_type = async (
  connection: CApi.IConnection,
) => {
  const clients = await test_api_connector_google_ads_get_clients(connection);

  const id = clients.map((el) => el.id).find((el) => el === "8655555186"); // individual account.
  if (!id) {
    throw new Error("클라이언트 목록에서 테스트 용 계정을 찾지 못하였습니다.");
  }

  const testCampaignName = `SEARCH-${new Date().getTime()}`;
  const res =
    await CApi.functional.connector.google_ads.campaign.createCampaign(
      connection,
      {
        customerId: id,
        campaignBudget: 1,
        advertisingChannelType: "SEARCH",
        campaignName: testCampaignName,
      },
    );

  typia.assert(res);
  deepStrictEqual(res.campaign.name === testCampaignName, true);
  deepStrictEqual(res.campaignBudget.amountMicros === "1000000", true);

  return res;
};

export const test_api_connector_google_ads_create_campaign_display_type =
  async (connection: CApi.IConnection) => {
    const clients = await test_api_connector_google_ads_get_clients(connection);

    const id = clients.map((el) => el.id).find((el) => el === "8655555186"); // individual account.
    if (!id) {
      throw new Error(
        "클라이언트 목록에서 테스트 용 계정을 찾지 못하였습니다.",
      );
    }

    const testCampaignName = `DISPLAY-${new Date().getTime()}`;
    const res =
      await CApi.functional.connector.google_ads.campaign.createCampaign(
        connection,
        {
          customerId: id,
          campaignBudget: 1,
          advertisingChannelType: "DISPLAY",
          campaignName: testCampaignName,
        },
      );

    typia.assert(res);
    deepStrictEqual(res.campaign.name === testCampaignName, true);
    deepStrictEqual(res.campaignBudget.amountMicros === "1000000", true);
  };
