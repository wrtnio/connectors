import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleDrive } from "../../../../src/api/structures/connector/google_drive/IGoogleDrive";

export const test_api_connector_google_drive_get_files_fileList = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleDrive.IFileListGoogleDriveOutput> =
    await api.functional.connector.google_drive.get.files.fileList(
      connection,
      typia.random<IGoogleDrive.IFileListGoogleDriveInput>(),
    );
  typia.assert(output);
};
