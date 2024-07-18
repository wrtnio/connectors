import CApi from "@wrtn/connector-api/lib/index";
import { deepStrictEqual } from "assert";
import { test_api_connector_google_ads_add_keyword } from "./test_api_connector_google_ads_add_keyword";
import { test_api_connector_google_ads_get_keywords } from "./test_api_connector_google_ads_get_keywords";

export const test_api_connector_google_ads_delete_keywords = async (
  connection: CApi.IConnection,
) => {
  const before = await test_api_connector_google_ads_get_keywords(connection);
  const keyword = await test_api_connector_google_ads_add_keyword(connection);

  await CApi.functional.connector.google_ads.campaigns.ads.keywords.deleteKeywords(
    connection,
    {
      customerId: "8655555186",
      resourceNames: keyword,
    },
  );

  const after = await test_api_connector_google_ads_get_keywords(connection);

  /**
   * 추가 후 바로 삭제했다면 `before`와 `after`는 같아야 한다.
   * 추가가 잘 되었는지에 대한 것은 {@link test_api_connector_google_ads_add_keyword} 에서 검사한다.
   */
  deepStrictEqual(before, after);
};
