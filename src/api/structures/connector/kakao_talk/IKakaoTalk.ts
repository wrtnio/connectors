import { tags } from "typia";

import { ICommon } from "../common/ISecretValue";

export namespace IKakaoTalk {
  /**
   * @title 카카오 로그인 후 받게 되는 코드 DTO.
   */
  export interface IAuthorizationCode {
    /**
     * @title kakaoTalk OAuth2 authorization code.
     */
    code: string;
  }

  /**
   * @title 액세스 토큰 출력 DTO.
   */
  export interface IGetAccessTokenOutput {
    /**
     * @title 액세스 토큰.
     */
    access_token: string;

    /**
     * @title 토큰 타입.
     */
    token_type: "bearer";

    /**
     * @title 리프레시 토큰.
     */
    refresh_token: string;

    /**
     * @title 이 액세스 토큰의 권한 범위.
     */
    scope: string;

    /**
     * @title 액세스 토큰 만료 시간.
     */
    expires_in: number;

    /**
     * @title 리프레시 토큰 만료 시간.
     */
    refresh_token_expires_in: number;
  }

  /**
   * @title 카카오 액세스 토큰을 갱신하기 위한 DTO.
   */
  export interface IRefreshAccessTokenInput {
    refresh_token: string;
  }

  export interface IGetCalendarOutput {
    /**
     * @title 기본 캘린더, 서브 캘린더 목록.
     */
    calendars?: IKakaoTalk.Calendar[];

    /**
     * @title 구독한 구독 캘린더 목록.
     */
    subscribe_calendars?: IKakaoTalk.SubscribeCalendars[];
  }

  /**
   * @tite 구독한 구독 캘린더 목록.
   */
  export interface SubscribeCalendars extends IKakaoTalk.Calendar {
    /**
     * @title 채널에서 설정한 구독 캘린더 설명.
     */
    description?: string;

    /**
     * @title 구독 캘린더의 프로필 이미지 URL.
     */
    profile_image_url?: string;

    /**
     * @title 구독 캘린더의 말풍선 썸네일 URL.
     */
    thumbnail_url?: string;
  }

  /**
   * @title 기본 캘린더, 서브 캘린더 목록.
   */
  export interface Calendar {
    /**
     * @title 캘린더 ID.
     *
     * 유저마다 기본적으로 가지고 있는 캘린더의 경우 `primary`라고 한다.
     */
    id: string & tags.Default<"primary">;

    /**
     * @title 캘린더의 이름.
     */
    name?: string;

    /**
     * @title 캘린더 일정의 기본 색상.
     */
    color?:
      | Constant<"BLUE", { title: "BLUE"; description: "2C88DE" }>
      | Constant<"ROYAL_BLUE", { title: "ROYAL_BLUE"; description: "2D69E0" }>
      | Constant<"NAVY_BLUE", { title: "NAVY_BLUE"; description: "223788" }>
      | Constant<"RED", { title: "RED"; description: "D42726" }>
      | Constant<"PINK", { title: "PINK"; description: "ED5683" }>
      | Constant<"ORANGE", { title: "ORANGE"; description: "FF9429" }>
      | Constant<"GREEN", { title: "GREEN"; description: "149959" }>
      | Constant<"LIME", { title: "LIME"; description: "7CB343" }>
      | Constant<"OLIVE", { title: "OLIVE"; description: "A4AD15" }>
      | Constant<"MINT", { title: "MINT"; description: "5CC5BE" }>
      | Constant<"MAGENTA", { title: "MAGENTA"; description: "AB47BC" }>
      | Constant<"VIOLET", { title: "VIOLET"; description: "8A4B9B" }>
      | Constant<"LAVENDER", { title: "LAVENDER"; description: "7986CB" }>
      | Constant<"BROWN", { title: "BROWN"; description: "945C1F" }>
      | Constant<"GRAY", { title: "GRAY"; description: "666666" }>;

    /**
     * @title 종일 일정이 아닌 일정의 기본 알림 시간.
     */
    reminder?: number & tags.Type<"int64">;

    /**
     * @title 종일 일정의 기본 알림 시간.
     */
    reminder_all_day?: number & tags.Type<"int64">;
  }

  /**
   * @title 액세스 토큰 갱신 출력 DTO.
   */
  export type IRefreshAccessTokenOutput = Pick<
    IGetAccessTokenOutput,
    "access_token" | "expires_in" | "token_type"
  >;

  /**
   * @title 카카오 메시지 본문 상의 버튼을 의미.
   */
  export interface Button {
    /**
     * @title 버튼의 이름.
     */
    title: string;

    /**
     * @title 콘텐츠 클릭 시 이동할 링크 정보.
     */
    link: IKakaoTalk.ButtonLink;
  }

  /**
   * @title 콘텐츠를 클릭 시 이동할 링크 정보.
   */
  export type ButtonLink =
    | IWebLink
    | IMobileWebLink
    | IAndroidAppLink
    | IiOSAppLink;

  export interface IWebLink {
    /**
     * @title PC버전 카카오톡에서 사용하는 웹 링크 URL.
     *
     * 도메인 부분은 [내 애플리케이션] > [플랫폼] > [Web]에서 등록한 사이트 도메인과 일치해야 함.
     */

    web_url: string;
  }

  export interface IMobileWebLink {
    /**
     * @title 모바일 카카오톡에서 사용하는 웹 링크 URL.
     *
     * 도메인 부분은 [내 애플리케이션] > [플랫폼] > [Web]에서 등록한 사이트 도메인과 일치해야 함.
     */
    mobile_web_url: string;
  }

  export interface IAndroidAppLink {
    /**
     * @title 안드로이드 카카오톡에서 사용하는 앱 링크 URL에 사용될 파라미터.
     *
     * 해당 값이 없을 경우 mobile_web_url 이용.
     */
    android_execution_params: string;
  }

  export interface IiOSAppLink {
    /**
     * @title iOS 카카오톡에서 사용하는 앱 링크 URL에 사용될 파라미터.
     *
     * 해당 값이 없을 경우 mobile_web_url 이용.
     */
    ios_execution_params: string;
  }

  export interface ISendKakaoTalkInput
    extends ICommon.ISecret<
      "kakao",
      ["talk_message", "profile_image", "profile_nickname"]
    > {
    /**
     * @title 메시지 구성 요소를 담은 객체(Object).
     *
     * 피드, 리스트, 위치, 커머스, 텍스트, 캘린더 중 하나.
     */
    template_object: IFeedMemoInput | ITextMemoInput | ICalendarMemoInput;
  }

  export interface ICalendarMemoInput {
    /**
     * @title 템플릿 종류.
     */
    object_type: "calendar";

    /**
     * @title `id`의 타입.
     */
    id_type:
      | Constant<"event", { title: "공개 일정" }>
      | Constant<"calendar", { title: "구독 캘린더" }>;

    /**
     * @title 공개 일정 혹은 구독 캘린더의 ID.
     */
    id: string;

    /**
     * @title 일정 제목과 설명.
     */
    content: IKakaoTalk.Content;

    /**
     * @title 사용자 정의 버튼 정보.
     *
     * 캘린더 메시지는 기본적으로 공개 일정 추가 또는 구독 캘린더 구독을 위한 기본 버튼을 제공함.
     *
     * 따라서 1개의 사용자 정의 버튼을 선택적으로 추가 가능.
     */
    buttons?: IKakaoTalk.Button[] & tags.MaxItems<1>;
  }

  export interface IFeedMemoInput {
    /**
     * @title 템플릿 종류.
     */
    object_type: "feed";

    /**
     * @title 아이템 영역에 포함할 콘텐츠.
     */
    item_content: IKakaoTalk.ItemContent;

    /**
     * @title 메시지의 메인 콘텐츠 정보.
     */
    content: IKakaoTalk.Content;

    /**
     * @title 콘텐츠에 대한 소셜 정보.
     */
    social?: IKakaoTalk.Social;

    /**
     * @title 버튼의 이름.
     *
     * `button`이 있을 시에는 `button` 프로퍼티를 우선시한다.
     *
     * 기본 버튼 타이틀("자세히 보기")을 변경하고 싶을 때 설정.
     */
    button_title?: string;

    /**
     * @title 버튼.
     *
     * 버튼 목록, 최대 2개.
     *
     * 버튼 타이틀과 링크를 변경하고 싶을 때, 버튼 두 개를 넣고 싶을 때 사용.
     */
    buttons?: IKakaoTalk.Button[] & tags.MaxItems<2>;
  }

  export interface ItemContent {
    /**
     * @title 헤더 또는 프로필 영역에 출력될 텍스트.
     *
     * profile_image_url 값이 없을 경우, 볼드(Bold)체로 된 제목만 담은 헤더 형태로 출력됨.
     */
    profile_text?: string & tags.MaxLength<16>;

    /**
     * @title 프로필 영역에 출력될 이미지.
     *
     * 작은 원형의 프로필 사진 형태로 출력됨.
     */
    profile_image_url?: string & tags.Format<"url">;

    /**
     * @title 이미지 아이템의 이미지.
     *
     * iOS 108*108, Android 98*98 크기.
     *
     * 1:1 비율이 아닌 이미지는 센터 크롭(Center crop) 방식으로 재조정됨.
     */
    title_image_url?: string & tags.Format<"url">;

    /**
     * @title 이미지 아이템의 제목.
     *
     * 최대 2줄.
     */
    title_image_text?: string & tags.MaxLength<24>;

    /**
     * @title 이미지 아이템의 제목 아래에 회색 글씨로 출력되는 카테고리 정보.
     *
     * 최대 1줄.
     */
    title_image_category?: string & tags.MaxLength<14>;

    /**
     * @title 각 텍스트 아이템 정보.
     */
    items?: IKakaoTalk.ItemInfo[] & tags.MaxItems<5>;

    /**
     * @title 주문금액, 결제금액 등 아이템 영역의 요약 정보 제목.
     */
    sum?: string & tags.MaxLength<6>;

    /**
     * @title 아이템 영역의 가격 합산 정보.
     */
    sum_op?: string & tags.MaxLength<11>;
  }

  export interface ItemInfo {
    /**
     * @title 아이템 이름.
     */
    item: string & tags.MaxLength<6>;

    /**
     * @title 아이템 가격.
     */
    item_op: string & tags.MaxLength<14>;
  }

  /**
   * @title 콘텐츠의 내용을 담고 있는 오브젝트.
   *
   * title, image_url, description 중 하나 필수.
   */
  export type Content = (
    | {
        /**
         * @title 콘텐츠의 타이틀.
         */
        title: string;
      }
    | {
        /**
         * @title 콘텐츠의 이미지 URL.
         *
         * 이미지의 크기는 `5MB`를 초과해선 안 된다.
         */
        image_url: string & tags.Format<"url">;
      }
    | {
        /**
         * @title 콘텐츠의 상세 설명
         *
         * title과 합쳐 최대 4줄 표시.
         */
        description: string;
      }
  ) & {
    /**
     * @title 콘텐츠의 이미지 너비, 픽셀 단위.
     */
    image_width?: number & tags.Type<"int32"> & tags.Minimum<200>;

    /**
     * @title 콘텐츠의 이미지 높이, 픽셀 단위.
     */
    image_height?: number & tags.Type<"int32"> & tags.Minimum<200>;

    /**
     * @title 콘텐츠 클릭 시 이동할 링크 정보.
     */
    link: IKakaoTalk.ButtonLink;
  };

  /**
   * @title 좋아요 수, 댓글 수 등의 소셜 정보를 표현하기 위해 사용되는 오브젝트.
   *
   * 5개의 속성 중 최대 3개까지만 표시한다.
   *
   * 우선 순위는 Like > Comment > Shared > View > Subscriber 순서.
   */
  export interface Social {
    /**
     * @title 콘텐츠의 좋아요 수.
     */
    like_count?: number & tags.Type<"int64">;

    /**
     * @title 콘텐츠의 댓글 수.
     */
    comment_count?: number & tags.Type<"int64">;

    /**
     * @title 콘텐츠의 공유 수.
     */
    shared_count?: number & tags.Type<"int64">;

    /**
     * @title 콘텐츠의 조회 수.
     */
    view_count?: number & tags.Type<"int64">;

    /**
     * @title 콘텐츠의 구독 수.
     */
    subscriber_count?: number & tags.Type<"int64">;
  }

  /**
   * 텍스트 타입으로 전송할 메시지의 입력 DTO.
   */
  export interface ITextMemoInput {
    /**
     * @title 전송할 메시지의 타입.
     */
    object_type: tags.Constant<
      "text",
      {
        title: "텍스트 타입의 템플릿.";
        description: "단순히 텍스트 메세지를 보내기 위해 사용한다.";
      }
    >;

    /**
     * @title message body.
     */
    text: string & tags.MaxLength<200>;

    /**
     * @title message link.
     */
    link: {
      web_url: string & tags.Format<"url">;
      mobile_web_url: string & tags.Format<"url">;
    };

    /**
     * @title 버튼의 이름.
     *
     * `button`이 있을 시에는 `button` 프로퍼티를 우선시한다.
     *
     * 기본 버튼 타이틀("자세히 보기")을 변경하고 싶을 때 설정.
     */
    button_title?: string;

    /**
     * @title 버튼.
     *
     * 버튼 목록, 최대 2개.
     *
     * 버튼 타이틀과 링크를 변경하고 싶을 때, 버튼 두 개를 넣고 싶을 때 사용.
     */
    buttons?: IKakaoTalk.Button & tags.MaxLength<2>;
  }

  export interface IMemoOutput {
    /**
     * @title 응답 코드.
     */
    result_code: tags.Constant<
      0,
      {
        title: "성공.";
        description: "메시지 전송에 성공한 경우를 의미.";
      }
    >;
  }
}
