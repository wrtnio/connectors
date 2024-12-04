import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGmail } from "../../../../src/api/structures/connector/gmail/IGmail";

export const test_api_connector_gmail_reply = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGmail.ISendMailOutput> =
    await api.functional.connector.gmail.reply(
      connection,
      typia.random<string>(),
      typia.random<IGmail.IReplyInput>(),
    );
  typia.assert(output);
};
