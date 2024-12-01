import CApi from "@wrtn/connector-api/lib/index";
import type { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { TestValidator } from "@nestia/e2e";

export const test_api_connector_web_crawler_get_content = async (
  pool: CApi.IConnection,
) => {
  const URL = "https://ohou.se/productions/770267/selling";
  const res: IWebCrawler.IResponse =
    await CApi.functional.connector.crawler.get_web_content.getWebContent(
      pool,
      {
        url: URL,
        rawContent: false,
        pagination: {
          followNextPage: true,
          followNextPageCount: 10,
        },
      },
    );

  console.log(JSON.stringify(res));
  // TestValidator.equals("url")(URL)(res.url);
  // TestValidator.equals("content")("OK")(res.content);
};
