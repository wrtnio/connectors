import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

export namespace IGoogleSearch {
  /**
   * @title Conditions for searching
   */
  export interface IRequest {
    /**
     * Set keywords that must be included in search results.
     *
     * @title Must-include keywords
     */
    andKeywords: Array<string & Placeholder<"뤼튼">>;

    /**
     * Set good keywords to enter the search results.
     *
     * @title Good keywords to enter
     */
    orKeywords?: Array<string & Placeholder<"스튜디오">>;

    /**
     * Set keywords that should not be included in search results.
     *
     * @title Keywords that should not be included
     */
    notKeywords?: Array<string & Placeholder<"폭력">>;

    /**
     * Set the number of search results.
     *
     * @title Number of search results
     */
    max_results: number & tags.Type<"int32">;
  }

  /**
   * @title Search Results
   */
  export interface IResponse {
    /**
     * @title Search Results Title
     */
    title: string;

    /**
     * @title Search Results Link
     */
    link: string & tags.Format<"iri">;

    /**
     * @title Search Results Summary
     */
    snippet?: string;

    /**
     * @title Search Results thumbnail
     */
    thumbnail?: string & tags.Format<"iri"> & tags.ContentMediaType<"image/*">;
  }
}
