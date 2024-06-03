import { tags } from "typia";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";

export namespace IGoogleCalendar {
  export interface ICreateCalendarInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/calendar"]
    > {
    /**
     * 생성할 캘린더의 제목 입니다.
     *
     * @title 생성할 캘린더 제목.
     */
    title: string;
  }
  export interface IGoogleCalendarOutput {
    /**
     * 생성된 캘린더의 id 입니다.
     *
     * @title 캘린더 id.
     */
    id?: string | null;

    /**
     * 생성된 캘린더의 이름 입니다.
     *
     * @title 캘린더 명.
     */
    summary?: string | null;
  }
  /**
   * 제목, 설명, 링크, 이벤트 생성 날짜, 이벤트 업데이트 날짜, 위치, 주최자, 생성한 사람, 이벤트 시작일, 이벤트 종료일, 참석자 정보, 알림 정보, 첨부파일 정보
   *
   * @title 가져올 데이터 목록.
   */
  export type ExtractFields =
    | "summary"
    | "description"
    | "htmlLink"
    | "created"
    | "updated"
    | "location"
    | "organizer"
    | "creator"
    | "start"
    | "end"
    | "attendees"
    | "reminders"
    | "attachments";

  /**
   * - startTime: 이벤트 시작 시간.
   * - updated: 이벤트 업데이트 날짜.
   *
   * @title 이벤트 정렬 순서.
   */
  type OrderBy = "startTime" | "updated";
  export interface IReadGoogleCalendarEventInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/calendar"]
    > {
    /**
     * 캘린더 데이터에서 가져올 데이터 정보입니다.
     *
     * @title 가져올 데이터 (필드) 정보.
     */
    extract_fields?: ExtractFields[];

    /**
     * 해당 날짜 이후의 이벤트는 가져오지 않습니다.
     *
     * @title 이벤트를 가져올 마지막 날짜 정보.
     */
    time_max?: IGoogleCalendarEvent.IDate;

    /**
     * 해당 날짜 이전의 이벤트는 가져오지 않습니다.
     *
     * @title 이벤트를 가져올 시작 날짜 정보.
     */
    time_min?: IGoogleCalendarEvent.IDate;

    /**
     * 가져올 이벤트의 최대 개수를 설정합니다.
     *
     * @title 몇 개의 결과를 반환할지.
     */
    max_results?: number & tags.Type<"uint32">;

    /**
     * 캘린더 이벤트 정렬 순서입니다.
     *
     * @title 어떤 순서대로 받아올 것인지.
     */
    orderBy?: OrderBy;

    /**
     * 검색어를 포함하는 이벤트를 검색할 수 있습니다.
     *
     * 제목, 설명, 위치, 참석자 등에서 지정한 검색어를 포함하는 이벤트를 검색할 수 있음
     *
     * @title 이벤트 검색어.
     */
    query?: string;
  }

  export interface IReadGoogleCalendarEventOutput {
    /**
     * 검색된 캘린더 이벤트 리스트입니다.
     *
     * @title 이벤트 리스트.
     */
    events: IGoogleCalendarEvent[];
  }

  export interface IGoogleCalendarEvent {
    /**
     * 이벤트의 고유 id 입니다.
     *
     * @title 이벤트 id.
     */
    id?: string | null;

    /**
     * 이벤트 링크 입니다.
     *
     * @title 이벤트 링크.
     */
    htmlLink?: (string & tags.Format<"uri">) | null;

    /**
     * 이벤트 색상입니다.
     *
     * @title 이벤트 색상.
     */
    color?: string | null;

    /**
     * 이벤트 생성 날짜입니다.
     *
     * @title 이벤트 생성 날짜.
     */
    createdDate?: string | null;

    /**
     * 이벤트 업데이트 날짜입니다.
     *
     * @title 이벤트 업데이트 날짜.
     */
    updatedDate?: string | null;

    /**
     * 이벤트 제목입니다.
     *
     * @title 이벤트 제목.
     */
    title?: string | null;

    /**
     * 이벤트 설명입니다.
     *
     * @title 이벤트 설명.
     */
    description?: string | null;

    /**
     * 이벤트 위치입니다.
     *
     * @title 이벤트 위치.
     */
    location?: string | null;

    /**
     * 이벤트 주최자의 정보입니다.
     *
     * @title 이벤트 주최자.
     */
    organizer?: IGoogleCalendarEvent.IOrganizer | null;

    /**
     * 이벤트 생성자의 정보입니다.
     *
     * @title 이벤트 생성자.
     */
    creator?: IGoogleCalendarEvent.ICreator | null;

    /**
     * @title 이벤트 시작 날짜.
     *
     * 이벤트의 시작 날짜 정보입니다.
     */
    startDate?: {
      /**
       * 이벤트 시작 날짜입니다.
       *
       * @title 이벤트 시작 날짜.
       */
      dateTime?: string | null;

      /**
       * 이벤트 시작 날짜 타임존입니다.
       *
       * @title 이벤트 시작 날짜 타임존.
       */
      timeZone?: string | null;
    } | null;

    /**
     * 이벤트의 끝나는 날짜 정보입니다.
     *
     * @title 이벤트 끝나는 날짜.
     */
    endDate?: {
      /**
       * 이벤트 끝나는 날짜입니다.
       *
       * @title 이벤트 끝나는 날짜.
       */
      dateTime?: string | null;

      /**
       * 이벤트 끝나는 날짜 타임존입니다.
       *
       * @title 이벤트 끝나는 날짜 타임존.
       */
      timeZone?: string | null;
    } | null;

    /**
     * 이벤트 반복 정보입니다.
     *
     * @title 이벤트 반복 정보.
     */
    recurrence?: string[] | null;

    /**
     * 이벤트 바쁨 / 한가함 여부입니다.
     *
     * @title 이벤트 바쁨 / 한가함 여부.
     */
    transparency?: string | null;

    /**
     * 초대자 이벤트 수정 권한 여부입니다.
     *
     * @title 초대자 이벤트 수정 권한 여부.
     */
    guestsCanModify?: boolean | null;

    /**
     * 이벤트 알림 정보입니다.
     *
     * @title 이벤트 알림 정보.
     */
    reminders?: IGoogleCalendarEvent.IReminders | null;

    /**
     * 이벤트 참석자 정보입니다.
     *
     * @title 이벤트 참석자.
     */
    attendees?: IGoogleCalendarEvent.IAttendees[] | null;

    /**
     * 이벤트 첨부파일 정보입니다.
     *
     * @title 첨부파일 정보.
     */
    attachments?: IGoogleCalendarEvent.IAttachments[] | null;

    /**
     * 구글 밋 링크입니다.
     *
     * @title 구글 밋 링크.
     */
    hangoutLink?: string | null;

    /**
     * 이벤트 공개 상태입니다.
     *
     * @title 이벤트 공개 상태.
     */
    visibility?: string | null;
  }

  export namespace IGoogleCalendarEvent {
    /**
     * 이벤트 생성자 정보입니다.
     *
     * @title 이벤트 생성자 정보.
     */
    export interface ICreator {
      /**
       * 이벤트 생성자 프로필 id입니다.
       *
       * @title 이벤트 생성자 프로필 id.
       */
      id?: string | null;

      /**
       * 이벤트 생성자 이름입니다.
       *
       * @title 이벤트 생성자 이름.
       */
      displayName?: string | null;

      /**
       * 이벤트 생성자 이메일입니다.
       *
       * @title 이벤트 생성자 이메일.
       */
      email?: string | null;

      /**
       * 이벤트 사본이 표시되는 캘린더에 해당하는지 여부입니다.
       *
       * @title 이벤트 사본이 표시되는 캘린더에 해당하는지 여부.
       */
      self?: boolean | null;
    }

    /**
     * 주최자 정보
     */
    export interface IOrganizer {
      /**
       * 이벤트 주최자 프로필 id입니다.
       *
       * @title 이벤트 주최자 프로필 id.
       */
      id?: string | null;

      /**
       * 이벤트 주최자 이름입니다.
       *
       * @title 이벤트 주최자 이름.
       */
      displayName?: string | null;

      /**
       * 이벤트 주최자 이메일입니다.
       *
       * @title 이벤트 주최자 이메일.
       */
      email?: string | null;

      /**
       * 이벤트 사본이 표시되는 캘린더에 해당하는지 여부입니다.
       *
       * @title 이벤트 사본이 표시되는 캘린더에 해당하는지 여부.
       */
      self?: boolean | null;
    }

    /**
     * 참석자 정보
     */
    export interface IAttendees {
      /**
       * 이벤트 참석자 이메일입니다.
       *
       * @title 이벤트 참석자 이메일.
       */
      email?: string | null;

      /**
       * 이벤트 참석자가 주최자인지 여부입니다.
       *
       * @title 이벤트 참석자가 주최자인지 여부.
       */
      organizer?: boolean | null;

      /**
       * 일정 사본이 표시되는 캘린더를 나타내는지 여부입니다.
       *
       * @title 일정 사본이 표시되는 캘린더를 나타내는지 여부.
       */
      self?: boolean | null;

      /**
       * 참석자의 참석 응답 상태입니다.
       *
       * @title 참석자의 참석 응답 상태.
       */
      responseStatus?: string | null;
    }

    export interface IReminders {
      /**
       * 디폴트 알림 여부입니다.
       *
       * @title 디폴트 알림 여부.
       */
      useDefault?: boolean;

      /**
       * 알림 설정 정보입니다.
       *
       * @title 알림 설정 정보.
       */
      overrides?: IRemindersOverrides[];
    }
    export interface IRemindersOverrides {
      /**
       * 알림 방식입니다.
       *
       * @title 알림 방식.
       */
      method?: string | null;

      /**
       * 알림 보내는 시간입니다.
       *
       * @title 알림 보내는 시간.
       */
      minutes?: number | null;
    }

    export interface IAttachments {
      /**
       * 이벤트 첨부파일 url입니다.
       *
       * @title 파일 url.
       */
      fileUrl?: (string & tags.Format<"uri">) | null;

      /**
       * 첨부파일 제목입니다.
       *
       * @title 파일 제목.
       */
      title?: string | null;

      /**
       * 인터넷 미디어 유형입니다.
       *
       * @title 인터넷 미디어 유형.
       */
      mimeType?: string | null;

      /**
       * 첨부파일 아이콘 링크입니다.
       *
       * @title 파일 icon 링크.
       */
      iconLink?: (string & tags.Format<"uri">) | null;

      /**
       * 첨부파일의 id 입니다.
       *
       * @title 파일 id.
       */
      fileId?: string | null;
    }

    export interface IDate {
      /**
       * 연도입니다.
       *
       * @title 연도.
       */
      year: number;

      /**
       * 달입니다.
       *
       * @title 달.
       */
      month: number;

      /**
       * 일입니다.
       *
       * @title 일.
       */
      date: number;

      /**
       * 시입니다.
       *
       * @title 시.
       */
      hour: number;
    }
  }

  export interface ICreateQuickEventInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/calendar"]
    > {
    /**
     * 캘린더 빠른 이벤트 생성 문구입니다.
     *
     * @title 캘린더 빠른 이벤트 생성 문구.
     */
    text: string;
  }

  export interface IEventRequestBodyInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/calendar"]
    > {
    /**
     * 생성할 이벤트 제목입니다.
     *
     * @title 이벤트 제목.
     */
    title?: string;

    /**
     * 생성할 이벤트 설명입니다.
     *
     * @title 이벤트 설명.
     */
    description?: string;

    /**
     * 생성할 이벤트 장소입니다.
     *
     * @title 이벤트 장소.
     */
    location?: string;

    /**
     * 생성할 이벤트 시작일입니다.
     *
     * @title 이벤트 시작일.
     */
    start: IGoogleCalendarEvent.IDate;

    /**
     * 생성할 이벤트 종료일입니다.
     *
     * @title 이벤트 종료일.
     */
    end: IGoogleCalendarEvent.IDate;

    /**
     * 이벤트 참석자 이메일입니다.
     *
     * @title 참석자 이메일.
     */
    attendeesEmail?: string[];

    /**
     * 이벤트 반복 주기입니다.
     *
     * @title 이벤트 반복 주기.
     */
    repeatFrequency?: RepeatFrequency;

    /**
     * 이벤트 반복 횟수입니다.
     *
     * @title 이벤트 반복 횟수.
     */
    repeatNum?: number;

    /**
     * 이벤트 반복 마감 일자입니다.
     *
     * @title 이벤트 반복 마감 일자.
     */
    repeatUntil?: IGoogleCalendarEvent.IDate;

    /**
     * 이벤트 바쁨 상태 여부입니다.
     *
     * @title 바쁨 여부.
     */
    isBusy?: boolean;

    /**
     * 캘린더 기본 알림 사용 여부입니다.
     *
     * @title 캘린더 기본 알림 사용 여부.
     */
    isUseDefaultReminder?: boolean;

    /**
     * 이벤트 알림 유형입니다.
     *
     * @title 이벤트 알림 유형.
     */
    remindersType?: EventRemindersType;

    /**
     * 일정 시작전 알림 설정 시간입니다.
     *
     * @title 일정 시작전 알림 설정 시간.
     */
    minutesBeforeReminders?: number;

    /**
     * 구글밋 생성 여부입니다.
     *
     * @title 구글밋 생성 여부.
     */
    isConferencing?: boolean;

    /**
     * 이벤트 공개 상태입니다.
     *
     * @title 이벤트 공개 상태.
     */
    visibility?: EventVisibility;

    /**
     * 이벤트 색상.
     *
     * @title 이벤트 색상.
     */
    colorId?: string;

    /**
     * 게스트 이벤트 수정 가능 여부입니다.
     *
     * @title 게스트 이벤트 수정 가능 여부.
     */
    isGuestCanModify?: boolean;
  }

  /**
   * - DAILY: 매일
   * - WEEKLY: 매주
   * - MONTHLY: 매달
   * - YEARLY: 매년
   *
   * @title 이벤트 반복 주기.
   */
  export type RepeatFrequency = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

  /**
   * - popup: 팝업 알림
   * - email: 이메일 알림
   *
   * @title 이벤트 알림 유형.
   */
  export type EventRemindersType = "popup" | "email";

  /**
   * default - 기본 공개 상태
   * public - 일정이 공개되며 일정 세부정보가 캘린더의 모든 독자에게 표시
   * private - 일정이 비공개이며 일정 참석자만 일정 세부정보를 볼 수 있음
   *
   * @title 이벤트 공개 상태.
   */
  export type EventVisibility = "default" | "public" | "private";

  export interface ICreateEventOutput {
    /**
     * 생성된 이벤트의 id입니다.
     *
     * @title 생성된 이벤트 id.
     */
    id?: string | null;
  }

  export interface IAddAttendeesToEventInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/calendar"]
    > {
    /**
     * 추가할 참석자 이메일입니다.
     *
     * @title 추가할 참석자 이메일.
     */
    attendeesEmail: string[];
  }
}
