import CApi from "@wrtn/connector-api/lib/index";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { randomUUID } from "crypto";
import typia from "typia";

export const test_api_connector_article_write = async (
  connection: CApi.IConnection,
) => {
  const article = await CApi.functional.connector.articles.write(
    {
      ...connection,
      headers: {
        "x-wrtn-application": "kakasoo",
        "x-wrtn-password": randomUUID(),
        "x-wrtn-uid": randomUUID(),
      } satisfies IExternalUser.ExternalUserIdentifier,
    },
    typia.random<IArticle.ICreate>(),
  );

  typia.assertEquals(article);
};
