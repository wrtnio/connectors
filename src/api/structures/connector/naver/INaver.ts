import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

export namespace INaver {
  /**
   * @title Search Conditions
   */
  export interface INaverKeywordInput {
    /**
     * Keywords that must be included in search results.
     *
     * @title Must-include keywords
     */
    andKeywords: string & Placeholder<"뤼튼">;

    /**
     * Keywords that you would like to see included in the search results.
     *
     * @title Keywords that would be good to include
     */
    orKeywords?: string & Placeholder<"스튜디오">;

    /**
     * Keywords that should not be included in search results.
     *
     * @title Keywords that should not be included
     */
    notKeywords?: string & Placeholder<"폭력">;

    /**
     * Set how many search results to retrieve.
     * Minimum 1, maximum 100, default 10.
     *
     * @title Number to search
     */
    display?: number &
      tags.Minimum<1> &
      tags.Maximum<100> &
      tags.Default<10> &
      Placeholder<"10">;

    /**
     * Indicates how to sort.
     *
     * - sim: Sort by accuracy descending (default).
     * - date: Sort by date descending.
     *
     * @title Sort by
     */
    sort?: (
      | tags.Constant<
          "sim",
          { title: "sim"; description: "정확도 순 내림착순 정렬" }
        >
      | tags.Constant<
          "date",
          { title: "date"; description: "날짜순 내림차수 정렬" }
        >
    ) &
      Placeholder<"sim">;
  }

  /**
   * @title Naver Cafe Search Data
   */
  export interface ICafeNaverItemOutput {
    /**
     * Title of Naver Cafe post.
     *
     * @title Post title.
     */
    title: string;

    /**
     * Link to Naver Cafe post.
     *
     * @title Post link.
     */
    link: string;

    /**
     * Summary of Naver Cafe post.
     *
     * @title Summary of post.
     */
    description: string;

    /**
     * The name of the cafe where the Naver Cafe post is located.
     *
     * @title The name of the cafe where the post is located.
     */
    cafename: string;

    /**
     * Link to the cafe where the Naver Cafe post is located.
     *
     * @title Link to the cafe where the post is located.
     */
    cafeurl: string;
  }

  /**
   * @title Naver blog search data
   */
  export interface IBlogNaverItemOutput {
    /**
     * Title of Naver blog post.
     *
     * @title Post title.
     */
    title: string;

    /**
     * Link to Naver blog post.
     *
     * @title Post link.
     */
    link: string;

    /**
     * Summary of Naver blog post.
     *
     * @title Summary of post.
     */
    description: string;

    /**
     * The name of the blog that contains the Naver blog post.
     *
     * @title The name of the blog that contains the blog post.
     */
    bloggername: string;

    /**
     * Address of the blog that contains the Naver blog post.
     *
     * @title Address of the blog that contains the blog post.
     */
    bloggerlink: string;

    /**
     * The date the Naver blog post was created.
     *
     * @title The date the blog post was created.
     */
    postdate: string;
  }

  /**
   * @title Naver Cafe Search Results
   */
  export interface ICafeNaverOutput {
    /**
     * Naver Cafe search result data.
     *
     * @title Naver Cafe search result data.
     */
    data: {
      /**
       * The time the search results were generated.
       *
       * @title The time the search results were generated.
       */
      lastBuildDate: string;

      /**
       * Total number of search results.
       *
       * @title Total number of search results.
       */
      total: number;

      /**
       * The starting position of the search results.
       *
       * @title The starting position of the search.
       */
      start: number;

      /**
       * The number of search results to display at one time.
       *
       * @title The number of search results to display at one time.
       */
      display: number;

      /**
       * Individual search results.
       *
       * @title Individual search results.
       */
      items: ICafeNaverItemOutput[];
    };
  }

  /**
   * @title Naver blog search results
   */
  export interface IBlogNaverOutput {
    /**
     * The time the search results were generated.
     *
     * @title The time the search results were generated.
     */
    lastBuildDate: string;

    /**
     * Total number of search results.
     *
     * @title Total number of search results.
     */
    total: number;

    /**
     * The starting position of the search results.
     *
     * @title The starting position of the search.
     */
    start: number;

    /**
     * The number of search results to display at one time.
     *
     * @title The number of search results to display at one time.
     */
    display: number;

    /**
     * Individual search results.
     *
     * @title Individual search results.
     */
    items: IBlogNaverItemOutput[];
  }

  export interface INewsNaverOutput {
    /**
     * The time the search results were generated.
     *
     * @title The time the search results were generated.
     */
    lastBuildDate: string;

    /**
     * Total number of search results.
     *
     * @title Total number of search results.
     */
    total: number;

    /**
     * The starting position of the search results.
     *
     * @title The starting position of the search.
     */
    start: number;

    /**
     * The number of search results to display at one time.
     *
     * @title The number of search results to display at one time.
     */
    display: number;

    /**
     * Individual search results.
     *
     * @title Individual search results.
     */
    items: INewsNaverItemOutput[];
  }

  /**
   * @title Naver News Search Data
   */
  export interface INewsNaverItemOutput {
    /**
     * News Title.
     *
     * @title Title
     */
    title: string;

    /**
     * Naver News URL.
     *
     * @title Naver News URL
     */
    link: string & tags.Format<"iri">;

    /**
     * Original URL of news article.
     *
     * @title Original URL
     */
    originallink: string & tags.Format<"iri">;

    /**
     * The part that matches the search term <b>is wrapped in tags. @title Summary of the news article</b>
     */
    description: string;

    /**
     * The time the news article was provided to Naver.
     *
     * @title News article publication time
     */
    pubDate: string;
  }
}
