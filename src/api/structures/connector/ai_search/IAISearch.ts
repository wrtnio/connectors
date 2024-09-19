import { tags } from "typia";

export namespace IAISearch {
  /**
   * @title Conditions required for search
   */
  export interface IRequest {
    /**
     * Please enter your search term.
     *
     * @title Search term
     */
    search_query: string & tags.MaxLength<100>;
  }

  export interface IResponse {
    result: string;
  }
}
