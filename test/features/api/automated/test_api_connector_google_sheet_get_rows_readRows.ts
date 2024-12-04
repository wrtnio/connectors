import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleSheet } from "../../../../src/api/structures/connector/google_sheet/IGoogleSheet";

export const test_api_connector_google_sheet_get_rows_readRows = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleSheet.IReadGoogleSheetRowsOutput> =
    await api.functional.connector.google_sheet.get_rows.readRows(
      connection,
      typia.random<IGoogleSheet.IReadGoogleSheetRowsInput>(),
    );
  typia.assert(output);
};
