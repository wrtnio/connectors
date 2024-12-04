import typia from "typia";
import type { Format } from "typia/lib/tags/Format";

import api from "../../../../src/api";

export const test_api_connector_articles_remove = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.articles.remove(
    connection,
    typia.random<string & Format<"uuid">>(),
  );
  typia.assert(output);
};
