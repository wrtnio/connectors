import { Placeholder } from "@wrtn/decorators";

export namespace IDiscord {
  /**
   * @title 채널 생성
   */
  export interface IDiscordChannelInput {
    /**
     * @title 서버 아이디
     */
    guildId: string & Placeholder<"서버 아이디">;

    /**
     * @title 채널 이름
     */
    channelName?: string & Placeholder<"채널 이름">;
  }

  /**
   * @title 채널 생성 결과
   */
  export interface IDiscordChannelOutput {
    /**
     * @title 채널 ID
     */
    id: string;

    /**
     * @title 채널 타입
     */
    type: number;

    /**
     * @title 마지막 메시지 ID
     */
    last_message_id: string | null;

    /**
     * @title 채널 플래그
     */
    flags: number;

    /**
     * @title 서버 ID
     */
    guild_id: string;

    /**
     * @title 채널 이름
     */
    name: string;

    /**
     * @title 부모 채널 ID
     */
    parent_id: number | null;

    /**
     * @title 사용자당 속도 제한
     */
    rate_limit_per_user: number;

    /**
     * @title 채널 주제
     */
    topic: string | null;

    /**
     * @title 채널 위치
     */
    position: number;

    /**
     * @title 권한 덮어쓰기
     */
    permission_overwrites: Array<{
      /**
       * @title 덮어쓰기 대상의 ID (사용자 또는 역할)
       */
      id: string;

      /**
       * @title 대상의 유형 (0: 역할, 1: 사용자)
       */
      type: number;

      /**
       * @title 허용된 권한 비트 플래그
       */
      allow: string;

      /**
       * @title 거부된 권한 비트 플래그
       */
      deny: string;
    }>; // 권한 구조에 따라 조정

    /**
     * @title NSFW 여부
     */
    nsfw: boolean;
  }

  /**
   * @title 채널 리스트 가져오기
   */
  export interface IDiscordGetChannelInput {
    /**
     * @title 사용자 아이디
     */
    guildId: string & Placeholder<"서버 아이디">;
  }

  /**
   * @title 채널 리스트
   */
  export interface IDiscordGetChannelOutput {
    /**
     * @title 채널 아이디
     */
    id: string;

    /**
     * @title 채널 유형 (e.g., 0 for text, 2 for voice, 4 for category)
     */
    type: number;

    /**
     * @title 마지막 메세지 아이디
     */
    last_message_id: string | null | undefined;

    /**
     * @title 채널 플래그
     */
    flags: number;

    /**
     * @title 소속된 서버의 ID
     */
    guild_id: string;

    /**
     * @title 채널 이름
     */
    name: string;

    /**
     * @title 상위 카테고리의 ID
     */
    parent_id: string | null;

    /**
     * @title 채널 rate limit per user
     */
    rate_limit_per_user: number | undefined;

    /**
     * @title 비트레이트
     */
    bitrate: number | null | undefined;

    /**
     * @title 사용자 제한 수
     */
    user_limit: number | undefined;

    /**
     * @title RTC 지역
     */
    rtc_region: string | null | undefined;

    /**
     * @title 채널 토픽
     */
    topic: string | null | undefined;

    /**
     * @title 채널 위치
     */
    position: number;

    /**
     * @title 권한 덮어쓰기 정보
     */
    permission_overwrites: IDiscordPermissionOverwrite[];

    /**
     * @title NSFW 여부
     */
    nsfw: boolean | undefined;
  }

  export interface IDiscordPermissionOverwrite {
    /**
     * @title 권한 덮어쓰기 ID
     */
    id: string;
    /**
     * @title 권한 타입 (0: 역할, 1: 멤버)
     */
    type: number;
    /**
     * @title 허용된 권한을 표현하는 비트 필드
     */
    allow: string;
    /**
     * @title 거부된 권한을 표현하는 비트 필드
     */
    deny: string;
  }

  /**
   * @title 메세지 전송
   */
  export interface IDiscordMessageInput {
    /**
     * @title 채널 아이디
     */
    channelId: string & Placeholder<"채널 아이디">;

    /**
     * @title 메세지
     */
    message?: string & Placeholder<"메세지">;
  }

  /**
   * @title 메세지 전송 결과
   */
  export interface IDiscordMessageOutput {
    /**
     * @title 메세지 타입
     */
    type: number;

    /**
     * @title 채널 ID
     */
    channel_id: string;

    /**
     * @title 메세지 내용
     */
    content: string;

    /**
     * @title 첨부 파일 목록
     */
    attachments: IDiscordAttachment[];

    /**
     * @title 임베드된 메시지 목록
     */
    embeds: IDiscordEmbed[];

    /**
     * @title 메세지 타임스탬프
     */
    timestamp: string;

    /**
     * @title 수정된 타임스탬프
     */
    edited_timestamp: string | null;

    /**
     * @title 메세지 플래그
     */
    flags: number;

    /**
     * @title 메세지 구성 요소
     */
    components: IDiscordComponent[];

    /**
     * @title 메세지 ID
     */
    id: string;

    /**
     * @title 메세지 작성자 정보
     */
    author: IDiscordAuthor;

    /**
     * @title 멘션된 사용자 목록
     */
    mentions: IDiscordUser[];

    /**
     * @title 멘션된 역할 목록
     */
    mention_roles: string[];

    /**
     * @title 고정 여부
     */
    pinned: boolean;

    /**
     * @title 모든 사람 멘션 여부
     */
    mention_everyone: boolean;

    /**
     * @title TTS 여부
     */
    tts: boolean;
  }

  /**
   * @title 메세지 작성자 정보
   */
  export interface IDiscordAuthor {
    /**
     * @title 사용자 ID
     */
    id: string;

    /**
     * @title 사용자 이름
     */
    username: string;

    /**
     * @title 사용자 디스코드 태그 (예: #1234)
     */
    discriminator: string;

    /**
     * @title 사용자 아바타 URL
     */
    avatar: string | null;

    /**
     * @title 봇 여부
     */
    // @ts-ignore
    bot?: boolean;
  }

  /**
   * @title 첨부 파일
   */
  export interface IDiscordAttachment {
    /**
     * @title 첨부 파일 ID
     */
    id: string;

    /**
     * @title 파일 이름
     */
    filename: string;

    /**
     * @title 파일 크기
     */
    size: number;

    /**
     * @title 파일 URL
     */
    url: string;

    /**
     * @title 프록시 URL
     */
    proxy_url: string;

    /**
     * @title 파일 높이 (이미지 파일일 경우)
     */
    height?: number;

    /**
     * @title 파일 너비 (이미지 파일일 경우)
     */
    width?: number;

    /**
     * @title 파일 콘텐츠 유형
     */
    content_type?: string;
  }

  /**
   * @title 임베드 메시지
   */
  export interface IDiscordEmbed {
    /**
     * @title 제목
     */
    title?: string;

    /**
     * @title 타입
     */
    type?: string;

    /**
     * @title 설명
     */
    description?: string;

    /**
     * @title URL
     */
    url?: string;

    /**
     * @title 타임스탬프
     */
    timestamp?: string;

    /**
     * @title 색상
     */
    color?: number;

    /**
     * @title 푸터
     */
    footer?: {
      text: string;
      icon_url?: string;
      proxy_icon_url?: string;
    };

    /**
     * @title 이미지
     */
    image?: {
      url: string;
      proxy_url?: string;
      height?: number;
      width?: number;
    };

    /**
     * @title 썸네일
     */
    thumbnail?: {
      url: string;
      proxy_url?: string;
      height?: number;
      width?: number;
    };

    /**
     * @title 비디오
     */
    video?: {
      url?: string;
      proxy_url?: string;
      height?: number;
      width?: number;
    };

    /**
     * @title 제공자
     */
    provider?: {
      name?: string;
      url?: string;
    };

    /**
     * @title 작성자
     */
    author?: {
      name?: string;
      url?: string;
      icon_url?: string;
      proxy_icon_url?: string;
    };

    /**
     * @title 필드
     */
    fields?: Array<{
      name: string;
      value: string;
      inline?: boolean;
    }>;
  }

  /**
   * @title 메시지 구성 요소
   */
  export interface IDiscordComponent {
    /**
     * @title 타입
     */
    type: number;

    /**
     * @title 구성 요소 배열
     */
    components?: IDiscordComponent[];
  }

  /**
   * @title 사용자
   */
  export interface IDiscordUser {
    /**
     * @title 사용자 ID
     */
    id: string;

    /**
     * @title 사용자 이름
     */
    username: string;

    /**
     * @title 사용자 디스코드 태그 (예: #1234)
     */
    discriminator: string;

    /**
     * @title 사용자 아바타 URL
     */
    avatar: string | null;

    /**
     * @title 봇 여부
     */
    bot?: boolean;
  }

  /**
   * @title 채널 초대링크 생성
   */
  export interface IDiscordInviteChannelInput {
    /**
     * @channelId 채널 아이디
     */
    channelId?: string & Placeholder<"채널 아이디">;
  }

  /**
   * @title 채널 초대링크 생성 결과
   */
  export interface IDiscordInviteChannelOutput {
    /**
     * @title 초대 타입
     */
    type: number;

    /**
     * @title 초대 코드
     */
    code: string;

    /**
     * @title 초대를 생성한 사용자 정보
     */
    inviter: IDiscordInviter;

    /**
     * @title 초대의 최대 유효기간 (초 단위)
     */
    max_age: number;

    /**
     * @title 초대 생성 시각
     */
    created_at: string;

    /**
     * @title 초대 만료 시각
     */
    expires_at: string;

    /**
     * @title 초대된 서버 정보
     */
    guild: IDiscordGuild;

    /**
     * @title 초대된 서버 ID
     */
    guild_id: string;

    /**
     * @title 초대된 채널 정보
     */
    channel: IDiscordChannel;

    /**
     * @title 초대 사용 횟수
     */
    uses: number;

    /**
     * @title 초대의 최대 사용 가능 횟수
     */
    max_uses: number;

    /**
     * @title 임시 초대 여부
     */
    temporary: boolean;

    /**
     * @title 초대 URL
     */
    url: string;
  }

  /**
   * @title 초대를 생성한 사용자 정보
   */
  export interface IDiscordInviter {
    /**
     * @title 사용자 ID
     */
    id: string;

    /**
     * @title 사용자 이름
     */
    username: string;

    /**
     * @title 사용자 아바타 URL
     */
    avatar: string | null;

    /**
     * @title 사용자 디스코드 태그 (예: #1234)
     */
    discriminator: string;

    /**
     * @title 공개 플래그
     */
    public_flags: number;

    /**
     * @title 플래그
     */
    flags: number;

    /**
     * @title 봇 여부
     */
    bot: boolean;

    /**
     * @title 사용자 배너 URL
     */
    banner: string | null;

    /**
     * @title 사용자 강조 색상
     */
    accent_color: string | null;

    /**
     * @title 글로벌 이름
     */
    global_name: string | null;

    /**
     * @title 아바타 장식 데이터
     */
    avatar_decoration_data: string | null;

    /**
     * @title 배너 색상
     */
    banner_color: string | null;

    /**
     * @title 클랜 이름
     */
    clan: string | null;
  }

  /**
   * @title 초대된 서버 정보
   */
  export interface IDiscordGuild {
    /**
     * @title 서버 ID
     */
    id: string;

    /**
     * @title 서버 이름
     */
    name: string;

    /**
     * @title 서버 스플래시 이미지 URL
     */
    splash: string | null;

    /**
     * @title 서버 배너 이미지 URL
     */
    banner: string | null;

    /**
     * @title 서버 설명
     */
    description: string | null;

    /**
     * @title 서버 아이콘 URL
     */
    icon: string | null;

    /**
     * @title 서버 기능 목록
     */
    features: string[];

    /**
     * @title 인증 수준
     */
    verification_level: number;

    /**
     * @title 서버 바니티 URL 코드
     */
    vanity_url_code: string | null;

    /**
     * @title NSFW 수준
     */
    nsfw_level: number;

    /**
     * @title NSFW 여부
     */
    nsfw: boolean;

    /**
     * @title 프리미엄 구독자 수
     */
    premium_subscription_count: number;
  }

  /**
   * @title 초대된 채널 정보
   */
  export interface IDiscordChannel {
    /**
     * @title 채널 ID
     */
    id: string;

    /**
     * @title 채널 타입
     */
    type: number;

    /**
     * @title 채널 이름
     */
    name: string;
  }

  /**
   * @title 다이렉트 메세지 전송
   */
  export interface IDiscordDirectMessageInput {
    /**
     * @userId 사용자 아이디
     */
    userId: string & Placeholder<"사용자 아이디">;

    /**
     * @message 메세지
     */
    message?: string & Placeholder<"메세지">;
  }

  /**
   * @title 다이렉트 메세지 전송
   */
  export interface IDiscordDirectMessageOutput {
    /**
     * @title 메시지 유형
     */
    type: number;

    /**
     * @title 채널 ID
     */
    channel_id: string;

    /**
     * @title 메시지 내용
     */
    content: string;

    /**
     * @title 첨부파일 목록
     */
    attachments: IDiscordAttachment[];

    /**
     * @title 임베드된 내용 목록
     */
    embeds: IDiscordEmbed[];

    /**
     * @title 메시지 생성 시간
     */
    timestamp: string;

    /**
     * @title 메시지 수정 시간
     */
    edited_timestamp: string | null;

    /**
     * @title 메시지 플래그
     */
    flags: number;

    /**
     * @title 메시지 컴포넌트 목록
     */
    components: IDiscordComponent[];

    /**
     * @title 메시지 ID
     */
    id: string;

    /**
     * @title 메시지 작성자 정보
     */
    author: {
      /**
       * @title 작성자 ID
       */
      id: string;

      /**
       * @title 작성자 사용자명
       */
      username: string;

      /**
       * @title 작성자 아바타 URL
       */
      avatar: string | null;

      /**
       * @title 작성자 태그
       */
      discriminator: string;

      /**
       * @title 공용 플래그
       */
      public_flags: number;

      /**
       * @title 작성자 플래그
       */
      flags: number;

      /**
       * @title 봇 여부
       */
      bot: boolean;

      /**
       * @title 작성자 배너 URL
       */
      banner: string | null;

      /**
       * @title 강조 색상
       */
      accent_color: number | null;

      /**
       * @title 글로벌 이름
       */
      global_name: string | null;

      /**
       * @title 아바타 장식 데이터
       */
      avatar_decoration_data: string | null;

      /**
       * @title 배너 색상
       */
      banner_color: string | null;

      /**
       * @title 클랜 정보
       */
      clan: string | null;
    };

    /**
     * @title 멘션된 사용자 목록
     */
    mentions: IDiscordMention[];

    /**
     * @title 멘션된 역할 목록
     */
    mention_roles: IDiscordMentionRole[];

    /**
     * @title 핀 여부
     */
    pinned: boolean;

    /**
     * @title 모든 사용자 멘션 여부
     */
    mention_everyone: boolean;

    /**
     * @title TTS 여부
     */
    tts: boolean;
  }

  /**
   * @title 첨부파일 전송
   */
  export interface IDiscordAttachment {
    /**
     * @title 첨부파일 ID
     * 첨부파일의 고유 식별자
     */
    id: string;

    /**
     * @title 파일 이름
     * 첨부된 파일의 이름
     */
    filename: string;

    /**
     * @title 파일 크기
     * 첨부된 파일의 크기 (바이트 단위)
     */
    size: number;

    /**
     * @title 파일 URL
     * 첨부된 파일의 URL
     */
    url: string;

    /**
     * @title 프록시 URL
     * 첨부된 파일의 프록시 URL
     */
    proxy_url: string;

    /**
     * @title 파일 높이
     * 첨부된 파일의 높이 (적용 가능한 경우)
     */
    // @ts-ignore
    height?: number | null;

    /**
     * @title 파일 너비
     * 첨부된 파일의 너비 (적용 가능한 경우)
     */
    // @ts-ignore
    width?: number | null;

    /**
     * @title 콘텐츠 유형
     * 첨부된 파일의 MIME 타입
     */
    // @ts-ignore
    content_type?: string | null;
  }

  /**
   * @title 디스코드 메시지에서 멘션된 사용자 정보를 나타냅니다.
   */
  export interface IDiscordMention {
    /**
     * @title 멘션된 사용자의 고유 식별자 ID
     */
    id: string;

    /**
     * @title 멘션된 사용자의 이름 이름
     */
    username: string;

    /**
     * @title 멘션된 사용자의 디스플레이 이름
     */
    display_name: string | null;

    /**
     * @title 멘션된 사용자의 아바타 아바타
     */
    avatar: string | null;

    /**
     * @title 멘션된 사용자가 봇인지 여부 여부
     */
    bot: boolean;
  }

  /**
   * @title 디스코드 메시지에서 멘션된 역할 정보를 나타냅니다.
   */
  export interface IDiscordMentionRole {
    /**
     * @title 멘션된 역할의 ID
     */
    id: string;

    /**
     * @title 멘션된 역할의 이름 이름
     */
    name: string;
  }

  /**
   * @title 유저 정보 검색
   */
  export interface IDiscordFindUserInput {
    /**
     * @userId 사용자 아이디
     */
    userId: string & Placeholder<"사용자 아이디">;
  }

  /**
   * @title 유저 정보 검색
   */
  export interface IDiscordFindUserOutput {
    /**
     * 사용자 아이디
     */
    id: string;

    /**
     * 사용자 이름
     */
    username: string;

    /**
     * 아바타
     */
    avatar: string | null;

    /**
     * 구별자
     */
    discriminator: string;

    /**
     * 공용 플래그
     */
    public_flags: number;

    /**
     * 플래그
     */
    flags: number;

    /**
     * 배너
     */
    banner: string | null;

    /**
     * 강조 색상
     */
    accent_color: number | null;

    /**
     * 전역 이름
     */
    global_name: string;

    /**
     * 아바타 장식 데이터
     */
    avatar_decoration_data: {
      /**
       * @title 장식의 고유 식별자 ID
       */
      id: string;

      /**
       * @title 장식 유형
       */
      type: string;

      /**
       * @title 장식에 대한 추가 데이터
       */
      data: {
        /**
         * @title 장식 색상
         */
        color: string;

        /**
         * @title 장식 이미지 URL
         */
        imageUrl: string;

        /**
         * @title 장식 텍스트
         */
        text: string;
      };
    } | null;

    /**
     * 배너 색상
     */
    banner_color: string | null;

    /**
     * 클랜
     */
    clan: string | null;
  }
}
