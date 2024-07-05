import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_ads_generate_keyword = async (
  connection: CApi.IConnection,
) => {
  const secretKey = ConnectorGlobal.env.GOOGLE_TEST_SECRET;

  const res = await CApi.functional.connector.google_ads.generateKeywordIdeas(
    connection,
    {
      secretKey: secretKey,
      url: "https://wrtn.io",
    },
  );

  typia.assertEquals(res);
};
