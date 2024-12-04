import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { INaver } from "../../../../src/api/structures/connector/naver/INaver";

export const test_api_connector_naver_blog_blogList = async (
  connection: api.IConnection,
) => {
  const output: Primitive<INaver.IBlogNaverOutput> =
    await api.functional.connector.naver.blog.blogList(
      connection,
      typia.random<INaver.INaverKeywordInput>(),
    );
  typia.assert(output);
};
