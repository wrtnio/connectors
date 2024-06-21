import { Placeholder } from "@wrtn/decorators";
import { TaskListItemGpusInteger } from "aws-sdk/clients/omics";
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

  export interface IGetFriendsInput
    extends ICommon.ISecret<"kakao", ["friends"]> {
    /**
     * @title 친구 목록 시작 지점
     */
    offset?: number & tags.Type<"int32"> & tags.Default<0>;

    /**
     * @title 한 페이지 당 친구 수
     */
    limit?: number;

    /**
     * @title 친구 목록 정렬 순서
     */
    order?:
      | (
          | tags.Constant<"asc", { title: "오름차순" }>
          | tags.Constant<"desc", { title: "내림차순" }>
        ) &
          tags.Default<"asc">;

    /**
     * @title 친구 목록 정렬 시 기준
     */
    friend_order?:
      | (
          | tags.Constant<"favorite", { title: "즐겨찾기 우선 정렬" }>
          | tags.Constant<"nickname", { title: "닉네임 우선 정렬" }>
        ) &
          tags.Default<"favorite">;
  }

  export interface IGetFriendsOutput {
    /**
     * @title 친구 목록
     */
    elements?: {
      /**
       * @title 회원 번호
       */
      id: number & tags.Type<"int32">;

      /**
       * @title 친구 코드
       * @description 카카오톡 메시지 전송 시 사용하는 친구 코드
       */
      uuid: string & tags.Format<"uuid">;

      /**
       * @title 해당 친구의 즐겨 찾기 여부
       */
      favorite?: boolean;

      /**
       * @title 닉네임
       */
      profile_nickname?: string;

      /**
       * @title 썸네일
       */
      profile_thumbnail_image?: string & tags.Format<"uri">;
    }[];

    /**
     * @title 전체 친구 수
     */
    total_count: number & tags.Type<"int32">;

    /**
     * @title 친구 목록 다음 페이지 URL
     */
    after_url?: (string & tags.Format<"uri">) | null;

    /**
     * @title 친구 목록 이전 페이지 URL
     */
    before_url?: (string & tags.Format<"uri">) | null;

    /**
     * @title 즐겨찾기한 친구 수
     */
    favorite_count?: number & tags.Type<"int32">;
  }

  /**
   * @title 일정 조회 결과
   */
  export interface IGetEventOutput {
    /**
     * @title 일정 리스트
     */
    events: IKakaoTalk.EventBriref[];

    /**
     * @title 다음 페이지 존재 여부
     */
    has_next: boolean;

    /**
     * @title 다음 페이지 URL
     *
     * 다음 페이지를 조회하기 위한 파라미터와 값을 포함한 URL이므로, 다음 페이지 요청 시 그대로 사용.
     *
     * 제공 조건은 `has_next`가 true인 경우이다.
     */
    after_url?: string & tags.Format<"url">;
  }

  /**
   * @title 일정
   */
  export interface EventBriref {
    /**
     * 	@title 일정 ID
     */
    id?: string;

    /**
     * @title	일정 제목
     */
    title?: string;

    /**
     * 	@title 일정 타입
     */
    type?: string;

    /**
     * @title	캘린더 ID
     * @description 기본 캘린더의 경우 primary로 고정
     */
    calendar_id?: string & tags.Default<"primary"> & Placeholder<"primary">;

    /**
     * @title 일정 시간
     */
    time: IKakaoTalk.Time;

    /**
     * @title 일정 작성자인지 여부
     * @description 공개/구독 일정 또는 초대 받은 일정인 경우
     */
    is_host?: boolean & tags.Default<false>;

    /**
     * @title 반복 일정 여부
     * @description type이 USER인 경우 필수.
     */
    is_recur_event?: boolean;

    /**
     * @title 일정 색상
     * @description 일정 생성 또는 편집 시 지정하지 않은 경우 미포함.
     */
    color?: IKakaoTalk.Color;
  }

  export interface Time {
    /**
     * @title 일정 시작 시각
     * @description 5분 간격으로 설정 가능
     */
    start_at?: string & Placeholder<"2023-12-31T15:00:00Z">;

    /**
     * @title 일정 종료 시각
     */
    end_at?: string & Placeholder<"2024-01-01T15:00:00Z">;

    /**
     * @title 타임존 설정
     *
     * TZID 형식.
     */
    time_zone?: string & tags.Default<"Asia/Seoul">;

    /**
     * @title 종일 일정 여부
     */
    all_day?: boolean & tags.Default<false>;

    /**
     * @title 날짜 기준을 음력으로 설정
     */
    lunar?: boolean & tags.Default<false>;
  }

  /**
   * @title 생성된 일정
   */
  export interface ICreateEventOutput {
    /**
     * @title 생성한 일정 ID
     */
    event_id: string;
  }

  /**
   * @title 일정을 생성하기 위한 조건
   */
  export interface ICreateEventInput
    extends ICommon.ISecret<"kakao", ["talk_calendar"]> {
    /**
     * @title 일정을 생성할 캘린더 ID
     */
    calendar_id?: string & tags.Default<"primary"> & Placeholder<"primary">;

    /**
     * @title 생성할 일정 정보
     */
    event: {
      /**
       * @title 일정 제목
       */
      title: string & tags.MaxLength<50> & Placeholder<"일정 제목">;

      /**
       * @title 일정 시간
       */
      time: IKakaoTalk.Time;

      /**
       * @title 일정의 반복 주기
       * @description RFC5545의 RRULE 형식
       */
      rrule?: string;

      /**
       * @title 일정 설명
       */
      description?: string & tags.MaxLength<5000> & Placeholder<"일정 설명">;

      /**
       * @title 일정 장소
       */
      location?: IKakaoTalk.Location;

      /**
       * @title 미리 알림 설정
       * @description 분 단위이며, 5분 간격으로 최대 2개까지만 설정 가능. 종일 일정인 경우 -1440부터 시작 가능하며, 종일 일정이 아닌 경우 0부터 시작한다.
       */
      reminders?: (number &
        tags.MultipleOf<5> &
        tags.Minimum<-1440> &
        tags.Maximum<43200>)[] &
        tags.MaxItems<2>;

      /**
       * @title 일정 색상
       */
      color?: IKakaoTalk.Color;
    };
  }

  /**
   * @title 일정 장소
   */
  export interface Location {
    /**
     * @title 장소 이름
     */
    name?: string & tags.MaxLength<50>;

    /**
     * @title 장소 ID
     */
    location_id?: number;

    /**
     * @title 주소
     */
    address?: string;

    /**
     * @title 위도
     */
    latitude?: number;

    /**
     * @title 경도
     */
    longitude?: number;
  }

  /**
   * @title 캘린더 이벤트를 조회하기 위한 요청 조건
   * @description `from`, `to` 쌍 또는 `next_page_token` 둘 중 하나는 필수적으로 들어가야 한다.
   */
  export type IGetEventInput = ICommon.ISecret<"kakao", ["talk_calendar"]> & {
    /**
     * @title 일정을 조회할 캘린더 ID
     * @description 값이 없을 시의 기본 값은 전체 캘린더 조회이다.
     */
    calender_id?: string;

    /**
     * @title 일정 조회 기간
     * @description from과 to가 포함되지 않은 경우 필수이며 next_page_token가 포함된 경우 무시.
     */
    preset?:
      | tags.Constant<"TODAY", { title: "조회 당일" }>
      | tags.Constant<
          "THIS_WEEK",
          { title: "일요일로 시작하는 조회일이 포함된 한 주" }
        >
      | tags.Constant<
          "THIS_MONTH",
          { title: "1일로 시작하는 조회일이 포함된 한 달" }
        >;

    /**
     * @title 기한 일자의 타임존
     *
     * TZID 형식.
     */
    time_zone?: string;

    /**
     * @title 응답으로 받을 최대 일정 수
     */
    limit?: number &
      tags.Type<"int64"> &
      tags.Minimum<100> &
      tags.Maximum<1000>;
  } & (
      | {
          /**
           * @title 일정을 조회할 기간의 시작 시각
           * @description from과 to가 포함되지 않은 경우 필수이며 next_page_token가 포함된 경우 무시.
           */
          from: string & tags.Format<"date-time">;

          /**
           * @title 일정을 조회할 기간의 종료 시각
           * @description from과 to가 포함되지 않은 경우 필수이며 next_page_token가 포함된 경우 무시한다. `to`로부터 31일 이내의 값이어야 한다.
           */
          to: string & tags.Format<"date-time">;
        }
      | {
          /**
           * @title 다음 페이지 조회를 위한 조건 토큰
           * @description from, to, limit 값이 포함된 조회 조건 토큰으로 응답으로 받은 after_url에서 확인 가능
           */
          next_page_token: string;
        }
    );

  /**
   * @title 카카오 액세스 토큰을 갱신하기 위한 조건
   */
  export interface IRefreshAccessTokenInput {
    refresh_token: string;
  }

  export interface IGetCalendarOutput {
    /**
     * @title 기본 캘린더
     */
    calendars?: IKakaoTalk.Calendar[];

    /**
     * @title 구독한 구독 캘린더 목록
     */
    subscribe_calendars?: IKakaoTalk.SubscribeCalendars[];
  }

  /**
   * @title 구독한 구독 캘린더 목록
   */
  export interface SubscribeCalendars extends IKakaoTalk.Calendar {
    /**
     * @title 채널에서 설정한 구독 캘린더 설명
     */
    description?: string;

    /**
     * @title 구독 캘린더의 프로필 이미지 URL
     */
    profile_image_url?: string & tags.Format<"url">;

    /**
     * @title 구독 캘린더의 말풍선 썸네일 URL
     */
    thumbnail_url?: string & tags.Format<"url">;
  }

  /**
   * @title 기본 캘린더
   * @description 서브 캘린더 목록
   */
  export interface Calendar {
    /**
     * @title 캘린더 ID.
     *
     * 유저마다 기본적으로 가지고 있는 캘린더의 경우 `primary`라고 한다.
     */
    id: string & tags.Default<"primary"> & Placeholder<"primary">;

    /**
     * @title 캘린더 이름
     */
    name?: string & Placeholder<"캘린더 이름">;

    /**
     * @title 일정 색상
     */
    color?: IKakaoTalk.Color;

    /**
     * @title 종일 일정이 아닌 일정의 기본 알림 시간
     */
    reminder?: number & tags.Type<"int64">;

    /**
     * @title 종일 일정의 기본 알림 시간
     */
    reminder_all_day?: number & tags.Type<"int64">;
  }

  /**
   * @title 액세스 토큰 갱신
   */
  export type IRefreshAccessTokenOutput = Pick<
    IGetAccessTokenOutput,
    "access_token" | "expires_in" | "token_type"
  >;

  /**
   * @title 버튼 정보
   */
  export interface Button {
    /**
     * @title 버튼 이름
     */
    title: string & Placeholder<"버튼 이름">;

    /**
     * @title 버튼의 링크
     */
    link: IKakaoTalk.ButtonLink;
  }

  /**
   * @title 링크 정보
   */
  export type ButtonLink =
    | IWebLink
    | IMobileWebLink
    | IAndroidAppLink
    | IiOSAppLink;

  /**
   * @title 웹 링크
   */
  export interface IWebLink {
    /**
     * @title 웹 링크
     */

    web_url: `https://studio-pro.wrtn.ai${string}`;
  }

  /**
   * @title 모바일 링크
   */
  export interface IMobileWebLink {
    /**
     * @title 모바일 링크
     */
    mobile_web_url: `https://studio-pro.wrtn.ai${string}`;
  }

  /**
   * @title 안드로이드 앱 링크
   */
  export interface IAndroidAppLink {
    /**
     * @title 앱 링크
     * @description 해당 값이 없을 경우 mobile_web_url 이용
     */
    android_execution_params: string;
  }

  /**
   * @title iOS 앱 링크
   */
  export interface IiOSAppLink {
    /**
     * @title 앱 링크
     * @description 해당 값이 없을 경우 mobile_web_url 이용
     */
    ios_execution_params: string;
  }

  /**
   * @title 메시지 전송 조건
   */
  export interface ISendKakaoTalkInput
    extends ICommon.ISecret<
      "kakao",
      ["talk_message", "profile_image", "profile_nickname"]
    > {
    /**
     * @title 메시지 템플릿
     * @description 피드, 리스트, 위치, 커머스, 텍스트, 캘린더 중 하나
     */
    template_object:
      | IFeedMemoInput
      | ITextMemoInput
      | ICalendarMemoInput
      | IListMemoInput
      | ILocationMemoInput
      | ICommerceMemoInput;
  }

  /**
   * @title 모든 템플릿이 공통으로 가진 값
   */
  export interface MemoBase {
    /**
     * @title 메시지의 콘텐츠
     */
    content: IKakaoTalk.Content;

    /**
     * @title 버튼 이름
     */
    button_title?: string;
  }

  /**
   * @title 커머스형 템플릿
   */
  export interface ICommerceMemoInput extends MemoBase {
    /**
     * @title 커머스 타입
     */
    object_type: "commerce" & Placeholder<"commerce">;

    /**
     * @title 상품 이름 및 가격 정보
     */
    commerce: IKakaoTalk.Commerce;

    /**
     * @title 버튼 목록
     * @description 버튼 타이틀과 링크를 변경하고 싶을 때, 버튼 두 개를 넣고 싶을 때 사용하며 button_title보다 우선시된다.
     */
    buttons?: IKakaoTalk.Button[] & tags.MaxItems<2>;
  }

  export type Commerce = {
    /**
     * @title 상품 이름 및 제목
     */
    product_name?: string;

    /**
     * @title 정상 가격
     */
    regular_price: number & tags.Type<"int64">;

    /**
     * @title 할인된 가격
     */
    discount_price?: number & tags.Type<"int64">;

    /**
     * @title 통화 단위 또는 기호
     */
    currency_unit?: string & tags.Default<"원">;

    /**
     * @title 통화 단위 표시 위치
     */
    currency_unit_position?:
      | tags.Constant<0, { title: "가격 뒤에 표시" }>
      | tags.Constant<1, { title: "가격 앞에 표시" }>;
  } & (
    | {
        /**
         * @title 할인률
         * @description 0부터 100까지의 숫자
         */
        discount_rate?: number &
          tags.Type<"int64"> &
          tags.Minimum<0> &
          tags.Maximum<100>;
      }
    | {
        /**
         * @title 정액 할인 가격
         * @description 할인율과 동시 사용 불가
         */
        fixedDiscountPrice?: number & tags.Type<"int64"> & tags.Minimum<0>;
      }
  );

  /**
   * @title 위치형 템플릿
   */
  export interface ILocationMemoInput extends MemoBase {
    /**
     * @title 위치 타입
     */
    object_type: "location" & Placeholder<"location">;

    /**
     * @title 공유할 위치의 주소
     */
    address: string;

    /**
     * @title 카카오톡 내의 지도 뷰에서 사용되는 타이틀
     */
    address_title?: string;

    /**
     * @title 부가적인 소셜 정보
     */
    social?: IKakaoTalk.Social;

    /**
     * @title 버튼 목록
     * @description 버튼 타이틀과 링크를 변경하고 싶을 때, 버튼 두 개를 넣고 싶을 때 사용하며 button_title보다 우선시된다.
     */
    buttons?: IKakaoTalk.Button[] & tags.MaxItems<2>;
  }

  /**
   * @title 리스트형 템플릿
   */
  export interface IListMemoInput extends Pick<MemoBase, "button_title"> {
    /**
     * @title 리스트 타입
     */
    object_type: "list" & Placeholder<"list">;

    /**
     * @title 리스트 상단에 노출되는 메인 타이틀
     */
    header_title: string & tags.MaxLength<200>;

    /**
     * @title 헤더 타이틀 내용에 해당하는 링크 정보
     */
    header_link: IKakaoTalk.ButtonLink;

    /**
     * @title 리스트에 노출되는 콘텐츠 목록
     */
    contents: IKakaoTalk.Content[] & tags.MinItems<2> & tags.MaxItems<3>;

    /**
     * @title 버튼 목록
     * @description 버튼 타이틀과 링크를 변경하고 싶을 때, 버튼 두 개를 넣고 싶을 때 사용하며 button_title보다 우선시된다.
     */
    buttons?: IKakaoTalk.Button[] & tags.MaxItems<2>;
  }

  /**
   * @title 캘린더형 템플릿
   */
  export interface ICalendarMemoInput {
    /**
     * @title 캘린더 타입
     */
    object_type: "calendar";

    /**
     * @title `id`의 타입
     */
    id_type:
      | tags.Constant<"event", { title: "공개 일정" }>
      | tags.Constant<"calendar", { title: "구독 캘린더" }>;

    /**
     * @title 공개 일정 혹은 구독 캘린더의 ID
     */
    id: string;

    /**
     * @title 일정 제목과 설명
     */
    content: IKakaoTalk.Content;

    /**
     * @title 사용자 정의 버튼 정보
     * @description 캘린더 메시지는 기본적으로 공개 일정 추가 또는 구독 캘린더 구독을 위한 기본 버튼을 제공함. 따라서 1개의 사용자 정의 버튼을 선택적으로 추가 가능.
     */
    buttons?: IKakaoTalk.Button[] & tags.MaxItems<1>;
  }

  /**
   * @title 피드형 템플릿
   */
  export interface IFeedMemoInput extends MemoBase {
    /**
     * @title 피드 타입
     */
    object_type: "feed";

    /**
     * @title 아이템 영역에 포함할 콘텐츠
     */
    item_content: IKakaoTalk.ItemContent;

    /**
     * @title 콘텐츠에 대한 소셜 정보
     */
    social?: IKakaoTalk.Social;

    /**
     * @title 버튼 목록
     * @description 버튼 타이틀과 링크를 변경하고 싶을 때, 버튼 두 개를 넣고 싶을 때 사용하며 button_title보다 우선시된다.
     */
    buttons?: IKakaoTalk.Button[] & tags.MaxItems<2>;
  }

  /**
   * @title 아이템 콘텐츠
   */
  export interface ItemContent {
    /**
     * @title 헤더 또는 프로필 영역에 출력될 텍스트
     * @description profile_image_url 값이 없을 경우, 볼드(Bold)체로 된 제목만 담은 헤더 형태로 출력됨.
     */
    profile_text?: string & tags.MaxLength<16>;

    /**
     * @title 프로필 이미지
     * @description 작은 원형의 프로필 사진 형태로 출력됨.
     */
    profile_image_url?: string & tags.Format<"url">;

    /**
     * @title 아이템의 이미지
     * @description iOS 108*108, Android 98*98 크기. 1:1 비율이 아닌 이미지는 센터 크롭(Center crop) 방식으로 재조정됨.
     */
    title_image_url?: string & tags.Format<"url">;

    /**
     * @title 아이템의 제목
     * @description 최대 2줄
     */
    title_image_text?: string & tags.MaxLength<24>;

    /**
     * @title 카테고리
     * @description 최대 1줄
     */
    title_image_category?: string & tags.MaxLength<14>;

    /**
     * @title 아이템 목록
     * @description 각 텍스트 아이템 정보
     */
    items?: IKakaoTalk.ItemInfo[] & tags.MaxItems<5>;

    /**
     * @title 주문금액
     */
    sum?: string & tags.MaxLength<6>;

    /**
     * @title 가격 합산 정보
     */
    sum_op?: string & tags.MaxLength<11>;
  }

  /**
   * @title 아이템 정보
   */
  export interface ItemInfo {
    /**
     * @title 아이템 이름
     */
    item: string & tags.MaxLength<6>;

    /**
     * @title 아이템 가격
     */
    item_op: string & tags.MaxLength<14>;
  }

  /**
   * @title 콘텐츠
   *
   * title, image_url, description 중 하나 필수.
   */
  export type Content = (
    | {
        /**
         * @title 타이틀.
         */
        title: string;
      }
    | {
        /**
         * @title 이미지 URL
         * @description 이미지의 크기는 `5MB`를 초과해선 안 된다.
         */
        image_url: string & tags.Format<"url">;
      }
    | {
        /**
         * @title 상세 설명
         * @description title과 합쳐 최대 4줄 표시.
         */
        description: string;
      }
  ) & {
    /**
     * @title 이미지 너비
     * @description 픽셀 단위
     */
    image_width?: number & tags.Type<"int32"> & tags.Minimum<200>;

    /**
     * @title 이미지 높이
     * @description 픽셀 단위
     */
    image_height?: number & tags.Type<"int32"> & tags.Minimum<200>;

    /**
     * @title 클릭 시 이동할 링크 정보
     */
    link: IKakaoTalk.ButtonLink;
  };

  /**
   * @title 소셜 정보
   * @description 5개의 속성 중 최대 3개까지만 표시한다. 우선 순위는 Like > Comment > Shared > View > Subscriber 순서.
   */
  export interface Social {
    /**
     * @title 콘텐츠의 좋아요 수
     */
    like_count?: number & tags.Type<"int64">;

    /**
     * @title 콘텐츠의 댓글 수
     */
    comment_count?: number & tags.Type<"int64">;

    /**
     * @title 콘텐츠의 공유 수
     */
    shared_count?: number & tags.Type<"int64">;

    /**
     * @title 콘텐츠의 조회 수
     */
    view_count?: number & tags.Type<"int64">;

    /**
     * @title 콘텐츠의 구독 수
     */
    subscriber_count?: number & tags.Type<"int64">;
  }

  /**
   * @title 텍스트형 템플릿
   */
  export interface ITextMemoInput extends Pick<MemoBase, "button_title"> {
    /**
     * @title 텍스트 타입
     */
    object_type: "text";

    /**
     * @title 본문
     */
    text: string & tags.MaxLength<200>;

    /**
     * @title 링크
     */
    link: IWebLink & IMobileWebLink;

    /**
     * @title 버튼 목록
     * @description 버튼 타이틀과 링크를 변경하고 싶을 때, 버튼 두 개를 넣고 싶을 때 사용하며 button_title보다 우선시된다.
     */
    buttons?: IKakaoTalk.Button[] & tags.MaxItems<2>;
  }

  export interface IMemoOutput {
    /**
     * @title 응답 코드
     */
    result_code: tags.Constant<
      0,
      {
        title: "성공";
        description: "메시지 전송에 성공한 경우를 의미";
      }
    >;
  }

  /**
   * @title 일정 색상
   */
  export type Color =
    | tags.Constant<"BLUE", { title: "BLUE"; description: "2C88DE" }>
    | tags.Constant<
        "ROYAL_BLUE",
        { title: "ROYAL_BLUE"; description: "2D69E0" }
      >
    | tags.Constant<"NAVY_BLUE", { title: "NAVY_BLUE"; description: "223788" }>
    | tags.Constant<"RED", { title: "RED"; description: "D42726" }>
    | tags.Constant<"PINK", { title: "PINK"; description: "ED5683" }>
    | tags.Constant<"ORANGE", { title: "ORANGE"; description: "FF9429" }>
    | tags.Constant<"GREEN", { title: "GREEN"; description: "149959" }>
    | tags.Constant<"LIME", { title: "LIME"; description: "7CB343" }>
    | tags.Constant<"OLIVE", { title: "OLIVE"; description: "A4AD15" }>
    | tags.Constant<"MINT", { title: "MINT"; description: "5CC5BE" }>
    | tags.Constant<"MAGENTA", { title: "MAGENTA"; description: "AB47BC" }>
    | tags.Constant<"VIOLET", { title: "VIOLET"; description: "8A4B9B" }>
    | tags.Constant<"LAVENDER", { title: "LAVENDER"; description: "7986CB" }>
    | tags.Constant<"BROWN", { title: "BROWN"; description: "945C1F" }>
    | tags.Constant<"GRAY", { title: "GRAY"; description: "666666" }>;
}
