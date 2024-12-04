import typia from "typia";

import api from "../../../../src/api";
import type { IGmail } from "../../../../src/api/structures/connector/gmail/IGmail";

export const test_api_connector_gmail_label_removeLabelFromMail = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.gmail.label.removeLabelFromMail(
    connection,
    typia.random<string>(),
    typia.random<IGmail.IMailLabelOperationInput>(),
  );
  typia.assert(output);
};
