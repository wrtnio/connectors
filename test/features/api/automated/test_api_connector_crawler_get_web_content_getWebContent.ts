import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IWebCrawler } from "../../../../src/api/structures/connector/web_crawler/IWebCrawler";

export const test_api_connector_crawler_get_web_content_getWebContent = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IWebCrawler.IResponse> =
    await api.functional.connector.crawler.get_web_content.getWebContent(
      connection,
      typia.random<IWebCrawler.IRequest>(),
    );
  typia.assert(output);
};
