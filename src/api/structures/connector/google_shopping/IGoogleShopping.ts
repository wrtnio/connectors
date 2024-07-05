import { tags } from "typia";

export namespace IGoogleShopping {
  /**
   * @title 상품 검색 조건
   */
  export interface IRequestStandAlone {
    /**
     * @title 검색어
     */
    keyword: string;

  }

  export interface IRequest extends IRequestStandAlone {
    /**
     * @title 카테고리
     */
    category: string;
  }

  /**
   * @title 상품 검색 결과
   */
  export interface IResponse {
    /**
     * @title 상품명
     */
    title: string;

    /**
     * @title 상품 링크
     */
    link: string;

    /**
     * ₩57,600 형식
     * 
     * @title 상품 가격
     */
    price: string;

    /**
     * @title 상품 출처
     */
    source: string;

    /**
     * @title 배송비
     */
    deliveryCost: string;

    /**
     * @title 상품 이미지
     */
    thumbnail: string & tags.Format<"uri">;
  }
}