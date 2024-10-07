import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleDrive } from "@wrtn/connector-api/lib/structures/connector/google_drive/IGoogleDrive";

import { notDeepStrictEqual } from "assert";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_drive = async (
  connection: CApi.IConnection,
) => {
  const secretKey = ConnectorGlobal.env.GOOGLE_TEST_SECRET;

  /**
   * create new folder
   */
  const createFolderInput = {
    name: "connector-test-folder",
    secretKey,
  };
  const createFolderOutput =
    await CApi.functional.connector.google_drive.folder.createFolder(
      connection,
      createFolderInput,
    );
  typia.assert(createFolderOutput);

  /**
   * get folder list
   */
  const findFolderListOutput =
    await CApi.functional.connector.google_drive.get.folders.folderList(
      connection,
      {
        secretKey,
      },
    );
  typia.assert(findFolderListOutput);

  /**
   * create new file
   */
  const createFileInput = {
    name: "connector-test-file",
    folderIds: [createFolderOutput.id!],
    content: "text/plain",
    secretKey,
  };
  const createFileOutput =
    await CApi.functional.connector.google_drive.file.createFile(
      connection,
      createFileInput,
    );
  typia.assert(createFileOutput);

  /**
   * append text to text file
   */
  const appendTextToFileInput = {
    text: "hello world",
    secretKey,
  };
  const appendTextToFileOutput =
    await CApi.functional.connector.google_drive.file.text.createText(
      connection,
      createFileOutput.id!,
      appendTextToFileInput,
    );
  typia.assert(appendTextToFileOutput);

  /**
   * get text from text file
   */
  const getTextFromFileOutput =
    await CApi.functional.connector.google_drive.get.file.readFile(
      connection,
      createFileOutput.id!,
      {
        secretKey,
      },
    );
  typia.assert(getTextFromFileOutput);

  /**
   * permission to file or folder
   */
  const permissionInput: IGoogleDrive.IPermissionGoogleDriveInput = {
    fileId: createFileOutput.id!,
    permissions: [
      {
        email: "jake@wrtn.io",
        role: "writer",
        type: "user",
      },
    ],
    secretKey,
  };
  const permissionOutput =
    await CApi.functional.connector.google_drive.permission(
      connection,
      permissionInput,
    );
  typia.assert(permissionOutput);

  /**
   * get file list
   */
  const findFileListInput = {
    folderId: createFolderOutput.id,
    secretKey,
  };
  const findFileListOutput =
    await CApi.functional.connector.google_drive.get.files.fileList(
      connection,
      findFileListInput,
    );
  typia.assert(findFileListOutput);

  /**
   * get file list without folderId
   */

  const findFileListWtthoutFolderIdOutput =
    await CApi.functional.connector.google_drive.get.files.fileList(
      connection,
      {
        secretKey,
      },
    );
  typia.assert(findFileListWtthoutFolderIdOutput);

  notDeepStrictEqual(findFileListOutput, findFileListWtthoutFolderIdOutput);

  /**
   * delete file
   */
  const deleteFileInput = createFileOutput.id!;
  await CApi.functional.connector.google_drive.file.deleteFile(
    connection,
    deleteFileInput,
    {
      secretKey,
    },
  );

  /**
   * delete folder
   */
  const deleteFolderInput = createFolderOutput.id!;
  await CApi.functional.connector.google_drive.folder.deleteFolder(
    connection,
    deleteFolderInput,
    {
      secretKey,
    },
  );

  /**
   * get folder list for delete check
   */
  const folderList =
    await CApi.functional.connector.google_drive.get.folders.folderList(
      connection,
      {
        secretKey,
      },
    );
  typia.assert(folderList.data);

  return folderList;
};
