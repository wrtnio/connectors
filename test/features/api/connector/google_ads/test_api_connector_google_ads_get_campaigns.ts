import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { test_api_connector_google_ads_get_clients } from "./test_api_connector_google_ads_get_clients";

export const test_api_connector_google_ads_get_campaigns = async (
  connection: CApi.IConnection,
) => {
  const clients = await test_api_connector_google_ads_get_clients(connection);

  const id = clients.map((el) => el.id).find((el) => el === "8655555186")!; // individual account.
  const campaigns =
    await CApi.functional.connector.google_ads.get_campaigns.getCampaigns(
      connection,
      {
        customerId: id,
      },
    );

  typia.assert(campaigns);
};
