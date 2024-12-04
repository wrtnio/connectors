import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IReddit } from "../../../../src/api/structures/connector/reddit/IReddit";

export const test_api_connector_reddit_get_comments_getComments = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IReddit.IGetArticleAndCommentsOutput> =
    await api.functional.connector.reddit.get_comments.getComments(
      connection,
      typia.random<IReddit.IGetCommentsInput>(),
    );
  typia.assert(output);
};
