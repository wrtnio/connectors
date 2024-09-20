import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";
import { MyPartial } from "../../../utils/types/MyPartial";

export namespace IConnector {
  /**
   * @title Search Results
   */
  export interface ISearchOutput {
    /**
     * Contains output information for search results.
     *
     * @title Output Information
     */
    references: IReferenceContent[];
  }

  export interface IReferenceContent {
    /**
     * The title of the output.
     *
     * @title Title
     */
    title: string;

    /**
     * Video, image, news article, research paper.
     *
     * It must be one of: video, image, news_article, research_paper
     *
     * @title Output Type
     */
    type: ReferenceType;

    /**
     * youtube, facebook, instagram, google_search, arxiv, google_news
     *
     * It must be one of: youtube, facebook, instagram, google_search, arxiv, google_news
     *
     * @title Source of output
     */
    source: ContentProvider;

    /**
     * The URL address of the output.
     *
     * @title URL address
     */
    url: string & tags.Format<"uri">;

    /**
     * Here is the content of the output.
     *
     * @title Output Content
     */
    contents?: string;

    /**
     * The URL address of the image of the output.
     *
     * @title Output Image URL
     */
    image?: string & tags.Format<"uri">;

    /**
     * Output statistics information.
     *
     * Possible values: view_count, like_count, rank
     *
     * @title Output statistics information
     */
    statistics?: MyPartial<Record<MetricType, number & tags.Type<"int32">>>;
  }

  /**
   * Videos, images, news articles, papers.
   *
   * @title Connector Output Type
   */
  export type ReferenceType =
    | tags.Constant<"video", { title: "video" }>
    | tags.Constant<"image", { title: "image" }>
    | tags.Constant<"news_article", { title: "news_article" }>
    | tags.Constant<"research_paper", { title: "research_paper" }>;

  /**
   * The source of the output.
   *
   * @title Connector Output Source
   */
  export type ContentProvider =
    | tags.Constant<"youtube", { title: "youtube" }>
    | tags.Constant<"facebook", { title: "facebook" }>
    | tags.Constant<"instagram", { title: "instagram" }>
    | tags.Constant<"google_search", { title: "google_search" }>
    | tags.Constant<"arxiv", { title: "arxiv" }>
    | tags.Constant<"google_news", { title: "google_news" }>;

  /**
   * Views, Likes, Ranking
   *
   * @title Statistics Data Type
   */
  export type MetricType = "view_count" | "like_count" | "rank";

  /**
   * Enter your search criteria.
   *
   * @title Search criteria
   */
  export interface ISearchInput {
    /**
     * Sets how many search results to retrieve.
     *
     * @title Number of search results
     */
    num_results?: number & tags.Type<"uint32"> & Placeholder<"10">;

    /**
     * Set the start date for search results.
     *
     * @title Start date for search results
     */
    from_date?: string & tags.Format<"date">;

    /**
     * Set the end date for the search results.
     *
     * @title End date for the search results
     */
    to_date?: string & tags.Format<"date">;

    /**
     * Keywords that must be included in search results.
     *
     * @title Must be included keywords
     */
    and_keywords: Array<string & Placeholder<"biology">>;

    /**
     * Keywords that you would like to see included in your search results.
     *
     * @title Keywords that you would like to see included
     */
    or_keywords?: Array<string & Placeholder<"ecosystem">>;

    /**
     * Keywords that should not be included in search results.
     *
     * @title Keywords that should not be included
     */
    not_keywords?: Array<string & Placeholder<"pollution">>;
  }
}
