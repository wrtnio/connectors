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
  export interface IUserInput extends ISecret {
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
  export interface IUserOutput {
    /**
     * The unique id of the user
     *
     * @title User ID
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
   * @title User Tweet Time Line Input
   */
  export interface IUserTweetTimeLineInput extends ISecret {
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
          path: "/connector/x/get-users";
          jmesPath: JMESPath<IUserOutput, "[].{value:id, label:userName}">;
        }>;

      /**
       * The original user name
       *
       * @title user name
       */
      name: string &
        Prerequisite<{
          method: "post";
          path: "/connector/x/get-users";
          jmesPath: JMESPath<IUserOutput, "[].{value:name, label:name}">;
        }>;

      /**
       * The user name of twitter
       *
       * @title twitter user name
       */
      userName: string &
        Prerequisite<{
          method: "post";
          path: "/connector/x/get-users";
          jmesPath: JMESPath<
            IUserOutput,
            "[].{value:userName, label:userName}"
          >;
        }>;
    }[];
  }

  /**
   * @title User Tweet Time Line data
   */
  export interface ITweetOutput {
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
  export interface IGetTweetInput extends ISecret {
    /**
     * Please select a tweet to import information
     *
     * @title tweet
     */
    tweetId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/x/get-user-timeline-tweets";
        jmesPath: JMESPath<ITweetOutput, "[].{value:id, label:text}">;
      }>;
  }

  /**
   * @title Created File URL
   */
  export interface IMakeTxtFileAndUploadOutput {
    /**
     * @title Created File URL
     */
    fileUrl: string & tags.Format<"uri"> & tags.ContentMediaType<"text/plain">;
  }

  /**
   * @title Summarize Tweet Input
   */
  export interface IGetChunkDocumentInput {
    /**
     * File urls to get the list of chunk documents
     *
     * @title file url
     */
    fileUrl: Array<
      string & tags.Format<"uri"> & tags.ContentMediaType<"text/plain">
    >;

    /**
     * query required to get the chunk document. You must understand the context Inputed by the user and enter the query to get as relevant information as possible.
     *
     * @title query
     */
    query: string;
  }

  export interface IGetChunkDocumentOutput {
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
