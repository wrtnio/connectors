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

export const test_api_connector_reddit_get_user_about = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.reddit.get_user_about.getUserAbout(
      connection,
      {
        username: "Any-Statement-9078",
        secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
      },
    );

  typia.assertEquals(res);
};

export const test_api_connector_reddit_get_multiple_user_about = async (
  connection: CApi.IConnection,
) => {
  const topPost =
    await CApi.functional.connector.reddit.get_top_posts.getTopPosts(
      connection,
      {
        limit: 1,
        subreddit: "r/gaming",
        secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
      },
    );

  const comments =
    await CApi.functional.connector.reddit.get_comments.getComments(
      connection,
      {
        limit: 5,
        article: topPost.children[0].data.id,
        subreddit: "r/gaming",
        secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
      },
    );

  for (const child of comments.comments.children) {
    const author = child.kind === "t1" ? child.data.author ?? "" : "";
    if (author) {
      const res =
        await CApi.functional.connector.reddit.get_user_about.getUserAbout(
          connection,
          {
            username: author,
            secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
          },
        );

      typia.assertEquals(res);
    }
  }
};

export const test_api_connector_reddit_get_user_submmited = async (
  connection: CApi.IConnection,
) => {
  const topPost =
    await CApi.functional.connector.reddit.get_top_posts.getTopPosts(
      connection,
      {
        limit: 5,
        subreddit: "r/gaming",
        secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
      },
    );

  for (const child of topPost.children) {
    const username = child.data.author;
    const res =
      await CApi.functional.connector.reddit.get_user_submitted.getUserSubmitted(
        connection,
        {
          username: username as string,
          secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
        },
      );

    typia.assertEquals(res);
  }
};

export const test_api_connector_reddit_get_user_comments = async (
  connection: CApi.IConnection,
) => {
  const topPost =
    await CApi.functional.connector.reddit.get_top_posts.getTopPosts(
      connection,
      {
        limit: 5,
        subreddit: "r/gaming",
        secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
      },
    );

  for (const child of topPost.children) {
    const username = child.data.author;
    const res =
      await CApi.functional.connector.reddit.get_user_comments.getUserComments(
        connection,
        {
          username: username as string,
          secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
        },
      );

    typia.assertEquals(res);
  }
};

export const test_api_connector_reddit_search_subreddits = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.reddit.search_subreddits.searchSubreddits(
      connection,
      {
        q: "nestia",
        secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
      },
    );

  typia.assertEquals(res);
};
