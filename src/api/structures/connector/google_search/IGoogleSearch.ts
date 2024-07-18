import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

export namespace IGoogleSearch {
  /**
   * @title 검색하기 위한 조건
   */
  export interface IRequest {
    /**
     *  검색 결과에 들어가야하는 키워드를 설정합니다.
     *
     * @title 꼭 들어가야하는 키워드
     */
    andKeywords: Array<string & Placeholder<"뤼튼">>;

    /**
     *  검색 결과에 들어가면 좋은 키워드를 설정합니다.
     *
     * @title 들어가면 좋은 키워드
     */
    orKeywords?: Array<string & Placeholder<"스튜디오">>;

    /**
     *  검색 결과에 들어가면 안되는 키워드를 설정합니다.
     *
     * @title 들어가면 안되는 키워드
     */
    notKeywords?: Array<string & Placeholder<"폭력">>;

    /**
     * 검색 결과의 개수를 설정합니다.
     *
     * @title 검색 결과 개수
     */
    max_results: number & tags.Type<"int32">;
  }

  /**
   * @title 검색 결과
   */
  export interface IResponse {
    /**
     * @title 검색 결과 제목
     */
    title: string;

    /**
     * @title 검색 결과 링크
     */
    link: string & tags.Format<"uri">;

    /**
     * @title 검색 결과 요약
     */
    snippet: string;

    /**
     * @title 검색 결과 thumbnail
     */
    thumbnail?: string & tags.Format<"uri"> & tags.ContentMediaType<"image/*">;
  }
}
