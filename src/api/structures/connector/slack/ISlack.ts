import { Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";
import { ContentMediaType } from "typia/lib/tags";
import { ICommon } from "../common/ISecretValue";

export namespace ISlack {
  export type ISecret = ICommon.ISecret<
    "slack",
    [
      "channels:read",
      "channels:history",
      "users.profile:read",
      "im:read",
      "groups:read",
      "chat:write",
      "users:read",
    ]
  >;

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
     * It refers to the channel on which you want to view the conversation history.
     * If you don't know the channel's ID, You need to view the channel first.
     */
    channel: Channel["id"] &
      Prerequisite<{
        method: "post";
        path: "/connector/slack/get-channel-histories";
        jmesPath: "channels[].{value:id, label:name || '개인 채널'}";
      }>;

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
    users: {
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
    }[];
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
    url: "https://kakasootest.slack.com/";
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
      Prerequisite<{
        method: "post";
        path: "/connector/slack/get-channels";
        jmesPath: "channels[].{value:id, label:name || '개인 채널'}";
      }>;

    /**
     * @title message to send
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
     * In reality, the value can be from 1 to 1000, so the recommendation is a number over 200
     * If there is a user's request and there is a section that is cumbersome to page, you can enter 1000.
     */
    limit?: number &
      tags.Type<"int32"> &
      tags.Minimum<1> &
      tags.Maximum<1000> &
      Placeholder<"1000">;

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

  export interface IGetChannelHistoryOutput extends ICommonPaginationOutput {
    /**
     * @title message
     *
     * This refers to the history of conversations made on the channel.
     * The closer you are to the 0th in the array, the more recent it is.
     * However, Slack's message can be modified, so just because it is the 0th, it may not be the last writing/modified.
     */
    messages: ISlack.Message[];
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
      Prerequisite<{
        method: "post";
        path: "/connector/slack/get-channels";
        jmesPath: "channels[].{value:id, label:name || '개인 채널'}";
      }>;

    /**
     * @title lastest
     *
     * Only messages before this Unix timestamp will be included in results. Default is the current time.
     * for example, '1234567890.123456'
     */
    latest?: number & Placeholder<"1234567890.123456">;

    /**
     * @title oldest
     *
     * Only messages after this Unix timestamp will be included in results.
     * for example, '1234567890.123456'
     */
    oldest?: number & tags.Default<0> & Placeholder<"1234567890.123456">;
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
  export interface IGetChannelInput
    extends ISlack.ISecret,
      ISlack.ICommonPaginationInput {}

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
    is_org_shared: false;

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
     */
    id: string & tags.Pattern<"^((C(.*))|(D(.*)))">;
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
        | (string & tags.Format<"uri"> & ContentMediaType<"image/*">)
        | null;
    };
  }

  export interface Reply
    extends Pick<
      Message,
      "type" | "user" | "text" | "ts" | "tsDate" | "attachments"
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
  }

  export interface ScheduledMessage extends Omit<Message, "ts"> {
    /**
     * @title timestamp
     *
     * for example, `1721804246.083609`.
     * This is the time value expression method used by Slack.
     *
     */
    post_at: string & Placeholder<"1234567890.123456">;
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
     */
    text: string;

    /**
     * @title timestamp
     *
     * for example, `1721804246.083609`.
     * This is the time value expression method used by Slack.
     *
     */
    ts: string & Placeholder<"1234567890.123456">;

    /**
     * @title date format of `ts`
     *
     * This is the value changed to ISO String to make it easier to recognize the current time value by separating 'ts'.
     */
    tsDate: string;

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
    attachments?: ISlack.Attachment[];
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
     * 	A plain text summary of the attachment used in clients that don't show formatted text (eg. IRC, mobile notifications).
     */
    fallback?: string;

    /**
     * @title thumb_url
     *
     * A valid URL to an image file that will be displayed as a thumbnail on the right side of a message attachment. We currently support the following formats: GIF, JPEG, PNG, and BMP.
     * The thumbnail's longest dimension will be scaled down to 75px while maintaining the aspect ratio of the image. The file size of the image must also be less than 500 KB.
     * For best results, please use images that are already 75px by 75px.
     */
    thumb_url?: string & tags.Format<"uri">;

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
}
