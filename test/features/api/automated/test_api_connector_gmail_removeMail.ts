import typia from "typia";

import api from "../../../../src/api";
import type { IGmail } from "../../../../src/api/structures/connector/gmail/IGmail";

export const test_api_connector_gmail_removeMail = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.gmail.removeMail(
    connection,
    typia.random<string>(),
    typia.random<IGmail.ISecret>(),
  );
  typia.assert(output);
};
