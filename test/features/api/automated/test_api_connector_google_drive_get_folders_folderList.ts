import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleDrive } from "../../../../src/api/structures/connector/google_drive/IGoogleDrive";

export const test_api_connector_google_drive_get_folders_folderList = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleDrive.IFolderListGoogleDriveOutput> =
    await api.functional.connector.google_drive.get.folders.folderList(
      connection,
      typia.random<IGoogleDrive.ISecret>(),
    );
  typia.assert(output);
};
