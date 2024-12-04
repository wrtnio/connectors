import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleSheet } from "../../../../src/api/structures/connector/google_sheet/IGoogleSheet";

export const test_api_connector_google_sheet_create_createGoogleSheet = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleSheet.ICreateGoogleSheetOutput> =
    await api.functional.connector.google_sheet.create.createGoogleSheet(
      connection,
      typia.random<IGoogleSheet.ICreateGoogleSheetInput>(),
    );
  typia.assert(output);
};
