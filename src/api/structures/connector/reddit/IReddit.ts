import { tags } from "typia";
import { ICommon } from "../common/ISecretValue";

export namespace IReddit {
  export type Secret = ICommon.ISecret<
    "reddit",
    ["account", "history", "identity", "mysubreddits", "read", "report", "save"]
  >;

  export interface IGetHotPostsInput extends IReddit.Secret {
    g?: string;
    subreddit?: string;
    limit: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface Children {
    kind: string;
    data: Child;
  }

  export interface Child {
    approved_at_utc: any;
    subreddit: string;
    selftext: string;
    author_fullname: string;
    saved: boolean;
    mod_reason_title: any;
    gilded: number;
    clicked: boolean;
    title: string;
    link_flair_richtext: LinkFlairRichtext[];
    subreddit_name_prefixed: string;
    hidden: boolean;
    pwls: number;
    link_flair_css_class: string | null;
    downs: number;
    thumbnail_height?: number;
    top_awarded_type: any;
    hide_score: boolean;
    name: string;
    quarantine: boolean;
    link_flair_text_color: string;
    upvote_ratio: number;
    author_flair_background_color: any;
    ups: number;
    total_awards_received: number;
    media_embed: MediaEmbed;
    thumbnail_width?: number;
    author_flair_template_id?: string;
    is_original_content: boolean;
    user_reports: any[];
    secure_media?: SecureMedia;
    is_reddit_media_domain: boolean;
    is_meta: boolean;
    category: any;
    secure_media_embed: SecureMediaEmbed;
    link_flair_text: string;
    can_mod_post: boolean;
    score: number;
    approved_by: any;
    is_created_from_ads_ui: boolean;
    author_premium: boolean;
    thumbnail: string;
    edited: any;
    author_flair_css_class?: string;
    author_flair_richtext: AuthorFlairRichtext[];
    gildings: Gildings;
    post_hint?: string;
    content_categories: any;
    is_self: boolean;
    subreddit_type: string;
    created: number;
    link_flair_type: string;
    wls: number;
    removed_by_category: any;
    banned_by: any;
    author_flair_type: string;
    domain: string;
    allow_live_comments: boolean;
    selftext_html?: string;
    likes: any;
    suggested_sort: any;
    banned_at_utc: any;
    url_overridden_by_dest?: string;
    view_count: any;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable: boolean;
    pinned: boolean;
    over_18: boolean;
    preview?: Preview;
    all_awardings: any[];
    awarders: any[];
    media_only: boolean;
    link_flair_template_id: string;
    can_gild: boolean;
    spoiler: boolean;
    locked: boolean;
    author_flair_text?: string;
    treatment_tags: any[];
    visited: boolean;
    removed_by: any;
    mod_note: any;
    distinguished: any;
    subreddit_id: string;
    author_is_blocked: boolean;
    mod_reason_by: any;
    num_reports: any;
    removal_reason: any;
    link_flair_background_color: string;
    id: string;
    is_robot_indexable: boolean;
    report_reasons: any;
    author: string;
    discussion_type: any;
    num_comments: number;
    send_replies: boolean;
    contest_mode: boolean;
    mod_reports: any[];
    author_patreon_flair: boolean;
    author_flair_text_color?: string;
    permalink: string;
    stickied: boolean;
    url: string;
    subreddit_subscribers: number;
    created_utc: number;
    num_crossposts: number;
    media?: Media;
    is_video: boolean;
    is_gallery?: boolean;
    media_metadata?: MediaMetadata;
    gallery_data?: GalleryData;
    crosspost_parent_list?: CrosspostParentList[];
    crosspost_parent?: string;
    author_cakeday?: boolean;
  }

  export interface LinkFlairRichtext {
    e: string;
    t: string;
  }

  export interface MediaEmbed {
    content?: string;
    width?: number;
    scrolling?: boolean;
    height?: number;
  }

  export interface SecureMedia {
    type: string;
    oembed: Oembed;
  }

  export interface Oembed {
    provider_url: string;
    version: string;
    title: string;
    type: string;
    thumbnail_width: number;
    height: number;
    width: number;
    html: string;
    author_name: string;
    provider_name: string;
    thumbnail_url: string;
    thumbnail_height: number;
    author_url: string;
  }

  export interface SecureMediaEmbed {
    content?: string;
    width?: number;
    scrolling?: boolean;
    media_domain_url?: string;
    height?: number;
  }

  export interface AuthorFlairRichtext {
    e: string;
    t: string;
  }

  export interface Gildings {}

  export interface Preview {
    images: Image[];
    enabled: boolean;
  }

  export interface Image {
    source: Source;
    resolutions: Resolution[];
    variants: Variants;
    id: string;
  }

  export interface Source {
    url: string;
    width: number;
    height: number;
  }

  export interface Resolution {
    url: string;
    width: number;
    height: number;
  }

  export interface Variants {}

  export interface Media {
    type: string;
    oembed: Oembed2;
  }

  export interface Oembed2 {
    provider_url: string;
    version: string;
    title: string;
    type: string;
    thumbnail_width: number;
    height: number;
    width: number;
    html: string;
    author_name: string;
    provider_name: string;
    thumbnail_url: string;
    thumbnail_height: number;
    author_url: string;
  }

  export type MediaMetadata = Record<string, Metadata>;

  export interface Metadata {
    status: string;
    e: string;
    m: string;
    p: Position[];
    s: Position;
    id: string;
  }

  export interface GalleryData {
    items: Item[];
  }

  export interface Item {
    media_id: string;
    id: number;
    caption?: string;
  }

  export interface CrosspostParentList {
    approved_at_utc: any;
    subreddit: string;
    selftext: string;
    author_fullname: string;
    saved: boolean;
    mod_reason_title: any;
    gilded: number;
    clicked: boolean;
    is_gallery?: boolean;
    title: string;
    link_flair_richtext: LinkFlairRichtext[];
    subreddit_name_prefixed: string;
    hidden: boolean;
    pwls: number;
    link_flair_css_class?: string;
    downs: number;
    thumbnail_height: number;
    top_awarded_type: any;
    hide_score: boolean;
    media_metadata?: MediaMetadata;
    name: string;
    quarantine: boolean;
    link_flair_text_color: string;
    upvote_ratio: number;
    author_flair_background_color: any;
    ups: number;
    total_awards_received: number;
    media_embed: MediaEmbed;
    thumbnail_width: number;
    author_flair_template_id: any;
    is_original_content: boolean;
    user_reports: any[];
    secure_media: any;
    is_reddit_media_domain: boolean;
    is_meta: boolean;
    category: any;
    secure_media_embed: SecureMediaEmbed;
    gallery_data?: GalleryData;
    link_flair_text?: string;
    can_mod_post: boolean;
    score: number;
    approved_by: any;
    is_created_from_ads_ui: boolean;
    author_premium: boolean;
    thumbnail: string;
    edited: boolean;
    author_flair_css_class: any;
    author_flair_richtext: any[];
    gildings: Gildings;
    content_categories: any;
    is_self: boolean;
    subreddit_type: string;
    created: number;
    link_flair_type: string;
    wls: number;
    removed_by_category: any;
    banned_by: any;
    author_flair_type: string;
    domain: string;
    allow_live_comments: boolean;
    selftext_html?: string;
    likes: any;
    suggested_sort: any;
    banned_at_utc: any;
    url_overridden_by_dest: string;
    view_count: any;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable: boolean;
    pinned: boolean;
    over_18: boolean;
    all_awardings: any[];
    awarders: any[];
    media_only: boolean;
    can_gild: boolean;
    spoiler: boolean;
    locked: boolean;
    author_flair_text: any;
    treatment_tags: any[];
    visited: boolean;
    removed_by: any;
    mod_note: any;
    distinguished: any;
    subreddit_id: string;
    author_is_blocked: boolean;
    mod_reason_by: any;
    num_reports: any;
    removal_reason: any;
    link_flair_background_color: string;
    id: string;
    is_robot_indexable: boolean;
    report_reasons: any;
    author: string;
    discussion_type: any;
    num_comments: number;
    send_replies: boolean;
    contest_mode: boolean;
    mod_reports: any[];
    author_patreon_flair: boolean;
    author_flair_text_color: any;
    permalink: string;
    stickied: boolean;
    url: string;
    subreddit_subscribers: number;
    created_utc: number;
    num_crossposts: number;
    media: any;
    is_video: boolean;
    post_hint?: string;
    preview?: Preview;
    link_flair_template_id?: string;
  }

  export interface Position {
    y: number;
    x: number;
    u: string & tags.Format<"iri">;
  }

  export interface IGetHotPostsOutput {
    after: string | null;
    dist: number;
    modhash: string | null;
    geo_filter: string | null;
    children: Children[];
    before: string | null;
  }

  export interface IGetNewPostsInput extends IReddit.Secret {
    subreddit: string;
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface IGetNewPostsOutput {
    posts: Array<{
      title: string;
      url: string;
      created_utc: number;
    }>;
  }

  export interface IGetTopPostsInput extends IReddit.Secret {
    subreddit: string;
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
    time_filter?: "all" | "day" | "hour" | "month" | "week" | "year";
  }

  export interface IGetTopPostsOutput {
    posts: Array<{
      title: string;
      url: string;
      score: number;
    }>;
  }

  export interface IVoteInput extends IReddit.Secret {
    id: string & tags.Format<"iri">; // 게시물 또는 댓글의 ID
    dir: number & tags.Type<"int32"> & tags.Minimum<-1> & tags.Maximum<1>; // 투표 방향: 1(upvote), 0(no vote), -1(downvote)
  }

  export interface IVoteOutput {
    success: boolean;
    message?: string;
  }

  export interface IGetCommentsInput extends IReddit.Secret {
    subreddit: string;
    article: string & tags.Format<"iri">;
  }

  export interface IGetCommentsOutput {
    post: {
      title: string;
      content: string;
      author: string;
      created_utc: number;
    };
    comments: Array<{
      author: string;
      content: string;
      created_utc: number;
    }>;
  }

  export interface IGetUserAboutInput extends IReddit.Secret {
    username: string & tags.Format<"iri">;
  }

  export interface IGetUserAboutOutput {
    name: string;
    karma: number;
    created_utc: number;
  }

  export interface IGetUserSubmittedInput extends IReddit.Secret {
    username: string & tags.Format<"iri">;
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface IGetUserSubmittedOutput {
    posts: Array<{
      title: string;
      url: string;
      score: number;
    }>;
  }

  export interface IGetUserCommentsInput extends IReddit.Secret {
    username: string & tags.Format<"iri">;
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface IGetUserCommentsOutput {
    comments: Array<{
      content: string;
      post_title: string;
      created_utc: number;
    }>;
  }

  export interface ISearchSubredditsInput extends IReddit.Secret {
    query: string;
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface ISearchSubredditsOutput {
    subreddits: Array<{
      name: string;
      description: string;
      subscribers: number;
    }>;
  }

  export interface IGetSubredditAboutInput extends IReddit.Secret {
    subreddit: string;
  }

  export interface IGetSubredditAboutOutput {
    name: string;
    description: string;
    subscribers: number;
    rules: string[];
  }

  export interface IGetPopularSubredditsOutput {
    subreddits: Array<{
      name: string;
      subscribers: number;
    }>;
  }

  export interface IGetBestContentInput extends IReddit.Secret {
    /**
     * fullname of a thing
     *
     * @title after
     */
    after?: string;

    /**
     * fullname of a thing
     *
     * @title before
     */
    before?: string;

    /**
     * a positive integer
     *
     * @title count
     */
    count?: number & tags.Type<"int32"> & tags.Minimum<0>;

    /**
     * max number of items
     *
     * @title limit
     */
    limit?: number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<100>;

    /**
     * optional
     *
     * @title show
     */
    show?: "all";

    /**
     * optional, expand subreddits
     *
     * @title sr_detail
     */
    sr_detail?: boolean;
  }

  export interface IGetBestContentOutput {
    posts: Array<{
      title: string;
      url: string;
      score: number;
    }>;
  }

  export interface IGetAllTopContentOutput {
    posts: Array<{
      title: string;
      url: string;
      score: number;
    }>;
  }

  export interface ISavePostInput extends IReddit.Secret {
    id: string & tags.Format<"iri">; // 저장할 게시물의 ID
  }

  export interface ISavePostOutput {
    success: boolean;
    message?: string;
  }

  export interface IUnsavePostInput extends IReddit.Secret {
    id: string & tags.Format<"iri">; // 삭제할 저장된 게시물의 ID
  }

  export interface IUnsavePostOutput {
    success: boolean;
    message?: string;
  }
}
