import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleDrive } from "../../../../src/api/structures/connector/google_drive/IGoogleDrive";

export const test_api_connector_google_drive_folder_createFolder = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleDrive.ICreateFolderGoogleDriveOutput> =
    await api.functional.connector.google_drive.folder.createFolder(
      connection,
      typia.random<IGoogleDrive.ICreateFolderGoogleDriveInput>(),
    );
  typia.assert(output);
};
