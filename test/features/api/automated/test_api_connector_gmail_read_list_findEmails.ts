import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGmail } from "../../../../src/api/structures/connector/gmail/IGmail";

export const test_api_connector_gmail_read_list_findEmails = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGmail.IFindGmailListOutput> =
    await api.functional.connector.gmail.read_list.findEmails(
      connection,
      typia.random<IGmail.IFindEmailListInput>(),
    );
  typia.assert(output);
};
