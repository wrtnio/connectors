import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IReddit } from "../../../../src/api/structures/connector/reddit/IReddit";

export const test_api_connector_reddit_get_top_posts_getTopPosts = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IReddit.IGetTopPostsOutput> =
    await api.functional.connector.reddit.get_top_posts.getTopPosts(
      connection,
      typia.random<IReddit.IGetTopPostsInput>(),
    );
  typia.assert(output);
};
