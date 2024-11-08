import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_reddit_get_hot_posts = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.reddit.get_hot_posts.getHotPosts(
    connection,
    {
      limit: 10,
      subreddit: "/r/programming",
      secretKey: ConnectorGlobal.env.REDDIT_TEST_SECRET,
    },
  );

  typia.validateEquals(res);
};
