import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGmail } from "../../../../src/api/structures/connector/gmail/IGmail";

export const test_api_connector_gmail_label_createLabel = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGmail.ILabelOutput> =
    await api.functional.connector.gmail.label.createLabel(
      connection,
      typia.random<IGmail.ILabelInput>(),
    );
  typia.assert(output);
};
