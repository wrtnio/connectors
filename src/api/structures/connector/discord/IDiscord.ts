import { Placeholder } from "@wrtn/decorators";

export namespace IDiscord {
  /**
   * @title 채널 생성
   */
  export interface IDiscordChannelInput {
    /**
     * @guildId 서버 아이디
     */
    guildId: string & Placeholder<"서버 아이디">;

    /**
     * @channelName 채널 이름
     */
    channelName?: string & Placeholder<"채널 이름">;
  }

  /**
   * @title 채널 생성 결과
   */
  export interface IDiscordChannelOutput {
    id: string;
    type: number;
    last_message_id: string | null;
    flags: number;
    guild_id: string;
    name: string;
    parent_id: string | null;
    rate_limit_per_user: number;
    topic: string | null;
    position: number;
    permission_overwrites: any[]; // Adjust based on permissions structure
    nsfw: boolean;
  }

  /**
   * @title 유저 정보 검색
   */
  export interface IDiscordGetChannelInput {
    /**
     * @userId 사용자 아이디
     */
    guildId: string & Placeholder<"서버 아이디">;
  }

  export interface IDiscordGetChannelOutput {
    id: string; // 채널 아이디
    type: number; // 채널 유형 (e.g., 0 for text, 2 for voice, 4 for category)
    flags: number; // 채널 플래그
    guild_id: string; // 소속된 서버의 ID
    name: string; // 채널 이름
    parent_id: string | null; // 상위 카테고리의 ID (null 가능)
    position: number; // 채널 위치
    permission_overwrites: Array<any>; // 권한 덮어쓰기 정보
  }

  /**
   * @title 메세지 전송
   */
  export interface IDiscordMessageInput {
    /**
     * @channelId 채널 아이디
     */
    channelId: string & Placeholder<"채널 아이디">;

    /**
     * @channelName 메세지
     */
    message?: string & Placeholder<"메세지">;
  }

  /**
   * @title 메세지 전송 결과
   */
  export interface IDiscordMessageOutput {
    type: number;
    channel_id: string;
    content: string;
    attachments: any[];
    embeds: any[];
    timestamp: string;
    edited_timestamp: string | null;
    flags: number;
    components: any[];
    id: string;
    author: IDiscordAuthor;
    mentions: any[];
    mention_roles: any[];
    pinned: boolean;
    mention_everyone: boolean;
    tts: boolean;
  }

  /**
   * @title 메세지 전송 결과의 author
   */
  export interface IDiscordAuthor {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
    flags: number;
    bot: boolean;
    banner: string | null;
    accent_color: string | null;
    global_name: string | null;
    avatar_decoration_data: string | null;
    banner_color: string | null;
    clan: string | null;
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
    type: number;
    code: string;
    inviter: IDiscordInviter;
    max_age: number;
    created_at: string;
    expires_at: string;
    guild: IDiscordGuild;
    guild_id: string;
    channel: IDiscordChannel;
    uses: number;
    max_uses: number;
    temporary: boolean;
    url: string;
  }

  export interface IDiscordInviter {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
    flags: number;
    bot: boolean;
    banner: string | null;
    accent_color: string | null;
    global_name: string | null;
    avatar_decoration_data: string | null;
    banner_color: string | null;
    clan: string | null;
  }

  export interface IDiscordGuild {
    id: string;
    name: string;
    splash: string | null;
    banner: string | null;
    description: string | null;
    icon: string | null;
    features: string[];
    verification_level: number;
    vanity_url_code: string | null;
    nsfw_level: number;
    nsfw: boolean;
    premium_subscription_count: number;
  }

  export interface IDiscordChannel {
    id: string;
    type: number;
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
    attachments: any[];

    /**
     * @title 임베드된 내용 목록
     */
    embeds: any[];

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
    components: any[];

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
    mentions: any[];

    /**
     * @title 멘션된 역할 목록
     */
    mention_roles: any[];

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
    avatar_decoration_data: any | null;

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
