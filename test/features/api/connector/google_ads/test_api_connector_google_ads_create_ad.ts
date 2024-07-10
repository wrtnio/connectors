import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { test_api_connector_google_ads_create_campaign_search_type } from "./test_api_connector_google_ads_create_campaign";

export const test_api_connector_google_ads_create_ad_search_type_without_keywords =
  async (connection: CApi.IConnection) => {
    const { campaign } =
      await test_api_connector_google_ads_create_campaign_search_type(
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

export const test_api_connector_google_ads_create_ad_search_type_with_keywords =
  async (connection: CApi.IConnection) => {
    const { campaign } =
      await test_api_connector_google_ads_create_campaign_search_type(
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
        keywords: ["wrtn", "ai"],
      },
    );

    typia.assert(res);
  };
