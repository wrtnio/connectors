import { JMESPath, Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";

import { ICommon } from "../common/ISecretValue";

export namespace INotion {
  /**
   * - plainText: 텍스트
   * - markdown: 마크다운
   *
   * @title 데이터베이스 아이템 페이지 content의 유형
   */
  type ContentType = "plainText" | "markdown";

  /**
   * @title 색상
   */
  type Color =
    | "default"
    | "gray"
    | "brown"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "red";

  /**
   * @title 데이터베이스 날짜 속성
   */
  type DateDatabaseProperty = {
    id: string;
    name: string;
    type: "date";
    date: Record<string, never>;
  };

  /**
   * @title 데이터베이스 체크박스 속성
   */
  type CheckboxDatabaseProperty = {
    id: string;
    name: string;
    type: "checkbox";
    checkbox: Record<string, never>;
  };

  /**
   * @title 데이터베이스 작성자 속성
   */
  type CreatedByDatabaseProperty = {
    id: string;
    name: string;
    type: "created_by";
  };

  /**
   * @title 데이터베이스 작성 시간 속성
   */
  type CreatedTimeDatabaseProperty = {
    id: string;
    name: string;
    type: "created_time";
    created_time: Record<string, never>;
  };

  /**
   * @title 데이터베이스 이메일 속성
   */
  type EmailDatabaseProperty = {
    id: string;
    name: string;
    type: "email";
    email: Record<string, never>;
  };

  /**
   * @title 데이터베이스 파일 속성
   */
  type FilesDatabaseProperty = {
    id: string;
    name: string;
    type: "files";
    files: Record<string, never>;
  };

  /**
   * @title 데이터베이스 공식 속성
   */
  type FormulaDatabaseProperty = {
    id: string;
    name: string;
    type: "formula";
    formula: {
      expression: string;
    };
  };

  /**
   * @title 데이터베이스 마지막 수정자 속성
   */
  type LastEditedByDatabaseProperty = {
    id: string;
    name: string;
    type: "last_edited_by";
    last_edited_by: Record<string, never>;
  };

  /**
   * @title 데이터베이스 수정 시간 속성
   */
  type LastEditedTimeDatabaseProperty = {
    id: string;
    name: string;
    type: "last_edited_time";
    last_edited_time: Record<string, never>;
  };

  /**
   * @title 데이터베이스 다중 선택 속성
   */
  type MultiSelectDatabaseProperty = {
    id: string;
    name: string;
    type: "multi_select";
    multi_select: {
      options: {
        id: string;
        name: string;
        color: Color;
      }[];
    };
  };

  /**
   * @title 데이터베이스 숫자 포맷
   */
  type NumberFormat =
    | "number"
    | "number_with_commas"
    | "percent"
    | "dollar"
    | "canadian_dollar"
    | "singapore_dollar"
    | "euro"
    | "pound"
    | "yen"
    | "ruble"
    | "rupee"
    | "won"
    | "yuan"
    | "real"
    | "lira"
    | "rupiah"
    | "franc"
    | "hong_kong_dollar"
    | "new_zealand_dollar"
    | "krona"
    | "norwegian_krone"
    | "mexican_peso"
    | "rand"
    | "new_taiwan_dollar"
    | "danish_krone"
    | "zloty"
    | "baht"
    | "forint"
    | "koruna"
    | "shekel"
    | "chilean_peso"
    | "philippine_peso"
    | "dirham"
    | "colombian_peso"
    | "riyal"
    | "ringgit"
    | "leu"
    | "argentine_peso"
    | "uruguayan_peso"
    | "peruvian_sol";

  /**
   * @title 데이터베이스 숫자 속성
   */
  type NumberDatabaseProperty = {
    id: string;
    name: string;
    type: "number";
    number: {
      format: NumberFormat;
    };
  };

  /**
   * @title 데이터베이스 사람 속성
   */
  type PeopleDatabaseProperty = {
    id: string;
    name: string;
    type: "people";
    people: Record<string, never>;
  };

  /**
   * @title 데이터베이스 전화번호 속성
   */
  type PhoneNumberDatabaseProperty = {
    id: string;
    name: string;
    type: "phone_number";
    phone_number: Record<string, never>;
  };

  /**
   * @title 데이터베이스 관계 속성
   */
  type RelationDatabaseProperty = {
    id: string;
    name: string;
    type: "relation";
    relation: {
      database_id: string;
      synced_property_id: string;
      synced_property_name: string;
    };
  };

  /**
   * @title 데이터베이스 텍스트 속성
   */
  type RichTextDatabaseProperty = {
    id: string;
    name: string;
    type: "rich_text";
    rich_text: Record<string, never>;
  };

  /**
   * @title 집계 함수
   */
  type RollupFunction =
    | "count"
    | "count_values"
    | "empty"
    | "not_empty"
    | "unique"
    | "show_unique"
    | "percent_empty"
    | "percent_not_empty"
    | "sum"
    | "average"
    | "median"
    | "min"
    | "max"
    | "range"
    | "earliest_date"
    | "latest_date"
    | "date_range"
    | "checked"
    | "unchecked"
    | "percent_checked"
    | "percent_unchecked"
    | "count_per_group"
    | "percent_per_group"
    | "show_original";

  /**
   * @title 데이터베이스 집계 속성
   */
  type RollupDatabaseProperty = {
    type: "rollup";
    rollup: {
      rollup_property_name: string;
      relation_property_name: string;
      rollup_property_id: string;
      relation_property_id: string;
      function: RollupFunction;
    };
    id: string;
    name: string;
  };

  /**
   * @title 데이터베이스 선택 속성
   */
  type SelectDatabaseProperty = {
    id: string;
    name: string;
    type: "select";
    select: {
      options: {
        id: string;
        name: string;
        color: Color;
      }[];
    };
  };

  /**
   * @title 데이터베이스 상태 속성
   */
  type StatusDatabaseProperty = {
    id: string;
    name: string;
    type: "status";
    status: {
      options: {
        id: string;
        name: string;
        color: Color;
      }[];
      groups: {
        id: string;
        name: string;
        color: Color;
        option_ids: Array<string>;
      }[];
    };
  };

  /**
   * @title 데이터베이스 제목 속성
   */
  type TitleDatabaseProperty = {
    type: "title";
    title: Record<string, never>;
    id: string;
    name: string;
  };

  /**
   * @title 데이터베이스 Url 속성
   */
  type UrlDatabaseProperty = {
    type: "url";
    url: Record<string, never>;
    id: string;
    name: string;
  };

  /**
   * @title 데이터베이스 속성
   */
  export type DatabaseProperty =
    | NumberDatabaseProperty
    | FormulaDatabaseProperty
    | SelectDatabaseProperty
    | MultiSelectDatabaseProperty
    | StatusDatabaseProperty
    | RelationDatabaseProperty
    | RollupDatabaseProperty
    | TitleDatabaseProperty
    | RichTextDatabaseProperty
    | UrlDatabaseProperty
    | PeopleDatabaseProperty
    | FilesDatabaseProperty
    | EmailDatabaseProperty
    | PhoneNumberDatabaseProperty
    | DateDatabaseProperty
    | CheckboxDatabaseProperty
    | CreatedByDatabaseProperty
    | CreatedTimeDatabaseProperty
    | LastEditedByDatabaseProperty
    | LastEditedTimeDatabaseProperty;

  /**
   * - database: 데이터베이스
   * - page: 페이지
   * - user: 사람
   * - block: 블럭
   * - property_item: 속성 아이템
   * - list: 목록
   * - comment: 댓글
   *
   * @title 노션 개체 유형
   */
  export type NotionObject =
    | "database"
    | "page"
    | "user"
    | "block"
    | "property_item"
    | "list"
    | "comment";

  /**
   * - emoji: 이모지
   * - external: 외부 이미지
   * - file: 이미지 파일
   *
   * @title 노션 페이지 아이콘의 유형
   */
  type IconType = "emoji" | "external" | "file";

  /**
   * @title 페이지 생성에 필요한 조건
   */
  export interface ICreatePageInput extends ICommon.ISecret<"notion"> {
    /**
     * 새로 생성할 페이지의 부모 페이지
     *
     * @title 부모 페이지
     */
    parentPageId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/notion/get/page";
        jmesPath: JMESPath<IReadPageOutput[], "[].{value:pageId, label:title}">;
      }> &
      Placeholder<"부모 페이지를 선택하세요.">;

    /**
     * 새로 생성할 페이지 제목
     *
     * @title 페이지 제목
     */
    title: string & Placeholder<"테스트 페이지.">;

    /**
     * 페이지에 생성할 내용
     *
     * @title 내용
     */
    content: string & Placeholder<"테스트 페이지를 생성했습니다.">;
  }

  /**
   * @title 페이지 생성 결과
   */
  export interface ICreatePageOutput {
    /**
     * 생성된 페이지의 고유 id
     *
     * @title 페이지 id
     */
    id: string;
  }

  /**
   * @title 유저 정보
   */
  export interface IUser {
    /**
     * 유저 정보의 개체 유형
     *
     * @title 개체 유형
     */
    object: NotionObject;

    /**
     * 유저 고유 id
     *
     * @title 고유 id
     */
    id: string;

    /**
     * 유저의 이름
     *
     * @title 이름
     */
    name: string;

    /**
     * 프로필 사진 url
     *
     * @title 프로필 사진 url
     */
    avatar_url: string | null;

    /**
     * - person: 사람
     * - bot: 자동화 봇
     *
     * @title 유저 유형
     */
    type: "person" | "bot";

    /**
     * 유저 유형이 사람일 때의 정보
     *
     * @title 유저 정보
     */
    person?: {
      /**
       * 유저 이메일
       *
       * @title 이메일
       */
      email: string;
    };

    /**
     * 유저 유형이 bot일 때의 정보
     *
     * @title bot 정보
     */
    bot?: {
      /**
       * 봇을 소유하고 있는 유저의 정보
       *
       * @title 소유 정보
       */
      owner: {
        /**
         * 소유하고 있는 유저의 유형
         *
         * @title 유형
         */
        type: string;

        /**
         * 워크스페이스인지 여부
         *
         * @title 워크스페이스 여부
         */
        workspace: boolean;
      };
      /**
       * 워크스페이스 이름
       *
       * @title 워크스페이스 이름
       */
      workspace_name: string;
    };
  }

  /**
   * @title 유저 목록 조회 결과
   */
  export interface IUserOutput {
    /**
     * 유저 고유 id
     *
     * @title id
     */
    id: string;

    /**
     * 유저 이름
     *
     * @title 이름
     */
    name: string;
  }

  /**
   * @title 페이지 목록 조회 결과
   */
  export interface IReadPageOutput {
    /**
     * 페이지 고유 id
     *
     * @title id
     */
    pageId: string;

    /**
     * 페이지 제목
     *
     * @title 제목
     */
    title: string;
  }

  /**
   * @title 페이지에 내용을 추가할 때 필요한 정보
   */
  export interface IAppendPageToContentInput extends ICommon.ISecret<"notion"> {
    /**
     * 페이지에 추가할 내용
     *
     * @title 내용
     */
    content: string & Placeholder<"뤼튼 스튜디오">;
  }

  /**
   * @title 데이터베이스 속성 정보
   *
   * TODO: 타입 확정 및 inspector 구조에 맞추어 변경 필요
   */
  export interface IDatabasePropertyInput {
    /**
     * 데이터베이스 속성 별로 넣을 수 있는 값의 type이 다 다름
     * 일단 any로 선언 했는데, 속성별로 넣을 수 있는 값의 type을 Union으로 지정해야 되는지 구조 고민 필요함.
     *
     * TODO: 타입 확정 및 inspector 구조에 맞추어 변경 필요
     */
    [key: string]: any;
  }

  /**
   * @title 데이터베이스에 아이템을 추가할 때 필요한 정보
   */
  export interface ICreateDatabaseItemInput
    extends IDatabasePropertyInput,
      ICommon.ISecret<"notion"> {
    /**
     * 데이터베이스 속성에 추가할 값
     *
     * @title 속성 값
     */
    value?: string;

    /**
     * 생성할 데이터베이스 아이템 페이지에 넣을 내용
     *
     * @title 페이지에 넣을 내용
     */
    content?: string;

    /**
     * 생성할 데이터베이스 아이템 페이지 내용 유형
     *
     * @title 페이지 내용의 유형
     */
    contentType?: ContentType;
  }

  /**
   * @title 데이터베이스에 존재하는 아이템을 수정할 때 필요한 정보
   */
  export interface IUpdateDatabaseItemInput
    extends IDatabasePropertyInput,
      ICommon.ISecret<"notion"> {
    /**
     * 업데이트 할 페이지
     *
     * @title 페이지
     */
    pageId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/notion/get/page";
        jmesPath: JMESPath<IReadPageOutput[], "[].{value:pageId, label:title}">;
      }>;

    /**
     * 업데이트 할 데이터베이스 페이지 내용
     *
     * @title 내용
     */
    content?: string;

    /**
     * 업데이트 할 데이터베이스 속성 값
     *
     * @title 속성 값
     */
    value?: string;
  }

  /**
   * @title 데이터베이스 정보
   */
  export interface IDatabaseInfo {
    /**
     * 데이터베이스 고유 id
     *
     * @title id
     */
    id: string;

    /**
     * 데이터베이스 제목
     *
     * @title 제목P
     */
    title: string;

    /**
     * 데이터베이스 속성 정보
     *
     * @title 속성
     */
    properties: Record<string, DatabaseProperty>;
  }

  /**
   * @title 데이터베이스 속성 정보
   */
  export interface IDatabasePropertyInfo {
    /**
     * 데이터베이스 속성 고유 id
     *
     * @title id
     */
    id: string;

    /**
     * 데이터베이스 속성 이름
     *
     * @title 이름
     */
    name: string;

    /**
     * 데이터베이스 속성 유형
     *
     * @title 유형
     */
    type: string;

    /**
     * 데이터베이스 속성 값 정보
     *
     * @title 값
     *
     * TODO: 타입 확정 및 inspector 구조에 맞추어 변경 필요
     */
    [key: string]: any;
  }

  /**
   * @title 페이지 검색에 필요한 정보
   */
  export interface IFindPageOrDatabaseItemInput
    extends ICommon.ISecret<"notion"> {
    /**
     * 페이지 제목
     *
     * @title 제목
     */
    title: string;
  }

  /**
   * @title 데이터베이스에 있는 아이템을 찾을 때 필요한 정보
   */
  export interface IFindDatabaseItemInput extends ICommon.ISecret<"notion"> {
    /**
     * 데이터베이스 아이템에 있는 아이템의 제목
     *
     * @title 제목
     */
    title?: string;

    /**
     * 데이터베이스 아이템에 있는 숫자
     *
     * @title 숫자
     */
    number?: number & tags.Type<"int32">;

    /**
     * 데이터베이스 아이템에 있는 url
     *
     * @title url
     */
    url?: string & tags.Format<"uri">;

    /**
     * 데이터베이스 아이템에 있는 이메일 주소
     *
     * @title 이메일 주소
     */
    email?: string & tags.Format<"email">;

    /**
     * 데이터베이스 아이템에 있는 텍스트
     *
     * @title 텍스트
     */
    rich_text?: string;

    /**
     * 데이터베이스 아이템에 있는 전화번호
     *
     * @title 전화번호
     */
    phone_number?: string;

    /**
     * 데이터베이스 아이템을 찾을 때 속성가 여러개 올 수 있음 (제목, 숫자, url, 이메일, 텍스트, 전화번호)
     * 속성마다 오는 value들이 다 다르므로 일단 any로 선언
     *
     * TODO: 타입 확정 및 inspector 구조에 맞추어 변경 필요
     */
    [key: string]: any;
  }

  /**
   * @title 페이지 정보
   */
  interface ICommonPageOutputInterface extends ICreatePageOutput {
    /**
     * 페이지 객체의 유형
     *
     * @title 개체 유형
     */
    object: NotionObject;

    /**
     * 페이지가 생성된 일자
     *
     * @title 생성 일자
     */
    created_time: string;

    /**
     * 페이지가 마지막으로 수정된 일자
     *
     * @title 마지막 수정 일자
     */
    last_edited_time: string;

    /**
     * 페이지를 생성한 사람에 대한 정보
     *
     * @title 생성한 사람
     */
    created_by: {
      /**
       * 페이지를 생성한 사람 객체의 유형
       *
       * @title 개체 유형
       */
      object: NotionObject;

      /**
       * 페이지를 생성한 사람의 고유 id
       *
       * @title id
       */
      id: string;
    };

    /**
     * 페이지를 마지막으로 수정한 사람에 대한 정보
     *
     * @title 마지막으로 수정한 사람
     */
    last_edited_by: {
      /**
       * 페이지를 마지막으로 수정한 사람 객체의 유형
       *
       * @title 개체 유형
       */
      object: NotionObject;

      /**
       * 페이지를 마지막으로 수정한 사람의 고유 id
       *
       * @title id
       */
      id: string;
    };

    /**
     * 페이지 배경 이미지 정보
     *
     * @title 배경 이미지
     */
    cover: IPageCover | null;

    /**
     * 페이지 아이콘 정보
     *
     * @title 아이콘
     */
    icon: IPageIcon | null;

    /**
     * 페이지 임시 보관 여부
     *
     * @title 임시 보관 여부
     */
    archived: boolean;

    /**
     * 페이지 url
     *
     * @title url
     */
    url: string & tags.Format<"uri">;

    /**
     * 페이지 공개 url
     *
     * @title 공개 url
     */
    public_url: (string & tags.Format<"uri">) | null;
  }

  /**
   * @title 외부 이미지 정보
   */
  interface IExternalImage {
    /**
     * 이미지 url
     *
     * @title url
     */
    url: string & tags.Format<"uri">;
  }

  /**
   * @title 페이지 배경 이미지 정보
   */
  interface IPageCover {
    /**
     * 이미지 유형
     *
     *  @title 유형
     */
    type: string;

    /**
     * 이미지 정보
     *
     * @title 이미지
     */
    external: IExternalImage;
  }

  /**
   * @title 페이지 아이콘 정보
   */
  interface IPageIcon {
    /**
     * 아이콘 유형
     *
     * @title 유형
     */
    type: IconType;

    /**
     * 아이콘 유형이 emoji 일 때의 아이콘 정보
     *
     * @title 이모지 아이콘
     */
    emoji?: string | null;

    /**
     * 아이콘 유형이 icon 일 때의 아이콘 정보
     *
     * @title 아이콘
     */
    external?: IExternalImage | null;

    /**
     * 아이콘 유형이 file 일 때의 아이콘 정보
     *
     * @title 아이콘 파일
     */
    file?: {
      /**
       * 파일 url
       *
       * @title url
       */
      url: string & tags.Format<"uri">;

      /**
       * 이미지 파일 만료시간
       *
       * @title 만료시간
       */
      expiry_time: string;
    };
  }

  /**
   * @title 페이지 속성 정보
   */
  interface IFindPageProperty {
    /**
     * 제목 속성의 정보
     *
     * @title 제목 속성
     */
    title: {
      /**
       * 페이지 속성 id
       *
       * @title id
       */
      id: string;

      /**
       * 페이지 속성 유형
       *
       * @title 속성 유형
       */
      type: string;

      /**
       * 페이지 제목 속성 정보
       *
       * @title 제목 속성
       */
      title: IFindPageTitleProperty[];
    };
  }

  /**
   * @title 페이지 제목 속성
   */
  interface IFindPageTitleProperty {
    /**
     * 제목 속성 유형
     *
     * @title 유형
     */
    type: string;

    /**
     * 페이지 제목 텍스트 정보
     *
     * @title 텍스트 정보
     */
    text: IPageTitleText;

    /**
     * 페이지 제목 부가 정보
     *
     * @title 부가 정보
     */
    annotations: IPageTitleAnnotation;

    /**
     * 페이지 제목 원본 텍스트
     *
     * @title 원본
     */
    plain_text: string;

    /**
     * 페이지 링크
     *
     * @title 링크
     */
    href: (string & tags.Format<"uri">) | null;
  }

  /**
   * @title 페이지 제목 텍스트 정보
   */

  interface IPageTitleText {
    /**
     * 제목 텍스트 내용
     *
     * @title 내용
     */
    content: string;

    /**
     * 페이지 제목 링크
     *
     * @title 링크
     */
    link: (string & tags.Format<"uri">) | null;
  }

  /**
   * @title 페이지 제목 부가 정보
   */
  interface IPageTitleAnnotation {
    /**
     * 제목 텍스트 볼드체 여부
     *
     * @title 볼드체 여부
     */
    bold: boolean;

    /**
     * 제목 텍스트 이탤릭체 여부
     *
     * @title 이탤릭체 여부
     */
    italic: boolean;

    /**
     * 제목 텍스트 취소선 여부
     *
     * @title 취소선 여부
     */
    strikethrough: boolean;

    /**
     * 제목 텍스트 밑줄 여부
     *
     * @title 밑줄 여부
     */
    underline: boolean;

    /**
     * 제목 텍스트가 코드로 감싸져 있는지 여부
     *
     * @title 코드로 감싸져 있는지 여부
     */
    code: boolean;

    /**
     * 제목 텍스트 색상
     *
     * @title 색깔
     */
    color: string;
  }

  export interface IFindPageByTitleOutput extends ICommonPageOutputInterface {
    /**
     * 부모 페이지 정보
     *
     * @title 부모 페이지
     */
    parent: {
      /**
       * 부모 페이지 객체 유형
       *
       * @title 유형
       */
      type: string;

      /**
       * 부모 페이지가 워크스페이스 인지 여부
       *
       * @title 워크스페이스 여부
       */
      workspace: boolean;
    };

    /**
     * 페이지 속성 정보
     *
     * @title 속성
     */
    properties: IFindPageProperty;
  }

  /**
   * @title 데이터베이스 아이템 생성 결과
   */
  export interface IDatabaseItemOutput extends ICommonPageOutputInterface {
    /**
     * 부모 데이터베이스 아이템 정보
     *
     * @title 부모 데이터베이스 아이템
     */
    parent: {
      /**
       * 부모 데이터베이스 아이템 객체 유형
       *
       * @title 유형
       */
      type: string;

      /**
       * 데이터 베이스 아이템 부모 id
       *
       * @title 데이터베이스 id
       */
      database_id: string;
    };

    /**
     * 데이터베이스 아이템 속성
     *
     * @title 속성
     */
    properties: any;
  }

  export type ISecret = ICommon.ISecret<"notion">;
}
