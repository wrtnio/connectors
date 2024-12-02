import { tags } from "typia";

export namespace IExternalUser {
  export interface ExternalUserIdentifier {
    /**
     * @title application
     */
    "x-wrtn-user-application"?: string;

    /**
     * @title uid
     */
    "x-wrtn-user-uid"?: string;

    /**
     * @title password
     */
    "x-wrtn-user-password"?: string;
  }
}

export interface IExternalUser {
  /**
   * @title Primary Key
   */
  id: string & tags.Format<"uuid">;

  /**
   * @title channel ID
   */
  channel_id: string & tags.Format<"uuid">;

  /**
   * @title System Password
   */
  password: string;

  /**
   * @title Identifier code of the external service
   */
  application: string;

  /**
   * @title User identifier key
   */
  uid: string;

  /**
   * The date and time when an external user first accessed this service
   *
   * @title Record creation date and time
   */
  created_at: string & tags.Format<"date-time">;
}
