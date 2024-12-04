import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICsv } from "../../../../src/api/structures/connector/csv/ICsv";

export const test_api_connector_csv_csv_to_excel_csvToExcel = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ICsv.ICsvToExcelOutput> =
    await api.functional.connector.csv.csv_to_excel.csvToExcel(
      connection,
      typia.random<ICsv.ICsvToExcelInput>(),
    );
  typia.assert(output);
};
