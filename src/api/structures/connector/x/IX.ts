import { JMESPath, Prerequisite } from "@wrtnio/decorators";
import { ICommon } from "../common/ISecretValue";
import { tags } from "typia";

export namespace IX {
  export type ISecret = ICommon.ISecret<
    "x",
    ["tweet.read", "tweet.write", "users.read", "follows.read", "list.read"]
  >;

  /**
   * @title User Search Condition
   */
  export interface IUserRequest extends ISecret {
    /**
     * User name for search
     *
     * @title Twitter user name
     */
    userName: string[] & tags.MinItems<1>;
  }

  /**
   * @title User Information data
   */
  export interface IUserResponse {
    /**
     * The unique id of the user
     *
     * @title Uuser ID
     */
    id: string;

    /**
     * The display name of the user
     *
     * @title name
     */
    name: string;

    /**
     * The user name of user
     *
     * @title user name
     */
    userName: string;
  }

  /**
   * @title User Tweet Time Line Request
   */
  export interface IUserTweetTimeLineRequest extends ISecret {
    /**
     * User information for search user tweet time line
     *
     * @title user
     */
    user: {
      /**
       * The unique id of the user for search user tweet time line
       *
       * @title user id
       */
      userId: string &
        Prerequisite<{
          method: "post";
          path: "/connector/x/get-user";
          jmesPath: JMESPath<IUserResponse, "data.{value:id, label:userName}">;
        }>;

      /**
       * The original user name
       *
       * @title user name
       */
      name: string &
        Prerequisite<{
          method: "post";
          path: "/connector/x/get-user";
          jmesPath: JMESPath<IUserResponse, "data.{value:name, label:name}">;
        }>;

      /**
       * The user name of twitter
       *
       * @title twitter user name
       */
      userName: string &
        Prerequisite<{
          method: "post";
          path: "/connector/x/get-user";
          jmesPath: JMESPath<
            IUserResponse,
            "data.{value:userName, label:userName}"
          >;
        }>;
    }[];
  }

  /**
   * @title User Tweet Time Line data
   */
  export interface ITweetResponse {
    /**
     * The unique id of the tweet
     *
     * @title tweet ID
     */
    id: string;

    /**
     * The user name of the tweet
     *
     * @title user name
     */
    userName: string;

    /**
     * The content text of the tweet
     *
     * @title tweet content
     */
    text: string;

    /**
     * The link of the tweet
     *
     * @title tweet link
     */
    tweet_link: string & tags.Format<"iri">;

    /**
     * The timestamp for tweet created
     *
     * @title timestamp
     */
    timeStamp: string & tags.Format<"date-time">;

    /**
     * The type of the tweet
     *
     * @title tweet type
     */
    type?: "original" | "retweeted" | "quoted";

    /**
     * Username who wrote the original tweet of the referenced tweet
     *
     * @title referred user name
     */
    referredUserName?: string;

    /**
     * Link to the original tweet of the referenced tweet
     *
     * @title referred tweet link
     */
    referredTweetLink?: string & tags.Format<"iri">;

    /**
     * Content of the referenced tweet
     *
     * @title tweet content
     */
    referredTweetText?: string;
  }

  /**
   * @title Condition For Get Tweet
   */
  export interface IGetTweetRequest extends ISecret {
    /**
     * Please select a tweet to import information
     *
     * @title tweet
     */
    tweetId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/x/get-user-timeline-tweets";
        jmesPath: JMESPath<ITweetResponse, "data[].{value:id, label:text}">;
      }>;
  }

  /**
   * @title Created File URL
   */
  export interface IMakeTxtFileAndUploadResponse {
    /**
     * @title Created File URL
     */
    fileUrl: string & tags.Format<"uri"> & tags.ContentMediaType<"text/plain">;
  }

  /**
   * @title Summarize Tweet Request
   */
  export interface IGetChunkDocumentRequest {
    /**
     * File urls to get the list of chunk documents
     *
     * @title file url
     */
    fileUrl: Array<
      string & tags.Format<"uri"> & tags.ContentMediaType<"text/plain">
    >;

    /**
     * query required to get the chunk document. You must understand the context requested by the user and enter the query to get as relevant information as possible.
     *
     * @title query
     */
    query: string;
  }

  export interface IGetChunkDocumentResponse {
    /**
     * Chunk Document List
     *
     * @title Chunk Document List
     */
    documents: {
      /**
       * Chunk document id
       *
       * @title id
       */
      id: string;

      /**
       * Chunk document text
       *
       * @title text
       */
      text: string;

      /**
       * Chunk document score
       *
       * @title score
       */
      score: number | null;

      /**
       * Chunk document image
       *
       * @title image
       */
      image: string | null;

      /**
       * Chunk document metadata
       *
       * @title metadata
       */
      metadata: any;
    }[];
  }
}
