import CApi from "@wrtn/connector-api";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
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
  async (connection: CApi.IConnection) => {
    const res = await CApi.functional.connector.swal.spreadsheets.create(
      connectionWithSameUser(connection),
      {
        title: "TEST",
      },
    );

    typia.assertEquals(res);
  };
