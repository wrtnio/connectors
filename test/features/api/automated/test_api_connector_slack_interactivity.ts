import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_interactivity = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<any>> =
    await api.functional.connector.slack.interactivity(
      connection,
      typia.random<ISlack.Payload>(),
    );
  typia.assert(output);
};
