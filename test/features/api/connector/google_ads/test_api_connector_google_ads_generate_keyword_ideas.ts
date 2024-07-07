import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_google_ads_generate_keyword_ideas = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.google_ads.generateKeywordIdeas.url(
      connection,
      {
        url: "https://wrtn.io",
      },
    );

  typia.assertEquals(res);
};
