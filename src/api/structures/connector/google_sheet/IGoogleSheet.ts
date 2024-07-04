import { tags } from "typia";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";

/**
 * owner: 소유자 권한을 부여합니다. 이 권한을 가진 사용자는 파일이나 폴더를 삭제하거나 다른 사용자에게 권한을 부여할 수 있습니다.
 * writer: 쓰기 권한을 부여합니다. 이 권한을 가진 사용자는 파일을 수정하거나 삭제할 수 있습니다.
 * commenter: 댓글 권한을 부여합니다. 이 권한을 가진 사용자는 파일을 읽고 댓글을 달 수 있습니다.
 * reader: 읽기 권한을 부여합니다. 이 권한을 가진 사용자는 파일을 읽을 수 있습니다.
 *
 * @title 권한의 종류.
 */
type PermissionRoles = "owner" | "writer" | "commenter" | "reader";

interface IPermission {
  /**
   * 권한을 부여할 사용자의 이메일입니다.
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
}

export namespace IGoogleSheet {
  export interface IReadGoogleSheetInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    > {
    /**
     * 읽어올 구글 시트의 ID입니다.
     *
     * @title 구글 시트 ID.
     */
    sheet_id: string;

    /**
     * 읽어올 구글 시트의 범위입니다.
     *
     * @title 읽어올 범위.
     */
    range: string;
  }

  export interface IReadGoogleSheetHeadersInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    > {
    /**
     * 헤더 정보를 읽어올 시트의 url 주소입니다.
     *
     * @title 시트 url.
     */
    url: string;

    /**
     * 읽어올 시트의 헤더 index입니다.
     *
     * @title 시트 헤더 index.
     */
    index?: number;
  }

  export interface IReadGoogleSheetOutput {
    /**
     * 읽어온 시트의 데이터입니다.
     *
     * @title 시트 데이터.
     */
    data: any;
  }

  export interface IPermissionInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    > {
    /**
     * 권한을 부여할 시트의 url 입니다.
     *
     * @title 시트 url.
     */
    url: string & tags.Format<"uri">;

    /**
     * 접근 가능하게 할 이메일과 부여할 권한 리스트 입니다.
     *
     * @title 접근 가능하게 할 이메일과 부여할 권한 리스트.
     */
    permissions: IPermission[];
  }

  export interface IWriteGoogleSheetHeadersInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    > {
    /**
     * 헤더를 추가할 시트의 url 입니다.
     *
     * @title 시트 url.
     */
    url: string;

    /**
     * 추가할 헤더의 index 입니다.
     *
     * @title 시트 index.
     */
    index?: number;

    /**
     * 시트에 추가할 헤더 리스트 입니다.
     *
     * @title 시트에 추가할 헤더 리스트.
     */
    headerNames: string[];
  }

  export interface IWriteGoogleSheetRowsInput {
    /**
     * 행을 추가할 시트의 url 입니다.
     *
     * @title 시트 url.
     */
    url: string;

    /**
     * 추가할 행의 index 입니다.
     *
     * @title 시트 index.
     */
    index?: number;

    /**
     * 어떤 값을 기준으로 행을 추가할 지에 대한 정보입니다.
     *
     * @title 어떤 값을 기준으로 할 지에 대한 정보.
     */
    from: string[];

    /**
     * 추가해야할 row에 대한 헤더 정보입니다.
     *
     * @title 추가해야할 row에 대한 헤더 정보.
     */
    to: string[];
  }

  export interface IGetWorkSheetInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    > {
    /**
     * 읽어올 시트의 url 입니다.
     *
     * @title 시트 url.
     */
    url: string;
  }

  export interface IGetWorkSheetOutput {
    /**
     * 읽어온 시트의 제목 리스트 입니다.
     *
     * @title 워크시트 제목 리스트.
     */
    data: string[];
  }

  export interface IReadGoogleSheetRowsInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    > {
    /**
     * 행을 읽어올 시트의 url 입니다.
     *
     * @title 시트 url.
     */
    url: string;

    /**
     * 작업할 시트의 제목입니다.
     *
     * @title 작업할 시트 제목.
     */
    workSheetTitle: string;
  }

  interface IReadGoogleSheetRowData {
    /**
     * key가 헤더 이름이고 value가 해당 행의 값인 객체.
     *
     * @title 읽어온 구글 시트 행 데이터.
     */
    [key: string]: any;
  }
  export interface IReadGoogleSheetRowsOutput {
    /**
     * 읽어온 구글 시트 행 데이터입니다.
     *
     * @title 읽어온 구글 시트 행 데이터.
     */
    data: IReadGoogleSheetRowData[];
  }
}
