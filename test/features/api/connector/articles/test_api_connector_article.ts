import CApi from "@wrtn/connector-api/lib/index";
import { IEntity } from "@wrtn/connector-api/lib/structures/common/IEntity";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { IArticle } from "@wrtn/connector-api/lib/structures/connector/articles/IArticle";
import { IArticleExport } from "@wrtn/connector-api/lib/structures/connector/articles/IArticleExport";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import assert, { deepStrictEqual } from "assert";
import { randomUUID } from "crypto";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { ErrorUtil } from "../../../../../src/utils/ErrorUtil";

const password = randomUUID();
const uid = randomUUID();

const connectionWithSameUser = (connection: CApi.IConnection) => ({
  ...connection,
  headers: {
    "x-wrtn-user-application": "kakasoo",
    "x-wrtn-user-password": password,
    "x-wrtn-user-uid": uid,
  } satisfies IExternalUser.ExternalUserIdentifier,
});

export const test_api_connector_article_write = async (
  connection: CApi.IConnection,
) => {
  const article = await CApi.functional.connector.articles.write(
    connectionWithSameUser(connection),
    typia.random<StrictOmit<IArticle.ICreate, "files">>(),
  );

  typia.assertEquals(article);
  return article;
};

export const test_api_connector_article_write_with_files = async (
  connection: CApi.IConnection,
) => {
  const ICreateFile = {
    extension: "png",
    name: "image",
    url: "http://test.png",
  } as const;

  const article = await CApi.functional.connector.articles.write(
    connectionWithSameUser(connection),
    {
      ...typia.random<IArticle.ICreate>(),
      files: [ICreateFile],
    },
  );

  typia.assertEquals(article);
  const createdFile = article.snapshots[article.snapshots.length - 1].files[0];

  Object.entries(ICreateFile).forEach(([key, value]) => {
    assert({ ...createdFile }[key] === value);
  });
};

export const test_api_connector_article_update = async (
  connection: CApi.IConnection,
  article?: IEntity,
) => {
  const target =
    article ?? (await test_api_connector_article_write(connection));

  const snapshot = await CApi.functional.connector.articles.update(
    connectionWithSameUser(connection),
    target.id,
    typia.random<IArticle.IUpdate>(),
  );

  typia.assertEquals(snapshot);
  return snapshot;
};

export const test_api_connector_article_update_with_same_properties = async (
  connection: CApi.IConnection,
) => {
  const article = await test_api_connector_article_write(connection);
  const lastSnapshot = article.snapshots[0];
  const snapshot = await CApi.functional.connector.articles.update(
    connectionWithSameUser(connection),
    article.id,
    { props: lastSnapshot },
  );

  typia.assertEquals(snapshot);
  assert(lastSnapshot.id, snapshot.id);
  deepStrictEqual(lastSnapshot, snapshot);
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
            "x-wrtn-user-application": randomUUID(), // application이 다른 경우
            "x-wrtn-user-password": password,
            "x-wrtn-user-uid": uid,
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
          "x-wrtn-user-application": "kakasoo",
          "x-wrtn-user-password": randomUUID(), // password이 다른 경우
          "x-wrtn-user-uid": uid,
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
          "x-wrtn-user-application": "kakasoo",
          "x-wrtn-user-password": password,
          "x-wrtn-user-uid": randomUUID(), // uid이 다른 경우
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
        "x-wrtn-user-application": "kakasoo",
        "x-wrtn-user-password": password,
        "x-wrtn-user-uid": randomUUID(),
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
        "x-wrtn-user-application": "kakasoo",
        "x-wrtn-user-password": password,
        "x-wrtn-user-uid": randomUUID(),
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

export const test_api_connector_article_write_and_index_order_by = async (
  connection: CApi.IConnection,
) => {
  await test_api_connector_article_write(connection);
  const articles = await CApi.functional.connector.articles.index(
    connectionWithSameUser(connection),
    {
      limit: 100,
      page: 1,
      search: {},
      sort: [
        "+created_at",
        "+snapshot.created_at",
        "+snapshot.title",
        "-created_at",
        "-snapshot.created_at",
        "-snapshot.title",
      ],
    },
  );

  typia.assertEquals(articles);
  typia.assert(articles.data.length >= 1);
  typia.assert(articles.pagination.current >= 1);
  typia.assert(articles.pagination.limit === 100);
  typia.assert(articles.pagination.records === 1);
  typia.assert(articles.pagination.pages >= 1);
};

export const test_api_connector_article_write_and_index_query_condition =
  async (connection: CApi.IConnection) => {
    const article = await test_api_connector_article_write(connection);
    const articles = await CApi.functional.connector.articles.index(
      connectionWithSameUser(connection),
      {
        limit: 100,
        page: 1,
        search: {
          ids: [article.id],
          snapshot: {
            format: "md",
            title: article.snapshots[0].title,
          },
        },
        sort: [
          "+created_at",
          "+snapshot.created_at",
          "+snapshot.title",
          "-created_at",
          "-snapshot.created_at",
          "-snapshot.title",
        ],
      },
    );

    typia.assertEquals(articles);
    typia.assert(articles.data.length === 1);
  };

export const test_api_connector_article_at = async (
  connection: CApi.IConnection,
) => {
  const articles = await CApi.functional.connector.articles.index(
    connectionWithSameUser(connection),
    {
      limit: 100,
      page: 1,
      search: {},
      sort: [],
    },
  );

  if (articles.data.length === 0) {
    throw new Error("Cannot test because data length is zero.");
  }

  for await (const article of articles.data) {
    const res = await CApi.functional.connector.articles.at(
      connectionWithSameUser(connection),
      article.id,
    );

    typia.assertEquals(res);
  }

  const otherUserConnection = {
    ...connection,
    headers: {
      "x-wrtn-user-application": "kakasoo",
      "x-wrtn-user-password": password,
      "x-wrtn-user-uid": randomUUID(),
    },
  } as const;

  // 다른 사람의 게시글을 조회하고자 하는 경우에는 불가능해야 한다.
  try {
    await CApi.functional.connector.articles.at(
      otherUserConnection,
      articles.data[0].id,
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

// 노션으로 내보내기, 함수명에는 `notion` 키워드를 제외하여 테스트가 중복되지 않게 한다.
export const test_api_connector_article_exports_1 = async (
  connection: CApi.IConnection,
  article?: IArticle,
) => {
  const parentPageId = "14fab4840d3380e99785e2d7866be6ca" as const; // 테스트 용 페이지
  const target =
    article ?? (await test_api_connector_article_write(connection));

  const exported =
    await CApi.functional.connector.articles.exports.notion.exportsToNotion(
      connectionWithSameUser(connection),
      target.id,
      {
        notion: {
          secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
          parentPageId,
        },
        snapshot: {
          id: target.snapshots[target.snapshots.length - 1]?.id as string,
        },
      },
    );

  typia.assertEquals(exported);

  const exportedArticle = await CApi.functional.connector.articles.at(
    connectionWithSameUser(connection),
    target.id,
  );

  const information = exportedArticle.snapshots[
    target.snapshots.length - 1
  ].bbs_article_exports.find((el) => {
    return el.uid === exported.notion.id && el.url === exported.notion.link;
  });

  typia.assertEquals<IArticleExport>(information);

  const response = await CApi.functional.connector.articles.at(
    connectionWithSameUser(connection),
    target.id,
  );

  assert(response.snapshots.length === 1);
  assert(response.snapshots[0].bbs_article_exports.length === 1);

  return response;
};

// 노션으로 내보내기, 함수명에는 `google_docs` 키워드를 제외하여 테스트가 중복되지 않게 한다.
export const test_api_connector_article_exports_2 = async (
  connection: CApi.IConnection,
  article?: IArticle,
) => {
  const target =
    article ?? (await test_api_connector_article_write(connection));

  const exported =
    await CApi.functional.connector.articles.exports.google_docs.exportsToGoogleDocs(
      connectionWithSameUser(connection),
      target.id,
      {
        google_docs: {
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        },
        snapshot: {
          id: target.snapshots[target.snapshots.length - 1]?.id as string,
        },
      },
    );

  typia.assertEquals(exported);

  const exportedArticle = await CApi.functional.connector.articles.at(
    connectionWithSameUser(connection),
    target.id,
  );

  const information = exportedArticle.snapshots[
    target.snapshots.length - 1
  ].bbs_article_exports.find((el) => {
    return (
      el.uid === exported.google_docs.id && el.url === exported.google_docs.link
    );
  });

  typia.assertEquals<IArticleExport>(information);

  const response = await CApi.functional.connector.articles.at(
    connectionWithSameUser(connection),
    target.id,
  );

  assert(response.snapshots.length === 1);
  assert(response.snapshots[0].bbs_article_exports.length === 1);

  return response;
};

export const test_api_connector_article_sync_by_snapshot_id_1 = async (
  connection: CApi.IConnection,
) => {
  // 생성 후 내보내기
  const target = await test_api_connector_article_exports_1(connection);

  // 업데이트하여 새 스냅샷을 추가
  const updated = await test_api_connector_article_update(connection, target);

  // 전체 exports에 대한 내보내기 시도
  const from = target.snapshots[0].id as string;
  const to = updated.id as string;

  // from에서 to로 이동시키는 것이기 때문에 두 snapshot 아이디는 달라야 한다.
  assert.notEqual(from, to);

  const res = await CApi.functional.connector.articles.sync.notion.syncToNotion(
    connectionWithSameUser(connection),
    target.id,
    {
      notion: {
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
      },
      snapshot: {
        from,
        to,
      },
    },
  );
  typia.assertEquals(res);

  // 최종적으로 어떤 스냅샷이 exports를 가지고 있는지 본다.
  const snapshot = res.article.snapshots.find(
    (el) => el.bbs_article_exports.length,
  );
  assert(snapshot?.id === to);
};

export const test_api_connector_article_sync_by_snapshot_id_2 = async (
  connection: CApi.IConnection,
) => {
  // 생성 후 내보내기
  const target = await test_api_connector_article_exports_2(connection);

  // 업데이트하여 새 스냅샷을 추가
  const updated = await test_api_connector_article_update(connection, target);

  // 전체 exports에 대한 내보내기 시도
  const from = target.snapshots[0].id as string;
  const to = updated.id as string;

  // from에서 to로 이동시키는 것이기 때문에 두 snapshot 아이디는 달라야 한다.
  assert.notEqual(from, to);

  const res =
    await CApi.functional.connector.articles.sync.google_docs.syncToGoogleDocs(
      connectionWithSameUser(connection),
      target.id,
      {
        google_docs: {
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        },
        snapshot: {
          from,
          to,
        },
      },
    );
  typia.assertEquals(res);

  // 최종적으로 어떤 스냅샷이 exports를 가지고 있는지 본다.
  const snapshot = res.article.snapshots.find(
    (el) => el.bbs_article_exports.length,
  );

  assert(snapshot?.id === to);
};
