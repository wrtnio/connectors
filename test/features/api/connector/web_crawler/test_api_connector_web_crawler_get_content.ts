import CApi from "@wrtn/connector-api/lib/index";
import type { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { TestValidator } from "@nestia/e2e";

export const test_api_connector_web_crawler_get_content = async (
  pool: CApi.IConnection,
) => {
  const URL = "https://i.clarity.ms/";
  const res: IWebCrawler.IResponse =
    await CApi.functional.connector.crawler.getWebContent(pool, {
      url: URL,
    });

  TestValidator.equals("url")(URL)(res.url);
  TestValidator.equals("content")("OK")(res.content);
};
