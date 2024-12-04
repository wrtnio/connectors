import typia from "typia";
import type { Primitive } from "typia";
import type { Format } from "typia/lib/tags/Format";

import api from "../../../../src/api";
import type { IArticle } from "../../../../src/api/structures/connector/articles/IArticle";

export const test_api_connector_articles_sync_notion_syncToNotion = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IArticle.ISync.ToNotionOutput> =
    await api.functional.connector.articles.sync.notion.syncToNotion(
      connection,
      typia.random<string & Format<"uuid">>(),
      typia.random<IArticle.ISync.ToNotionInput>(),
    );
  typia.assert(output);
};
