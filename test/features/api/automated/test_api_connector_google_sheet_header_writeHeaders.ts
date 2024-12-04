import typia from "typia";

import api from "../../../../src/api";
import type { IGoogleSheet } from "../../../../src/api/structures/connector/google_sheet/IGoogleSheet";

export const test_api_connector_google_sheet_header_writeHeaders = async (
  connection: api.IConnection,
) => {
  const output =
    await api.functional.connector.google_sheet.header.writeHeaders(
      connection,
      typia.random<IGoogleSheet.IWriteGoogleSheetHeadersInput>(),
    );
  typia.assert(output);
};
