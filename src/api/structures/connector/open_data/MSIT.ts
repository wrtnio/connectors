import { tags } from "typia";

/**
 * MSIT : 과학기술정보통신부
 */
export namespace IMSIT {
  export interface IGetAddressOutput {
    /**
     * @title NewAddressListResponse
     *
     * 응답 결과에 대한 헤더 정보가 담기는 구간
     */
    NewAddressListResponse: {
      cmmMsgHeader: {
        /**
         * @title totalCount
         */
        totalCount?: number & tags.Type<"uint64">;

        /**
         * @title countPerPage
         */
        countPerPage?: number & tags.Type<"uint64">;

        /**
         * @title totalPage
         */
        totalPage?: number & tags.Type<"uint64">;

        /**
         * @title error message
         */
        errMsg?: string;
      };

      /**
       * @title 주소 데이터
       *
       * 데이터가 없을 경우에는 키 자체가 존재하지 않기 때문에 이 경우 검색 결과가 없다로 이해하면 됩니다.
       */
      newAddressListAreaCd?: {
        /**
         * @title 우편 주소
         */
        zipNo: string;

        /**
         * @title 지번 주소
         */
        lnmAdres: string;

        /**
         * @title 도로명 주소
         */
        rnAdres: string;
      }[];
    };
  }

  export interface IGetAddressInput {
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
