import { tags } from "typia";

export namespace IGithub {
  export interface ICommonPaginationInput {
    /**
     * @title per_page
     * The number of results per page (max 100).
     */
    per_page?: tags.Type<"uint64"> & tags.Default<30> & tags.Maximum<100>;

    /**
     * @title page
     * The page number of the results to fetch.
     */
    page?: tags.Type<"uint64"> & tags.Default<1>;

    /**
     * @title order
     *
     * Determines whether the first search result returned is the highest number of matches (desc) or lowest number of matches (asc).
     * This parameter is ignored unless you provide sort.
     */
    order?: ("desc" | "asc") & tags.Default<"desc">;
  }

  export interface IGetUserProfileOutput
    extends Pick<User, "id" | "login" | "avatar_url" | "type"> {
    /**
     * @title name
     * It means the actual name that the user has written, not the user's nickname.
     */
    name: string;

    /**
     * @title comany name
     *
     * As the name of the company,
     * it cannot be said to be the exact name listed as the business operator because it was written by the user himself.
     * Also, we cannot guarantee that the user wrote the company name.
     * Sometimes the user jokingly writes down strange names.
     */
    company: string | null;

    /**
     * @title blog
     *
     * Indicates the blog address.
     */
    blog: (string & tags.Format<"uri">) | "" | null;

    /**
     * @title location
     *
     * It means the location of the user.
     * Usually, I write the country down, but the user can jokingly record the strange location.
     */
    location: string | null;

    /**
     * @title email address
     */
    email: string | null;

    /**
     * @title bio
     *
     * Write down what the user wants to say or a history.
     */
    bio: string | null;

    /**
     * @title twitter_username
     */
    twitter_username: string | null;

    /**
     * @title count of public repos
     */
    public_repos: number & tags.Type<"uint32">;

    /**
     * @title count of public gists
     */
    public_gists: number & tags.Type<"uint32">;

    /**
     * @title count of followers
     */
    followers: number & tags.Type<"uint32">;

    /**
     * @title count of follwing
     */
    following: number & tags.Type<"uint32">;

    /**
     * @title created_at
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * @title updated_at
     */
    updated_at: string & tags.Format<"date-time">;
  }

  export interface IGetUserProfileInput {
    /**
     * @title username
     */
    username: string;
  }

  export interface ISearchUserOutput {
    /**
     * @title total count of users
     */
    total_count: number & tags.Type<"uint64">;

    incomplete_results: boolean;

    /**
     * @title User Search Result Item
     *
     * User Search Result Item
     */
    items: IGithub.User[];
  }

  export interface ISearchUserInput extends ICommonPaginationInput {
    /**
     * @title keyword
     *
     * The query contains one or more search keywords and qualifiers.
     * Qualifiers allow you to limit your search to specific areas of GitHub.
     * The REST API supports the same qualifiers as the web interface for GitHub.
     */
    q: string;

    /**
     * @title sorting condition
     *
     * Sorts the results of your query by number of followers or repositories, or when the person joined GitHub. Default: best match
     */
    sort?: "followers" | "repositories" | "joined";
  }

  export type User = {
    /**
     * @title login
     *
     * This means the user's nickname.
     * In github, nicknames are unique at least until that user changes their own nickname.
     * This means that only one person can own the nickname at a time.
     * Therefore, it may be important to know the exact nickname because the github API calls the appi using the user's nickname.
     */
    login: string;

    /**
     * @title id
     *
     * This means the user's ID.
     */
    id: 55487286;

    /**
     * @title avatar url
     *
     * This means the user's profile image.
     */
    avatar_url: string & tags.Format<"uri">;

    /**
     * @title type
     */
    type: "User";

    /**
     * @title score
     */
    score: 1.0;
  };
}
