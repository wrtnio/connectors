import CApi from "@wrtn/connector-api/lib/index";
import { test_api_connector_google_ads_create_campaign_display_type } from "./test_api_connector_google_ads_create_campaign";
import typia from "typia";

export const test_api_connector_google_ads_create_ad_display_type = async (
  connection: CApi.IConnection,
) => {
  const { campaign } =
    await test_api_connector_google_ads_create_campaign_display_type(
      connection,
    );

  const campaignResourceName = campaign.resourceName;

  const res = await CApi.functional.connector.google_ads.ads.createAd(
    connection,
    {
      customerId: "8655555186",
      campaignResourceName,
      type: "SEARCH_STANDARD",
      finalUrl: "https://wrtn.ai",
      headlines: ["가나다", "라마바", "사아자"],
      descriptions: ["차카", "타파"],
      keywords: [],
    },
  );

  typia.assert(res);
};
