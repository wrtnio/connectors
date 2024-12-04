import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IHancell } from "../../../../src/api/structures/connector/hancell/IHancell";

export const test_api_connector_hancell_sheet_upsertSheet = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IHancell.IUpsertSheetOutput> =
    await api.functional.connector.hancell.sheet.upsertSheet(
      connection,
      typia.random<IHancell.IUpsertSheetInput>(),
    );
  typia.assert(output);
};
