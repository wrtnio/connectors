import typia from "typia";
import type { Primitive } from "typia";
import type { Format } from "typia/lib/tags/Format";

import api from "../../../../src/api";
import type { IArticle } from "../../../../src/api/structures/connector/articles/IArticle";

export const test_api_connector_articles_exports_notion_exportsToNotion =
  async (connection: api.IConnection) => {
    const output: Primitive<IArticle.IExport.ToNotionOutput> =
      await api.functional.connector.articles.exports.notion.exportsToNotion(
        connection,
        typia.random<string & Format<"uuid">>(),
        typia.random<IArticle.IExport.ToNotionInput>(),
      );
    typia.assert(output);
  };
