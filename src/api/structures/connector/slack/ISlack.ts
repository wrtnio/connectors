import { Block, KnownBlock } from "@slack/web-api";
import { Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";
import { ContentMediaType } from "typia/lib/tags";
import { MyPick } from "../../types/MyPick";
import { StrictOmit } from "../../types/strictOmit";
import { ICommon } from "../common/ISecretValue";

export namespace ISlack {
  export type ISecret = ICommon.ISecret<
    "slack",
    [
      "channels:read",
      "channels:history",
      "users.profile:read",
      "im:read",
      "groups:history",
      "groups:read",
      "chat:write",
      "users:read",
      "files:read",
    ]
  >;

  export interface IHoldVoteOutput extends Pick<ISlack.Message, "ts"> {
    /**
     * @title title blocks
     */
    blocks?: any[];
  }

  export interface IHoldVoteInput extends ISlack.ISecret {
    /**
     * @title channel id
     */
    channel: Channel["id"] &
      (
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-public-channels";
            jmesPath: "[].{value:id, label:name}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-private-channels";
            jmesPath: "[].{value:id, label:name}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-im-channels";
            jmesPath: "[].{value:id, label:name || '개인 채널'}";
          }>
      );

    /**
     * @title Title of vote to be held
     *
     * It should be written as a simple one-line markdown and can include Slack emojis.
     */
    title: string;

    /**
     * @title options available for voting
     *
     * It refers to the options available for voting.
     */
    items: {
      /**
       * @title option title
       */
      text: string;

      /**
       * @title option's link
       */
      link?: string;
    }[];
  }

  export interface InteractiveComponentInput {
    payload: InteractiveComponent;
  }

  export interface Payload {
    payload: string;
  }

  export interface InteractiveComponent {
    /**
     * Helps identify which type of interactive component sent the payload.
     * Example: 'block_actions' for block interactions or 'interactive_message' for message attachments.
     */
    type: "block_actions" | "interactive_message";

    /**
     * A short-lived ID that can be used to open modals.
     */
    trigger_id: string;

    /**
     * The user who interacted to trigger this request.
     */
    user: {
      id: string;
      username: string;
      team_id: string;
    };

    /**
     * The workspace the app is installed on. Null if the app is org-installed.
     */
    team: {
      id: string;
      domain: string;
    } | null;

    /**
     * The container where this block action took place.
     */
    container: {
      type: string;
      message_ts?: string;
      channel_id?: string;
      is_ephemeral?: boolean;
    };

    /**
     * A string representing the app ID.
     */
    api_app_id: string;

    /**
     * Contains data from the specific interactive component that was used.
     */
    actions: {
      block_id: string;
      action_id: string;
      value: string;
    }[];

    /**
     * Represents a deprecated verification token feature. Use signing secret for validation instead.
     */
    token: string;

    /**
     * A unique value optionally used to ensure the correct view is updated.
     */
    hash?: string;

    /**
     * Metadata about the function execution that generated the block where this block action took place.
     */
    function_data?: Record<string, unknown>;

    /**
     * An interactivity object generated as a result of the block action.
     */
    interactivity?: Record<string, unknown>;

    /**
     * A workflow (just-in-time) token generated for this block action.
     */
    bot_access_token?: string;

    /**
     * The enterprise the installed app is part of, if the app is workspace-installed or org-installed. Null otherwise.
     */
    enterprise?: {
      id: string;
      name: string;
    } | null;

    /**
     * The channel where this block action took place, if applicable.
     */
    channel?: {
      id: string;
      name: string;
    } | null;

    /**
     * The message where this block action took place, if applicable.
     */
    message?: {
      type: string;
      user: string;
      ts: string;
      text: string;
      blocks?: (Block | KnownBlock)[];
    } | null;

    /**
     * The view where this block action took place, if applicable.
     */
    view?: {
      id: string;
      type: string;
      hash: string;
    } | null;

    /**
     * A property including all stateful elements, not just input blocks.
     */
    state?: Record<string, any>;

    /**
     * A short-lived webhook that can be used to send messages in response to interactions. Deprecated for workflow apps.
     */
    response_url?: string;
  }

  export interface NoVoted {
    type: "context";
    elements: [
      {
        type: "mrkdwn";
        text: "No votes";
      },
    ];
  }

  export interface Voted {
    type: "context";
    elements: {
      type: "image";
      image_url: (string & tags.Format<"iri">) | null; // user profile image
      alt_text: string; // username
    }[];
  }

  export interface IDeleteSCheduleMessageInput extends ISecret {
    /**
     * @title channel id
     *
     * It refers to the channel on which you want to delete the scheduled message.
     * If you don't know the channel's ID, You need to view the channel first.
     */
    channel: Channel["id"] &
      (
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-public-channels";
            jmesPath: "[].{value:id, label:name}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-private-channels";
            jmesPath: "[].{value:id, label:name}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-im-channels";
            jmesPath: "[].{value:id, label:name || '개인 채널'}";
          }>
      );

    /**
     * @title scheduled message id to delete
     */
    scheduled_message_id: string &
      Prerequisite<{
        method: "post";
        path: "/connector/slack/get-scheduled-messages";
        jmesPath: "scheduled_messages[].{value:id, label:text}";
      }>;
  }

  export interface ISCheduleMessageInput extends IPostMessageInput {
    /**
     * You can schedule the time you want to send the message in advance.
     * The scheduled time must be in the same form as the ts property in the Message.
     *
     * @title Transfer Schedule Time
     */
    post_at: Message["ts"];

    /**
     * @title thread ts
     *
     * If the message you want to schedule is within a specific thread, you must pass the ts value of the parent message.
     */
    thread_ts?: Message["ts"];
  }

  export interface IMarkInput extends ISecret {
    /**
     * @title channel id
     *
     * It refers to the channel on which you want to mark the conversation history.
     * If you don't know the channel's ID, You need to view the channel first.
     */
    channel: Channel["id"] &
      (
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-public-channels";
            jmesPath: "[].{value:id, label:name}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-private-channels";
            jmesPath: "[].{value:id, label:name}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-im-channels";
            jmesPath: "[].{value:id, label:name || '개인 채널'}";
          }>
      );

    /**
     * It means the 'ts' value of the chat you want to mark
     *
     * @title ts
     */
    ts: Message["ts"] &
      Prerequisite<{
        method: "post";
        path: "/connector/slack/get-channel-histories";
        jmesPath: "messages[].{value: ts, label: text}";
      }>;
  }

  export interface IGetUserListOutput extends ISlack.ICommonPaginationOutput {
    /**
     * @title user list
     */
    users: StrictOmit<IGetUserOutput, "fields">[];
  }

  /**
   * @title profile
   *
   * User information will usually include user's directories, start date, email, phone number, and status information.
   * The start date usually records when this member joined Slack or when he joined the team, but all the information here is written by the individual user and not by the HR person.
   */
  export type IGetUserDetailOutput = StrictOmit<
    IGetUserOutput,
    "name" | "deleted" | "profile_image"
  >;

  export interface IGetUserOutput {
    id: ISlack.User["id"];

    /**
     * This is the name of the user,
     * but in some countries,
     * it may not be possible to call the user's name carelessly,
     * and the company should refrain from using it because the position exists.
     *
     * @title name
     */
    name: ISlack.User["name"];

    /**
     * The user has a separate display name.
     * A display name is a name that the user has chosen to show.
     * Therefore, it would be best to use this name as a courtesy.
     *
     * @title display name
     */
    display_name: ISlack.User["profile"]["display_name"];

    /**
     * The user's first and last name.
     * Updating this field will update first_name and last_name.
     * If only one name is provided, the value of last_name will be cleared.
     *
     * @title real_name
     */
    real_name: ISlack.User["profile"]["real_name"];

    /**
     * This value is used to distinguish between deleted users.
     *
     * @title deleted
     */
    deleted: ISlack.User["deleted"];

    /**
     * There are several profile images for each image quality,
     * but here we provide them based on the first image uploaded by the user.
     *
     * @title profile image
     */
    profile_image: ISlack.User["profile"]["image_original"];

    /**
     * @title status
     */
    status_text?: ISlack.User["status_text"];

    /**
     * @title custom fields
     */
    fields: Record<string, string>;
  }

  export interface IGetScheduledMessageListOutput
    extends ISlack.ICommonPaginationOutput {
    /**
     * @title scheduled messages
     */
    scheduled_messages: (ScheduledMessage & {
      /**
       * @title id of scheduled message
       */
      id: string;

      /**
       * @title date-time format of post_at
       */
      post_at_date: string;
    })[];
  }

  export interface IGetScheduledMessageListInput
    extends ISlack.ISecret,
      ISlack.ICommonPaginationInput {}

  export interface IGetUserDetailInput extends ISlack.ISecret {
    /**
     * @title userIds
     *
     * You can enter the ID value of the user who wants to look up the details.
     */
    userIds: (ISlack.User["id"] &
      Prerequisite<{
        method: "post";
        path: "/connector/slack/get-users";
        jmesPath: "users[].{value: id, label: display_name}";
      }>)[] &
      tags.MinItems<1>;
  }

  export interface IGetUserListInput
    extends ISlack.ISecret,
      ISlack.ICommonPaginationInput {}

  export interface IPostMessageReplyInput extends IPostMessageInput {
    /**
     * It means the 'ts' value of the chat you want to reply
     *
     * @title ts
     */
    ts: Message["ts"] &
      Prerequisite<{
        method: "post";
        path: "/connector/slack/get-channel-histories";
        jmesPath: "messages[].{value: ts, label: text}";
      }>;
  }

  export interface IPostMessageToMyselfInput extends ISlack.ISecret {
    /**
     * @title message to send
     */
    text: string;
  }

  export interface IAuthTestOutput {
    ok: boolean;

    /**
     * @title Slack workspace uri
     */
    url: string &
      tags.Format<"uri"> &
      Placeholder<"https://kakasootest.slack.com/">;

    team: string;

    user: string;

    team_id: string;

    user_id: string;

    is_enterprise_install: boolean;
  }

  export interface IPostMessageInput extends ISlack.ISecret {
    /**
     * @title channel id
     *
     * It refers to the channel on which you want to view the conversation history.
     * If you don't know the channel's ID, You need to view the channel first.
     */
    channel: Channel["id"] &
      (
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-public-channels";
            jmesPath: "[].{value:id, label:name}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-private-channels";
            jmesPath: "[].{value:id, label:name}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-im-channels";
            jmesPath: "[].{value:id, label:name || '개인 채널'}";
          }>
      );

    /**
     * @title message to send
     *
     * When a user enters a markdown format string, the internal function modifies it to the format of the slack.
     * Users can put text in accordance with the usual markdown grammar.
     * For user readability, it is recommended that the string be sent with appropriate new-line characters.
     */
    text: string;
  }

  export interface ICommonPaginationInput {
    /**
     * @title limit
     *
     * Indicates the number of data to look up at at once.
     * If not entered, use 100 as the default.
     * This should never be null. If you don't have a value, don't forward properties.
     *
     * In reality, the value can be from 1 to 1000, so the recommendation is a number over 200.
     * If there is a user's request and there is a section that is cumbersome to page, you can enter 200.
     *
     * Since it is burdensome for users to inquire too many conversation details, it is recommended to page 100 to 200 conversation details at a time if more data is needed.
     * Alternatively, it is also helpful to get a date to inquire from the user.
     */
    limit?: number &
      tags.Type<"int32"> &
      tags.Minimum<1> &
      tags.Maximum<1000> &
      Placeholder<"200">;

    /**
     * @title cursor
     *
     * If you pass the cursor value received from the previous inquiry, you can inquire from the data after the cursor.
     * If you don't put a value, it will be recognized as the first page.
     * This should never be null. If you don't have a value, don't forward properties.
     */
    cursor?: string;
  }

  export interface ICommonPaginationOutput {
    /**
     * @title next_cursor
     *
     * If the following data exist, the cursor value exists.
     * If you want to see the next data from these data,
     * you can pass this value to the next request condition, `cursor`.
     */
    next_cursor: string | null;
  }

  export interface IGetReplyOutput extends ICommonPaginationOutput {
    /**
     * This value refers to replies that depend on the currently viewed thread.
     *
     * @title replies
     */
    replies: ISlack.Reply[];

    /**
     * @title members
     *
     * This is a list of people who participated in the conversation in this conversation list.
     */
    members: MyPick<IGetUserOutput, "id" | "display_name">[];
  }

  export interface IGetReplyInput extends IGetChannelHistoryInput {
    /**
     * It means the 'ts' value of the chat you want to look up.
     *
     * @title ts
     */
    ts: Message["ts"] &
      Prerequisite<{
        method: "post";
        path: "/connector/slack/get-channel-histories";
        jmesPath: "messages[].{value: ts, label: text}";
      }>;
  }

  export interface IGetChannelLinkHistoryOutput
    extends ICommonPaginationOutput {
    /**
     * @title message
     *
     * This refers to the history of conversations made on the channel.
     * The closer you are to the 0th in the array, the more recent it is.
     * However, Slack's message can be modified, so just because it is the 0th, it may not be the last writing/modified.
     */
    messages: StrictOmit<ISlack.LinkMessage, "type" | "attachments">[];

    /**
     * @title members
     *
     * This is a list of people who participated in the conversation in this conversation list.
     */
    members: MyPick<IGetUserOutput, "id" | "display_name">[];
  }

  export interface IGetChannelHistoryOutput extends ICommonPaginationOutput {
    /**
     * @title message
     *
     * This refers to the history of conversations made on the channel.
     * The closer you are to the 0th in the array, the more recent it is.
     * However, Slack's message can be modified, so just because it is the 0th, it may not be the last writing/modified.
     */
    messages: StrictOmit<ISlack.Message, "type" | "attachments">[];

    /**
     * @title members
     *
     * This is a list of people who participated in the conversation in this conversation list.
     */
    members: MyPick<IGetUserOutput, "id" | "display_name">[];
  }

  export interface IGetChannelHistoryInput
    extends ISlack.ISecret,
      ISlack.ICommonPaginationInput {
    /**
     * @title channel id
     *
     * It refers to the channel on which you want to view the conversation history.
     * You need to view the channel first.
     * This is a string that always begins with a capital letter 'C' or 'D'.
     */
    channel: Channel["id"] &
      (
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-public-channels";
            jmesPath: "[].{value:id, label:name}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-private-channels";
            jmesPath: "[].{value:id, label:name}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-im-channels";
            jmesPath: "[].{value:id, label:name || '개인 채널'}";
          }>
      );

    /**
     * @title latestDateTime
     *
     * Only messages before this date-time will be included in results. Default is the current time.
     * It is a value that takes precedence over 'latest', 'latestTimestamp'.
     */
    latestDateTime?: string & tags.Format<"date-time">;

    /**
     * @title oldestDateTime
     *
     * Only messages after this date-time will be included in results.
     * It is a value that takes precedence over 'oldest', 'oldestTimestamp'.
     */
    oldestDateTime?: string & tags.Format<"date-time">;
  }

  /**
   * @title response
   */
  export interface IGetPrivateChannelOutput extends ICommonPaginationOutput {
    /**
     * @title channels
     */
    channels: ISlack.PrivateChannel[];
  }

  /**
   * @title response
   */
  export interface IGetPublicChannelOutput extends ICommonPaginationOutput {
    /**
     * @title channels
     */
    channels: ISlack.PublicChannel[];
  }

  /**
   * @title response
   */
  export interface IGetImChannelOutput extends ICommonPaginationOutput {
    /**
     * @title channels
     */
    channels: ISlack.ImChannel[];
  }

  /**
   * @title request condition
   */
  export interface IGetChannelInput extends ISlack.ISecret {
    /**
     * @title limit
     * @deprecated
     */
    limit?: number &
      tags.Type<"int32"> &
      tags.Minimum<1> &
      tags.Maximum<1000> &
      Placeholder<"200">;

    /**
     * @title cursor
     * @deprecated
     */
    cursor?: string;
  }

  export interface ImChannel extends Channel {
    /**
     * @title created time
     */
    created: number & tags.Type<"int64">;

    /**
     * @title Is it the `im` type or not
     */
    is_im: true;

    /**
     * @title is org shared
     */
    is_org_shared: boolean;

    /**
     * @title is user deleted
     */
    is_user_deleted: boolean;

    /**
     * @title priority
     */
    priority: number;

    /**
     * @title channel owner's id
     */
    user: User["id"];
  }

  export interface PrivateChannel extends Channel {
    /**
     * @title channel name
     */
    name: string;
  }

  export interface PublicChannel extends Channel {
    /**
     * @title channel name
     */
    name: string;
  }

  export interface Channel {
    /**
     * @title channel id
     *
     * The channel ID starts with 'C' and 'D', and for a private DM channel, 'D'.
     * But Sometimes there are channel names that start with a G.
     */
    id: string & tags.Pattern<"^((C(.*))|(D(.*))|(G(.*)))">;
  }

  export interface User {
    /**
     * @title user id
     */
    id: string;

    /**
     * @title name
     */
    name: string;

    /**
     * @title deleted
     */
    deleted: boolean;

    profile: {
      /**
       *
       * @title display name
       */
      display_name: string | null;

      /**
       * @title real name
       */
      real_name: string | null;

      /**
       * @title profile image
       */
      image_original:
        | (string & tags.Format<"iri"> & ContentMediaType<"image/*">)
        | null;
    };

    /**
     * @title status
     */
    status_text?: string | null;
  }

  export interface Reply
    extends MyPick<
      Message,
      "type" | "user" | "text" | "ts" | "ts_date" | "attachments" | "link"
    > {
    /**
     * @title thread ts
     */
    thread_ts: Message["ts"];

    /**
     * @title ID of the person who made parent message of this message
     *
     * If this Reply has been published from thread to thread,
     * outside of thread, and also as a channel,
     * there is no parent_user_id.
     */
    parent_user_id: User["id"] | null;

    /**
     * @title links
     *
     * Links from the chat
     */
    links: (string & tags.Format<"iri">)[];
  }

  export interface ScheduledMessage
    extends StrictOmit<
      Message,
      | "ts"
      | "type"
      | "user"
      | "reply_count"
      | "reply_users_count"
      | "ts_date"
      | "link"
    > {
    /**
     * @title timestamp
     *
     * for example, `1721804246.083609`.
     * This is the time value expression method used by Slack.
     */
    post_at: string & Placeholder<"1234567890.123456">;

    /**
     * @title when the user scheduled the message
     */
    date_created: string & Placeholder<"1234567890.123456">;
  }

  export interface LinkMessage extends Message {
    /**
     * @title links
     *
     * Links from the chat
     */
    links: (string & tags.Format<"iri">)[];
  }

  export interface Message {
    /**
     * @title type
     */
    type: "message";

    /**
     * @title ID of the person who made this message
     *
     * If not a user, message does not have an ID.
     */
    user: User["id"] | null;

    /**
     * @title channel id
     */
    channel: Channel["id"];

    /**
     * @title message contents
     *
     * When users occasionally call others, they can be called in the form of '@USERNAME', which is called a tag.
     * In the conversation history, the link and code box are abbreviated to <LINK/> and <CODE/>, respectively.
     * For users, it is replaced by a user name, Like <@USERNAME>.
     * <@USERNAME> is about calling someone else, and it's not the name of the person who started the conversation, so be careful.
     * if you want to find who started this conversation, check 'user' property.
     */
    text: string;

    /**
     * @title timestamp
     *
     * for example, `1721804246.083609`.
     * This is the time value expression method used by Slack.
     */
    ts: string & Placeholder<"1234567890.123456">;

    /**
     * @title date format of `ts`
     *
     * This is the value changed to ISO String to make it easier to recognize the current time value by separating 'ts'.
     */
    ts_date: string;

    /**
     * @title reply_count
     *
     * Indicates the number of replies on this thread.
     * If there are many replies, active discussions are underway.
     */
    reply_count: number;

    /**
     * @title reply_users_count
     *
     * This means the person who has one or more Replys in this thread.
     * The number of unique people discussing in the thread.
     */
    reply_users_count: number;

    /**
     * @title Attachments
     *
     * Attachement contains all types of files and can sometimes be an external link.
     * It is not the type that can be confirmed because the internal properties can vary depending on the type of block it is making up.
     */
    attachments?: MyPick<ISlack.Attachment, "id" | "title">[];

    /**
     * @title shortcut link
     *
     * Link to view the conversation history immediately.
     * We can provide you with a shortcut link if user want, but you don't have to expose it to them in normal times.
     */
    link: string & tags.Format<"iri">;
  }

  export interface Attachment {
    /**
     * @title text
     *
     * The main body text of the attachment.
     * It can be formatted as plain text, or with mrkdwn by including it in the mrkdwn_in field.
     * The content will automatically collapse if it contains 700+ characters or 5+ line breaks, and will display a "Show more..." link to expand the content.
     */
    text?: string;

    /**
     * @title fallback
     *
     * A plain text summary of the attachment used in clients that don't show formatted text (eg. IRC, mobile notifications).
     */
    fallback?: string;

    /**
     * @title thumb_url
     *
     * A valid URL to an image file that will be displayed as a thumbnail on the right side of a message attachment. We currently support the following formats: GIF, JPEG, PNG, and BMP.
     * The thumbnail's longest dimension will be scaled down to 75px while maintaining the aspect ratio of the image. The file size of the image must also be less than 500 KB.
     * For best results, please use images that are already 75px by 75px.
     */
    thumb_url?: string & tags.Format<"iri">;

    /**
     * @title thumb_width
     */
    thumb_width?: number;

    /**
     * @title thumb_height
     */
    thumb_height?: number;

    /**
     * @title id
     */
    id?: number;

    /**
     * @title title
     *
     * Large title text near the top of the attachment.
     */
    title?: string;

    /**
     * @title title link
     *
     * A valid URL that turns the title text into a hyperlink.
     */
    title_link?: string;
  }

  export interface File {
    /**
     * @title id
     */
    id: string;

    /**
     * @title created
     */
    created: number;

    /**
     * @title timestamp
     */
    timestamp: number;

    /**
     * @title name
     * @example "tedair.gif"
     */
    name: string;

    /**
     * @title title
     * @example "tedair.gif"
     */
    title: string;

    /**
     * @title mimetype
     * @example "image/gif"
     */
    mimetype: string;

    /**
     * @title filetype
     * @example "gif"
     */
    filetype: string;

    /**
     * @title pretty_type
     * @example "GIF"
     */
    pretty_type: string;

    /**
     * @title user
     * @example "U061F7AUR"
     */
    user: string;

    /**
     * @title editable
     */
    editable: boolean;

    /**
     * @title size
     */
    size: number & tags.Type<"uint64">;

    /**
     * @title mode
     */
    mode: string;

    /**
     * @title is_external
     */
    is_external: boolean;

    /**
     * @title external_type
     */
    external_type: string;

    /**
     * @title is_public
     */
    is_public: boolean;

    /**
     * @title public_url_shared
     */
    public_url_shared: boolean;

    /**
     * @title display_as_bot
     */
    display_as_bot: boolean;

    /**
     * @title username
     */
    username: string;

    /**
     * @title url_private
     */
    url_private?: string & tags.Format<"iri">;

    /**
     * @title url_private_download
     */
    url_private_download?: string & tags.Format<"iri">;

    /**
     * @title thumb_64
     */
    thumb_64?: string & tags.Format<"iri">;

    /**
     * @title thumb_80
     */
    thumb_80?: string & tags.Format<"iri">;

    /**
     * @title thumb_360
     */
    thumb_360?: string & tags.Format<"iri">;

    /**
     * @title thumb_360_w
     */
    thumb_360_w?: number & tags.Type<"uint64">;

    /**
     * @title thumb_360_h
     */
    thumb_360_h?: number & tags.Type<"uint64">;

    /**
     * @title thumb_160
     */
    thumb_160?: string & tags.Format<"iri">;

    /**
     * @title thumb_360_gif
     */
    thumb_360_gif?: string & tags.Format<"iri">;

    /**
     * @title image_exif_rotation
     */
    image_exif_rotation?: number & tags.Type<"uint64">;

    /**
     * @title original_w
     */
    original_w: number & tags.Type<"uint64">;

    /**
     * @title original_h
     */
    original_h: number & tags.Type<"uint64">;

    /**
     * @title deanimate_gif
     */
    deanimate_gif: string & tags.Format<"iri">;

    /**
     * @title pjpeg
     */
    pjpeg: string & tags.Format<"iri">;

    /**
     * @title permalink
     */
    permalink: string & tags.Format<"iri">;

    /**
     * @title permalink_public
     */
    permalink_public: string & tags.Format<"iri">;

    /**
     * @title thumb_1024
     */
    thumb_1024?: string & tags.Format<"iri">;

    /**
     * @title channels
     */
    channels: Channel["id"][];

    /**
     * @title groups
     */
    groups: string[];

    /**
     * @title ims
     */
    ims: string[];

    /**
     * @title comments_count
     */
    comments_count: number & tags.Type<"uint64">;
  }

  /**
   * @title File Lookup Results
   */
  export interface IGetFileOutput {
    ok: boolean;
    files: MyPick<
      ISlack.File,
      | "id"
      | "channels"
      | "comments_count"
      | "created"
      | "user"
      | "mimetype"
      | "size"
      | "url_private"
      | "url_private_download"
      | "thumb_1024"
      | "name"
    >[];
    paging: {
      /**
       * @title current file count
       */
      count: number;

      /**
       * @title total page
       */
      total: number;

      /**
       * @title current page
       */
      page: number;

      /**
       * @title total page
       */
      pages: number;
    };
  }

  export interface IGetFileInput
    extends ISlack.ISecret,
      StrictOmit<ICommonPaginationInput, "cursor"> {
    /**
     * @title page
     */
    page?: number & tags.Default<1>;

    /**
     * @title Channel ID to browse the file
     *
     * If not specified, the entire Slack workspace will be explored.
     */
    channel?: Channel["id"] &
      (
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-public-channels";
            jmesPath: "[].{value:id, label:name}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-private-channels";
            jmesPath: "[].{value:id, label:name}";
          }>
        | Prerequisite<{
            method: "post";
            path: "/connector/slack/get-im-channels";
            jmesPath: "[].{value:id, label:name || '개인 채널'}";
          }>
      );

    /**
     * @title user id
     *
     * If you only want to check files sent by a particular user, enter your ID.
     */
    user?: ISlack.User["id"] &
      Prerequisite<{
        method: "post";
        path: "/connector/slack/get-users";
        jmesPath: "users[].{value: id, label: display_name}";
      }>;

    /**
     * @title file types to include
     *
     * The file types you may encounter include (but are not limited to):
     * If you want to look up all of them regardless of the file type, you can ignore the properties.
     * If the file type is important, you can specify the file type property as true inside the object.
     */
    types?: {
      /**
       * @title spaces
       *
       * Slack's Post is a feature that allows users to write and share long forms of documents or writings.
       * It is more formatting free than regular messages and can contain code blocks or sections, which are useful for creating structured documents.
       * Slack often categorizes these documented files into spaces, helping to share knowledge or information easily within the team.
       */
      spaces?: boolean;

      /**
       * @title snippets
       *
       * Snippets are used to share short code or text snippets.
       * They are usually useful when programmers share short code blocks or snippets of log files with their teams.
       * Snippets quickly uploads text or code, and allows others to refer to or copy the content. In Slack, these files are classified into a file type called snippets.
       */
      snippets?: boolean;

      /**
       * @title images
       */
      images?: boolean;

      /**
       * @title gdocs
       *
       * Google docs
       */
      gdocs?: boolean;

      /**
       * @title zips
       */
      zips?: boolean;

      /**
       * @title pdfs
       */
      pdfs?: boolean;
    };

    /**
     * @title latestDateTime
     *
     * Only files before this date-time will be included in results. Default is the current time.
     * It is a value that takes precedence over 'latest', 'latestTimestamp'.
     */
    latestDateTime?: string & tags.Format<"date-time">;

    /**
     * @title oldestDateTime
     *
     * Only files after this date-time will be included in results.
     * It is a value that takes precedence over 'oldest', 'oldestTimestamp'.
     */
    oldestDateTime?: string & tags.Format<"date-time">;
  }
}
