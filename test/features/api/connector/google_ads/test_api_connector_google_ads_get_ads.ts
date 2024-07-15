import CApi from "@wrtn/connector-api/lib/index";
import { deepStrictEqual } from "assert";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_google_ads_get_clients } from "./test_api_connector_google_ads_get_clients";

export const test_api_connector_google_ads_get_ads = async (
  connection: CApi.IConnection,
) => {
  const clients = await test_api_connector_google_ads_get_clients(connection);

  const id = clients.map((el) => el.id).find((el) => el === "8655555186")!; // individual account.
  const ads = await CApi.functional.connector.google_ads.get_ads.getAds(
    connection,
    {
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
      customerId: id,
    },
  );

  typia.assert(ads);
  deepStrictEqual(ads.length > 1, true);

  const count = Array.from(new Set(ads.map((el) => el.campaign.id))).length;
  deepStrictEqual(count > 1, true); // 유니크한 캠페인 아이디가 1개 이상 조회되어야 한다. ( 테스트 용으로 2개 생성해둔 상태이므로 )
};

export const test_api_connector_google_ads_get_ads_by_campaign_id = async (
  connection: CApi.IConnection,
) => {
  const clients = await test_api_connector_google_ads_get_clients(connection);

  const id = clients.map((el) => el.id).find((el) => el === "8655555186")!; // individual account.
  const ads = await CApi.functional.connector.google_ads.get_ads.getAds(
    connection,
    {
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
      customerId: id,
      campaignId: "21445347960",
    },
  );

  typia.assert(ads);
  deepStrictEqual(ads.length > 1, false); // 해당 캠페인에 광고가 1개 뿐이므로 1개가 나와야 한다.

  const count = Array.from(new Set(ads.map((el) => el.campaign.id))).length;
  deepStrictEqual(count === 1, true); // 유니크한 캠페인 아이디가 1개 조회되어야 한다. ( 특정 캠페인 아이디로 검색했으므로 )
};
