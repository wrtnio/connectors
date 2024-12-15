import CApi from "@wrtn/connector-api";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import assert from "assert";
import { randomUUID } from "crypto";
import typia from "typia";

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
