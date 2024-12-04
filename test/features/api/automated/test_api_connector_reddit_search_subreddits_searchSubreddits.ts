import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IReddit } from "../../../../src/api/structures/connector/reddit/IReddit";

export const test_api_connector_reddit_search_subreddits_searchSubreddits =
  async (connection: api.IConnection) => {
    const output: Primitive<IReddit.ISearchSubredditsOutput> =
      await api.functional.connector.reddit.search_subreddits.searchSubreddits(
        connection,
        typia.random<IReddit.ISearchSubredditsInput>(),
      );
    typia.assert(output);
  };
