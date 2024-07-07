import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_google_ads_generate_keyword_ideas_by_url =
  async (connection: CApi.IConnection) => {
    const firstPage =
      await CApi.functional.connector.google_ads.generateKeywordIdeas.url(
        connection,
        {
          pageSize: 10,
          url: "https://wrtn.io",
        },
      );

    typia.assertEquals(firstPage);

    const secondPage =
      await CApi.functional.connector.google_ads.generateKeywordIdeas.url(
        connection,
        {
          pageSize: 10,
          url: "https://wrtn.io",
          pageToken: firstPage.nextPageToken!,
        },
      );

    typia.assertEquals(secondPage);
  };

export const test_api_connector_google_ads_generate_keyword_ideas_by_keywords =
  async (connection: CApi.IConnection) => {
    const firstPage =
      await CApi.functional.connector.google_ads.generateKeywordIdeas.keywords(
        connection,
        {
          pageSize: 10,
          keywords: ["ai"],
        },
      );

    typia.assertEquals(firstPage);

    const secondPage =
      await CApi.functional.connector.google_ads.generateKeywordIdeas.keywords(
        connection,
        {
          pageSize: 10,
          keywords: ["ai"],
          pageToken: firstPage.nextPageToken!,
        },
      );

    typia.assertEquals(secondPage);
  };

export const test_api_connector_google_ads_generate_keyword_ideas_by_keywordsAndUrl =
  async (connection: CApi.IConnection) => {
    const firstPage =
      await CApi.functional.connector.google_ads.generateKeywordIdeas.keywordsAndUrl(
        connection,
        {
          pageSize: 10,
          url: "https://wrtn.io",
          keywords: ["ai"],
        },
      );

    typia.assertEquals(firstPage);

    const secondPage =
      await CApi.functional.connector.google_ads.generateKeywordIdeas.keywordsAndUrl(
        connection,
        {
          pageSize: 10,
          url: "https://wrtn.io",
          keywords: ["ai"],
          pageToken: firstPage.nextPageToken!,
        },
      );

    typia.assertEquals(secondPage);
  };
