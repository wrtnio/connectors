import typia from "typia";

import api from "../../../../src/api";
import type { IGoogleSheet } from "../../../../src/api/structures/connector/google_sheet/IGoogleSheet";

export const test_api_connector_google_sheet_append_appendGoogleSheet = async (
  connection: api.IConnection,
) => {
  const output =
    await api.functional.connector.google_sheet.append.appendGoogleSheet(
      connection,
      typia.random<IGoogleSheet.IAppendToSheetInput>(),
    );
  typia.assert(output);
};
