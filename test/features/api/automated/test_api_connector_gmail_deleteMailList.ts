import typia from "typia";

import api from "../../../../src/api";
import type { IGmail } from "../../../../src/api/structures/connector/gmail/IGmail";

export const test_api_connector_gmail_deleteMailList = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.gmail.deleteMailList(
    connection,
    typia.random<IGmail.IDeleteMailListInput>(),
  );
  typia.assert(output);
};
