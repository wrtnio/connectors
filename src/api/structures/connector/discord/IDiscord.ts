import { tags } from "typia";
import { ICommon } from "../common/ISecretValue";

export namespace IDiscord {
  export type ISecret = ICommon.ISecret<"discord", ["bot"]>;

  export interface IGuildResponse {
    id: string;
    name: string;
    icon: string | null;
    icon_hash?: string | null;
    splash: string | null;
    discovery_splash: string | null;
    owner?: boolean;
    owner_id: string;
    permissions?: string;
    region?: string | null;
    afk_channel_id: string | null;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: string | null;
    verification_level: number;
    default_message_notifications: number;
    explicit_content_filter: number;
    roles: IRole[];
    emojis: IEmoji[];
    features: Array<IGuildFeature>;
    mfa_level: number;
    application_id: string | null;
    system_channel_id: string | null;
    system_channel_flags: number;
    rules_channel_id: string | null;
    max_presences?: number | null;
    max_members?: number;
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
    premium_tier: number;
    premium_subscription_count?: number;
    preferred_locale: string;
    public_updates_channel_id: string | null;
    max_video_channel_users?: number;
    max_stage_video_channel_users?: number;
    approximate_member_count?: number;
    approximate_presence_count?: number;
    welcome_screen?: IWelcomeScreen;
    nsfw_level: number;
    stickers?: ISticker[];
    premium_progress_bar_enabled: boolean;
    safety_alerts_channel_id: string | null;
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

  export interface IUser {
    id: string;
    username: string;
    discriminator: string;
    global_name: string | null;
    avatar: string | null;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string | null;
    accent_color?: number | null;
    locale?: string;
    verified?: boolean;
    email?: string | null;
    flags?: number;
    premium_type?: number;
    public_flags?: number;
    avatar_decoration_data?: IAvatarDecorationData | null;
  }

  export interface IAvatarDecorationData {
    asset: string;
    sku_id: string;
  }

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

  export interface IWelcomeScreen {
    description: string | null;
    welcome_channels: IWelcomeChannel[];
  }

  export interface IWelcomeChannel {
    channel_id: string;
    description: string;
    emoji_id: string | null;
    emoji_name: string | null;
  }

  export interface ISticker {
    id: string;
    pack_id?: string;
    name: string;
    description: string | null;
    tags: string;
    asset?: string;
    type: number;
    format_type: number;
    available?: boolean;
    guild_id?: string;
    user?: IUser;
    sort_value?: number;
  }

  export interface IGetCurrentUserGuildMemberRequest extends ISecret {
    guildId: string;
  }

  export interface ILeaveGuildRequest extends ISecret {
    guildId: string;
  }

  export interface ICreateDMRequest extends ISecret {
    recepient_id: string;
  }

  export interface IChannel {
    id: string;
    type: number;
    guild_id?: string;
    position: number;
    permission_overwrites: IOverwrite[];
    name?: string | null;
    topic?: string | null;
    nsfw?: boolean;
    last_message_id?: string | null;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
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

  export interface ICreateGuild extends ISecret {
    name: string;
  }

  export interface IGuild {
    id: string;
    name: string;
    icon: string | null;
    icon_hash?: string | null;
    splash: string | null;
    discovery_splash: string | null;
    owner?: boolean;
    owner_id: string;
    permissions?: string;
    region?: string | null;
    afk_channel_id: string | null;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: string | null;
    verification_level: number;
    default_message_notifications: number;
    explicit_content_filter: number;
    roles: IRole[];
    emojis: IEmoji[];
    features: Array<IGuildFeature>;
    mfa_level: number;
    application_id: string | null;
    system_channel_id: string | null;
    system_channel_flags: number;
    rules_channel_id: string | null;
    max_presences?: number | null;
    max_members?: number;
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
    premium_tier: number;
    premium_subscription_count?: number;
    preferred_locale: string;
    public_updates_channel_id: string | null;
    max_video_channel_users?: number;
    max_stage_video_channel_users?: number;
    approximate_member_count?: number;
    approximate_presence_count?: number;
    welcome_screen?: IWelcomeScreen;
    nsfw_level: number;
    stickers?: ISticker[];
    premium_progress_bar_enabled: boolean;
    safety_alerts_channel_id: string | null;
  }

  export interface IModifyGuildReqeust extends ISecret {
    name: string;
    guildId: string;
  }

  export interface IDeleteGuildRequest extends ISecret {
    guildId: string;
  }

  export interface IGetGuildChannelsRequest extends ISecret {
    guildId: string;
  }

  export interface ICreateGuildChannelRequest extends ISecret {
    guildId: string;
    name: string & tags.MaxLength<100>;
    type: Channel;
    topic?: string & tags.MaxLength<1024>;
  }

  export type Channel =
    | tags.Constant<0, { title: "텍스트 채널" }>
    | tags.Constant<1, { title: "DM 채널" }>;

  export interface IGetListGuildMembersRequest extends ISecret {
    guildId: string;
  }

  export interface IRemoveGuildMember extends ISecret {
    guildId: string;
    userId: string;
  }
}
