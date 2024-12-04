import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleSheet } from "../../../../src/api/structures/connector/google_sheet/IGoogleSheet";

export const test_api_connector_google_sheet_getHeaders = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleSheet.IReadGoogleSheetOutput> =
    await api.functional.connector.google_sheet.getHeaders(
      connection,
      typia.random<IGoogleSheet.IReadGoogleSheetHeadersInput>(),
    );
  typia.assert(output);
};
