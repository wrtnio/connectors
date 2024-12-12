export namespace IWebCrawler {
  /**
   * @title Web Crawling Request
   *
   * Request configuration for crawling a web page, including pagination settings
   * and wait conditions
   */
  export interface IRequest {
    /**
     * @title Target URL
     *
     * The URL of the webpage to be crawled
     */
    url: string;

    /**
     * @title Wait Selector
     *
     * Optional CSS selector to wait for before capturing content.
     * Crawler will pause until this element appears in the DOM
     */
    wait_for?: string;

    /**
     * @title Pagination Options
     *
     * Configuration for handling paginated content discovery and traversal.
     * Controls whether to follow pagination and how many pages to process
     */
    pagination?: {
      /**
       * @title Follow Next Page
       *
       * When true, crawler will attempt to follow pagination links when detected
       */
      followNextPage: boolean;

      /**
       * @title Maximum Pages
       *
       * Maximum number of pages to follow in pagination sequence.
       * Defaults to 10 if not specified
       */
      followNextPageCount?: number;
    };
  }

  /**
   * @title Web Crawling Response
   *
   * Structured data extracted from the crawled webpage, including content,
   * images, metadata, and paginated results
   */
  export interface IResponse {
    /**
     * @title Main Content Text
     *
     * Extracted text content from the main (non-paginated) components of the page
     */
    text: string;

    /**
     * @title Main Content Images
     *
     * Array of images found in the main (non-paginated) components of the page
     */
    images: IImage[];

    /**
     * @title Page Metadata
     *
     * Metadata information extracted from the webpage headers and meta tags
     */
    metadata?: IMetadata;

    /**
     * @title Paginated Content Groups
     *
     * Collection of content groups that were discovered through pagination,
     * organized by their structural identifiers
     */
    paginationGroups: {
      /**
       * @title Group Identifiers
       *
       * Array of identifiers that uniquely identify this pagination group
       * (similar to HTML section IDs)
       */
      identifier: string[];

      /**
       * @title Paginated Pages
       *
       * Array of page objects containing the content found across pagination
       */
      pages: IPage[];
    }[];
  }

  /**
   * @title Page Metadata
   *
   * Structured metadata extracted from the webpage's meta tags and headers
   */
  export interface IMetadata {
    /**
     * @title Page Title
     *
     * Title of the webpage, typically from the <title> tag or og:title
     */
    title?: string;

    /**
     * @title Page Description
     *
     * Description content including both text and associated images
     */
    description?: {
      text?: string;
      images?: IImage[];
    };

    /**
     * @title Content Author
     *
     * Author information for the webpage content
     */
    author?: string;

    /**
     * @title Publication Date
     *
     * Date when the content was published
     */
    publishDate?: string;

    /**
     * @title Additional Metadata
     *
     * Any additional non-standardized metadata key-value pairs found
     */
    [key: string]: any;
  }

  /**
   * @title Paginated Page Data
   *
   * Content and metadata for a single page within a pagination sequence
   */
  export interface IPage {
    /**
     * @title CSS Classes
     *
     * Array of CSS class names associated with the paginated content container
     */
    classNames: string[];

    /**
     * @title Page URL
     *
     * URL where this paginated content was found
     */
    url: string;

    /**
     * @title Page Content
     *
     * Array of content elements found on this paginated page
     */
    data: IData[];

    /**
     * @title Pagination Metadata
     *
     * Metadata specific to the pagination structure and navigation
     */
    pagination: IPagination;
  }

  /**
   * @title Page Element Data
   *
   * Content data for an individual element within a paginated page
   */
  export interface IData {
    /**
     * @title Element Text
     *
     * Text content extracted from the element
     */
    text: string;

    /**
     * @title Element Images
     *
     * Array of images found within the element
     */
    images: IImage[];
  }

  /**
   * @title Image Data
   *
   * Detailed information about an image found during crawling
   */
  export interface IImage {
    /**
     * @title Image ID
     *
     * HTML id attribute of the image element, if present
     */
    id?: string;

    /**
     * @title Image URL
     *
     * Source URL of the image
     */
    url: string;

    /**
     * @title Image Alt Text
     *
     * Alternative text description of the image
     */
    alt?: string;

    /**
     * @title Image Classes
     *
     * CSS classes directly applied to the image element
     */
    classNames: string[];

    /**
     * @title Parent Element Classes
     *
     * CSS classes of the parent elements containing this image
     */
    parentClassNames?: string[];
  }

  /**
   * @title Pagination Information
   *
   * Metadata and configuration for handling content pagination
   */
  export interface IPagination {
    /**
     * @title Pagination Type
     *
     * The style of pagination implemented on the page
     */
    type: PaginationType;

    /**
     * @title Current Page Number
     *
     * The current page number in the pagination sequence
     */
    currentPage?: number;

    /**
     * @title Has Next Page
     *
     * Indicates whether additional pages exist after the current page
     */
    hasNextPage: boolean;

    /**
     * @title Next Page URL
     *
     * URL for the next page when using XHR-based pagination
     */
    nextPageUrl?: string;

    /**
     * @title Next Page Number
     *
     * Number of the next page in the sequence when using numbered pagination
     */
    nextPageNo?: number;

    /**
     * @title Pagination Pattern
     *
     * Detected pattern structure for generating pagination URLs
     */
    pattern?: {
      /**
       * @title Base URL
       *
       * The base URL pattern for pagination
       */
      baseUrl: string;

      /**
       * @title Query Parameter
       *
       * Name of the query parameter used for pagination (e.g., "page", "offset")
       */
      queryParam?: string;

      /**
       * @title URL Fragment
       *
       * Fragment identifier used for pagination (e.g., "#page-2")
       */
      fragment?: string;
    };
  }

  /**
   * @title Pagination Type Enum
   *
   * Enumeration of supported pagination mechanisms:
   * - numbered: Traditional numbered page navigation
   * - infinite-scroll: Continuous scrolling with automatic loading
   * - load-more: Manual trigger for loading additional content
   * - null: No pagination detected
   */
  export type PaginationType =
    | "numbered"
    | "infinite-scroll"
    | "load-more"
    | null;
}
