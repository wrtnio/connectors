import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_ads_generate_keyword_ideas_by_url =
  async (connection: CApi.IConnection) => {
    const firstPage =
      await CApi.functional.connector.google_ads.generateKeywordIdeas.url(
        connection,
        {
          customerId: ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID,
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
          pageSize: 10,
          url: "https://wrtn.io",
        },
      );

    typia.assert(firstPage);

    const secondPage =
      await CApi.functional.connector.google_ads.generateKeywordIdeas.url(
        connection,
        {
          customerId: ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID,
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
          pageSize: 10,
          url: "https://wrtn.io",
          pageToken: firstPage.nextPageToken!,
        },
      );

    typia.assert(secondPage);
  };

export const test_api_connector_google_ads_generate_keyword_ideas_by_keywords =
  async (connection: CApi.IConnection) => {
    const firstPage =
      await CApi.functional.connector.google_ads.generateKeywordIdeas.keywords(
        connection,
        {
          customerId: ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID,
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
          pageSize: 10,
          keywords: ["ai"],
        },
      );

    typia.assert(firstPage);

    const secondPage =
      await CApi.functional.connector.google_ads.generateKeywordIdeas.keywords(
        connection,
        {
          customerId: ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID,
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
          pageSize: 10,
          keywords: ["ai"],
          pageToken: firstPage.nextPageToken!,
        },
      );

    typia.assert(secondPage);
  };

export const test_api_connector_google_ads_generate_keyword_ideas_by_keywordsAndUrl =
  async (connection: CApi.IConnection) => {
    const firstPage =
      await CApi.functional.connector.google_ads.generateKeywordIdeas.keywordsAndUrl(
        connection,
        {
          customerId: ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID,
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
          pageSize: 10,
          url: "https://wrtn.io",
          keywords: ["ai"],
        },
      );

    typia.assert(firstPage);

    const secondPage =
      await CApi.functional.connector.google_ads.generateKeywordIdeas.keywordsAndUrl(
        connection,
        {
          customerId: ConnectorGlobal.env.GOOGLE_ADS_ACCOUNT_ID,
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
          pageSize: 10,
          url: "https://wrtn.io",
          keywords: ["ai"],
          pageToken: firstPage.nextPageToken!,
        },
      );

    typia.assert(secondPage);
  };
