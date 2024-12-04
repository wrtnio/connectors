import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IReddit } from "../../../../src/api/structures/connector/reddit/IReddit";

export const test_api_connector_reddit_get_subreddit_about_getSubredditAbout =
  async (connection: api.IConnection) => {
    const output: Primitive<IReddit.IGetSubredditAboutOutput> =
      await api.functional.connector.reddit.get_subreddit_about.getSubredditAbout(
        connection,
        typia.random<IReddit.IGetSubredditAboutInput>(),
      );
    typia.assert(output);
  };
