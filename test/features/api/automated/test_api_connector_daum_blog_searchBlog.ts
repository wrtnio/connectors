import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IDaum } from "../../../../src/api/structures/connector/daum/IDaum";

export const test_api_connector_daum_blog_searchBlog = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IDaum.IBlogDaumOutput> =
    await api.functional.connector.daum.blog.searchBlog(
      connection,
      typia.random<IDaum.ISearchDaumInput>(),
    );
  typia.assert(output);
};
