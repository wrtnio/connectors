import typia from "typia";

import api from "../../../../src/api";
import type { IGoogleDrive } from "../../../../src/api/structures/connector/google_drive/IGoogleDrive";

export const test_api_connector_google_drive_permission = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.google_drive.permission(
    connection,
    typia.random<IGoogleDrive.IPermissionGoogleDriveInput>(),
  );
  typia.assert(output);
};
