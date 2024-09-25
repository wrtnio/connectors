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
     * @title user name
     */
    userName: string;
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
       * The user name of the user for search user tweet time line
       *
       * @title user name
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
    tweet_link: string;
  }

  export interface IGetUserFollowersRequest extends ISecret {
    userId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/x/get-user";
        jmesPath: JMESPath<IUserResponse, "data.{value:id, label:userName}">;
      }>;
  }

  export interface IGetUserFollowersResponse extends IUserResponse {}

  export interface IGetTweetRequest extends ISecret {
    tweetId: string &
      Prerequisite<{
        method: "post";
        path: "/connector/x/get-user-timeline-tweets";
        jmesPath: JMESPath<ITweetResponse, "data[].{value:id, label:text}">;
      }>;
  }

  export interface IMakeTxtFileAndUploadResponse {
    fileUrl: string & tags.Format<"uri"> & tags.ContentMediaType<"text/plain">;
  }

  export interface ISummarizeTweetRequest {
    fileUrl: string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"text/plain"> &
      Prerequisite<{
        method: "post";
        path: "/connector/x/make-txt-file-and-upload/:userName";
        jmesPath: JMESPath<
          IMakeTxtFileAndUploadResponse,
          "data.{value:fileUrl, label:fileUrl}"
        >;
      }>;
  }
}
