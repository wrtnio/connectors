import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IReddit } from "../../../../src/api/structures/connector/reddit/IReddit";

export const test_api_connector_reddit_get_user_submitted_getUserSubmitted =
  async (connection: api.IConnection) => {
    const output: Primitive<IReddit.IGetUserSubmittedOutput> =
      await api.functional.connector.reddit.get_user_submitted.getUserSubmitted(
        connection,
        typia.random<IReddit.IGetUserSubmittedInput>(),
      );
    typia.assert(output);
  };
