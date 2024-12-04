import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IExcel } from "../../../../src/api/structures/connector/excel/IExcel";

export const test_api_connector_excel_rows_upload_insertRowsByUpload = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IExcel.IExportExcelFileOutput> =
    await api.functional.connector.excel.rows.upload.insertRowsByUpload(
      connection,
      typia.random<IExcel.IInsertExcelRowByUploadInput>(),
    );
  typia.assert(output);
};
