import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleDrive } from "@wrtn/connector-api/lib/structures/connector/google_drive/IGoogleDrive";

import { notDeepStrictEqual } from "assert";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_drive_create_folder = async (
  connection: CApi.IConnection,
) => {
  const secretKey = ConnectorGlobal.env.GOOGLE_TEST_SECRET;
  const res = await CApi.functional.connector.google_drive.folder.createFolder(
    connection,
    {
      name: "connector-test-folder",
      secretKey,
    },
  );
  typia.assert(res);

  // 테스트 후 폴더 삭제
  await CApi.functional.connector.google_drive.folder.deleteFolder(
    connection,
    res.id,
    {
      secretKey,
    },
  );
};

export const test_api_connector_google_drive_get_folder_list = async (
  connection: CApi.IConnection,
) => {
  const secretKey = ConnectorGlobal.env.GOOGLE_TEST_SECRET;
  const res =
    await CApi.functional.connector.google_drive.get.folders.folderList(
      connection,
      {
        secretKey,
      },
    );
  typia.assert(res);
};

export const test_api_connector_google_drive = async (
  connection: CApi.IConnection,
) => {
  const secretKey = ConnectorGlobal.env.GOOGLE_TEST_SECRET;
  const createdFolder =
    await CApi.functional.connector.google_drive.folder.createFolder(
      connection,
      {
        name: "connector-test-folder",
        secretKey,
      },
    );

  /**
   * create new file
   */
  const createFileOutput =
    await CApi.functional.connector.google_drive.file.createFile(connection, {
      name: "connector-test-file",
      folderIds: [createdFolder.id!],
      fileUrl:
        "https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/rag-test-2.pdf",
      secretKey,
    });
  typia.assert(createFileOutput);

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
    folderId: createdFolder.id,
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
  const deleteFolderInput = createdFolder.id!;
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
