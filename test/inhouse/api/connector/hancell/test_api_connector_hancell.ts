import typia from "typia";
import { v4 } from "uuid";

import CApi from "@wrtn/connector-api/lib/index";
import { IHancell } from "@wrtn/connector-api/lib/structures/connector/hancell/IHancell";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const exampleFile = `https://${ConnectorGlobal.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/example.cell`;

export const test_api_connector_hancell_read_file = async (connection: CApi.IConnection) => {
  /**
   * read worksheet list
   */

  const worksheetListInput: IHancell.IReadHancellInput = {
    fileUrl: exampleFile,
  };

  const res = await CApi.functional.connector.hancell.read(connection, worksheetListInput);

  typia.assertEquals(res);

  return res;
};

export const test_api_connector_hancell_insert_rows = async (connection: CApi.IConnection) => {
  /**
   * 이전 데이터 조회
   */
  const targetCell = "B3";
  const before = await test_api_connector_hancell_read_file(connection);
  const beforeData = before.data["Sheet1"][targetCell];

  /**
   * 특정 셀 수정
   */
  const testValue = v4();
  const updated = await CApi.functional.connector.hancell.sheet.upsertSheet(connection, {
    fileUrl: exampleFile,
    sheetName: "Sheet1",
    cells: {
      [targetCell]: testValue,
    },
  });

  /**
   * 수정 후 조회
   */
  const after = await CApi.functional.connector.hancell.read(connection, {
    fileUrl: updated.data.fileUrl,
  });

  const afterData = after.data["Sheet1"][targetCell];

  typia.assert<false>(beforeData === afterData);
  typia.assert<true>(afterData === testValue);
};

export const test_api_connector_hancell_insert_rows_outside_of_start_point = async (connection: CApi.IConnection) => {
  /**
   * 이전 데이터 조회
   */
  const targetCell = "A1";
  const before = await test_api_connector_hancell_read_file(connection);
  const beforeData = before.data["Sheet1"][targetCell]; // 시작 지점 바깥에 존재한다.

  /**
   * 특정 셀 수정
   */
  const testValue = v4();
  const updated = await CApi.functional.connector.hancell.sheet.upsertSheet(connection, {
    fileUrl: exampleFile,
    sheetName: "Sheet1",
    cells: {
      [targetCell]: testValue,
    },
  });

  /**
   * 수정 후 조회
   */
  const after = await CApi.functional.connector.hancell.read(connection, {
    fileUrl: updated.data.fileUrl,
  });

  const afterData = after.data["Sheet1"][targetCell];

  typia.assert<false>(beforeData === afterData);
  typia.assert<true>(afterData === testValue);
};

export const test_api_connector_hancell_insert_rows_outside_of_end_point = async (connection: CApi.IConnection) => {
  /**
   * 이전 데이터 조회
   */
  const targetCell = "Z1";
  const before = await test_api_connector_hancell_read_file(connection);
  const beforeData = before.data["Sheet1"][targetCell]; // 시트 범위 종료 지점 바깥에 존재한다.

  /**
   * 특정 셀 수정
   */
  const testValue = v4();
  const updated = await CApi.functional.connector.hancell.sheet.upsertSheet(connection, {
    fileUrl: exampleFile,
    sheetName: "Sheet1",
    cells: {
      [targetCell]: testValue,
    },
  });

  /**
   * 수정 후 조회
   */
  const after = await CApi.functional.connector.hancell.read(connection, {
    fileUrl: updated.data.fileUrl,
  });

  const afterData = after.data["Sheet1"][targetCell];

  typia.assert<false>(beforeData === afterData);
  typia.assert<true>(afterData === testValue);
};
