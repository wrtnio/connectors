import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGmail } from "../../../../src/api/structures/connector/gmail/IGmail";

export const test_api_connector_gmail_get_findEmail = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGmail.IFindGmailOutput> =
    await api.functional.connector.gmail.get.findEmail(
      connection,
      typia.random<string>(),
      typia.random<IGmail.ISecret>(),
    );
  typia.assert(output);
};
