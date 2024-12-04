import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleSheet } from "../../../../src/api/structures/connector/google_sheet/IGoogleSheet";

export const test_api_connector_google_sheet_worksheet_getWorkSheet = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleSheet.IGetWorkSheetOutput> =
    await api.functional.connector.google_sheet.worksheet.getWorkSheet(
      connection,
      typia.random<IGoogleSheet.IGetWorkSheetInput>(),
    );
  typia.assert(output);
};
