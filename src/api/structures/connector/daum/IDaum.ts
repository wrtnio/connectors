import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

/**
 * accuracy: accuracy (default)
 *
 * recency: latest
 *
 * @title Sort by
 */
type Sort = "accuracy" | "recency";

export namespace IDaum {
  /**
   * @title Information needed for the next search
   */
  export interface ISearchDaumInput {
    /**
     * Set keywords that must be included in the following search results.
     *
     * @title Must-include keywords
     */
    andKeywords: string & Placeholder<"뤼튼">;

    /**
     * Set good keywords to enter the following search results.
     *
     * @title Good keywords to enter
     */
    orKeywords?: string & Placeholder<"스튜디오">;

    /**
     * Set keywords that should not be included in the following search results.
     *
     * @title Keywords that should not be included
     */
    notKeywords?: string & Placeholder<"폭력">;

    /**
     * - accuracy: accuracy order (default)
     * - recency: most recent order
     *
     * @title Sorting method for result documents
     */
    sort?: Sort & tags.Default<"accuracy"> & Placeholder<"accuracy">;

    /**
     * The number of the results page.
     *
     * @title Results page number
     */
    page?: number & tags.Minimum<1> & tags.Maximum<50> & tags.Default<1>;

    /**
     * The number of documents to be displayed on one page.
     *
     * @title The number of documents to be displayed on one page
     */
    size?: number & tags.Minimum<1> & tags.Maximum<50> & tags.Default<10>;
  }

  /**
   * @title Next blog search results
   */
  export interface IBlogDaumOutput {
    meta: {
      /**
       * Total number of documents searched.
       *
       * @title Number of searched contents
       */
      totalCount: number;

      /**
       * The number of content that can be exposed among the searched documents.
       *
       * @title The number of content that can be exposed among the searched documents
       */
      pageableCount: number;

      /**
       * If the value is false, you can request the next page by incrementing page.
       *
       * @title Whether the current page is the last page
       */
      isEnd: boolean;
    };

    documents: {
      /**
       * The title of the document searched.
       *
       * @title The title of the document
       */
      title: string;

      /**
       * This is part of the text of the document that was searched.
       *
       * @title Part of the text of the document
       */
      contents: string;

      /**
       * The URL of the document being searched.
       *
       * @title Document URL
       */
      url: string;

      /**
       * The name of the blog searched.
       *
       * @title The name of the blog
       */
      blogName: string;

      /**
       * Representative preview image URL extracted from the search system.
       *
       * @title Thumbnail image URL
       */
      thumbnail: string & tags.ContentMediaType<"image/*">;

      /**
       * The time the document was created.
       *
       * @title Document Creation Time
       */
      dateTime: string;
    }[];
  }

  /**
   * @title Next Cafe Search Results
   */
  export interface ICafeDaumOutput {
    meta: {
      /**
       * Total number of searched cafes.
       *
       * @title Number of searched cafe contents
       */
      totalCount: number;

      /**
       * The number of contents that can be exposed among the searched cafe contents.
       *
       * @title The number of contents that can be exposed among the searched cafe contents
       */
      pageableCount: number;

      /**
       * If the value is false, you can request the next page by incrementing page.
       *
       * @title Whether the current page is the last page
       */
      isEnd: boolean;
    };

    documents: {
      /**
       * The title of the document searched.
       *
       * @title The title of the document
       */
      title: string;

      /**
       * This is part of the text of the document that was searched.
       *
       * @title Part of the text of the document
       */
      contents: string;

      /**
       * The URL of the document being searched.
       *
       * @title Document URL
       */
      url: string;

      /**
       * The following cafe name is searched.
       *
       * @title Cafe Name
       */
      cafeName: string;

      /**
       * Representative preview image URL extracted from the search system.
       *
       * @title Thumbnail image URL
       */
      thumbnail: string & tags.ContentMediaType<"image/*">;

      /**
       * The time the document was created.
       *
       * @title Document Creation Time
       */
      dateTime: string;
    }[];
  }
}
