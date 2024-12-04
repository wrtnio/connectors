import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleDrive } from "../../../../src/api/structures/connector/google_drive/IGoogleDrive";

export const test_api_connector_google_drive_file_createFile = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGoogleDrive.ICreateFileGoogleDriveOutput> =
    await api.functional.connector.google_drive.file.createFile(
      connection,
      typia.random<IGoogleDrive.IUploadFileInput>(),
    );
  typia.assert(output);
};
