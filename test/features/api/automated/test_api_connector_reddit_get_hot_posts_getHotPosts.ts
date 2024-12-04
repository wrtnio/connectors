import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IReddit } from "../../../../src/api/structures/connector/reddit/IReddit";

export const test_api_connector_reddit_get_hot_posts_getHotPosts = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IReddit.IGetHotPostsOutput> =
    await api.functional.connector.reddit.get_hot_posts.getHotPosts(
      connection,
      typia.random<IReddit.IGetHotPostsInput>(),
    );
  typia.assert(output);
};
