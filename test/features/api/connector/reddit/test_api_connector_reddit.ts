import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_reddit_get_hot_posts = async (
  connection: CApi.IConnection,
) => {
  const firstPage =
    await CApi.functional.connector.reddit.get_hot_posts.getHotPosts(
      connection,
      {
        limit: 1,
        subreddit: "r/programming",
        secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
      },
    );
  typia.validateEquals(firstPage);

  const secondPage =
    await CApi.functional.connector.reddit.get_hot_posts.getHotPosts(
      connection,
      {
        limit: 1,
        subreddit: "r/programming",
        ...(firstPage.after && { after: firstPage.after }), // 다음 페이지가 존재하는지를 확인한다.
        secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
      },
    );
  typia.validateEquals(secondPage);
  assert.notDeepStrictEqual(firstPage, secondPage);
};

export const test_api_connector_reddit_get_new_posts = async (
  connection: CApi.IConnection,
) => {
  const firstPage =
    await CApi.functional.connector.reddit.get_new_posts.getNewPosts(
      connection,
      {
        limit: 1,
        subreddit: "r/programming",
        secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
      },
    );
  typia.validateEquals(firstPage);

  const secondPage =
    await CApi.functional.connector.reddit.get_new_posts.getNewPosts(
      connection,
      {
        limit: 1,
        subreddit: "r/programming",
        ...(firstPage.after && { after: firstPage.after }), // 다음 페이지가 존재하는지를 확인한다.
        secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
      },
    );
  typia.validateEquals(secondPage);
  assert.notDeepStrictEqual(firstPage, secondPage);
};

export const test_api_connector_reddit_get_top_posts = async (
  connection: CApi.IConnection,
) => {
  const firstPage =
    await CApi.functional.connector.reddit.get_top_posts.getTopPosts(
      connection,
      {
        limit: 1,
        subreddit: "r/programming",
        secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
      },
    );
  typia.validateEquals(firstPage);

  const secondPage =
    await CApi.functional.connector.reddit.get_top_posts.getTopPosts(
      connection,
      {
        limit: 1,
        subreddit: "r/programming",
        ...(firstPage.after && { after: firstPage.after }), // 다음 페이지가 존재하는지를 확인한다.
        secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
      },
    );
  typia.validateEquals(secondPage);
  assert.notDeepStrictEqual(firstPage, secondPage);
};

export const test_api_connector_reddit_get_comments_of_top_posts_about_programming =
  async (connection: CApi.IConnection) => {
    const topPost =
      await CApi.functional.connector.reddit.get_top_posts.getTopPosts(
        connection,
        {
          limit: 5,
          subreddit: "r/programming",
          secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
        },
      );

    for await (const post of topPost.children) {
      const firstPage =
        await CApi.functional.connector.reddit.get_comments.getComments(
          connection,
          {
            limit: 100,
            article: post.data.id,
            subreddit: "r/programming",
            secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
          },
        );
      typia.validateEquals(firstPage);
    }
  };

export const test_api_connector_reddit_get_comments_of_top_posts_about_korean =
  async (connection: CApi.IConnection) => {
    const topPost =
      await CApi.functional.connector.reddit.get_top_posts.getTopPosts(
        connection,
        {
          limit: 5,
          subreddit: "r/korean",
          secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
        },
      );

    for await (const post of topPost.children) {
      const firstPage =
        await CApi.functional.connector.reddit.get_comments.getComments(
          connection,
          {
            limit: 100,
            article: post.data.id,
            subreddit: "r/korean",
            secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
          },
        );
      typia.validateEquals(firstPage);
    }
  };

export const test_api_connector_reddit_get_comments_of_top_posts_about_gaming =
  async (connection: CApi.IConnection) => {
    const topPost =
      await CApi.functional.connector.reddit.get_top_posts.getTopPosts(
        connection,
        {
          limit: 5,
          subreddit: "r/gaming",
          secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
        },
      );

    for await (const post of topPost.children) {
      const firstPage =
        await CApi.functional.connector.reddit.get_comments.getComments(
          connection,
          {
            limit: 100,
            article: post.data.id,
            subreddit: "r/gaming",
            secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
          },
        );
      typia.validateEquals(firstPage);
    }
  };
