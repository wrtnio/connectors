import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { test_api_connector_google_ads_create_campaign_search_type } from "./test_api_connector_google_ads_create_campaign";

export const test_api_connector_google_ads_create_ad_search_type = async (
  connection: CApi.IConnection,
) => {
  const campaign =
    await test_api_connector_google_ads_create_campaign_search_type(connection);

  const campaignResourceName = campaign.results[0].campaign.resourceName;

  const res = await CApi.functional.connector.google_ads.ads.createAd(
    connection,
    {
      customerId: "8655555186",
      campaignResourceName,
      type: "SEARCH_STANDARD",
      finalUrl: "https://wrtn.ai",
      headlines: ["제목1", "제목2", "제목3"],
      descriptions: ["설명1", "설명2"],
    },
  );

  typia.assert(res);
};
