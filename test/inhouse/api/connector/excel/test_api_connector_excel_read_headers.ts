import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import { ExcelProvider } from "../../../../../src/providers/connector/excel/ExcelProvider";

export const test_api_connector_excel_read_headers = async (
  connection: CApi.IConnection,
) => {
  const file = await CApi.functional.connector.excel.rows.insertRows(
    connection,
    {
      sheetName: "TEST",
      data: ExcelProvider.transform([
        {
          이름: "홍길동",
          나이: 25,
          직업: "엔지니어",
          이메일: "hong@example.com",
        },
      ]),
    },
  );

  const headers =
    await CApi.functional.connector.excel.read.headers.readHeaders(connection, {
      fileUrl: file.fileUrl,
      sheetName: "TEST",
    });

  assert(headers.includes("이름"));
  assert(headers.includes("나이"));
  assert(headers.includes("직업"));
  assert(headers.includes("이메일"));
};
