import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleDrive } from "@wrtn/connector-api/lib/structures/connector/google_drive/IGoogleDrive";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_drive = async (connection: CApi.IConnection) => {
  const secretKey = ConnectorGlobal.env.GOOGLE_TEST_SECRET;

  /**
   * create new folder
   */
  const createFolderInput = {
    name: "connector-test-folder",
    secretKey,
  };
  const createFolderOutput = await CApi.functional.connector.google_drive.folder.createFolder(
    connection,
    createFolderInput,
  );
  typia.assertEquals(createFolderOutput);

  /**
   * get folder list
   */
  const findFolderListOutput = await CApi.functional.connector.google_drive.get.folders.folderList(connection, {
    secretKey,
  });
  typia.assertEquals(findFolderListOutput);

  /**
   * create new file
   */
  const createFileInput = {
    name: "connector-test-file",
    folderIds: [createFolderOutput.data.id!],
    content: "text/plain",
    secretKey,
  };
  const createFileOutput = await CApi.functional.connector.google_drive.file.createFile(connection, createFileInput);
  typia.assertEquals(createFileOutput);

  /**
   * append text to text file
   */
  const appendTextToFileInput = {
    text: "hello world",
    secretKey,
  };
  const appendTextToFileOutput = await CApi.functional.connector.google_drive.file.text.createText(
    connection,
    createFileOutput.data.id!,
    appendTextToFileInput,
  );
  typia.assertEquals(appendTextToFileOutput);

  /**
   * get text from text file
   */
  const getTextFromFileOutput = await CApi.functional.connector.google_drive.get.file.readFile(
    connection,
    createFileOutput.data.id!,
    {
      secretKey,
    },
  );
  typia.assertEquals<{ data: "hello world" }>(getTextFromFileOutput);

  /**
   * permission to file or folder
   */
  const permissionInput: IGoogleDrive.IPermissionGoogleDriveInput = {
    fileId: createFileOutput.data.id!,
    permissions: [
      {
        email: "jake@wrtn.io",
        role: "writer",
        type: "user",
      },
    ],
    secretKey,
  };
  const permissionOutput = await CApi.functional.connector.google_drive.permission(connection, permissionInput);
  typia.assertEquals(permissionOutput);

  /**
   * get file list
   */
  const findFileListInput = {
    folderId: createFolderOutput.data.id,
    secretKey,
  };
  const findFileListOutput = await CApi.functional.connector.google_drive.get.files.fileList(
    connection,
    findFileListInput,
  );
  typia.assertEquals<IGoogleDrive.IFileListGoogleDriveOutput>(findFileListOutput);

  /**
   * delete file
   */
  const deleteFileInput = createFileOutput.data.id!;
  await CApi.functional.connector.google_drive.file.deleteFile(connection, deleteFileInput, {
    secretKey,
  });

  /**
   * delete folder
   */
  const deleteFolderInput = createFolderOutput.data.id!;
  await CApi.functional.connector.google_drive.folder.deleteFolder(connection, deleteFolderInput, {
    secretKey,
  });

  /**
   * get folder list for delete check
   */
  const folderList = await CApi.functional.connector.google_drive.get.folders.folderList(connection, {
    secretKey,
  });
  typia.assertEquals(folderList.data);

  return folderList;
};
