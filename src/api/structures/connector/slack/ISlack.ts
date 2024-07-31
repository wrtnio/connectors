import { Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";
import { ICommon } from "../common/ISecretValue";

export namespace ISlack {
  export type ISecret = ICommon.ISecret<
    "slack",
    ["channels:read,channels:history,users.profile:read,im:read,groups:read"]
  >;

  export interface ICommonPaginationInput {
    /**
     * @title limit
     */
    limit?: number &
      tags.Type<"int32"> &
      tags.Minimum<1> &
      tags.Maximum<100> &
      tags.Default<100> &
      Placeholder<"100">;

    /**
     * @title cursor
     */
    cursor?: string;
  }

  export interface IGetChannelHistoryOutput {
    messages: ISlack.Message[];

    next_cursor: string | null;
  }

  export interface IGetChannelHistoryInput
    extends ISlack.ISecret,
      ISlack.ICommonPaginationInput {
    channel: Channel["id"] &
      Prerequisite<{
        method: "post";
        path: "/connector/slack/get-channels";
        jmesPath: "channels[].{value:id, label:name || '이름 없음'}";
      }>;

    /**
     * Only messages before this Unix timestamp will be included in results. Default is the current time.
     * for example, '1234567890.123456'
     */
    lastest?: number & Placeholder<"1234567890.123456">;

    /**
     * Only messages after this Unix timestamp will be included in results.
     * for example, '1234567890.123456'
     */
    oldest?: number & tags.Default<0> & Placeholder<"1234567890.123456">;
  }

  export interface IGetPrivateChannelOutput {
    channels: ISlack.PrivateChannel[];

    next_cursor: string | null;
  }

  export interface IGetPublicChannelOutput {
    channels: ISlack.PublicChannel[];

    next_cursor: string | null;
  }

  export interface IGetImChannelOutput {
    channels: ISlack.ImChannel[];

    next_cursor: string | null;
  }

  export interface IGetChannelInput
    extends ISlack.ISecret,
      ISlack.ICommonPaginationInput {}

  export interface ImChannel extends Channel {
    created: number & tags.Type<"int64">;
    is_im: true;
    is_org_shared: false;
    is_user_deleted: boolean;
    priority: 0;
    user: User["id"];
  }

  export interface PrivateChannel extends Channel {
    /**
     * 타입이 public_channel, private_channel인 경우에만 이름이 존재한다.
     *
     * @title channel name
     */
    name: string;
  }

  export interface PublicChannel extends Channel {
    /**
     * 타입이 public_channel, private_channel인 경우에만 이름이 존재한다.
     *
     * @title channel name
     */
    name: string;
  }

  export interface Channel {
    /**
     * @title channel id
     */
    id: string;
  }

  export interface User {
    /**
     * @title user id
     */
    id: string;
  }

  export interface Message {
    type: "message";
    user: User["id"];
    text: string;

    /**
     * @title timestamp
     */
    ts: string;

    /**
     * @title Attachments
     */
    attachments?: ISlack.Attachment[];
  }

  export interface Attachment {
    service_name: string;
    text: string;
    fallback: string;
    thumb_url: string & tags.Format<"uri">;
    thumb_width: number;
    thumb_height: number;
    id: number;
  }
}
