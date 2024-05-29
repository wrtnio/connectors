import typia, { random } from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IExcel } from "@wrtn/connector-api/lib/structures/connector/excel/IExcel";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_excel = async (
  connection: CApi.IConnection,
) => {
  // /**
  //  * create new file
  //  */
  // const createExcelInput = {
  //   name: 'connector-test-test-test'
  // }
  // const createExcelOutput = await CApi.functional.connector.excel.create(connection, createExcelInput);
  // typia.assertEquals<IExcel.ICreateExcelOutput>(createExcelOutput);

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
