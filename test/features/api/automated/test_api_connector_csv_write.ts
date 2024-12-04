import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICsv } from "../../../../src/api/structures/connector/csv/ICsv";

export const test_api_connector_csv_write = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ICsv.IWriteOutput> =
    await api.functional.connector.csv.write(
      connection,
      typia.random<ICsv.IWriteInput>(),
    );
  typia.assert(output);
};
