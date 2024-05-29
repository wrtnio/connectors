export namespace IRanker {
  /**
   * @title 정렬할 아이템
   */
  export interface IScoredItem {
    /**
     * 아이템의 점수
     *
     * @title 점수
     */
    score: number;
  }

  /**
   * @title 정렬을 위한 입력
   */
  export interface IRankInput {
    /**
     * 정렬할 아이템 목록
     *
     * @title 아이템 목록
     */
    items: IScoredItem[];
  }

  /**
   * @title 정렬된 결과
   */
  export interface IRankOutput {
    /**
     * 정렬된 아이템의 인덱스 배열
     *
     * @title 정렬된 아이템의 인덱스 배열
     */
    rankedIndices: number[];
  }
}
