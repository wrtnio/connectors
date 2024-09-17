import { SecretKey } from "@wrtn/connector-api/utils/types";

declare namespace tags {
  export type Format<T> = string;
}

export namespace ILINE {
  /**
   * Input for sending a message to a LINE chat
   */
  export interface ISendMessageInput {
    /**
     * Secret key for authorization
     */
    secretKey: string & SecretKey<"line">;

    /**
     * The ID of the chat to send the message to
     */
    to: string;

    /**
     * The messages to be sent
     */
    messages: Array<{
      /**
       * Type of the message (e.g., text)
       */
      type: string;

      /**
       * Content of the message
       */
      text: string;
    }>;
  }

  /**
   * Input for getting chat history from a LINE chat
   */
  export interface IGetChatHistoryInput {
    /**
     * Secret key for authorization
     */
    secretKey: string & SecretKey<"line">;

    /**
     * The ID of the chat to retrieve history from
     */
    chatId: string;

    /**
     * Limit the number of messages retrieved
     */
    limit?: number;

    /**
     * Start time for querying messages
     */
    startTime?: string & tags.Format<"date-time">;

    /**
     * End time for querying messages
     */
    endTime?: string & tags.Format<"date-time">;
  }

  /**
   * Output for getting chat history from a LINE chat
   */
  export interface IGetChatHistoryOutput {
    /**
     * List of messages retrieved from the chat
     */
    messages: Array<{
      /**
       * ID of the message
       */
      id: string;

      /**
       * Type of the message (e.g., text)
       */
      type: string;

      /**
       * Content of the message
       */
      text: string;

      /**
       * Time the message was created
       */
      createdTime: string;

      /**
       * Sender of the message
       */
      from: string;
    }>;
  }
}
