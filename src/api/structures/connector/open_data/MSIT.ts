import { tags } from "typia";

/**
 * MSIT : 과학기술정보통신부
 */
export namespace IMSIT {
  export interface IGetAddressOutput {}

  export interface IGetAddressInput {
    /**
     * @title 구분
     *
     * It must be one of: 'dong', 'road', 'post' but default value is 'road'.
     */
    searchSe?: (
      | tags.Constant<
          "dong",
          {
            title: "동 주소";
            description: "한국의 주소 체계 중 `동`을 의미한다";
          }
        >
      | tags.Constant<
          "road",
          {
            title: "도로명 주소";
            description: "한국의 주소 체계 중 `도로명 주소`를 의미한다.";
          }
        >
      | tags.Constant<
          "post",
          {
            title: "우편 주소";
            description: "한국의 주소 체계 중 `우편 주소`를 의미한다.";
          }
        >
    ) &
      tags.Default<"road">;

    /**
     * @title 검색어
     */
    srchwrd: string & tags.MinLength<1> & tags.MaxLength<200>;

    /**
     * @title 페이지 당 출력 개수
     */
    countPerPage?: number & tags.Type<"uint32">;

    /**
     * @title 출력될 페이지 번호
     */
    currentPage?: number & tags.Type<"uint32">;
  }
}
