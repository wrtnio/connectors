import { tags } from "typia";

import { ICommon } from "../connector/common/ISecretValue";

export namespace IZoom {
  export interface ICreateMeetingInput extends ICommon.ISecret<"zoom", ["meeting:write:admin", "meeting:write"]> {
    userId: string;
  }

  export type ICreateMeetingOutput = Partial<Meeting>;

  export interface Meeting {
    /**
     *  The meeting's agenda.
     *
     * @title 미팅의 안건.
     */
    agenda: string & tags.MaxLength<2000>;

    /**
     * 이 값이 true이고 사용자가 비밀번호로 PMI 설정을 활성화한 경우 사용자 미팅에서는 PMI 비밀번호를 사용한다.
     *
     * @title 기본 비밀번호 생성 여부.
     */
    default_password: boolean & tags.Default<false>;

    /**
     * 회의의 예정된 시간으로 분 단위를 의미한다.
     *
     * 회의가 예약된 경우에만 사용된다.
     *
     * @title 미팅의 예정 시간(duration).
     */
    duration: number & tags.Type<"int64">;

    /**
     * 영어 대소문자와 '@', '-', '_', '*' 으로 이루어진 비밀번호를 의미한다.
     *
     * @title 미팅 비밀번호.
     */
    password: string & tags.MaxLength<10>;

    /**
     * @title `GSuite` app을 통한 예정된 회의 생성 여부.
     */
    pre_schedule: boolean & tags.Default<false>;

    /**
     * @title 이 미팅을 주최한 사용자의 ID.
     */
    assistant_id: string;

    /**
     * @title 미팅 주최자의 이메일 주소.
     */
    host_email: string & tags.Format<"email">;

    /**
     * @title 미팅 ID.
     */
    id: number & tags.Type<"int64">;

    /**
     * @title 참가자들이 등록할 수 있는 URL.
     */
    registration_url: string & tags.Format<"url">;

    /**
     * @title 이 미팅이 생성된 날짜와 시간.
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * @title 타사 엔드포인트(H323/SIP)용 암호화된 비밀번호.
     */
    encrypted_password: string;

    /**
     * @title PSTN을 통해 미팅에 참여하기 위한 비밀번호.
     */
    pstn_password: string;

    /**
     * @title H.323/SIP 룸 시스템 비밀번호.
     */
    h323_password: string;

    /**
     * @title 참가자들이 미팅에 참여할 수 있는 URL.
     */
    join_url: string & tags.Format<"url">;

    /**
     * @title 채팅에 참여할 수 있는 URL.
     */
    chat_join_url: string & tags.Format<"url">;

    /**
     * @title 반복 웨비나에 대한 정보.
     */
    occurrences: IZoom.Occurrence[];

    /**
     * @title Personal meeting ID (PMI).
     */
    pmi: string;

    /**
     * @title 미팅의 반복 주기에 대한 정보.
     */
    recurrence: IZoom.Recurrence;

    /**
     * @title Zoom 세팅 정보.
     */
    settings: Partial<IZoom.Settings>;

    /**
     * @title 미팅 시작 시간.
     */
    start_time: string & tags.Format<"date-time">;

    /**
     * 이 URL은 미팅의 주최자만 사용해야 하며, 다른 참가자와는 공유해서는 안 된다.
     *
     * 이 URL을 가진 사람은 누구나 주최자 권한으로 Zoom 클라이언트에 로그인할 수 있다.
     *
     * @title 미팅 주최자 권한으로 참여 가능한 URL.
     */
    start_url: string & tags.Format<"url">;

    /**
     * @title `start_time`의 timezone.
     */
    timezone: string;

    /**
     * @title 미팅의 주제(topic)
     */
    topic: string;

    /**
     *
     */
    tracking_fields: TrackingField[];

    /**
     * - 1 : 즉석 미팅.
     * - 2 : 예약된 미팅.
     * - 3 : 고정된 시간이 없는 반복 미팅.
     * - 8 : 고정된 시간이 있는 반복 미팅.
     * - 10 : 화면 공유만 가능한 미팅.
     *
     * @title 미팅의 타입.
     */
    type: (1 | 2 | 3 | 8 | 10) & tags.Default<2>;

    /**
     * @title 미팅의 dynamic_host_key.
     */
    dynamic_host_key: string;
  }

  /**
   * @title 미팅의 반복 주기에 대한 정보.
   */
  export interface Recurrence {
    /**
     * 회의가 취소되지 않을 경우 회의가 열리는 마지막 날을 의미한다.
     *
     * `end_times`와 함께 사용될 수는 없다.
     *
     * @title 회의 최종 종료 전 마지막 날짜를 의미.
     */
    end_date_time?: string & tags.Format<"date-time">;

    /**
     * 회의가 취소되기 전에 몇 번 반복할지를 의미한다.
     *
     * end_times가 0으로 설정되어 있으면 종료 시간이 없음을 의미한다.
     *
     * @title 회의 최종 종료 전 반복 횟수.
     */
    end_times?: number & tags.Type<"int64"> & tags.Maximum<60> & tags.Default<1>;

    /**
     * 1은 daily, 2는 weekly, 3은 monthly로, 반복 유형을 의미한다.
     *
     * @title 회의 반복 주기.
     */
    type: 1 | 2 | 3;

    /**
     * 해당 월의 1부터 31까지의 일자를 의미하며 `type`이 3, 즉 매달마다 반복되는 경우에 설정하는 값이다.
     *
     * @title 해당 월의 1부터 31까지의 일.
     */
    monthly_day: number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<31>;

    /**
     * 매월 몇 번째 주인지를 의미한다.
     *
     * `type`이 3으로, 즉 매 달마다 반복되는 회의일 때 설정하는 값이다.
     *
     * - -1 : 월의 마지막 주.
     * - 1 : 월의 첫 번째 주.
     * - 2 : 월의 두 번째 주.
     * - 3 : 월의 세 번째 주.
     * - 4 : 월의 네 번째 주.
     *
     * @title 매 월의 몇번째 주 인지를 의미.
     */
    monthly_week: -1 | 1 | 2 | 3 | 4;

    /**
     * `type`이 3으로, 즉 매 달마다 반복되는 회의일 때 설정하는 값이다.
     *
     * 만약 여러 요일을 선택할 경우에는 `,` 기호를 통해 '1,3'과 같은 형태로 숫자를 연결하여 나타낸다.
     *
     * - 1 - Sunday.
     * - 2 - Monday.
     * - 3 - Tuesday.
     * - 4 - Wednesday.
     * - 5 - Thursday.
     * - 6 - Friday.
     * - 7 - Saturday.
     *
     * @title 매 달 무슨 요일인지를 의미.
     */
    monthly_week_day: (("1" | "2" | "3" | "4" | "5" | "6" | "7") & tags.Default<"1">) | string;

    /**
     * `type`이 1일 때, 즉 daily로 설정된 미팅의 경우 최대 90(일)까지 가능.
     *
     * `type`이 2일 때, 즉 weekly로 설정된 미팅의 경우 최대 12(주)까지 가능.
     *
     * `type`이 3일 때, 즉 monthly로 설정된 미팅의 경우 최대 3(달)까지 가능.
     *
     * @title 미팅 간의 간격.
     */
    repeat_interval: number & tags.Type<"int64">;

    /**
     * `type`이 2으로, 즉 매 주마다 반복되는 회의일 때 설정하는 값이다.
     *
     * 만약 여러 요일을 선택할 경우에는 `,` 기호를 통해 '1,3'과 같은 형태로 숫자를 연결하여 나타낸다.
     *
     * - 1 - Sunday.
     * - 2 - Monday.
     * - 3 - Tuesday.
     * - 4 - Wednesday.
     * - 5 - Thursday.
     * - 6 - Friday.
     * - 7 - Saturday.
     *
     * @title 매 주 무슨 요일인지를 의미.
     */
    weekly_days: (("1" | "2" | "3" | "4" | "5" | "6" | "7") & tags.Default<"1">) | string;
  }

  /**
   * @title 반복 웨비나에 대한 정보.
   */
  export interface Occurrence {
    /**
     * @title 웨비나 지속 시간을 나타내는 정수.
     */
    duration: number & tags.Type<"int64">;

    /**
     * @title 각 웨비나 발생을 구분하는 고유 식별자(Unique Identifier).
     */
    occurrence_id: string;

    /**
     * @title 웨비나 시작 시간.
     */
    start_time: string & tags.Format<"date-time">;

    /**
     * 웨비나 발생의 상태.
     */
    status: "available" | "deleted";
  }

  /**
   * @title Zoom 세팅 정보.
   */
  export interface Settings {
    /**
     * 등록이 활성화된 미팅에서 참가자가 여러 기기에서 접속할 수 있도록 허용할지 여부를 설정한다.
     *
     * @title 참가자가 여러 기기의 접속 가능한지 여부.
     */
    allow_multiple_devices: boolean;

    /**
     * @title 세미콜론으로 구분된 대체 호스트의 이메일 주소 또는 ID 목록.
     */
    alternative_hosts: string;

    /**
     * @title 대체 호스트에게 이메일 알림을 보낼지 여부.
     */
    alternative_hosts_email_notification: boolean & tags.Default<true>;

    alternative_host_update_polls: boolean;

    /**
     * - 0 : 자동 승인
     * - 1 : 수동 승인
     * - 2 : 등록 불필요(기본값)
     *
     * @title 미팅 등록 승인 설정.
     */
    approval_type: (0 | 1 | 2) & tags.Default<2>;

    /**
     * @title 승인/거부 국가 또는 지역.
     */
    approved_or_denied_countries_or_regions: {
      /**
       * @title 승인된 국가 또는 지역의 목록.
       */
      approved_list?: string[];

      /**
       * @title 차단된 국가 또는 지역의 목록.
       */
      denied_list?: string[];

      /**
       * @title 특정 국가, 지역의 사용자 승인 또는 차단 설정의 활성화 여부.
       */
      enable: boolean;

      /**
       * @title 방식.
       */
      method?: "deny" | "approve";
    };

    /**
     * - `both` - Both telephony and VoIP.
     * - `telephony` - Telephony only.
     * - `voip` - VoIP only.
     * - `thirdParty` - Third party audio conference.
     *
     * @title How participants join the audio portion of the meeting.
     */
    audio: ("both" | "telephony" | "voip" | "thirdParty") & tags.Default<"both">;

    /**
     * @title Third party audio conference info.
     */
    audio_conference_info?: string & tags.MaxLength<2048>;

    /**
     * The meeting's authenticated domains.
     *
     * Only Zoom users whose email address contains an authenticated domain can join the meeting.
     *
     * Comma-separate multiple domains or use a wildcard for listing domains.
     */
    authentication_domains: string;

    /**
     * A list of participants that can bypass meeting authentication.
     *
     * These participants will receive a unique meeting invite.
     */
    authentication_exception: {
      /**
       * @title The participant's email address.
       */
      email: string & tags.Format<"email">;

      /**
       * @title The participant's name.
       */
      name: string;

      /**
       * @title URL for participants to join the meeting.
       */
      join_url: string & tags.Format<"url">;
    }[];

    /**
     * @title Authentication name set in the authentication profile.
     */
    authentication_name: string;

    /**
     * @title Meeting authentication option ID.
     */
    authentication_option: string;

    /**
     * - `cloud` - Record on cloud.
     * - `none` - Disabled.
     *
     * @title Automatic recording. local - Record on local.
     */
    auto_recording: ("none" | "cloud") & tags.Default<"none">;

    /**
     * @title Setting to pre-assign breakout rooms.
     */
    breakout_room: {
      /**
       * Set this field's value to true to enable the breakout room pre-assign option.
       */
      enable: boolean;

      /**
       * Create a room or rooms.
       */
      rooms?: {
        /**
         * The breakout room's name.
         */
        name: string;

        /**
         * Email addresses of the participants who are to be assigned to the breakout room.
         */
        participants: (string & tags.Format<"email">)[];
      }[];
    };

    /**
     * The type of calendar integration used to schedule the meeting.
     *
     * - 1 - Zoom Outlook add-in
     * - 2 - Zoom for Google Workspace add-on
     *
     * Works with the private_meeting field to determine whether to share details of meetings or not.
     */
    calendar_type: 1 | 2;

    /**
     * @title Close registration after event date.
     */
    close_registration: boolean & tags.Default<false>;

    /**
     * @title Host meeting in China.
     *
     * @deprecated
     */
    cn_meeting: boolean & tags.Default<false>;

    /**
     * @title The contact email address for meeting registration.
     */
    contact_email: string & tags.Format<"email">;

    /**
     * @title The contact name for meeting registration.
     */
    contact_name: string;

    /**
     * @title Custom keys and values assigned to the meeting.
     */
    custom_keys: ({
      /**
       * @title Custom key associated with the user.
       */
      key: string & tags.MaxLength<64>;

      /**
       * @title Value of the custom key associated with the user.
       */
      value: string & tags.MaxLength<256>;
    } & tags.MaxItems<10>)[];

    /**
     * Whether to send email notifications to alternative hosts and users with scheduling privileges.
     */
    email_notification: boolean & tags.Default<true>;

    /**
     * Choose between enhanced encryption and end-to-end encryption when starting or a meeting.
     *
     * When using end-to-end encryption, several features (e.g. cloud recording, phone/SIP/H.323 dial-in) will be automatically disabled.
     *
     * - enhanced_encryption - Enhanced encryption. Encryption is stored in the cloud if you enable this option.
     * - e2ee - End-to-end encryption. The encryption key is stored in your local device and can not be obtained by anyone else. Enabling this setting also disables the join before host, cloud recording, streaming, live transcription, breakout rooms, polling, 1:1 private chat, and meeting reactions features.
     */
    encryption_type: "enhanced_encryption" | "e2ee";

    /**
     * Only signed in users can join this meeting.
     *
     * @deprecated
     */
    enforce_login: boolean;

    /**
     * Only signed in users with specified domains can join meetings.
     *
     * This field is deprecated and will not be supported in the future.
     *
     * @deprecated
     */
    enforce_login_domains: string;

    /**
     * @title Whether the Focus Mode feature is enabled when the meeting starts.
     */
    focus_mode: boolean;

    /**
     * @title List of global dial-in countries.
     */
    global_dial_in_countries: string[];

    /**
     * @title Global dial-in countries or regions.
     */
    global_dial_in_numbers: {
      /**
       * City of the number, such as Chicago.
       *
       * @title city of the number.
       */
      city: string;

      /**
       * The country code, such as BR.
       *
       * @title The country code.
       */
      country: string;

      /**
       * Full name of country, such as Brazil.
       *
       * @title Full name of country.
       */
      country_name: string;

      /**
       * A phone number, such as `+1 2332357613`.
       *
       * @title A phone number.
       */
      number: string;

      /**
       * @title Type of number.
       */
      type: "toll" | "tollfree";
    }[];

    /**
     * @title Start video when the host joins the meeting.
     */
    host_video: boolean;

    /**
     * @deprecated
     *
     * @title Host meeting in India.
     */
    in_meeting: boolean & tags.Default<false>;

    /**
     * If the value of join_before_host field is set to true, use this field to indicate time limits when a participant may join a meeting before a host.
     *
     * - 0 - Allow participant to join anytime.
     * - 5- Allow participant to join 5 minutes before meeting start time.
     * - 10 - Allow participant to join 10 minutes before meeting start time.
     */
    jbh_time: 0 | 5 | 10;

    /**
     * Allow participants to join the meeting before the host starts the meeting. Only used for scheduled or recurring meetings.
     */
    join_before_host: boolean & tags.Default<false>;

    language_interpretation: {
      /**
       * Whether to enable language interpretation for the meeting.
       */
      enable: boolean;

      /**
       * Information about the meeting's sign language interpreters.
       */
      interpreters?: {
        /**
         * The interpreter's email address.
         */
        email: string & tags.Format<"email">;

        /**
         *  comma-separated list of the interpreter's languages.
         *
         * The string must contain two country IDs.
         *
         * For example, if the interpreter will translate from English to Chinese, then this value will be US,CN.
         */
        languages: string;
      }[];
    };

    /**
     * The meeting's sign language interpretation settings.
     *
     * Make sure to add the language in the web portal in order to use it in the API. See link for details.
     *
     * Note: If this feature is not enabled on the host's account, this setting will not be applied to the meeting.
     */
    sign_language_interpretation: {
      /**
       * Whether to enable sign language interpretation for the meeting.
       */
      enable: boolean;

      /**
       * Information about the meeting's sign language interpreters.
       */
      interpreters?: {
        /**
         * The interpreter's email address.
         */
        email: string & tags.Format<"email">;

        /**
         * The interpreter's sign language.
         *
         * To get this value, use the sign_language_interpretation object's languages and custom_languages values in the Get user settings API response.
         */
        sign_language: string;
      }[];
    };

    /**
     * If true, only authenticated users can join the meeting.
     */
    meeting_authentication: boolean;

    /**
     * Whether to mute participants upon entry.
     */
    mute_upon_entry: boolean & tags.Default<false>;

    /**
     * Whether to start meetings with the participant video on.
     */
    participant_video: boolean;

    /**
     * Whether to set the meeting as private.
     */
    private_meeting: boolean;

    /**
     * Whether to send registrants an email confirmation.
     *
     * - true - Send a confirmation email.
     * - false - Do not send a confirmation email.
     */
    registrants_confirmation_email: boolean;

    /**
     * Whether to send registrants email notifications about their registration approval, cancellation, or rejection.
     *
     * - true - Send an email notification.
     * - false - Do not send an email notification.
     *
     * Set this value to true to also use the registrants_confirmation_email parameter.
     */
    registrants_email_notification: boolean;

    /**
     * The meeting's registration type.
     *
     * - 1 - Attendees register once and can attend any meeting occurrence.
     * - 2 - Attendees must register for each meeting occurrence.
     * - 3 - Attendees register once and can select one or more meeting occurrences to attend.
     *
     * This field is only for recurring meetings with fixed times (8). This value defaults to 1.
     */
    registration_type: (1 | 2 | 3) & tags.Default<1>;

    /**
     * Whether to include social media sharing buttons on the meeting's registration page.
     *
     * This setting is only applied to meetings with registration enabled.
     */
    show_share_button: boolean;

    /**
     * Whether to use a Personal Meeting ID (PMI) instead of a generated meeting ID.
     *
     * This field is only used for scheduled meetings (2), instant meetings (1), or recurring meetings with no fixed time (3).
     */
    use_pmi: boolean & tags.Default<false>;

    /**
     * Whether to enable the Waiting Room feature. If this value is true, this disables the join_before_host setting.
     */
    waiting_room: boolean;

    /**
     * Whether to add a watermark when viewing a shared screen.
     */
    watermark: boolean & tags.Default<false>;

    /**
     * Whether the Allow host to save video order feature is enabled.
     */
    host_save_video_order: boolean;

    /**
     * Whether to set the meeting as an internal meeting.
     */
    internal_meeting: boolean & tags.Default<false>;

    /**
     * A list of the meeting's invitees.
     */
    meeting_invitees: {
      /**
       * The invitee's email address.
       */
      email: string & tags.Format<"email">;
    }[];

    /**
     * Information about the Enable continuous meeting chat feature.
     */
    continuous_meeting_chat: {
      /**
       * Whether to enable the Enable continuous meeting chat setting.
       */
      enable: boolean;

      /**
       * Whether to enable the Automatically add invited external users setting.
       */
      auto_add_invited_external_users: boolean;

      /**
       * The channel's ID.
       */
      channel_id?: string;
    };

    /**
     * Whether to set the meeting as a participant focused meeting.
     */
    participant_focused_meeting: boolean & tags.Default<false>;

    /**
     * Whether to push meeting changes to the calendar.
     *
     * To enable this feature, configure the Configure Calendar and Contacts Service in the user's profile page of the Zoom web portal and enable the Automatically sync Zoom calendar events information bi-directionally between Zoom and integrated calendars.
     *
     * setting in the Settings page of the Zoom web portal.
     *
     * - true - Push meeting changes to the calendar.
     * - false - Do not push meeting changes to the calendar.
     */
    push_change_to_calendar: boolean & tags.Default<false>;

    /**
     * @title The meeting's resources.
     */
    resources: {
      /**
       * The resource type.
       */
      resource_type: "whiteboard";

      /**
       * The resource ID.
       */
      resource_id: string;

      /**
       * The permission levels for users to access the whiteboard.
       *
       * - `editor` - Users with link access can edit the board.
       * - `commenter` - Users with link access can comment on the board.
       * - `viewer` - Users with link access can view the board.
       */
      permission_level: ("editor" | "commenter" | "viewer") & tags.Default<"editor">;
    }[];

    /**
     * Whether to automatically start a meeting summary.
     */
    auto_start_meeting_summary: boolean & tags.Default<false>;

    /**
     * Whether to automatically start AI Companion questions.
     */
    auto_start_ai_companion_questions: boolean & tags.Default<false>;
  }

  /**
   * Information about the meeting's tracking fields.
   */
  export interface TrackingField {
    /**
     * @title `TrackingField`의 라벨.
     */
    field: string;

    /**
     * @title `TrackingField`의 값.
     */
    value: string;

    /**
     * @title `TrackingField`의 노출 여부.
     */
    visible: boolean;
  }
}
