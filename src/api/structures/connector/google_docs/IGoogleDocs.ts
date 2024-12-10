import { JMESPath, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";
import { ICommon } from "../common/ISecretValue";
import { IGoogleDrive } from "../google_drive/IGoogleDrive";

/**
 * owner: Grants owner permissions. Users with this permission can delete files or folders or grant permissions to other users.
 * organizer: Grants operator permissions for the drive. Users with this permission can manage the organization of the drive.
 * fileOrganizer: Grants operator permissions for files on the drive. Users with this permission can add or delete files.
 * writer: Grants write permissions. Users with this permission can modify or delete files.
 * commenter: Grants comment permissions. Users with this permission can read and comment on files.
 * reader: Grants read permissions. Users with this permission can read files.
 *
 * @title Type of permission
 */
type PermissionRoles =
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
 * @title The target to whom you want to grant the permission
 */
type PermissionTypes = "user" | "group" | "domain" | "anyone";

/**
 * @title Authorization information
 */
interface IPermission {
  /**
   * The email address of the user to grant permission to.
   *
   * @title The email address of the user to grant permission to
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
   * There are only six possible values: "owner", "writer", "commenter", "reader", "organizer", "fileOrganizer".
   *
   * @title The permission to grant
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
   * @title The type of permission to grant
   */
  type: PermissionTypes;
}

interface IGoogleDocs {
  /**
   * Here is the text information from Google Docs.
   *
   * @title text information
   */
  text?: string;

  /**
   * Here is the table information from Google Docs.
   *
   * @title Table Information
   */
  table?: string[][][];
}

export namespace IGoogleDocs {
  export interface IUpdateOutput {
    /**
     * @title Updated Google Docs File ID
     */
    id: string;

    /**
     * @title File URL
     */
    url: string & tags.Format<"iri">;
  }

  /**
   * @title Google Docs Secret Key and contents to update
   */
  export interface IUpdateContentInput
    extends ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/documents",
      ]
    > {
    /**
     * Existing content will be covered with this content,
     * so if you want to add content, you should check the previous content and specify what you have added with this parameter.
     *
     * @title contents as markdown format
     */
    contents: string;
  }

  /**
   * @title Google Docs Secret Key and title to update
   */
  export interface IUpdateTitleInput
    extends ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/documents",
      ]
    > {
    /**
     * Title to update
     *
     * @title title
     */
    title: string;
  }

  /**
   * @title Google Secret key and information to update docs file
   */
  export type IUpdateInput = IUpdateTitleInput | IUpdateContentInput;

  export interface IResponse {
    markdown: {
      /**
       * @title Created Markdown File ID
       */
      id: string;
    };

    googleDocs: {
      /**
       * @title Created Google Docs File ID
       */
      id: string;

      /**
       * @title File URL
       */
      url: string & tags.Format<"iri">;
    };
  }

  /**
   * @title Document ID and URL
   */
  export interface IClearOutput {
    /**
     * @title Created Google Docs File ID
     */
    id: string;

    /**
     * @title File URL
     */
    url: string & tags.Format<"iri">;
  }

  /**
   * @title Google Drive and Docs Secret Key and information to clear file
   */
  export interface IClearInput
    extends ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/documents",
      ]
    > {
    /**
     * ID when you want to erase the entire contents of a file and make it an empty file
     *
     * @title ID of Google Docs File
     */
    documentId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-docs/get-list";
        jmesPath: JMESPath<
          IListGoogleDocsOutput,
          "data[].{value:id, label:title}"
        >;
      }>;
  }

  /**
   * @title Information required to create a file in Google Drive
   */
  export interface IRequest
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/drive.file"]
    > {
    /**
     * File name to be created in drive
     *
     * @title Google drive file name
     */
    name: string;

    /**
     * Folder id that will contain the file to be created in the drive
     *
     * @title Google Drive Folder ID
     */
    folderId?: string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-drive/get/folders";
        jmesPath: JMESPath<
          IGoogleDrive.IFolderListGoogleDriveOutput,
          "data[].{value:id, label:name}"
        >;
      }>;

    /**
     * Contents of the file to be created in drive
     *
     * @title markdown
     */
    markdown: string;
  }

  /**
   * @title Google Docs creation result
   */
  export interface ICreateGoogleDocsOutput {
    /**
     * The ID of the generated docs.
     *
     * @title Generated docs id
     */
    id: string;

    /**
     * @title url
     */
    url: string & tags.Format<"iri">;
  }

  /**
   * @title Information required to create Google docs
   */
  export interface ICreateGoogleDocsInput
    extends ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/documents",
      ]
    > {
    /**
     * The title of the docs to be generated.
     *
     * @title Google docs title
     */
    title: string;
  }

  /**
   * @title Information required to grant Google Docs permissions
   */
  export interface IPermissionGoogleDocsInput
    extends ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/documents",
      ]
    > {
    /**
     * The id of the Google docs to which you want to grant access.
     *
     * @title Google docs id
     */
    documentId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-docs/get-list";
        jmesPath: JMESPath<
          IListGoogleDocsOutput,
          "data[].{value:id, label:title}"
        >;
      }>;

    /**
     * Here is a list of emails to make accessible and the permissions to grant.
     *
     * @title Here is a list of emails to make accessible and the permissions to grant
     */
    permissions: IPermission[];
  }

  /**
   * @title Google Docs search results
   */
  export interface IReadGoogleDocsOutput {
    /**
     * This is data from Google docs that I read.
     *
     * @title Google docs data
     */
    data: IGoogleDocs;
  }

  /**
   * @title Information needed to duplicate Google Docs
   */
  export interface ICreateDocByTemplateInput
    extends ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/documents",
      ]
    > {
    /**
     * Google docs to clone
     *
     * @title Google docs to clone
     */
    templateId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-docs/get-list";
        jmesPath: JMESPath<
          IListGoogleDocsOutput,
          "data[].{value:id, label:title}"
        >;
      }>;

    /**
     * The title of the docs to be newly created by duplicating
     *
     * @title The title of the docs to be created
     */
    title: string;
  }

  /**
   * @title Google Docs Duplication Results
   */
  export interface ICreateDocByTemplateOutput {
    /**
     * The id of the copied docs
     *
     * @title Generated docs id
     */
    id: string;
  }

  /**
   * @title Google docs list query results
   */
  export interface IListGoogleDocsOutput {
    /**
     * Here is a list of Google docs that were searched.
     *
     * @title List of Google docs
     */
    data: {
      /**
       * The id of the imported Google docs.
       *
       * @title Google docs id
       */
      id?: string | null;

      /**
       * The title of the imported Google docs.
       *
       * @title Google docs title
       */
      title?: string | null;
    }[];
  }

  /**
   * @title Information needed to add text to Google Docs
   */
  export interface IAppendTextGoogleDocsInput
    extends ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/documents",
      ]
    > {
    /**
     * Select the Google docs you want to add text to.
     *
     * @title Google docs
     */
    documentId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-docs/get-list";
        jmesPath: JMESPath<
          IListGoogleDocsOutput,
          "data[].{value:id, label:title}"
        >;
      }>;

    /**
     * The text to add
     *
     * When you pass the input of the markdown format, change the markdown to the appropriate format.
     *
     * @title text
     */
    text: string;
  }

  /**
   * @title Authentication Information
   */
  export type ISecret = ICommon.ISecret<
    "google",
    [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/documents",
    ]
  >;
}
