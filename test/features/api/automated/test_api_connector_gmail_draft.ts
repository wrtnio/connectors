import typia from "typia";

import api from "../../../../src/api";
import type { IGmail } from "../../../../src/api/structures/connector/gmail/IGmail";

export const test_api_connector_gmail_draft = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.gmail.draft(
    connection,
    typia.random<IGmail.ICreateMailInput>(),
  );
  typia.assert(output);
};
