import CApi from "@wrtn/connector-api/lib/index";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticles";
import { deepStrictEqual } from "assert";
import { randomUUID } from "crypto";
import typia from "typia";
import { ErrorUtil } from "../../../../../src/utils/ErrorUtil";

const password = randomUUID();
const uid = randomUUID();

const connectionWithSameUser = (connection: CApi.IConnection) => ({
  ...connection,
  headers: {
    "x-wrtn-application": "kakasoo",
    "x-wrtn-password": password,
    "x-wrtn-uid": uid,
  } satisfies IExternalUser.ExternalUserIdentifier,
});

export const test_api_connector_article_write = async (
  connection: CApi.IConnection,
) => {
  const article = await CApi.functional.connector.articles.write(
    connectionWithSameUser(connection),
    typia.random<IArticle.ICreate>(),
  );

  typia.assertEquals(article);
  return article;
};

export const test_api_connector_article_update = async (
  connection: CApi.IConnection,
) => {
  const article = await test_api_connector_article_write(connection);
  const snapshot = await CApi.functional.connector.articles.update(
    connectionWithSameUser(connection),
    article.id,
    typia.random<IArticle.IUpdate>(),
  );

  typia.assertEquals(snapshot);
};

export const test_api_connector_article_update_with_invalid_application =
  async (connection: CApi.IConnection) => {
    try {
      const article = await test_api_connector_article_write(connection);
      // invalid_application이라는 용어가 성립할 수 없으며, application이 다른 경우는 고유한 유저일 뿐이다.
      // 따라서 해당 유저는 생성이 됨이 옳지만 수정 단계에서는 작성자가 다르므로 수정할 수 없다.
      await CApi.functional.connector.articles.update(
        {
          ...connection,
          headers: {
            "x-wrtn-application": randomUUID(), // application이 다른 경우
            "x-wrtn-password": password,
            "x-wrtn-uid": uid,
          },
        },
        article.id,
        typia.random<IArticle.IUpdate>(),
      );

      throw new Error("This test have to be failed.");
    } catch (err) {
      interface Error {
        message: "This article is not yours.";
        error: "Forbidden";
        statusCode: 403;
      }

      typia.assert<Error>((ErrorUtil.toJSON(err) as any).message);
    }
  };

export const test_api_connector_article_update_with_invalid_password = async (
  connection: CApi.IConnection,
) => {
  try {
    const article = await test_api_connector_article_write(connection);
    await CApi.functional.connector.articles.update(
      {
        ...connection,
        headers: {
          "x-wrtn-application": "kakasoo",
          "x-wrtn-password": randomUUID(), // password이 다른 경우
          "x-wrtn-uid": uid,
        },
      },
      article.id,
      typia.random<IArticle.IUpdate>(),
    );

    throw new Error("This test have to be failed.");
  } catch (err) {
    interface Error {
      message: "Invalid password.";
      error: "Forbidden";
      statusCode: 403;
    }

    typia.assert<Error>((ErrorUtil.toJSON(err) as any).message);
  }
};

export const test_api_connector_article_update_with_invalid_uid = async (
  connection: CApi.IConnection,
) => {
  try {
    const article = await test_api_connector_article_write(connection);
    await CApi.functional.connector.articles.update(
      {
        ...connection,
        headers: {
          "x-wrtn-application": "kakasoo",
          "x-wrtn-password": password,
          "x-wrtn-uid": randomUUID(), // uid이 다른 경우
        },
      },
      article.id,
      typia.random<IArticle.IUpdate>(),
    );

    throw new Error("This test have to be failed.");
  } catch (err) {
    interface Error {
      message: "This article is not yours.";
      error: "Forbidden";
      statusCode: 403;
    }

    typia.assert<Error>((ErrorUtil.toJSON(err) as any).message);
  }
};

export const test_api_connector_article_remove = async (
  connection: CApi.IConnection,
) => {
  const article = await test_api_connector_article_write(connection);
  const res = await CApi.functional.connector.articles.remove(
    connectionWithSameUser(connection),
    article.id,
  );

  typia.assertEquals(res);
};

export const test_api_connector_article_index = async (
  connection: CApi.IConnection,
) => {
  const articles = await CApi.functional.connector.articles.index(
    {
      ...connection,
      headers: {
        "x-wrtn-application": "kakasoo",
        "x-wrtn-password": password,
        "x-wrtn-uid": randomUUID(),
      },
    },
    {
      limit: 100,
      page: 1,
      search: {},
      sort: [],
    },
  );

  typia.assertEquals(articles);
  typia.assert(articles.data.length === 0);
  typia.assert(articles.pagination.current === 1);
  typia.assert(articles.pagination.limit === 100);
  typia.assert(articles.pagination.records === 0);
  typia.assert(articles.pagination.pages === 0);
};

export const test_api_connector_article_write_and_index = async (
  connection: CApi.IConnection,
) => {
  await test_api_connector_article_write(connection);
  const articles = await CApi.functional.connector.articles.index(
    connectionWithSameUser(connection),
    {
      limit: 100,
      page: 1,
      search: {},
      sort: [],
    },
  );

  typia.assertEquals(articles);
  typia.assert(articles.data.length >= 1);
  typia.assert(articles.pagination.current >= 1);
  typia.assert(articles.pagination.limit === 100);
  typia.assert(articles.pagination.records === 1);
  typia.assert(articles.pagination.pages >= 1);
};

export const test_api_connector_article_index_only_can_view_user_owen_articles =
  async (connection: CApi.IConnection) => {
    const otherUserConnection = {
      ...connection,
      headers: {
        "x-wrtn-application": "kakasoo",
        "x-wrtn-password": password,
        "x-wrtn-uid": randomUUID(),
      },
    } as const;

    const before = await CApi.functional.connector.articles.index(
      otherUserConnection,
      {
        limit: 100,
        page: 1,
        search: {},
        sort: [],
      },
    );

    await test_api_connector_article_write(connection);
    const after = await CApi.functional.connector.articles.index(
      otherUserConnection,
      {
        limit: 100,
        page: 1,
        search: {},
        sort: [],
      },
    );

    deepStrictEqual(before, after);
  };
