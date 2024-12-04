import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IExcel } from "../../../../src/api/structures/connector/excel/IExcel";

export const test_api_connector_excel_worksheet_worksheetList = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IExcel.IWorksheetListOutput> =
    await api.functional.connector.excel.worksheet.worksheetList(
      connection,
      typia.random<IExcel.IGetWorksheetListInput>(),
    );
  typia.assert(output);
};
