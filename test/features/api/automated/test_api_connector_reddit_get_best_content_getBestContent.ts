import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IReddit } from "../../../../src/api/structures/connector/reddit/IReddit";

export const test_api_connector_reddit_get_best_content_getBestContent = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IReddit.IGetBestContentOutput> =
    await api.functional.connector.reddit.get_best_content.getBestContent(
      connection,
      typia.random<IReddit.IGetBestContentInput>(),
    );
  typia.assert(output);
};
