import typia, { random } from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IExcel } from "@wrtn/connector-api/lib/structures/connector/excel/IExcel";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_excel_create_file_witnout_sheet_name = async (
  connection: CApi.IConnection,
) => {
  const file = await CApi.functional.connector.excel.createSheets(connection, {
    sheetName: "TEST",
  });

  typia.assertEquals(file);
};

export const test_api_connector_excel_create_file_with_sheet_name = async (
  connection: CApi.IConnection,
) => {
  const file = await CApi.functional.connector.excel.createSheets(
    connection,
    {},
  );

  typia.assertEquals(file);
};

export const test_api_connector_excel_insert_rows_without_file_url = async (
  connection: CApi.IConnection,
) => {
  /**
   * insert rows
   */
  const data = {
    Identifier: random<string>(),
    "First name": random<string>(),
    "Last name": random<string>(),
  };

  const res = await CApi.functional.connector.excel.rows.insertRows(
    connection,
    {
      data: [data],
    },
  );

  typia.assertEquals(res);
};

export const test_api_connector_excel_insert_rows_with_file_url = async (
  connection: CApi.IConnection,
) => {
  const file = await CApi.functional.connector.excel.createSheets(connection, {
    sheetName: "TEST",
  });

  /**
   * insert rows
   */
  const data = {
    Identifier: random<string>(),
    "First name": random<string>(),
    "Last name": random<string>(),
  };

  const res = await CApi.functional.connector.excel.rows.insertRows(
    connection,
    {
      fileUrl: file.fileUrl,
      data: [data],
    },
  );

  typia.assert(res);
};

/**
 * 기존 테스트 코드
 *
 * @param connection
 */
export const test_api_connector_excel = async (
  connection: CApi.IConnection,
) => {
  /**
   * read worksheet list
   */
  const worksheetListInput: IExcel.IGetWorksheetListInput = {
    fileUrl: `https://${ConnectorGlobal.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/connector-test.xlsx`,
  };
  const worksheetListOutput =
    await CApi.functional.connector.excel.worksheet.worksheetList(
      connection,
      worksheetListInput,
    );
  typia.assertEquals<IExcel.IWorksheetListOutput>(worksheetListOutput);

  /**
   * insert rows
   */
  const data = {
    Identifier: random<string>(),
    "First name": random<string>(),
    "Last name": random<string>(),
  };
  const insertRowsInput: IExcel.IInsertExcelRowInput = {
    data: [data],
  };
  const insertRowsOutput =
    await CApi.functional.connector.excel.rows.insertRows(
      connection,
      insertRowsInput,
    );
  typia.assert(insertRowsOutput);

  /**
   * read rows data
   */
  const readExcelInput = {
    fileUrl: `https://${ConnectorGlobal.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/connector-test.xlsx`,
    sheetName: worksheetListOutput.data[0].sheetName,
  };
  const readExcelOutput = await CApi.functional.connector.excel.read(
    connection,
    readExcelInput,
  );
  typia.assertEquals<IExcel.IReadExcelOutput>(readExcelOutput);
};
