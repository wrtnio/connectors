import { JMESPath, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";
import { ICommon } from "../common/ISecretValue";

/**
 * owner: Grants owner permissions. Users with this permission can delete files or folders or grant permissions to other users.
 * organizer: Grants operator permissions for the drive. Users with this permission can manage the organization of the drive.
 * fileOrganizer: Grants operator permissions for files on the drive. Users with this permission can add or delete files.
 * writer: Grants write permissions. Users with this permission can modify or delete files.
 * commenter: Grants comment permissions. Users with this permission can read and comment on files.
 * reader: Grants read permissions. Users with this permission can read files.
 *
 * @title Type of permission.
 */
export type PermissionRoles =
  | "owner"
  | "writer"
  | "commenter"
  | "reader"
  | "organizer"
  | "fileOrganizer";

/**
 * user - A specific user, in this case you must specify the email address of the user to whom you want to grant the permission in the emailAddress field.
 * group - A specific group, in this case you must specify the email address of the group to whom you want to grant the permission in the emailAddress field.
 * domain - A specific domain, in this case you must specify the domain to which you want to grant the permission in the domain field.
 * anyone - All users
 *
 * @title The target to whom you want to grant the permission.
 */
type PermissionTypes = "user" | "group" | "domain" | "anyone";

export namespace IGoogleDrive {
  /**
   * @title Information required to create a Google Drive folder
   */
  export interface ICreateFolderGoogleDriveInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/drive"]
    > {
    /**
     * Drive folder name to be created.
     *
     * @title Google drive folder name.
     */
    name: string;
  }

  /**
   * @title Google Drive Folder Creation Results
   */
  export interface ICreateFolderGoogleDriveOutput {
    /**
     * Generated drive folder id.
     *
     * @title Generated drive id.
     */
    id: string;
  }

  /**
   * @title Information for loading a list of files in Google Drive
   */
  export interface IFileListGoogleDriveInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/drive"]
    > {
    /**
     * Folder to load files from.
     *
     * @title Google Drive Folder.
     */
    folderId?: string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-drive/get/folders";
        jmesPath: JMESPath<
          IFolderListGoogleDriveOutput,
          "data[].{value:id, label:name}"
        >;
      }>;
  }

  /**
   * @title File list information in Google Drive
   */
  export interface IFileListGoogleDriveOutput {
    /**
     * List of file data in Google Drive.
     *
     * @title Google Drive File Data.
     */
    data: {
      /**
       * Google drive file id.
       *
       * @title Google drive file id.
       */
      id?: string | null;

      /**
       * The name of the Google drive file.
       *
       * @title Google drive file name.
       */
      name?: string | null;
    }[];
  }

  /**
   * @title Folder list information in Google Drive
   */
  export interface IFolderListGoogleDriveOutput {
    /**
     * List of folder data in Google Drive.
     *
     * @title Google Drive Folder Data.
     */
    data: {
      /**
       * Google drive folder id.
       *
       * @title Google drive folder id.
       */
      id?: string | null;

      /**
       * Google drive folder name.
       *
       * @title Google drive folder name.
       */
      name?: string | null;
    }[];
  }

  /**
   * @title Information required to create a file in Google Drive
   */
  export interface ICreateFileGoogleDriveInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/drive"]
    > {
    /**
     * File name to be created in drive.
     *
     * @title Google drive file name.
     */
    name: string;

    /**
     * A list of folder ids that will contain the files to be created in the drive.
     *
     * @title Google drive folder ids.
     */
    folderIds: (string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-drive/get/folders";
        jmesPath: JMESPath<
          IFolderListGoogleDriveOutput,
          "data[].{value:id, label:name}"
        >;
      }>)[] &
      tags.MinItems<1>;

    /**
     * Contents of the file to be created in drive.
     *
     * @title Google drive file content.
     */
    content: string;
  }

  /**
   * @title Result of creating a file in Google Drive
   */
  export interface ICreateFileGoogleDriveOutput {
    /**
     * Generated drive file id.
     *
     * @title Generated drive file id.
     */
    id: string;
  }

  /**
   * @title Access Rights Information
   */
  export interface IPermission {
    /**
     * The email address of the user to whom you wish to grant access to Google Drive.
     *
     * @title The email address of the user to whom you wish to grant access.
     */
    email: string & tags.Format<"email">;

    /**
     * The type of permission to grant.
     *
     * owner: Grants owner permissions. Users with this permission can delete files or folders or grant permissions to other users.
     * organizer: Grants operator permissions for the drive. Users with this permission can manage the organization of the drive.
     * fileOrganizer: Grants operator permissions for files on the drive. Users with this permission can add or delete files.
     * writer: Grants write permissions. Users with this permission can modify or delete files.
     * commenter: Grants comment permissions. Users with this permission can read and comment on files.
     * reader: Grants read permissions. Users with this permission can read files.
     *
     * There are only six possible values: "owner", "organizer", "fileOrganizer", "writer", "commenter", "reader".
     *
     * @title The permission to grant.
     */
    role: PermissionRoles;

    /**
     * The type of permission to grant.
     *
     * user - a specific user, in this case you must specify the email address of the user to grant the permission to in the emailAddress field.
     * group - a specific group, in this case you must specify the email address of the group to grant the permission to in the emailAddress field.
     * domain - a specific domain, in this case you must specify the domain to grant the permission to in the domain field.
     * anyone - all users
     *
     * There are only four possible values: "user", "group", "domain", "anyone".
     *
     * @title The type of permission to grant.
     */
    type: PermissionTypes;
  }

  /**
   * @title Information required for Google Drive access permission
   */
  export interface IPermissionGoogleDriveInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/drive"]
    > {
    /**
     * The drive file id to grant access to.
     *
     * @title Google drive file id.
     */
    fileId?: string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-drive/get/files";
        jmesPath: JMESPath<
          IFileListGoogleDriveOutput,
          "data[].{value:id, label:name}"
        >;
      }>;

    /**
     * Drive folder id to grant access to.
     *
     * @title Google drive folder id.
     */
    folderId?: string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-drive/get/folders";
        jmesPath: JMESPath<
          IFolderListGoogleDriveOutput,
          "data[].{value:id, label:name}"
        >;
      }>;

    /**
     * Here is a list of emails to make accessible and permissions to grant.
     *
     * @title Here is a list of emails to make accessible and permissions to grant.
     */
    permissions: IPermission[];
  }

  /**
   * @title Information required to add text to Google Drive file
   */
  export interface IAppendTextGoogleDriveInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/drive"]
    > {
    /**
     * Text to add to the drive file.
     *
     * @title Text to add.
     */
    text: string;
  }

  /**
   * @title Google Drive file search results
   */
  export interface IReadFileGoogleDriveOutput {
    /**
     * Text data extracted from the drive file.
     *
     * @title Google drive file data.
     */
    data: string;
  }

  /**
   * @title Authentication Information
   */
  export type ISecret = ICommon.ISecret<
    "google",
    ["https://www.googleapis.com/auth/drive"]
  >;
}
