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
