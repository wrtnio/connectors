import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";
import type { MyPick } from "../../../../src/api/structures/types/MyPick";

export const test_api_connector_slack_postMessage_text_sendText = async (
  connection: api.IConnection,
) => {
  const output: Primitive<MyPick<ISlack.Message, "ts">> =
    await api.functional.connector.slack.postMessage.text.sendText(
      connection,
      typia.random<ISlack.IPostMessageInput>(),
    );
  typia.assert(output);
};
