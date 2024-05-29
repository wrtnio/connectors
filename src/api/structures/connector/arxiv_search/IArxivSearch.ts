export interface IArxivSearchParams {
  /**
   * 아카이브에서 검색할 때 사용하는 검색어 구문 입니다.
   *
   * @title 검색 구문
   */
  search_query: string;

  /**
   * 몇 개의 검색 결과를 가져올지 설정합니다.
   *
   * @title 검색 결과 개수
   */
  max_results?: number;
}
