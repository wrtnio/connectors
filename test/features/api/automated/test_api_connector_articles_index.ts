import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IPage } from "../../../../src/api/structures/common/IPage";
import type { IArticle } from "../../../../src/api/structures/connector/articles/IArticle";

export const test_api_connector_articles_index = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IPage<IArticle.ISummary>> =
    await api.functional.connector.articles.index(
      connection,
      typia.random<IArticle.IRequest>(),
    );
  typia.assert(output);
};
