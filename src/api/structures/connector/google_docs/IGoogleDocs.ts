import { JMESPath, Prerequisite } from "@wrtnio/decorators";
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
type PermissionRoles =
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

/**
 * @title 권한 부여 정보
 */
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
   * owner: 소유자 권한을 부여합니다. 이 권한을 가진 사용자는 파일이나 폴더를 삭제하거나 다른 사용자에게 권한을 부여할 수 있습니다.
   * organizer: 드라이브에 대한 운영자 권한을 부여합니다. 이 권한을 가진 사용자는 드라이브의 구성을 관리할 수 있습니다.
   * fileOrganizer: 드라이브의 파일에 대한 운영자 권한을 부여합니다. 이 권한을 가진 사용자는 파일을 추가하거나 삭제할 수 있습니다.
   * writer: 쓰기 권한을 부여합니다. 이 권한을 가진 사용자는 파일을 수정하거나 삭제할 수 있습니다.
   * commenter: 댓글 권한을 부여합니다. 이 권한을 가진 사용자는 파일을 읽고 댓글을 달 수 있습니다.
   * reader: 읽기 권한을 부여합니다. 이 권한을 가진 사용자는 파일을 읽을 수 있습니다.
   *
   * 가능한 값으로는 "owner", "writer", "commenter", "reader", "organizer", "fileOrganizer" 6가지만 가능합니다.
   *
   * @title 부여할 권한.
   */
  role: PermissionRoles;

  /**
   * 부여할 권한의 타입입니다.
   *
   *  user - 특정 사용자, 이 경우 emailAddress 필드에 권한을 부여할 사용자의 이메일 주소를 지정해야 합니다.
   * group - 특정 그룹, 이 경우 emailAddress 필드에 권한을 부여할 그룹의 이메일 주소를 지정해야 합니다.
   * domain - 특정 도메인, 이 경우 domain 필드에 권한을 부여할 도메인을 지정해야 합니다.
   * anyone - 모든 사용자
   *
   * 가능한 값으로는 "user", "group", "domain", "anyone" 4가지만 가능합니다.
   *
   * @title 부여할 권한의 타입.
   */
  type: PermissionTypes;
}

interface IGoogleDocs {
  /**
   * 구글 docs의 text 정보입니다.
   *
   * @title text 정보.
   */
  text?: string;

  /**
   * 구글 docs의 테이블 정보입니다.
   *
   * @title 테이블 정보.
   */
  table?: string[][][];
}

export namespace IGoogleDocs {
  /**
   * @title 구글 docs 생성 결과
   */
  export interface ICreateGoogleDocsOutput {
    /**
     * 생성된 docs의 id입니다.
     *
     * @title 생성된 docs id.
     */
    id: string;
  }

  /**
   * @title 구글 docs 생성에 필요한 정보
   */
  export interface ICreateGoogleDocsInput
    extends ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
      ]
    > {
    /**
     * 생성할 docs의 제목입니다.
     *
     * @title 구글 docs 제목.
     */
    title: string;
  }

  /**
   * @title 구글 docs 권한 부여에 필요한 정보
   */
  export interface IPermissionGoogleDocsInput
    extends ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
      ]
    > {
    /**
     * 접근 권한을 부여할 구글 docs의 id입니다.
     *
     * @title 구글 docs id.
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
     * 접근 가능하게 할 이메일과 부여할 권한 리스트입니다.
     *
     * @title 접근 가능하게 할 이메일과 부여할 권한 리스트.
     */
    permissions: IPermission[];
  }

  /**
   * @title 구글 docs 조회 결과
   */
  export interface IReadGoogleDocsOutput {
    /**
     * 읽어온 구글 docs의 데이터입니다.
     *
     * @title 구글 docs 데이터.
     */
    data: IGoogleDocs;
  }

  /**
   * @title 구글 docs 복제에 필요한 정보
   */
  export interface ICreateDocByTemplateInput
    extends ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
      ]
    > {
    /**
     * 복제할 구글 docs.
     *
     * @title 복제할 구글 docs.
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
     * 복제하여 새로 생성할 docs의 제목입니다.
     *
     * @title 생성할 docs 제목.
     */
    title: string;
  }

  /**
   * @title 구글 docs 복제 결과
   */
  export interface ICreateDocByTemplateOutput {
    /**
     * 복사된 docs의 id입니다.
     *
     * @title 생성된 docs id.
     */
    id: string;
  }

  /**
   * @title 구글 docs 리스트 조회 결과
   */
  export interface IListGoogleDocsOutput {
    /**
     * 검색된 구글 docs 리스트입니다.
     *
     * @title 구글 docs 리스트.
     */
    data: {
      /**
       * 가져온 구글 docs의 id입니다.
       *
       * @title 구글 docs id.
       */
      id?: string | null;

      /**
       * 가져온 구글 docs의 제목입니다.
       *
       * @title 구글 docs title.
       */
      title?: string | null;
    }[];
  }

  /**
   * @title 구글 docs 텍스트 추가에 필요한 정보
   */
  export interface IAppendTextGoogleDocsInput
    extends ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
      ]
    > {
    /**
     * 텍스트를 추가할 구글 docs를 선택합니다.
     *
     * @title 구글 docs.
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
     * 추가할 텍스트입니다.
     *
     * @title 텍스트.
     */
    text: string;
  }

  /**
   * @title 인증 정보
   */
  export type ISecret = ICommon.ISecret<
    "google",
    [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/documents",
    ]
  >;
}
