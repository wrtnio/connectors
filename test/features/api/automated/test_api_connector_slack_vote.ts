import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_vote = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ISlack.IHoldVoteOutput> =
    await api.functional.connector.slack.vote(
      connection,
      typia.random<ISlack.IHoldVoteInput>(),
    );
  typia.assert(output);
};
