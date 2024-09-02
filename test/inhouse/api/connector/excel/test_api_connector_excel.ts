import typia, { random } from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IExcel } from "@wrtn/connector-api/lib/structures/connector/excel/IExcel";

import { deepStrictEqual } from "assert";
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

// 이전 실패 케이스에 대한 테스트 코드 추가
export const test_api_connector_excel_insert_row_fail_case_1 = async (
  connection: CApi.IConnection,
) => {
  const file = await CApi.functional.connector.excel.createSheets(connection, {
    sheetName: "TEST",
  });

  const data = [
    {
      이름: "홍길동",
      나이: 25,
      직업: "엔지니어",
      이메일: "hong@example.com",
    },
  ];

  const res = await CApi.functional.connector.excel.rows.insertRows(
    connection,
    {
      fileUrl: file.fileUrl,
      sheetName: "TEST",
      data,
    },
  );

  typia.assert(res);
};

// 이전 실패 케이스에 대한 테스트 코드 추가
export const test_api_connector_excel_insert_row_fail_case_2 = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.excel.rows.insertRows(
    connection,
    {
      sheetName: "Sheet1",
      data: [
        {
          AirlineName: "Air Mock",
          FlightNumber: "AM1234",
          DepartureTime: "08:00",
          ArrivalTime: "10:00",
          Status: "On Time",
        },
        {
          AirlineName: "Sky High",
          FlightNumber: "SH5678",
          DepartureTime: "09:30",
          ArrivalTime: "11:30",
          Status: "Delayed",
        },
        {
          AirlineName: "Cloud Airlines",
          FlightNumber: "CA9101",
          DepartureTime: "12:00",
          ArrivalTime: "14:00",
          Status: "Cancelled",
        },
        {
          AirlineName: "Jet Setters",
          FlightNumber: "JS2345",
          DepartureTime: "15:15",
          ArrivalTime: "17:15",
          Status: "On Time",
        },
        {
          AirlineName: "Fly Fast",
          FlightNumber: "FF6789",
          DepartureTime: "18:45",
          ArrivalTime: "20:45",
          Status: "On Time",
        },
      ],
    },
  );

  typia.assert(res);
};

// 이전 실패 케이스에 대한 테스트 코드 추가, 2번에 나눠서 저장한 경우 누적이 잘 되는지를 검증
export const test_api_connector_excel_insert_row_fail_case_3 = async (
  connection: CApi.IConnection,
) => {
  const first = await CApi.functional.connector.excel.rows.insertRows(
    connection,
    {
      sheetName: "Sheet1",
      data: [
        {
          AirlineName: "Air Mock",
          FlightNumber: "AM1234",
          DepartureTime: "08:00",
          ArrivalTime: "10:00",
          Status: "On Time",
        },
      ],
    },
  );

  const second = await CApi.functional.connector.excel.rows.insertRows(
    connection,
    {
      fileUrl: first.fileUrl,
      sheetName: "Sheet1",
      data: [
        {
          AirlineName: "Sky High",
          FlightNumber: "SH5678",
          DepartureTime: "09:30",
          ArrivalTime: "11:30",
          Status: "Delayed",
        },
      ],
    },
  );

  const res = await CApi.functional.connector.excel.read(connection, {
    fileUrl: second.fileUrl,
    sheetName: "Sheet1",
  });

  const answer = {
    headers: [
      "AirlineName",
      "FlightNumber",
      "DepartureTime",
      "ArrivalTime",
      "Status",
    ],
    data: [
      {
        AirlineName: "Air Mock",
        FlightNumber: "AM1234",
        DepartureTime: "08:00",
        ArrivalTime: "10:00",
        Status: "On Time",
      },
      {
        AirlineName: "AirlineName",
        FlightNumber: "FlightNumber",
        DepartureTime: "DepartureTime",
        ArrivalTime: "ArrivalTime",
        Status: "Status",
      },
      {
        AirlineName: "Sky High",
        FlightNumber: "SH5678",
        DepartureTime: "09:30",
        ArrivalTime: "11:30",
        Status: "Delayed",
      },
    ],
  };

  deepStrictEqual(JSON.stringify(res), JSON.stringify(answer));
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
