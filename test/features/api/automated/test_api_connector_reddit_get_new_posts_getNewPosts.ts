import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IReddit } from "../../../../src/api/structures/connector/reddit/IReddit";

export const test_api_connector_reddit_get_new_posts_getNewPosts = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IReddit.IGetNewPostsOutput> =
    await api.functional.connector.reddit.get_new_posts.getNewPosts(
      connection,
      typia.random<IReddit.IGetNewPostsInput>(),
    );
  typia.assert(output);
};
