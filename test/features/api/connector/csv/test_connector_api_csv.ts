import typia from "typia";

import CApi from "@wrtn/connector-api";
import { ICsv } from "@wrtn/connector-api/lib/structures/connector/csv/ICsv";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_connector_api_csv = async (connection: CApi.IConnection) => {
  /**
   * read csv file from s3
   */
  const readCsvInput = {
    s3Url: `http://localhost:${ConnectorGlobal.env.FAKE_S3_PORT}/a.csv`,
    delimiter: ",",
  };
  const result = await CApi.functional.connector.csv.read(
    connection,
    readCsvInput,
  );
  typia.assertEquals<ICsv.IReadOutput>(result);

  /**
   * write csv file to s3
   */
  const headers = Object.keys(result.data[0]);
  const values = headers.reduce((obj: { [key: string]: string }, header) => {
    obj[header] = "connector-test";
    return obj;
  }, {});
  const writeCsvInput = {
    fileName: "connector-test.csv",
    delimiter: ";",
    values: [values],
  };

  const writeResult = await CApi.functional.connector.csv.write(
    connection,
    writeCsvInput,
  );
  typia.assertEquals(writeResult);

  // /**
  //  * convert csv to excel
  //  */
  // const csvToExcelInput = {
  //   s3Url: `https://${ConnectorGlobal.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/a.csv`,
  //   delimiter: ";",
  // };
  // const csvToExcelResult =
  //   await CApi.functional.connector.csv.csv_to_excel.csvToExcel(
  //     connection,
  //     csvToExcelInput,
  //   );
  // typia.assertEquals<ICsv.ICsvToExcelOutput>(csvToExcelResult);
};
