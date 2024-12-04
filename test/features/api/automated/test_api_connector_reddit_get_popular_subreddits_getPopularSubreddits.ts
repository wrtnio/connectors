import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IReddit } from "../../../../src/api/structures/connector/reddit/IReddit";

export const test_api_connector_reddit_get_popular_subreddits_getPopularSubreddits =
  async (connection: api.IConnection) => {
    const output: Primitive<IReddit.IGetPopularSubredditsOutput> =
      await api.functional.connector.reddit.get_popular_subreddits.getPopularSubreddits(
        connection,
        typia.random<IReddit.IGetPopularSubredditsInput>(),
      );
    typia.assert(output);
  };
