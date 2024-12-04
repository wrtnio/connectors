import typia from "typia";

import api from "../../../../src/api";
import type { IGoogleDrive } from "../../../../src/api/structures/connector/google_drive/IGoogleDrive";

export const test_api_connector_google_drive_folder_deleteFolder = async (
  connection: api.IConnection,
) => {
  const output =
    await api.functional.connector.google_drive.folder.deleteFolder(
      connection,
      typia.random<string>(),
      typia.random<IGoogleDrive.ISecret>(),
    );
  typia.assert(output);
};
