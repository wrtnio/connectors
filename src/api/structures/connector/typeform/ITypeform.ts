import { Prerequisite } from "@wrtnio/decorators";
import { ICommon } from "../common/ISecretValue";

export namespace ITypeform {
  export type ISecret = ICommon.ISecret<
    "typeform",
    [
      "accounts:read",
      "forms:read",
      "forms:write",
      "images:read",
      "images:write",
      "responses:read",
      "responses:write",
      "themes:read",
      "themes:write",
      "workspaces:read",
      "workspaces:write",
    ]
  >;

  export interface IGetFieldForUpdateFieldValueInput extends ISecret {
    /**
     * 값을 업데이트 할 필드의 id.
     *
     * @title 필드 id.
     */
    formId: string &
      Prerequisite<{
        method: "post";
        path: "connector/typeform/get-forms";
        jmesPath: "[].{value:formId, label:name || '폼 이름'}";
      }>;
  }
  export interface ICreateWorkspaceInput
    extends ICommon.ISecret<
      "typeform",
      [
        "accounts:read",
        "forms:read",
        "forms:write",
        "images:read",
        "images:write",
        "responses:read",
        "responses:write",
        "themes:read",
        "themes:write",
        "workspaces:read",
        "workspaces:write",
      ]
    > {
    /**
     * 생성할 워크스페이스 이름입니다.
     *
     * @title 워크스페이스 이름.
     */
    name: string;
  }

  export interface ICreateWorkspaceOutput {
    /**
     * 생성된 워크스페이스 id입니다.
     *
     * @title 워크스페이스 id.
     */
    id: string;

    /**
     * 생성된 워크스페이스 이름입니다.
     *
     * @title 워크스페이스 이름.
     */
    name: string;

    /**
     * 생성된 워크스페이스 링크입니다.
     *
     * @title 워크스페이스 링크.
     */
    link: string;
  }
  export interface IFindWorkspaceOutput {
    /**
     * 읽어온 워크스페이스의 id 입니다.
     *
     * @title 워크스페이스 id.
     */
    workspace_id: string;

    /**
     * 읽어온 워크스페이스의 이름입니다.
     *
     * @title 워크스페이스 이름.
     */
    name: string;

    /**
     * 읽어온 워크스페이스의 링크입니다.
     *
     * @title 워크스페이스 링크.
     */
    link: string;
  }

  export interface ICreateEmptyFormInput
    extends ICommon.ISecret<
      "typeform",
      [
        "accounts:read",
        "forms:read",
        "forms:write",
        "images:read",
        "images:write",
        "responses:read",
        "responses:write",
        "themes:read",
        "themes:write",
        "workspaces:read",
        "workspaces:write",
      ]
    > {
    /**
     * 생성할 폼의 제목입니다.
     *
     * @title 폼 제목.
     */
    name: string;
  }

  export interface ICreateFormOutput {
    /**
     * 생성된 폼의 id입니다.
     *
     * @title 폼 id.
     */
    id: string;

    /**
     * 생성된 폼의 이름입니다.
     *
     * @title 폼 이름.
     */
    name: string;

    /**
     * 생성된 폼의 타입입니다.
     *
     * @title 폼 타입.
     */
    type: string;
  }
  export interface IFindFormOutput {
    /**
     * 읽어온 폼의 id입니다.
     *
     * @title 폼 id.
     */
    formId: string &
      Prerequisite<{
        method: "post";
        path: "connector/typeform/get-forms";
        jmesPath: "[].{value:formId, label:name || '폼 이름'}";
      }>;

    /**
     * 읽어온 폼의 이름입니다.
     *
     * @title 폼 이름.
     */
    name: string;
  }

  export interface IDuplicateExistingFormInput
    extends ICommon.ISecret<
      "typeform",
      [
        "accounts:read",
        "forms:read",
        "forms:write",
        "images:read",
        "images:write",
        "responses:read",
        "responses:write",
        "themes:read",
        "themes:write",
        "workspaces:read",
        "workspaces:write",
      ]
    > {
    /**
     * 값을 업데이트 할 폼.
     *
     * @title 폼.
     */
    formId: string &
      Prerequisite<{
        method: "post";
        path: "connector/typeform/get-forms";
        jmesPath: "[].{value:formId, label:name || '폼 이름'}";
      }>;

    /**
     * 폼을 복제할 워크스페이스 링크입니다.
     *
     * @title 워크스페이스 링크.
     */
    workspaceLink: string;

    /**
     * 복제하여 생성할 폼의 이름입니다.
     *
     * @title 폼 이름.
     */
    name: string;
  }

  export interface IFieldInfoForUpdateFieldValueOutput {
    /**
     * 값을 업데이트 할 필드
     *
     * @title 필드
     */
    id: string &
      Prerequisite<{
        method: "post";
        path: "connector/typeform/forms/get-update-form-fields";
        jmesPath: "[].{value:id, label:name || '필드 이름'}";
      }>;

    /**
     * 값을 업데이트 할 필드의 명.
     *
     * @title 필드 명.
     */
    name: string;
  }

  export interface IUpdateFormFieldValueInput
    extends ICommon.ISecret<
      "typeform",
      [
        "accounts:read",
        "forms:read",
        "forms:write",
        "images:read",
        "images:write",
        "responses:read",
        "responses:write",
        "themes:read",
        "themes:write",
        "workspaces:read",
        "workspaces:write",
      ]
    > {
    /**
     * 값을 업데이트 할 폼.
     *
     * @title 폼.
     */
    formId: string &
      Prerequisite<{
        method: "post";
        path: "connector/typeform/get-forms";
        jmesPath: "[].{value:formId, label:name || '폼 이름'}";
      }>;

    /**
     * 값을 업데이트 할 필드.
     *
     * @title 업데이트 할 필드.
     */
    fieldId: string &
      Prerequisite<{
        method: "post";
        path: "connector/typeform/forms/get-update-form-fields";
        jmesPath: "[].{value:id, label:name || '필드 이름'}";
      }>;

    /**
     * 업데이트 할 필드의 값입니다.
     *
     * @title 필드 값.
     */
    value: string[];
  }

  export interface IUpdateFormFieldValueOutput extends IFindFormOutput {
    /**
     * 값이 업데이트 된 필드의 정보입니다.
     *
     * @title 값이 업데이트 된 필드 정보.
     */
    fields: IFieldInformation[];
  }

  export interface IFieldInformation
    extends IFieldInfoForUpdateFieldValueOutput {
    /**
     * 업데이트 된 필드의 값입니다.
     *
     * @title 필드 값.
     */
    value: string;
  }

  export interface IFormFieldOutput {
    /**
     * 폼에 있는 필드의 id입니다.
     *
     * @title 필드의 id.
     */
    id: string;

    /**
     * 폼에 있는 필드의 제목입니다.
     *
     * @title 필드의 제목.
     */
    title: string;

    /**
     * 폼에 있는 필드의 별칭입니다.
     *
     * @title 필드 별칭.
     */
    ref: string;

    /**
     * 필드의 속성 정보입니다.
     *
     * @title 필드의 속성.
     */
    properties: IFieldProperties;

    /**
     * 필드의 유효성 검사 정보입니다.
     *
     * @title 필드의 유효성 검사.
     */
    validations: {
      /**
       * 필수 필드 여부입니다.
       *
       * @title 필수 필드 여부.
       */
      required: boolean;
    };

    /**
     * 필드의 타입입니다.
     * ex) text, choice ...
     *
     * @title 필드의 타입.
     */
    type: string;
  }

  interface IFieldProperties {
    /**
     * 필드의 설명입니다.
     *
     * @title 필드 설명.
     */
    description: string;

    /**
     * 선택지를 무작위로 배치 할지 여부입니다.
     *
     * @title 선택지 무작위 배치 여부.
     */
    randomize: boolean;

    /**
     * 다중 선택을 허용할지 여부입니다.
     *
     * @title 다중 선택 허용 여부.
     */
    allow_multiple_selection: boolean;

    /**
     * 선택지 정보입니다.
     *
     * @title 선택지.
     */
    choices: IChoice[];
  }

  export interface IChoice {
    /**
     * 선택지의 고유 id입니다.
     *
     * @title 선택지 고유 id.
     */
    id: string;

    /**
     * 선택지의 별칭입니다.
     *
     * @title 선택지 별칭.
     */
    ref: string;

    /**
     * 선택지의 라벨입니다.
     *
     * @title 선택지 라벨.
     */
    label: string;
  }
  export interface IFormOutput {
    /**
     * 폼의 id입니다.
     *
     * @title 폼 id.
     */
    id: string;

    /**
     * 폼의 타입입니다.
     *
     * @title 폼 타입.
     */
    type: string;

    /**
     * 폼의 제목입니다.
     *
     * @title 폼 제목.
     */
    title: string;

    /**
     * 폼이 속한 워크스페이스 정보입니다.
     *
     * @title 폼이 속한 워크스페이스 정보.
     */
    workspace: {
      /**
       * 워크스페이스 하이퍼링크입니다.
       *
       * @title 워크스페이스 링크.
       */
      href: string;
    };

    /**
     * 폼의 테마 정보입니다.
     *
     * @title 테마 정보.
     */
    theme: {
      /**
       * 폼의 테마 하이퍼링크입니다.
       *
       * @title 테마 링크.
       */
      href: string;
    };

    /**
     * 폼의 설정 정보입니다.
     *
     * @title 폼 설정 정보.
     */
    settings: ISettings;

    /**
     * 폼 작성 완료 후 사용자에게 보여지는 감사 메시지 화면 정보입니다.
     *
     * @title 폼 작성 완료 후 보여지는 감사 메시지 화면 정보.
     */
    thankyou_screens: IThankyouScreens[];

    /**
     * 폼의 필드 정보입니다.
     *
     * @title 폼 필드 정보.
     */
    fields: IFormFieldOutput[];

    /**
     * 폼의 생성 날짜입니다.
     *
     * @title 폼 생성 날짜.
     */
    created_at: string;

    /**
     * 폼의 마지막 업데이트 날짜입니다.
     *
     * @title 폼 마지막 업데이트 날짜.
     */
    last_updated_at: string;

    /**
     * 폼의 공개 날짜입니다.
     *
     * @title 폼 공개 날짜.
     */
    published_at: string;

    /**
     * 해당 리소스와 관련된 하이퍼링크를 제공합니다.
     *
     * @title 해당 리소스와 관련된 하이퍼링크를 제공.
     */
    _links: {
      /**
       * 주로 양식을 완성한 후 해당 양식을 사용자에게 보여주거나 공유할 목적으로 사용됩니다.
       *
       * @title 사용자가 양식을 작성할 수 있는 웹 페이지로 이동할 수 있는 URL.
       */
      display: string;

      /**
       * 양식을 작성한 사용자들의 응답을 수집하거나 분석할 때 이 링크를 통해 접근 가능.
       * \
       * @title 양식에 대한 응답을 조회할 수 있는 API 엔드포인트의 URL.
       */
      responses: string;
    };
  }

  interface ISettings {
    /**
     * 양식의 언어입니다.
     * ex) ko: 한국어.
     *
     * @title 양식의 언어.
     */
    language: string;

    /**
     * 진행 바의 표시 방식을 설정합니다.
     * ex) percentage: 백분율.
     *
     * @title 진행 바의 표시 방식.
     */
    progress_bar: string;

    /**
     * 추가 설정을 설정합니다.
     *
     * @title 추가 설정.
     */
    meta: {
      /**
       * 검색엔진에 의해 색인 허용 여부입니다.
       *
       * @title 검색엔진에 의해 색인 허용 여부.
       */
      allow_indexing: boolean;
    };

    /**
     * 양식 내의 네비게이션을 숨길지 여부입니다.
     *
     * @title 양식 내의 네비게이션 숨길지 여부.
     */
    hide_navigation: boolean;

    /**
     * 양식의 공개 여부입니다.
     *
     * @title 양식의 공개 여부.
     */
    is_public: boolean;

    /**
     * 양식이 시험 버전인지 여부입니다.
     *
     * @title 양식이 시험 버전인지 여부.
     */
    is_trial: boolean;

    /**
     * 진행 바 표시 여부입니다.
     *
     * @title 진행 바 표시 여부.
     */
    show_progress_bar: boolean;

    /**
     * Typeform의 브랜딩 표시 여부입니다.
     *
     * @title Typeform의 브랜딩 표시 여부.
     */
    show_typeform_branding: boolean;

    /**
     * 파일 업로드 공개적으로 접근 가능 여부입니다.
     *
     * @title 파일 업로드 공개적으로 접근 가능 여부.
     */
    are_uploads_public: boolean;

    /**
     * 양식 완성 예상 시간 표시 여부입니다.
     *
     * @title 양식 완성 예상 시간 표시 여부.
     */
    show_time_to_complete: boolean;

    /**
     * 양식 제출 횟수 표시 여부입니다.
     *
     * @title 양식 제출 횟수 표시 여부.
     */
    show_number_of_submissions: boolean;

    /**
     * 쿠키 동의 표시 여부입니다.
     *
     * @title 쿠키 동의 표시 여부.
     */
    show_cookie_consent: boolean;

    /**
     * 질문 번호 표시 여부입니다.
     *
     * @title 질문 번호 표시 여부.
     */
    show_question_number: boolean;

    /**
     * 선택지 키보드 단축기 힌트 표시 여부입니다.
     *
     * @title 선택지 키보드 단축기 힌트 표시 여부.
     */
    show_key_hint_on_choices: boolean;

    /**
     * 진행 상황 자동 저장 여부입니다.
     *
     * @title 진행 상황 자동 저장 여부.
     */
    autosave_progress: boolean;

    /**
     * 양식 내에서 자유롭게 이동 가능 여부입니다.
     *
     * @title 양식 내에서 자유롭게 이동 가능 여부.
     */
    free_form_navigation: boolean;

    /**
     * 리드 자격 사용 여부입니다.
     *
     * @title 리드 자격 사용 여부.
     */
    use_lead_qualification: boolean;

    /**
     * 서브도메인 가능 여부입니다.
     *
     * @title 서브도메인 가능 여부.
     */
    pro_subdomain_enabled: boolean;

    /**
     * 추가 기능 설정입니다.
     *
     * @title 추가 기능 설정.
     */
    capabilities: {
      /**
       * 양식의 처음 부터 끝까지 암호화 여부입니다.
       *
       * @title 양식의 처음 부터 끝까지 암호화 여부.
       */
      e2e_encryption: {
        /**
         * 암호화 활성화 여부 입니다.
         *
         * @title 활성화 여부.
         */
        enabled: boolean;

        /**
         * 암호화 설정 변경 가능 여부 입니다.
         *
         * @title 변경 가능 여부.
         */
        modifiable: boolean;
      };
    };
  }
  interface IThankyouScreens {
    /**
     * 감사 메시지 화면의 id입니다.
     *
     * @title 감사 메시지 화면의 id.
     */
    id: string;

    /**
     * 감사 메시지 화면의 별칭입니다.
     *
     * @title 감사 메시지 화면의 별칭.
     */
    ref: string;

    /**
     * 감사 메시지 화면의 제목입니다.
     *
     * @title 감사 메시지 화면의 제목.
     */
    name: string;

    /**
     * 감사 메시지 화면의 타입입니다.
     *
     * @title 감사 메시지 화면의 타입.
     */
    type: string;

    /**
     * 감사 메시지 화면의 속성 정보입니다.
     *
     * @title 감사 메시지 화면의 속성.
     */
    properties: {
      /**
       * 버튼 표시 여부입니다.
       *
       * @title 버튼 표시 여부.
       */
      show_button: boolean;

      /**
       * 공유 아이콘 표시 여부입니다.
       *
       * @title 공유 아이콘 표시 여부.
       */
      share_icons: boolean;

      /**
       * 버튼 모드입니다.
       *
       * @title 버튼 모드.
       */
      button_mode: string;

      /**
       * 버튼 텍스트입니다.
       *
       * @title 버튼 텍스트.
       */
      button_text: string;
    };

    /**
     * 첨부 파일 정보입니다.
     *
     * @title 첨부 파일 정보.
     */
    attachment: {
      /**
       * 첨부 파일의 타입입니다.
       *
       * @title 첨부 파일 타입.
       */
      type: string;

      /**
       * 첨부 파일의 하이퍼링크입니다.
       *
       * @title 첨부 파일 하이퍼링크.
       */
      href: string;
    };
  }
}
