import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGmail } from "../../../../src/api/structures/connector/gmail/IGmail";

export const test_api_connector_gmail_send = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGmail.ISendMailOutput> =
    await api.functional.connector.gmail.send(
      connection,
      typia.random<IGmail.ICreateMailInput>(),
    );
  typia.assert(output);
};
