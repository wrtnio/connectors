import { tags } from "typia";
import { ICommon } from "../common/ISecretValue";
import { Prerequisite } from "@wrtnio/decorators";

export namespace IDiscord {
  export type ISecret = ICommon.ISecret<"discord", ["bot"]>;

  /**
   * @title 서버 정보
   */
  export interface IGuildResponse {
    /**
     * 서버의 고유 id 입니다.
     *
     * @title 서버 고유 id
     */
    id: string;

    /**
     * 서버 이름 입니다.
     *
     * @title 서버 이름
     */
    name: string;

    /**
     * 서버 아이콘 입니다.
     *
     * @title 서버 아이콘
     */
    icon: string | null;

    /**
     * 서버 소유자 여부 입니다.
     *
     * @title 서버 소유자 여부
     */
    owner?: boolean;

    /**
     * 서버 소유자 고유 id 입니다.
     *
     * @title 서버 소유자 고유 id
     */
    owner_id?: string;
    permissions?: string;
    roles: IRole[];
    emojis: IEmoji[];
    features: Array<IGuildFeature>;
    description: string | null;
  }

  export interface IRole {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    icon?: string | null;
    unicode_emoji?: string | null;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags?: ITags;
    flags: number;
  }

  export interface ITags {
    bot_id?: string;
    integration_id?: string;
    premium_subscriber?: null;
    subscription_listing_id?: number;
    available_for_purchase?: null;
    guild_connections?: null;
  }

  export interface IEmoji {
    id: string | null;
    name: string | null;
    roles?: string[];
    user?: IUser;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
  }

  /**
   * @title 유저 정보
   */
  export interface IUser {
    /**
     * 유저마다 발급된 고유 id 입니다.
     *
     * @title 유저 고유 id
     */
    id: string | string;

    /**
     * 유저 이름입니다.
     *
     * @title 유저 이름
     */
    username: string;

    /**
     * 유저의 discord tag 입니다.
     *
     * @tag 유저의 discord tag
     */
    discriminator: string;

    /**
     * 유저가 설정한 이름입니다. 봇 유저는 어플리케이션 이름이 됩니다.
     *
     * @title 유저가 설정한 이름
     */
    global_name: string | null;
    // avatar: string | null;

    /**
     * 봇 유저 여부입니다.
     *
     * @title 봇 유저 여부
     */
    bot?: boolean;

    /**
     * 유저 이메일입니다.
     *
     * @title 이메일
     */
    email?: string | null;
  }

  /**
   * @title 서버에서 가능한 기능
   */
  export type IGuildFeature =
    | "ANIMATED_BANNER"
    | "ANIMATED_ICON"
    | "APPLICATION_COMMAND_PERMISSIONS_V2"
    | "AUTO_MODERATION"
    | "BANNER"
    | "COMMUNITY"
    | "CREATOR_MONETIZABLE_PROVISIONAL"
    | "CREATOR_STORE_PAGE"
    | "DEVELOPER_SUPPORT_SERVER"
    | "DISCOVERABLE"
    | "FEATURABLE"
    | "INVITES_DISABLED"
    | "INVITE_SPLASH"
    | "MEMBER_VERIFICATION_GATE_ENABLED"
    | "MORE_STICKERS"
    | "NEWS"
    | "PARTNERED"
    | "PREVIEW_ENABLED"
    | "RAID_ALERTS_DISABLED"
    | "ROLE_ICONS"
    | "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE"
    | "ROLE_SUBSCRIPTIONS_ENABLED"
    | "TICKETED_EVENTS_ENABLED"
    | "VANITY_URL"
    | "VERIFIED"
    | "VIP_REGIONS"
    | "WELCOME_SCREEN_ENABLED";

  /**
   * @title DM을 보내기 위해 필요한 정보
   */
  export interface ICreateDMRequest extends ISecret {
    /**
     * DM을 보낼 상대방을 선택해주세요.
     *
     * @title 상대방
     */
    recipient_id: string &
      Prerequisite<{
        method: "post";
        path: "connector/discord/get-list-guild-members";
        jmesPath: "[].{value:user.id, label:user.username}";
      }>;
  }

  /**
   * @title 채널 정보
   */
  export interface IChannel {
    id: string;
    type: number;
    guild_id?: string;
    position?: number;
    permission_overwrites?: IOverwrite[];
    name?: string | null;
    topic?: string | null;
    recipients?: IUser[];
    icon?: string | null;
    owner_id?: string;
    application_id?: string;
    managed?: boolean;
    parent_id?: string | null;
    last_pin_timestamp?: (string & tags.Format<"date-time">) | null;
    rtc_region?: string | null;
    video_quality_mode?: number;
    message_count?: number;
    member_count?: number;
    thread_metadata?: IThreadMetadata;
    member?: IThreadMember;
    default_auto_archive_duration?: number;
    permissions?: string;
    flags?: number;
    total_message_sent?: number;
    available_tags?: ITag[];
    applied_tags?: string[];
    default_reaction_emoji?: IDefaultReaction | null;
    default_thread_rate_limit_per_user?: number;
    default_sort_order?: number | null;
    default_forum_layout?: number;
  }

  export interface IOverwrite {
    id: string;
    type: number;
    allow: string;
    deny: string;
  }

  export interface IThreadMetadata {
    archived: boolean;
    auto_archive_duration: number;
    archive_timestamp: string & tags.Format<"date-time">;
    locked: boolean;
    invitable?: boolean;
    create_timestamp?: (string & tags.Format<"date-time">) | null;
  }

  export interface IThreadMember {
    id?: string;
    user_id?: string;
    join_timestamp: string & tags.Format<"date-time">;
    flags: number;
    member?: IGuildMember;
  }

  export interface ITag extends IDefaultReaction {
    id: string;
    name: string;
    moderated: boolean;
  }

  export interface IDefaultReaction {
    emoji_id: string | null;
    emoji_name: string | null;
  }

  /**
   * @title 서버에 있는 멤버 정보
   */
  export interface IGuildMember {
    user?: IUser;
    nick?: string | null;
    avatar?: string | null;
    roles: string[];
    joined_at: string & tags.Format<"date-time">;
    premium_since?: (string & tags.Format<"date-time">) | null;
    deaf: boolean;
    mute: boolean;
    flags: number;
    pending?: boolean;
    permissions?: string;
    communication_disabled_until?: (string & tags.Format<"date-time">) | null;
    avatar_decoration_data?: IAvatarDecorationData | null;
  }

  export interface IAvatarDecorationData {
    asset: string;
    sku_id: string;
  }

  /**
   * @title 서버를 생성하기 위해 필요한 정보
   */
  export interface ICreateGuildRequest {
    /**
     * 서버 이름을 입력해주세요.
     *
     * @title 서버 이름
     */
    name: string;
  }

  /**
   * @title 서버 정보
   *
   */
  export interface IGuild {
    id: string;
    name: string;
    owner?: boolean;
    owner_id?: string;
    roles?: IRole[];
    features: Array<IGuildFeature>;
    description?: string | null;
  }

  /**
   * @title 서버 정보를 수정하기 위해 필요한 정보
   */
  export interface IModifyGuildRequest extends ISecret {
    /**
     * 수정할 서버 이름을 입력해주세요.
     *
     * @title 수정할 이름
     */
    name: string;
  }

  /**
   * @title 채널을 생성하기 위해 필요한 정보
   */
  export interface ICreateGuildChannelRequest extends ISecret {
    /**
     * 생성할 서버 이름을 입력해주세요.
     *
     * @title 채널 이름
     */
    name: string & tags.MaxLength<100>;

    /**
     * 서버 유형을 선택해주세요.
     *
     * @title 유형
     */
    type: Channel;

    /**
     * 채널 주제를 입력해주세요.
     *
     * @title 주제
     */
    topic?: string & tags.MaxLength<1024>;
  }

  /**
   * @title 채널 유형
   */
  export type Channel =
    | tags.Constant<0, { title: "텍스트 채널" }>
    | tags.Constant<1, { title: "DM 채널" }>;

  /**
   * @title 멤버를 차단 하기 위해 필요한 정보
   */
  export interface IRemoveGuildMember extends ISecret {
    /**
     * 차단할 멤버를 선택해주세요.
     *
     * @title 멤버
     */
    userId: string &
      Prerequisite<{
        method: "post";
        path: "connector/discord/get-list-guild-members";
        jmesPath: "[].{value:user.id, label:user.username}";
      }>;
  }

  /**
   * @title 채널을 수정하기 위해 필요한 정보
   */
  export interface IModifyChannelRequest {
    /**
     * 수정할 채널 이름을 입력해주세요.
     *
     * @title 수정할 채널 이름
     */
    name: string;

    /**
     * 수정할 채널을 선택해주세요.
     *
     * @title 채널
     */
    channelId: string &
      Prerequisite<{
        method: "post";
        path: "connector/discord/get-guild-channels";
        jmesPath: "[].{value:id, label:name}";
      }>;
  }

  /**
   * @title 채널을 삭제하기 위해 필요한 정보
   */
  export interface IDeleteChannelRequest {
    /**
     * 삭제할 채널을 선택해주세요.
     *
     * @title 채널
     */
    channelId: string &
      Prerequisite<{
        method: "post";
        path: "connector/discord/get-guild-channels";
        jmesPath: "[].{value:id, label:name}";
      }>;
  }

  /**
   * @title 메세지 정보
   */
  export interface IMessage {
    id: string;
    channel_id: string;
    author: IUser;
    content: string;
    timestamp: string & tags.Format<"date-time">;
    edited_timestamp?: (string & tags.Format<"date-time">) | null;
    tts: boolean;
    mention_everyone: boolean;
    mentions: IUser[];
    mention_channels?: IChannelMention[];
    attachments: IAttachment[];
    embeds: IEmbed[];
    reactions?: IReaction[];
    pinned: boolean;
    type: number & tags.Minimum<0> & tags.Maximum<45> & tags.Type<"int32">;
    thread?: IChannel;
  }

  export interface IChannelMention {
    id: string;
    guild_id: string;
    type: Channel;
    name: string;
  }

  export interface IAttachment {
    id: string;
    filename: string;
    title?: string;
    description?: string;
    conetnt_type?: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number | null;
    width?: number | null;
    ephemeral?: boolean;
    duration_secs?: number & tags.Type<"float">;
    waveform?: string;
    flags?: number;
  }

  export interface IEmbed {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: string & tags.Format<"date-time">;
    color?: number;
    footer?: IEmbedFooter;
    image?: IEmbedImage;
    thumbnail?: IEmbedThumbnail;
    video?: IEmbedVideo;
    provider?: IEmbedProvider;
    author?: IEmbedAuthor;
    fields?: IEmbedField[];
  }

  export interface IEmbedFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
  }

  export interface IEmbedImage {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  }

  export interface IEmbedThumbnail {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  }

  export interface IEmbedVideo {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  }

  export interface IEmbedProvider {
    name?: string;
    url?: string;
  }

  export interface IEmbedAuthor {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
  }

  export interface IEmbedField {
    name: string;
    value: string;
    inline?: boolean;
  }

  export interface IReaction {
    count: number;
    count_details: IReactionCountDetails;
    me: boolean;
    me_burst: boolean;
    emoji: Partial<IEmoji>;
    burst_colors: []; //TODO: https://discord.com/developers/docs/resources/message#reaction-count-details-object
  }
  export interface IReactionCountDetails {
    burst: number;
    normal: number;
  }

  export interface IMessageActivity {
    type:
      | tags.Constant<1, { title: "JOIN" }>
      | tags.Constant<2, { title: "SPECTATE" }>
      | tags.Constant<3, { title: "LISTEN" }>
      | tags.Constant<5, { title: "JOIN_REQUEST" }>;
    party_id?: string;
  }

  /**
   * @title 고정된 메세지를 가져오기 위해 필요한 정보
   */
  export interface IGetPinnedMessagesRequest {
    /**
     * 고정된 메세지를 가져올 채널을 선택해주세요.
     *
     * @title 채널
     */
    channelId: string &
      Prerequisite<{
        method: "post";
        path: "connector/discord/get-guild-channels";
        jmesPath: "[].{value:id, label:name}";
      }>;
  }

  /**
   * @title 메세지를 고정 또는 고정 해제하기 위해 필요한 정보
   */
  export interface IPinOrUnpinMessagesRequest {
    /**
     * 메세지를 고정 또는 고정 해제할 채널을 선택해주세요.
     *
     * @title 채널
     */
    channelId: string &
      Prerequisite<{
        method: "post";
        path: "connector/discord/get-guild-channels";
        jmesPath: "[].{value:id, label:name}";
      }>;

    /**
     * 고정 또는 고정 해제할 메세지를 선택해주세요.
     *
     * @title 메세지
     */
    messageId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/discord/get-channel-message-histories";
        jmesPath: "[].{value:id, label:content}";
      }>;
  }

  /**
   * @title 스레드에 참여하거나 나가기 위해 필요한 정보
   */
  export interface IJoinOrLeaveThreadRequest {
    /**
     * 스레드에 참여하거나 나가기 위한 채널을 선택해주세요.
     *
     * @title 채널
     */
    channelId: string &
      Prerequisite<{
        method: "post";
        path: "connector/discord/get-guild-channels";
        jmesPath: "[].{value:id, label:name}";
      }>;
  }

  /**
   * @title 채널의 메세지 목록을 가져오기 위해 필요한 정보
   */
  export interface IGetChannelMessageHistoriesRequest {
    /**
     * 메세지 목록을 가져올 채널을 선택해주세요.
     *
     * @title 채널
     */
    channelId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/discord/get-guild-channels";
        jmesPath: "[].{value:id, label:name}";
      }>;
  }

  /**
   * @title 메세지를 생성하기 위해 필요한 정보
   */
  export interface ICreateMessageRequest {
    /**
     * 메세지를 생성할 채널을 선택해주세요.
     *
     * @title 채널
     */
    channelId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/discord/get-guild-channels";
        jmesPath: "[].{value:id, label:name}";
      }>;

    /**
     * 메세지 내용을 입력해주세요.
     *
     * @title 메세지 내용
     */
    content: string;
  }

  /**
   * @title 공지 채널에서 다음 채널로 메세지를 교차 게시하기 위해 필요한 정보
   */
  export interface ICrossPostMessageRequest {
    /**
     * 메세지를 교차 게시할 채널을 선택해주세요.
     *
     * @title 채널
     */
    channelId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/discord/get-guild-channels";
        jmesPath: "[].{value:id, label:name}";
      }>;

    /**
     * 교차 게시할 메세지를 선택해주세요.
     *
     * @title 교차 게시할 메세지
     */
    messageId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/discord/get-channel-message-histories";
        jmesPath: "[].{value:id, label:content}";
      }>;
  }

  /**
   * @title 메세지 수정하기 위해 필요한 정보
   */
  export interface IEditMessageRequest {
    /**
     * 메세지를 수정할 채널을 선택해주세요.
     *
     * @title 채널
     */
    channelId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/discord/get-guild-channels";
        jmesPath: "[].{value:id, label:name}";
      }>;

    /**
     * 수정할 메세지를 선택해주세요.
     *
     * @title 수정할 메세지
     */
    messageId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/discord/get-channel-message-histories";
        jmesPath: "[].{value:id, label:content}";
      }>;

    /**
     * 수정할 내용을 입력해주세요.
     *
     * @title 수정할 내용
     */
    content: string;
  }

  /**
   * @title 메세지 삭제하기 위해 필요한 정보
   */
  export interface IDeleteMessageRequest {
    /**
     * 메세지를 삭제할 채널을 선택해주세요.
     *
     * @title 채널
     */
    channelId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/discord/get-guild-channels";
        jmesPath: "[].{value:id, label:name}";
      }>;

    /**
     * 삭제할 메세지를 선택해주세요
     *
     * @title 삭제할 메세지
     */
    messageId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/discord/get-channel-message-histories";
        jmesPath: "[].{value:id, label:content}";
      }>;
  }

  /**
   * @title 여러 개의 메세지를 한꺼번에 삭제하기 위해 필요한 정보
   */
  export interface IBulkDeleteMessagesRequest {
    /**
     * 메세지를 삭제할 채널을 선택해주세요.
     *
     * @title 채널
     */
    channelId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/discord/get-guild-channels";
        jmesPath: "[].{value:id, label:name}";
      }>;

    /**
     * 삭제할 메세지들을 선택해주세요
     *
     * @title 삭제할 메세지들
     */
    messages: Array<
      string &
        Prerequisite<{
          method: "post";
          path: "/connector/discord/get-channel-message-histories";
          jmesPath: "[].{value:id, label:content}";
        }>
    >;
  }
}
