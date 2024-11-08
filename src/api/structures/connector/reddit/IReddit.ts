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
    data: Post;
  }

  export interface Post {
    approved_at_utc: string | null;
    subreddit: string;
    selftext: string;
    author_fullname: string;
    saved: boolean;
    mod_reason_title: string | null;
    gilded: number;
    clicked: boolean;
    title: string;
    link_flair_richtext: LinkFlairRichtext[];
    subreddit_name_prefixed: string;
    hidden: boolean;
    pwls: number;
    link_flair_css_class: string | null;
    downs: number;
    thumbnail_height?: number | null;
    top_awarded_type: string | null;
    hide_score: boolean;
    name: string;
    quarantine: boolean;
    link_flair_text_color: string;
    upvote_ratio: number;
    author_flair_background_color: string | null;
    ups: number;
    total_awards_received: number;
    media_embed: MediaEmbed;
    thumbnail_width?: number | null;
    author_flair_template_id?: string | null;
    is_original_content: boolean;
    user_reports: string[];
    secure_media?: SecureMedia | null;
    is_reddit_media_domain: boolean;
    is_meta: boolean;
    category: string | null;
    secure_media_embed: SecureMediaEmbed;
    link_flair_text: string | null;
    can_mod_post: boolean;
    score: number;
    approved_by: string | null;
    is_created_from_ads_ui: boolean;
    author_premium: boolean;
    thumbnail: string;
    edited: boolean | null;
    author_flair_css_class?: string | null;
    author_flair_richtext: AuthorFlairRichtext[];
    gildings: Gildings;
    post_hint?: string | null;
    content_categories: string | null;
    is_self: boolean;
    subreddit_type: string;
    created: number;
    link_flair_type: string;
    wls: number;
    removed_by_category: string | null;
    banned_by: string | null;
    author_flair_type: string;
    domain: string;
    allow_live_comments: boolean;
    selftext_html?: string | null;
    likes: string | null;
    suggested_sort: string | null;
    banned_at_utc: string | null;
    url_overridden_by_dest?: string | null;
    view_count: string | null;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable: boolean;
    pinned: boolean;
    over_18: boolean;
    preview?: Preview | null;
    all_awardings: string[];
    awarders: string[];
    media_only: boolean;
    link_flair_template_id?: string | null;
    can_gild: boolean;
    spoiler: boolean;
    locked: boolean;
    author_flair_text?: string | null;
    treatment_tags: string[];
    visited: boolean;
    removed_by: string | null;
    mod_note: string | null;
    distinguished: string | null;
    subreddit_id: string;
    author_is_blocked: boolean;
    mod_reason_by: string | null;
    num_reports: string | null;
    removal_reason: string | null;
    link_flair_background_color: string;
    id: string;
    is_robot_indexable: boolean;
    report_reasons: string | null;
    author: string;
    discussion_type: string | null;
    num_comments: number;
    send_replies: boolean;
    contest_mode: boolean;
    mod_reports: string[];
    author_patreon_flair: boolean;
    author_flair_text_color?: string | null;
    permalink: string;
    stickied: boolean;
    url: string;
    subreddit_subscribers: number;
    created_utc: number;
    num_crossposts: number;
    media?: Media | null;
    is_video: boolean;
    is_gallery?: boolean | null;
    media_metadata?: MediaMetadata | null;
    gallery_data?: GalleryData | null;
    crosspost_parent_list?: CrosspostParentList[] | null;
    crosspost_parent?: string | null;
    author_cakeday?: boolean | null;
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
    approved_at_utc: string;
    subreddit: string;
    selftext: string;
    author_fullname: string;
    saved: boolean;
    mod_reason_title: string;
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
    top_awarded_type: string;
    hide_score: boolean;
    media_metadata?: MediaMetadata;
    name: string;
    quarantine: boolean;
    link_flair_text_color: string;
    upvote_ratio: number;
    author_flair_background_color: string;
    ups: number;
    total_awards_received: number;
    media_embed: MediaEmbed;
    thumbnail_width: number;
    author_flair_template_id: string;
    is_original_content: boolean;
    user_reports: string[];
    secure_media: string;
    is_reddit_media_domain: boolean;
    is_meta: boolean;
    category: string;
    secure_media_embed: SecureMediaEmbed;
    gallery_data?: GalleryData;
    link_flair_text: string;
    can_mod_post: boolean;
    score: number;
    approved_by: string;
    is_created_from_ads_ui: boolean;
    author_premium: boolean;
    thumbnail: string;
    edited: boolean;
    author_flair_css_class: string;
    author_flair_richtext: string[];
    gildings: Gildings;
    content_categories: string;
    is_self: boolean;
    subreddit_type: string;
    created: number;
    link_flair_type: string;
    wls: number;
    removed_by_category: string;
    banned_by: string;
    author_flair_type: string;
    domain: string;
    allow_live_comments: boolean;
    selftext_html?: string;
    likes: string;
    suggested_sort: string;
    banned_at_utc: string;
    url_overridden_by_dest: string;
    view_count: string;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable: boolean;
    pinned: boolean;
    over_18: boolean;
    all_awardings: string[];
    awarders: string[];
    media_only: boolean;
    can_gild: boolean;
    spoiler: boolean;
    locked: boolean;
    author_flair_text: string | null;
    treatment_tags: string[];
    visited: boolean;
    removed_by: string;
    mod_note: string;
    distinguished: string;
    subreddit_id: string;
    author_is_blocked: boolean;
    mod_reason_by: string;
    num_reports: string;
    removal_reason: string;
    link_flair_background_color: string;
    id: string;
    is_robot_indexable: boolean;
    report_reasons: string;
    author: string;
    discussion_type: string;
    num_comments: number;
    send_replies: boolean;
    contest_mode: boolean;
    mod_reports: string[];
    author_patreon_flair: boolean;
    author_flair_text_color: string;
    permalink: string;
    stickied: boolean;
    url: string;
    subreddit_subscribers: number;
    created_utc: number;
    num_crossposts: number;
    media: string;
    is_video: boolean;
    post_hint?: string;
    preview?: Preview;
    link_flair_template_id?: string | null;
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
    id: string & tags.Format<"iri">;
    dir: number & tags.Type<"int32"> & tags.Minimum<-1> & tags.Maximum<1>;
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
    id: string & tags.Format<"iri">;
  }

  export interface ISavePostOutput {
    success: boolean;
    message?: string;
  }

  export interface IUnsavePostInput extends IReddit.Secret {
    id: string & tags.Format<"iri">;
  }

  export interface IUnsavePostOutput {
    success: boolean;
    message?: string;
  }
}
