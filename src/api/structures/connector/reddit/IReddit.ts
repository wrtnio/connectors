import { tags } from "typia";
import { Limit } from "../../types/Limit";
import { ICommon } from "../common/ISecretValue";

export namespace IReddit {
  export type Secret = ICommon.ISecret<
    "reddit",
    ["account", "history", "identity", "mysubreddits", "read", "report", "save"]
  >;

  /**
   * When the value of the 'after' parameter that came in response to the previous request is substituted,
   * it is a parameter for page selection that inquires before and after the value.
   * If omitted, the first page will be viewed unconditionally.
   *
   * The prefix t1_, t2_, t3_, t4_, t5_, t6_ attached to the beginning of the value has the following meaning.
   * - t1_ : Comment
   * - t2_ : Account
   * - t3_ : Link
   * - t4_ : Message
   * - t5_ : Subreddit
   * - t6_ : Award
   *
   * @title FullNames
   */
  export type FullNames = `t${1 | 2 | 3 | 4 | 5 | 6}_${string}`;

  export interface ICommonPaginationInput {
    /**
     * @title The number of posts to fetch
     **/
    limit: Limit<1, 100, 25>;

    /**
     * When the value of the 'after' parameter that came in response to the previous request is substituted,
     * it is a parameter for page selection that inquires before and after the value.
     * If omitted, the first page will be viewed unconditionally.
     *
     * The prefix t1_, t2_, t3_, t4_, t5_, t6_ attached to the beginning of the value has the following meaning.
     * - t1_ : Comment
     * - t2_ : Account
     * - t3_ : Link
     * - t4_ : Message
     * - t5_ : Subreddit
     * - t6_ : Award
     *
     * @title after
     */
    after?: FullNames;

    /**
     * When the value of the 'after' parameter that came in response to the previous request is substituted,
     * it is a parameter for page selection that inquires before and after the value.
     * If omitted, the first page will be viewed unconditionally.
     *
     * The prefix t1_, t2_, t3_, t4_, t5_, t6_ attached to the beginning of the value has the following meaning.
     * - t1_ : Comment
     * - t2_ : Account
     * - t3_ : Link
     * - t4_ : Message
     * - t5_ : Subreddit
     * - t6_ : Award
     *
     * @title before
     */
    before?: FullNames;
  }

  export interface IGetHotPostsInput
    extends IReddit.ICommonPaginationInput,
      IReddit.Secret {
    /**
     * one of (GLOBAL, US, AR, AU, BG, CA, CL, CO, HR, CZ, FI, FR, DE, GR, HU, IS, IN, IE, IT, JP, MY, MX, NZ, PH, PL, PT, PR, RO, RS, SG, ES, SE, TW, TH, TR, GB, US_WA, US_DE, US_DC, US_WI, US_WV, US_HI, US_FL, US_WY, US_NH, US_NJ, US_NM, US_TX, US_LA, US_NC, US_ND, US_NE, US_TN, US_NY, US_PA, US_CA, US_NV, US_VA, US_CO, US_AK, US_AL, US_AR, US_VT, US_IL, US_GA, US_IN, US_IA, US_OK, US_AZ, US_ID, US_CT, US_ME, US_MD, US_MA, US_OH, US_UT, US_MO, US_MN, US_MI, US_RI, US_KS, US_MT, US_MS, US_SC, US_KY, US_OR, US_SD)
     *
     * @title Optional parameter
     **/
    g?: string;

    /**
     * @title The subreddit to fetch posts from
     **/
    subreddit?: `r/${string}`;
  }

  export interface Children {
    /**
     * @title The kind of the child
     **/
    kind: string;

    /**
     * @title The data of the child
     **/
    data: Child;
  }

  export interface Child {
    /**
     * @title Approval time in UTC
     **/
    approved_at_utc: string | null;

    /**
     * @title The subreddit name
     **/
    subreddit?: string;

    /**
     * @title The text of the post
     **/
    selftext: string;

    /**
     * @title The full name of the author
     **/
    author_fullname: string;

    /**
     * @title Whether the post is saved
     **/
    saved: boolean;

    /**
     * @title Moderator reason title
     **/
    mod_reason_title: string | null;

    /**
     * @title Number of times gilded
     **/
    gilded: number;

    /**
     * @title Whether the post is clicked
     **/
    clicked: boolean;

    /**
     * @title The title of the post
     **/
    title: string;

    /**
     * @title Rich text for link flair
     **/
    link_flair_richtext: LinkFlairRichtext[];

    /**
     * @title Prefixed subreddit name
     **/
    subreddit_name_prefixed: string;

    /**
     * @title Whether the post is hidden
     **/
    hidden: boolean;

    /**
     * @title Post whitelist status
     **/
    pwls: number;

    /**
     * @title CSS class for link flair
     **/
    link_flair_css_class: string | null;

    /**
     * @title Number of downvotes
     **/
    downs: number;

    /**
     * @title Height of the thumbnail
     **/
    thumbnail_height?: number | null;

    /**
     * @title Type of top award
     **/
    top_awarded_type: string | null;

    /**
     * @title Whether the score is hidden
     **/
    hide_score: boolean;

    /**
     * @title The name of the post
     **/
    name: string;

    /**
     * @title Whether the post is quarantined
     **/
    quarantine: boolean;

    /**
     * @title Text color for link flair
     **/
    link_flair_text_color: string;

    /**
     * @title Ratio of upvotes
     **/
    upvote_ratio: number;

    /**
     * @title Background color for author flair
     **/
    author_flair_background_color: string | null;

    /**
     * @title Number of upvotes
     **/
    ups: number;

    /**
     * @title Total awards received
     **/
    total_awards_received: number;

    /**
     * @title Media embed information
     **/
    media_embed: MediaEmbed;

    /**
     * @title Width of the thumbnail
     **/
    thumbnail_width?: number | null;

    /**
     * @title Template ID for author flair
     **/
    author_flair_template_id?: string | null;

    /**
     * @title Whether the content is original
     **/
    is_original_content: boolean;

    /**
     * @title User reports
     **/
    user_reports: string[];

    /**
     * @title Secure media information
     **/
    secure_media?: SecureMedia | null;

    /**
     * @title Whether it's a Reddit media domain
     **/
    is_reddit_media_domain: boolean;

    /**
     * @title Whether it's meta content
     **/
    is_meta: boolean;

    /**
     * @title Category of the post
     **/
    category: string | null;

    /**
     * @title Secure media embed information
     **/
    secure_media_embed: SecureMediaEmbed;

    /**
     * @title Text for link flair
     **/
    link_flair_text: string | null;

    /**
     * @title Whether the post can be moderated
     **/
    can_mod_post: boolean;

    /**
     * @title Score of the post
     **/
    score: number;

    /**
     * @title Approved by user
     **/
    approved_by: string | null;

    /**
     * @title Whether created from ads UI
     **/
    is_created_from_ads_ui: boolean;

    /**
     * @title Whether the author is premium
     **/
    author_premium: boolean;

    /**
     * @title Thumbnail URL
     **/
    thumbnail: string;

    /**
     * @title Whether the post is edited
     **/
    edited: boolean | null;

    /**
     * @title CSS class for author flair
     **/
    author_flair_css_class?: string | null;

    /**
     * @title Rich text for author flair
     **/
    author_flair_richtext: AuthorFlairRichtext[];

    /**
     * @title Gildings information
     **/
    gildings: Gildings;

    /**
     * @title Hint for the post
     **/
    post_hint?: string | null;

    /**
     * @title Content categories
     **/
    content_categories: string | null;

    /**
     * @title Whether it's a self post
     **/
    is_self: boolean;

    /**
     * @title Type of subreddit
     **/
    subreddit_type: string;

    /**
     * @title Creation time
     **/
    created: number;

    /**
     * @title Type of link flair
     **/
    link_flair_type: string;

    /**
     * @title Whitelist status
     **/
    wls: number;

    /**
     * @title Removed by category
     **/
    removed_by_category: string | null;

    /**
     * @title Banned by user
     **/
    banned_by: string | null;

    /**
     * @title Type of author flair
     **/
    author_flair_type: string;

    /**
     * @title Domain of the post
     **/
    domain: string;

    /**
     * @title Whether live comments are allowed
     **/
    allow_live_comments: boolean;

    /**
     * @title HTML of the selftext
     **/
    selftext_html?: string | null;

    /**
     * @title Likes on the post
     **/
    likes: string | null;

    /**
     * @title Suggested sort order
     **/
    suggested_sort: string | null;

    /**
     * @title Banned time in UTC
     **/
    banned_at_utc: string | null;

    /**
     * @title URL overridden by destination
     **/
    url_overridden_by_dest?: string | null;

    /**
     * @title View count
     **/
    view_count: string | null;

    /**
     * @title Whether the post is archived
     **/
    archived: boolean;

    /**
     * @title Whether no-follow is enabled
     **/
    no_follow: boolean;

    /**
     * @title Whether the post is crosspostable
     **/
    is_crosspostable: boolean;

    /**
     * @title Whether the post is pinned
     **/
    pinned: boolean;

    /**
     * @title Whether the post is NSFW
     **/
    over_18: boolean;

    /**
     * @title Preview information
     **/
    preview?: Preview | null;

    /**
     * @title All awardings
     **/
    all_awardings: string[];

    /**
     * @title Awarders of the post
     **/
    awarders: string[];

    /**
     * @title Whether it's media only
     **/
    media_only: boolean;

    /**
     * @title Template ID for link flair
     **/
    link_flair_template_id?: string | null;

    /**
     * @title Whether the post can be gilded
     **/
    can_gild: boolean;

    /**
     * @title Whether the post is a spoiler
     **/
    spoiler: boolean;

    /**
     * @title Whether the post is locked
     **/
    locked: boolean;

    /**
     * @title Text for author flair
     **/
    author_flair_text?: string | null;

    /**
     * @title Treatment tags
     **/
    treatment_tags: string[];

    /**
     * @title Whether the post is visited
     **/
    visited: boolean;

    /**
     * @title Removed by user
     **/
    removed_by: string | null;

    /**
     * @title Moderator note
     **/
    mod_note: string | null;

    /**
     * @title Distinguished status
     **/
    distinguished: string | null;

    /**
     * @title ID of the subreddit
     **/
    subreddit_id: string;

    /**
     * @title Whether the author is blocked
     **/
    author_is_blocked: boolean;

    /**
     * @title Moderator reason by user
     **/
    mod_reason_by: string | null;

    /**
     * @title Number of reports
     **/
    num_reports: string | null;

    /**
     * @title Removal reason
     **/
    removal_reason: string | null;

    /**
     * @title Background color for link flair
     **/
    link_flair_background_color: string;

    /**
     * @title ID of the post
     **/
    id: string;

    /**
     * @title Whether the post is robot indexable
     **/
    is_robot_indexable: boolean;

    /**
     * @title Report reasons
     **/
    report_reasons: string | null;

    /**
     * @title Author of the post
     **/
    author: string;

    /**
     * @title Type of discussion
     **/
    discussion_type: string | null;

    /**
     * @title Number of comments
     **/
    num_comments: number;

    /**
     * @title Whether to send replies
     **/
    send_replies: boolean;

    /**
     * @title Whether contest mode is enabled
     **/
    contest_mode: boolean;

    /**
     * @title Moderator reports
     **/
    mod_reports: string[];

    /**
     * @title Whether the author has Patreon flair
     **/
    author_patreon_flair: boolean;

    /**
     * @title Text color for author flair
     **/
    author_flair_text_color?: string | null;

    /**
     * @title Permalink to the post
     **/
    permalink: string;

    /**
     * @title Whether the post is stickied
     **/
    stickied: boolean;

    /**
     * @title URL of the post
     **/
    url: string;

    /**
     * @title Number of subreddit subscribers
     **/
    subreddit_subscribers: number;

    /**
     * @title Creation time in UTC
     **/
    created_utc: number;

    /**
     * @title Number of crossposts
     **/
    num_crossposts: number;

    /**
     * @title Media information
     **/
    media?: Media | null;

    /**
     * @title Whether the post is a video
     **/
    is_video: boolean;

    /**
     * @title Whether the post is a gallery
     **/
    is_gallery?: boolean | null;

    /**
     * @title Media metadata
     **/
    media_metadata?: MediaMetadata | null;

    /**
     * @title Gallery data
     **/
    gallery_data?: GalleryData | null;

    /**
     * @title List of crosspost parents
     **/
    crosspost_parent_list?: CrosspostParentList[] | null;

    /**
     * @title Crosspost parent
     **/
    crosspost_parent?: string | null;

    /**
     * @title Whether it's the author's cakeday
     **/
    author_cakeday?: boolean | null;
  }

  export interface LinkFlairRichtext {
    /**
     * @title The type of the element
     **/
    e: string;

    /**
     * @title The text of the element
     **/
    t: string;
  }

  export interface MediaEmbed {
    /**
     * @title The content of the media
     **/
    content?: string;

    /**
     * @title The width of the media
     **/
    width?: number;

    /**
     * @title Whether scrolling is enabled
     **/
    scrolling?: boolean;

    /**
     * @title The height of the media
     **/
    height?: number;
  }

  export interface SecureMedia {
    /**
     * @title The type of the media
     **/
    type: string;

    /**
     * @title Oembed information
     **/
    oembed: Oembed;
  }

  export interface Oembed {
    /**
     * @title The provider URL
     **/
    provider_url: string;

    /**
     * @title The version of the Oembed
     **/
    version: string;

    /**
     * @title The title of the Oembed
     **/
    title: string;

    /**
     * @title The type of the Oembed
     **/
    type: string;

    /**
     * @title The width of the thumbnail
     **/
    thumbnail_width: number;

    /**
     * @title The height of the Oembed
     **/
    height: number;

    /**
     * @title The width of the Oembed
     **/
    width: number;

    /**
     * @title The HTML content
     **/
    html: string;

    /**
     * @title The name of the author
     **/
    author_name: string;

    /**
     * @title The name of the provider
     **/
    provider_name: string;

    /**
     * @title The URL of the thumbnail
     **/
    thumbnail_url: string;

    /**
     * @title The height of the thumbnail
     **/
    thumbnail_height: number;

    /**
     * @title The URL of the author
     **/
    author_url: string;
  }

  export interface SecureMediaEmbed {
    /**
     * @title The content of the media
     **/
    content?: string;

    /**
     * @title The width of the media
     **/
    width?: number;

    /**
     * @title Whether scrolling is enabled
     **/
    scrolling?: boolean;

    /**
     * @title The media domain URL
     **/
    media_domain_url?: string;

    /**
     * @title The height of the media
     **/
    height?: number;
  }

  export interface AuthorFlairRichtext {
    /**
     * @title The type of the element
     **/
    e: string;

    /**
     * @title The text of the element
     **/
    t: string;
  }

  export type Gildings = any;

  export interface Preview {
    /**
     * @title The images in the preview
     **/
    images: Image[];

    /**
     * @title Whether the preview is enabled
     **/
    enabled: boolean;
  }

  export interface Image {
    /**
     * @title The source of the image
     **/
    source: Source;

    /**
     * @title The resolutions of the image
     **/
    resolutions: Resolution[];

    /**
     * @title The variants of the image
     **/
    variants: Variants;

    /**
     * @title The ID of the image
     **/
    id: string;
  }

  export interface Source {
    /**
     * @title The URL of the source
     **/
    url: string;

    /**
     * @title The width of the source
     **/
    width: number;

    /**
     * @title The height of the source
     **/
    height: number;
  }

  export interface Resolution {
    /**
     * @title The URL of the resolution
     **/
    url: string;

    /**
     * @title The width of the resolution
     **/
    width: number;

    /**
     * @title The height of the resolution
     **/
    height: number;
  }

  export type Variants = any;

  export interface Media {
    /**
     * @title The type of the media
     **/
    type: string;

    /**
     * @title Oembed information
     **/
    oembed: Oembed2;
  }

  export interface Oembed2 {
    /**
     * @title The provider URL
     **/
    provider_url: string;

    /**
     * @title The version of the Oembed
     **/
    version: string;

    /**
     * @title The title of the Oembed
     **/
    title: string;

    /**
     * @title The type of the Oembed
     **/
    type: string;

    /**
     * @title The width of the thumbnail
     **/
    thumbnail_width: number;

    /**
     * @title The height of the Oembed
     **/
    height: number;

    /**
     * @title The width of the Oembed
     **/
    width: number;

    /**
     * @title The HTML content
     **/
    html: string;

    /**
     * @title The name of the author
     **/
    author_name: string;

    /**
     * @title The name of the provider
     **/
    provider_name: string;

    /**
     * @title The URL of the thumbnail
     **/
    thumbnail_url: string;

    /**
     * @title The height of the thumbnail
     **/
    thumbnail_height: number;

    /**
     * @title The URL of the author
     **/
    author_url: string;
  }

  export type MediaMetadata = Record<string, Metadata>;

  export interface Metadata {
    /**
     * @title The status of the metadata
     **/
    status: string;

    /**
     * @title The type of the element
     **/
    e: string;

    /**
     * @title The media type
     **/
    m: string;

    /**
     * @title The positions
     **/
    p: Position[];

    /**
     * @title The position
     **/
    s: Position;

    /**
     * @title The ID of the metadata
     **/
    id: string;
  }

  export interface GalleryData {
    /**
     * @title The items in the gallery
     **/
    items: Item[];
  }

  export interface Item {
    /**
     * @title The media ID
     **/
    media_id: string;

    /**
     * @title The ID of the item
     **/
    id: number;

    /**
     * @title The caption of the item
     **/
    caption?: string;
  }

  export interface CrosspostParentList {
    /**
     * @title Approval time in UTC
     **/
    approved_at_utc: string;

    /**
     * @title The subreddit name
     **/
    subreddit?: `r/${string}`;

    /**
     * @title The text of the post
     **/
    selftext: string;

    /**
     * @title The full name of the author
     **/
    author_fullname: string;

    /**
     * @title Whether the post is saved
     **/
    saved: boolean;

    /**
     * @title Moderator reason title
     **/
    mod_reason_title: string;

    /**
     * @title Number of times gilded
     **/
    gilded: number;

    /**
     * @title Whether the post is clicked
     **/
    clicked: boolean;

    /**
     * @title Whether the post is a gallery
     **/
    is_gallery?: boolean;

    /**
     * @title The title of the post
     **/
    title: string;

    /**
     * @title Rich text for link flair
     **/
    link_flair_richtext: LinkFlairRichtext[];

    /**
     * @title Prefixed subreddit name
     **/
    subreddit_name_prefixed: string;

    /**
     * @title Whether the post is hidden
     **/
    hidden: boolean;

    /**
     * @title Post whitelist status
     **/
    pwls: number;

    /**
     * @title CSS class for link flair
     **/
    link_flair_css_class?: string;

    /**
     * @title Number of downvotes
     **/
    downs: number;

    /**
     * @title Height of the thumbnail
     **/
    thumbnail_height: number;

    /**
     * @title Type of top award
     **/
    top_awarded_type: string;

    /**
     * @title Whether the score is hidden
     **/
    hide_score: boolean;

    /**
     * @title Media metadata
     **/
    media_metadata?: MediaMetadata;

    /**
     * @title The name of the post
     **/
    name: string;

    /**
     * @title Whether the post is quarantined
     **/
    quarantine: boolean;

    /**
     * @title Text color for link flair
     **/
    link_flair_text_color: string;

    /**
     * @title Ratio of upvotes
     **/
    upvote_ratio: number;

    /**
     * @title Background color for author flair
     **/
    author_flair_background_color: string;

    /**
     * @title Number of upvotes
     **/
    ups: number;

    /**
     * @title Total awards received
     **/
    total_awards_received: number;

    /**
     * @title Media embed information
     **/
    media_embed: MediaEmbed;

    /**
     * @title Width of the thumbnail
     **/
    thumbnail_width: number;

    /**
     * @title Template ID for author flair
     **/
    author_flair_template_id: string;

    /**
     * @title Whether the content is original
     **/
    is_original_content: boolean;

    /**
     * @title User reports
     **/
    user_reports: string[];

    /**
     * @title Secure media information
     **/
    secure_media: string;

    /**
     * @title Whether it's a Reddit media domain
     **/
    is_reddit_media_domain: boolean;

    /**
     * @title Whether it's meta content
     **/
    is_meta: boolean;

    /**
     * @title Category of the post
     **/
    category: string;

    /**
     * @title Secure media embed information
     **/
    secure_media_embed: SecureMediaEmbed;

    /**
     * @title Gallery data
     **/
    gallery_data?: GalleryData;

    /**
     * @title Text for link flair
     **/
    link_flair_text: string;

    /**
     * @title Whether the post can be moderated
     **/
    can_mod_post: boolean;

    /**
     * @title Score of the post
     **/
    score: number;

    /**
     * @title Approved by user
     **/
    approved_by: string;

    /**
     * @title Whether created from ads UI
     **/
    is_created_from_ads_ui: boolean;

    /**
     * @title Whether the author is premium
     **/
    author_premium: boolean;

    /**
     * @title Thumbnail URL
     **/
    thumbnail: string;

    /**
     * @title Whether the post is edited
     **/
    edited: boolean;

    /**
     * @title CSS class for author flair
     **/
    author_flair_css_class: string;

    /**
     * @title Rich text for author flair
     **/
    author_flair_richtext: string[];

    /**
     * @title Gildings information
     **/
    gildings: Gildings;

    /**
     * @title Content categories
     **/
    content_categories: string;

    /**
     * @title Whether it's a self post
     **/
    is_self: boolean;

    /**
     * @title Type of subreddit
     **/
    subreddit_type: string;

    /**
     * @title Creation time
     **/
    created: number;

    /**
     * @title Type of link flair
     **/
    link_flair_type: string;

    /**
     * @title Whitelist status
     **/
    wls: number;

    /**
     * @title Removed by category
     **/
    removed_by_category: string;

    /**
     * @title Banned by user
     **/
    banned_by: string;

    /**
     * @title Type of author flair
     **/
    author_flair_type: string;

    /**
     * @title Domain of the post
     **/
    domain: string;

    /**
     * @title Whether live comments are allowed
     **/
    allow_live_comments: boolean;

    /**
     * @title HTML of the selftext
     **/
    selftext_html?: string;

    /**
     * @title Likes on the post
     **/
    likes: string;

    /**
     * @title Suggested sort order
     **/
    suggested_sort: string;

    /**
     * @title Banned time in UTC
     **/
    banned_at_utc: string;

    /**
     * @title URL overridden by destination
     **/
    url_overridden_by_dest: string;

    /**
     * @title View count
     **/
    view_count: string;

    /**
     * @title Whether the post is archived
     **/
    archived: boolean;

    /**
     * @title Whether no-follow is enabled
     **/
    no_follow: boolean;

    /**
     * @title Whether the post is crosspostable
     **/
    is_crosspostable: boolean;

    /**
     * @title Whether the post is pinned
     **/
    pinned: boolean;

    /**
     * @title Whether the post is NSFW
     **/
    over_18: boolean;

    /**
     * @title All awardings
     **/
    all_awardings: string[];

    /**
     * @title Awarders of the post
     **/
    awarders: string[];

    /**
     * @title Whether it's media only
     **/
    media_only: boolean;

    /**
     * @title Whether the post can be gilded
     **/
    can_gild: boolean;

    /**
     * @title Whether the post is a spoiler
     **/
    spoiler: boolean;

    /**
     * @title Whether the post is locked
     **/
    locked: boolean;

    /**
     * @title Text for author flair
     **/
    author_flair_text: string | null;

    /**
     * @title Treatment tags
     **/
    treatment_tags: string[];

    /**
     * @title Whether the post is visited
     **/
    visited: boolean;

    /**
     * @title Removed by user
     **/
    removed_by: string;

    /**
     * @title Moderator note
     **/
    mod_note: string;

    /**
     * @title Distinguished status
     **/
    distinguished: string;

    /**
     * @title ID of the subreddit
     **/
    subreddit_id: string;

    /**
     * @title Whether the author is blocked
     **/
    author_is_blocked: boolean;

    /**
     * @title Moderator reason by user
     **/
    mod_reason_by: string;

    /**
     * @title Number of reports
     **/
    num_reports: string;

    /**
     * @title Removal reason
     **/
    removal_reason: string;

    /**
     * @title Background color for link flair
     **/
    link_flair_background_color: string;

    /**
     * @title ID of the post
     **/
    id: string;

    /**
     * @title Whether the post is robot indexable
     **/
    is_robot_indexable: boolean;

    /**
     * @title Report reasons
     **/
    report_reasons: string;

    /**
     * @title Author of the post
     **/
    author: string;

    /**
     * @title Type of discussion
     **/
    discussion_type: string;

    /**
     * @title Number of comments
     **/
    num_comments: number;

    /**
     * @title Whether to send replies
     **/
    send_replies: boolean;

    /**
     * @title Whether contest mode is enabled
     **/
    contest_mode: boolean;

    /**
     * @title Moderator reports
     **/
    mod_reports: string[];

    /**
     * @title Whether the author has Patreon flair
     **/
    author_patreon_flair: boolean;

    /**
     * @title Text color for author flair
     **/
    author_flair_text_color: string;

    /**
     * @title Permalink to the post
     **/
    permalink: string;

    /**
     * @title Whether the post is stickied
     **/
    stickied: boolean;

    /**
     * @title URL of the post
     **/
    url: string;

    /**
     * @title Number of subreddit subscribers
     **/
    subreddit_subscribers: number;

    /**
     * @title Creation time in UTC
     **/
    created_utc: number;

    /**
     * @title Number of crossposts
     **/
    num_crossposts: number;

    /**
     * @title Media information
     **/
    media: string;

    /**
     * @title Whether the post is a video
     **/
    is_video: boolean;

    /**
     * @title Hint for the post
     **/
    post_hint?: string;

    /**
     * @title Preview information
     **/
    preview?: Preview;

    /**
     * @title Template ID for link flair
     **/
    link_flair_template_id?: string | null;
  }

  export interface Position {
    /**
     * @title The y-coordinate
     **/
    y: number;

    /**
     * @title The x-coordinate
     **/
    x: number;

    /**
     * @title The URL
     **/
    u: string & tags.Format<"iri">;
  }

  export interface IGetHotPostsOutput {
    /**
     * @title The after cursor for pagination
     **/
    after: FullNames | null;

    /**
     * @title The number of items returned
     **/
    dist: number;

    /**
     * @title The modhash for the request
     **/
    modhash: string | null;

    /**
     * @title The geographical filter applied
     **/
    geo_filter: string | null;

    /**
     * @title The list of children posts
     **/
    children: Children[];

    /**
     * @title The before cursor for pagination
     **/
    before: FullNames | null;
  }

  export interface IGetNewPostsInput
    extends IReddit.ICommonPaginationInput,
      IReddit.Secret {
    /**
     * @title The subreddit to fetch posts from
     **/
    subreddit?: `r/${string}`;
  }

  export interface IGetNewPostsOutput {
    /**
     * @title The after cursor for pagination
     **/
    after: FullNames | null;

    /**
     * @title The number of items returned
     **/
    dist: number;

    /**
     * @title The modhash for the request
     **/
    modhash: string | null;

    /**
     * @title The geographical filter applied
     **/
    geo_filter: string | null;

    /**
     * @title The list of children posts
     **/
    children: Children[];

    /**
     * @title The before cursor for pagination
     **/
    before: FullNames | null;
  }

  export interface IGetTopPostsInput
    extends IReddit.ICommonPaginationInput,
      IReddit.Secret {
    /**
     * @title The subreddit to fetch posts from
     **/
    subreddit?: `r/${string}`;

    /**
     * @title The time filter for the posts
     **/
    time_filter?: "all" | "day" | "hour" | "month" | "week" | "year";
  }

  export interface IGetTopPostsOutput {
    /**
     * @title The after cursor for pagination
     **/
    after: FullNames | null;

    /**
     * @title The number of items returned
     **/
    dist: number;

    /**
     * @title The modhash for the request
     **/
    modhash: string | null;

    /**
     * @title The geographical filter applied
     **/
    geo_filter: string | null;

    /**
     * @title The list of children posts
     **/
    children: Children[];

    /**
     * @title The before cursor for pagination
     **/
    before: FullNames | null;
  }

  export interface IVoteInput extends IReddit.Secret {
    /**
     * @title The ID of the post to vote on
     **/
    id: string & tags.Format<"iri">;

    /**
     * @title The direction of the vote (-1, 0, 1)
     **/
    dir: number & tags.Type<"int32"> & tags.Minimum<-1> & tags.Maximum<1>;
  }

  export interface IVoteOutput {
    /**
     * @title Whether the vote was successful
     **/
    success: boolean;

    /**
     * @title The message returned from the vote
     **/
    message?: string;
  }

  export interface IGetCommentsInput extends IReddit.Secret {
    /**
     * @title The subreddit of the post
     **/
    subreddit?: `r/${string}`;

    /**
     * @title The article ID of the post
     **/
    article: string & tags.Format<"iri">;
  }

  export interface IGetCommentsOutput {
    /**
     * @title The post details
     **/
    post: {
      /**
       * @title The title of the post
       **/
      title: string;

      /**
       * @title The content of the post
       **/
      content: string;

      /**
       * @title The author of the post
       **/
      author: string;

      /**
       * @title The creation time in UTC
       **/
      created_utc: number;
    };
    /**
     * @title The list of comments
     **/
    comments: Array<{
      /**
       * @title The author of the comment
       **/
      author: string;

      /**
       * @title The content of the comment
       **/
      content: string;

      /**
       * @title The creation time in UTC
       **/
      created_utc: number;
    }>;
  }

  export interface IGetUserAboutInput extends IReddit.Secret {
    /**
     * @title The username to fetch information for
     **/
    username: string & tags.Format<"iri">;
  }

  export interface IGetUserAboutOutput {
    /**
     * @title The name of the user
     **/
    name: string;

    /**
     * @title The karma of the user
     **/
    karma: number;

    /**
     * @title The account creation time in UTC
     **/
    created_utc: number;
  }

  export interface IGetUserSubmittedInput extends IReddit.Secret {
    /**
     * @title The username to fetch posts for
     **/
    username: string & tags.Format<"iri">;

    /**
     * @title The number of posts to fetch
     **/
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface IGetUserSubmittedOutput {
    /**
     * @title The list of submitted posts
     **/
    posts: Array<{
      /**
       * @title The title of the post
       **/
      title: string;

      /**
       * @title The URL of the post
       **/
      url: string;

      /**
       * @title The score of the post
       **/
      score: number;
    }>;
  }

  export interface IGetUserCommentsInput extends IReddit.Secret {
    /**
     * @title The username to fetch comments for
     **/
    username: string & tags.Format<"iri">;

    /**
     * @title The number of comments to fetch
     **/
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface IGetUserCommentsOutput {
    /**
     * @title The list of user comments
     **/
    comments: Array<{
      /**
       * @title The content of the comment
       **/
      content: string;

      /**
       * @title The title of the post
       **/
      post_title: string;

      /**
       * @title The creation time in UTC
       **/
      created_utc: number;
    }>;
  }

  export interface ISearchSubredditsInput extends IReddit.Secret {
    /**
     * @title The search query
     **/
    query: string;

    /**
     * @title The number of subreddits to fetch
     **/
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;
  }

  export interface ISearchSubredditsOutput {
    /**
     * @title The list of subreddits
     **/
    subreddits: Array<{
      /**
       * @title The name of the subreddit
       **/
      name: string;

      /**
       * @title The description of the subreddit
       **/
      description: string;

      /**
       * @title The number of subscribers
       **/
      subscribers: number;
    }>;
  }

  export interface IGetSubredditAboutInput extends IReddit.Secret {
    /**
     * @title The subreddit to fetch information for
     **/
    subreddit?: `r/${string}`;
  }

  export interface IGetSubredditAboutOutput {
    /**
     * @title The name of the subreddit
     **/
    name: string;

    /**
     * @title The description of the subreddit
     **/
    description: string;

    /**
     * @title The number of subscribers
     **/
    subscribers: number;

    /**
     * @title The rules of the subreddit
     **/
    rules: string[];
  }

  export interface IGetPopularSubredditsOutput {
    /**
     * @title The list of popular subreddits
     **/
    subreddits: Array<{
      /**
       * @title The name of the subreddit
       **/
      name: string;

      /**
       * @title The number of subscribers
       **/
      subscribers: number;
    }>;
  }

  export interface IGetBestContentInput extends IReddit.Secret {
    /**
     * @title The after cursor for pagination
     **/
    after?: string;

    /**
     * @title The before cursor for pagination
     **/
    before?: string;

    /**
     * @title The count of items
     **/
    count?: number & tags.Type<"int32"> & tags.Minimum<0>;

    /**
     * @title The max number of items
     **/
    limit?: number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<100>;

    /**
     * @title Optional show parameter
     **/
    show?: "all";

    /**
     * @title Optional expand subreddits
     **/
    sr_detail?: boolean;
  }

  export interface IGetBestContentOutput {
    /**
     * @title The list of best content posts
     **/
    posts: Array<{
      /**
       * @title The title of the post
       **/
      title: string;

      /**
       * @title The URL of the post
       **/
      url: string;

      /**
       * @title The score of the post
       **/
      score: number;
    }>;
  }

  export interface IGetAllTopContentOutput {
    /**
     * @title The list of all top content posts
     **/
    posts: Array<{
      /**
       * @title The title of the post
       **/
      title: string;

      /**
       * @title The URL of the post
       **/
      url: string;

      /**
       * @title The score of the post
       **/
      score: number;
    }>;
  }

  export interface ISavePostInput extends IReddit.Secret {
    /**
     * @title The ID of the post to save
     **/
    id: string & tags.Format<"iri">;
  }

  export interface ISavePostOutput {
    /**
     * @title Whether the save was successful
     **/
    success: boolean;

    /**
     * @title The message returned from the save
     **/
    message?: string;
  }

  export interface IUnsavePostInput extends IReddit.Secret {
    /**
     * @title The ID of the post to unsave
     **/
    id: string & tags.Format<"iri">;
  }

  export interface IUnsavePostOutput {
    /**
     * @title Whether the unsave was successful
     **/
    success: boolean;

    /**
     * @title The message returned from the unsave
     **/
    message?: string;
  }
}
