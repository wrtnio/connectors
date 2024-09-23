import { JMESPath, Prerequisite } from "@wrtnio/decorators";

export namespace IX {
  /**
   * @title User Search Condition
   */
  export interface IUserRequest {
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
  export interface IUserTweetTimeLineRequest {
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
  }

  /**
   * @title User Tweet Time Line data
   */
  export interface IUserTweetTimeLineResponse {
    /**
     * The unique id of the tweet
     *
     * @title tweet ID
     */
    id: string;

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
}
