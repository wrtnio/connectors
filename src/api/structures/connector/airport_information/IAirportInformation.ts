export namespace IAirportInformation {
  /**
   * @title 공항 정보 검색 조건
   */
  export interface IRequest {
    /**
     * 검색할 국가나 도시의 이름을 입력하세요.
     *
     * @title 검색어
     */
    keyword: string;
  }

  /**
   * @title 공항 정보 검색 결과
   */
  export interface IResponse {
    /**
     * 국가 이름
     *
     * @title 국가
     */
    country_name: string;

    /**
     * 도시 이름
     *
     * @title 도시
     */
    city_name: string;

    /**
     * 공항 이름
     *
     * @title 공항
     */
    airport_name: string;

    /**
     * 공항 코드
     *
     * @title 공항 코드
     */
    airport_code: string;
  }
}
