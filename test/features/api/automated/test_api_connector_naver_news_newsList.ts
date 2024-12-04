import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INaver } from "../../../../src/api/structures/connector/naver/INaver";

export const test_api_connector_naver_news_newsList = async (
  connection: api.IConnection,
) => {
  const output: Primitive<INaver.INewsNaverOutput> =
    await api.functional.connector.naver.news.newsList(
      connection,
      typia.random<INaver.INaverKeywordInput>(),
    );
  typia.assert(output);
};
