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
