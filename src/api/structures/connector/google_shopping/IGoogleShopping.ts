import { tags } from "typia";

export namespace IGoogleShopping {
  /**
   * @title 상품 검색 조건
   */
  export interface IRequestStandAlone {
    /**
     * 검색할 키워드를 입력하세요.
     *
     * @title 검색어
     */
    keyword: string;

    /**
     * 검색 결과의 개수를 설정합니다.
     *
     * @title 검색 결과 개수
     */
    max_results: number & tags.Type<"int32">;
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
    link:
      | (string & tags.Format<"uri">)
      | (string & tags.Constant<"#", { title: "알 수 없는 링크" }>);

    /**
     * ₩57,600 형식
     *
     * @title 상품 가격
     */
    price: string;

    /**
     * @title 상품 출처
     */
    source?: string;

    /**
     * @title 배송비
     */
    deliveryCost?: string;

    /**
     * @title 상품 이미지
     */
    thumbnail: string & tags.Format<"uri"> & tags.ContentMediaType<"image/*">;
  }
}
