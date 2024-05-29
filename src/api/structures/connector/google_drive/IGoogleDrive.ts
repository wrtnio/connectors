import { tags } from "typia";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";

/**
 * owner: 소유자 권한을 부여합니다. 이 권한을 가진 사용자는 파일이나 폴더를 삭제하거나 다른 사용자에게 권한을 부여할 수 있습니다.
 * organizer: 드라이브에 대한 운영자 권한을 부여합니다. 이 권한을 가진 사용자는 드라이브의 구성을 관리할 수 있습니다.
 * fileOrganizer: 드라이브의 파일에 대한 운영자 권한을 부여합니다. 이 권한을 가진 사용자는 파일을 추가하거나 삭제할 수 있습니다.
 * writer: 쓰기 권한을 부여합니다. 이 권한을 가진 사용자는 파일을 수정하거나 삭제할 수 있습니다.
 * commenter: 댓글 권한을 부여합니다. 이 권한을 가진 사용자는 파일을 읽고 댓글을 달 수 있습니다.
 * reader: 읽기 권한을 부여합니다. 이 권한을 가진 사용자는 파일을 읽을 수 있습니다.
 *
 * @title 권한의 종류.
 */
export type PermissionRoles =
  | "owner"
  | "writer"
  | "commenter"
  | "reader"
  | "organizer"
  | "fileOrganizer";

/**
 * user - 특정 사용자, 이 경우 emailAddress 필드에 권한을 부여할 사용자의 이메일 주소를 지정해야 합니다.
 * group - 특정 그룹, 이 경우 emailAddress 필드에 권한을 부여할 그룹의 이메일 주소를 지정해야 합니다.
 * domain - 특정 도메인, 이 경우 domain 필드에 권한을 부여할 도메인을 지정해야 합니다.
 * anyone - 모든 사용자
 *
 * @title 권한을 부여할 대상.
 */
type PermissionTypes = "user" | "group" | "domain" | "anyone";

export namespace IGoogleDrive {
  export interface ICreateFolderGoogleDriveInput
    extends ICommon.ISecret<"Google"> {
    /**
     * 생성할 drive 폴더명.
     *
     * @title 구글 drive 폴더명.
     */
    name: string;
  }

  export interface ICreateFolderGoogleDriveOutput {
    /**
     * 생성된 drive 폴더 id.
     *
     * @title 생성된 drive id.
     */
    id: string;
  }

  export interface IFileListGoogleDriveInput extends ICommon.ISecret<"Google"> {
    /**
     * 파일을 불러 올 폴더.
     *
     * @title 구글 drive 폴더.
     */
    folderId?: string;
  }

  export interface IFileListGoogleDriveOutput {
    /**
     * 구글 drive에 있는 file 데이터 리스트.
     *
     * @title 구글 drive file 데이터.
     */
    data: {
      /**
       * 구글 drive file의 id.
       *
       * @title 구글 drive file id.
       */
      id?: string | null;

      /**
       * 구글 drive file의 이름.
       *
       * @title 구글 drive file name.
       */
      name?: string | null;
    }[];
  }

  export interface IFolderListGoogleDriveOutput {
    /**
     * 구글 drive에 있는 folder 데이터 리스트.
     *
     * @title 구글 drive folder 데이터.
     */
    data: {
      /**
       * 구글 drive folder의 id.
       *
       * @title 구글 drive folder id.
       */
      id?: string | null;

      /**
       * 구글 drive 폴더 명.
       *
       * @title 구글 drive folder name.
       */
      name?: string | null;
    }[];
  }

  export interface ICreateFileGoogleDriveInput
    extends ICommon.ISecret<"Google"> {
    /**
     * drive에 생성할 파일명.
     *
     * @title 구글 drive file명.
     */
    name: string;

    /**
     * drive에 생성할 파일이 속할 폴더 id 리스트.
     *
     * @title 구글 drive folder ids.
     */
    folderIds: string[];

    /**
     * drive에 생성할 파일의 내용.
     *
     * @title 구글 drive file content.
     */
    content: string;
  }

  export interface ICreateFileGoogleDriveOutput {
    /**
     * 생성된 drive 파일 id.
     *
     * @title 생성된 drive file id.
     */
    id: string;
  }

  export interface IPermission {
    /**
     * 구글 drive 접근 권한을 부여할 사용자의 이메일 주소입니다.
     *
     * @title 권한을 부여할 사용자의 이메일.
     */
    email: string & tags.Format<"email">;

    /**
     * 부여할 권한의 종류입니다.
     *
     * @title 부여할 권한.
     */
    role: PermissionRoles;

    /**
     * 부여할 권한의 타입입니다.
     *
     * @title 부여할 권한의 타입.
     */
    type: PermissionTypes;
  }

  export interface IPermissionGoogleDriveInput
    extends ICommon.ISecret<"Google"> {
    /**
     * 접근 권한을 부여할 drive 파일 id.
     *
     * @title 구글 drive file id.
     */
    fileId?: string;

    /**
     * 접근 권한을 부여할 drive 폴더 id.
     *
     * @title 구글 drive folder id.
     */
    folderId?: string;

    /**
     * 접근 가능하게 할 이메일과 부여할 권한 리스트 입니다.
     *
     * @title 접근 가능하게 할 이메일과 부여할 권한 리스트.
     */
    permissions: IPermission[];
  }

  export interface IAppendTextGoogleDriveInput
    extends ICommon.ISecret<"Google"> {
    /**
     * drive 파일에 추가할 text.
     *
     * @title 추가할 text.
     */
    text: string;
  }

  export interface IReadFileGoogleDriveOutput {
    /**
     * drive 파일에서 추출한 text 데이터.
     *
     * @title 구글 drive file data.
     */
    data: string;
  }
}
