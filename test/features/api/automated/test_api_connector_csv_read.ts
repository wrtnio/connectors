import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICsv } from "../../../../src/api/structures/connector/csv/ICsv";

export const test_api_connector_csv_read = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ICsv.IReadOutput> =
    await api.functional.connector.csv.read(
      connection,
      typia.random<ICsv.IReadInput>(),
    );
  typia.assert(output);
};
