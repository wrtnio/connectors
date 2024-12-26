import CApi from "@wrtn/connector-api";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { ISpreadsheetCell } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheetCell";
import assert from "assert";
import { randomUUID } from "crypto";
import typia, { tags } from "typia";
import { ConnectorGlobal } from "../../../../../../src/ConnectorGlobal";

const password = randomUUID();
const uid = randomUUID();

const connectionWithSameUser = (connection: CApi.IConnection) => ({
  ...connection,
  headers: {
    "x-wrtn-user-application": "kakasoo",
    "x-wrtn-user-password": password,
    "x-wrtn-user-uid": uid,
  } satisfies IExternalUser.ExternalUserIdentifier,
});

export const test_api_connector_swal_spreadsheets_index = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.swal.spreadsheets.index(
    connectionWithSameUser(connection),
    {},
  );

  typia.assertEquals(res);
  return res;
};

export const test_api_connector_swal_spreadsheets_create_empty_spreadsheet =
  async (_connection: CApi.IConnection) => {
    const connection = connectionWithSameUser(_connection);
    const before = await test_api_connector_swal_spreadsheets_index(connection);

    const res = await CApi.functional.connector.swal.spreadsheets.create(
      connection,
      {
        title: "TEST",
      },
    );

    typia.assertEquals(res);

    const after = await test_api_connector_swal_spreadsheets_index(connection);
    assert(before.pagination.records + 1 === after.pagination.records);
  };

export const test_api_connector_swal_spreadsheets_create_spreadsheet = async (
  _connection: CApi.IConnection,
) => {
  const uuid = randomUUID();
  const connection = connectionWithSameUser(_connection);
  const res = await CApi.functional.connector.swal.spreadsheets.create(
    connectionWithSameUser(connection),
    {
      title: uuid,
      description: uuid,
    },
  );

  typia.assertEquals(res);

  const list = await test_api_connector_swal_spreadsheets_index(connection);
  assert(
    list.data.some(
      (el) =>
        el.mv_last.snapshot.title === uuid &&
        el.mv_last.snapshot.description === uuid,
    ),
  );
};

export const test_api_connector_swal_spreadsheets_at = async (
  _connection: CApi.IConnection,
) => {
  const connection = connectionWithSameUser(_connection);
  const list = await test_api_connector_swal_spreadsheets_index(connection);

  assert(list.data.length > 1);

  for await (const { id: srpeadsheetId } of list.data.slice(0, 10)) {
    const spreadsheet = await CApi.functional.connector.swal.spreadsheets.at(
      connection,
      srpeadsheetId,
    );

    typia.assert(spreadsheet);
  }
};

export const test_api_connector_swal_spreadsheets_create_with_cell_and_at =
  async (_connection: CApi.IConnection) => {
    const uuid = randomUUID();
    const connection = connectionWithSameUser(_connection);

    const cellsToCreate = typia.random<
      ISpreadsheetCell.ICreate[] & tags.MinItems<1>
    >();
    const spreadsheet =
      await CApi.functional.connector.swal.spreadsheets.create(
        connectionWithSameUser(connection),
        {
          title: uuid,
          description: uuid,
          cells: cellsToCreate,
        },
      );

    typia.assertEquals(spreadsheet);

    assert(cellsToCreate.length === spreadsheet.total_cell_count);
    return spreadsheet;
  };

export const test_api_connector_swal_spreadsheets_exports_2 = async (
  _connection: CApi.IConnection,
) => {
  const connection = connectionWithSameUser(_connection);

  const sheet =
    await test_api_connector_swal_spreadsheets_create_with_cell_and_at(
      connection,
    );

  const exported =
    await CApi.functional.connector.swal.spreadsheets.exports.google_sheets.exportsToGoogleSheets(
      connection,
      sheet.id,
      {
        snapshot: {
          id: sheet.snapshots[0].id as string,
        },
        google_sheets: {
          secret: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        },
      },
    );

  typia.assertEquals(exported);
};

export const test_api_connector_swal_spreadsheets_update = async (
  _connection: CApi.IConnection,
) => {
  const connection = connectionWithSameUser(_connection);

  const sheet =
    await test_api_connector_swal_spreadsheets_create_with_cell_and_at(
      connection,
    );

  const cellsToCreate = typia.random<
    ISpreadsheetCell.ICreate[] & tags.MinItems<1>
  >();

  const res =
    await CApi.functional.connector.swal.spreadsheets.cells.insertCells(
      connection,
      sheet.id,
      {
        cells: cellsToCreate,
      },
    );

  typia.assertEquals(res);
};
