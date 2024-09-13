import { tags } from "typia";

export namespace IAISearch {
  /**
   * @title 검색에 필요한 조건
   */
  export interface IRequest {
    /**
     * 검색어를 입력해주세요.
     *
     * @title 검색어
     */
    search_query: string & tags.MaxLength<100>;
  }

  export interface IResponse {
    result: string;
  }
}
