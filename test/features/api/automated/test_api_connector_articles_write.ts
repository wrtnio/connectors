import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IArticle } from "../../../../src/api/structures/connector/articles/IArticle";
import type { StrictOmit } from "../../../../src/api/structures/types/strictOmit";

export const test_api_connector_articles_write = async (
  connection: api.IConnection,
) => {
  const output: Primitive<
    StrictOmit<IArticle<IArticle.ISnapshot>, "password">
  > = await api.functional.connector.articles.write(
    connection,
    typia.random<IArticle.ICreate>(),
  );
  typia.assert(output);
};
