import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

/**
 * @title 한국저작권협회 타입
 */
export namespace KoreaCopyrightCommission {
  /**
   * @title 저작권 조회 조건
   */
  export interface IGetCopyRightInput {
    /**
     * @title 한 페이지 당 결과 수
     */
    perPage?: number & tags.Type<"int32"> & tags.Default<10>;

    /**
     * @title 페이지 번호
     */
    page?: number & tags.Type<"int32"> & tags.Default<1>;

    /**
     * @title 저작권 등록번호
     * @description 완전일치하는 저작권만 조회된다.
     */
    REG_ID?: string;

    /**
     * @title 제호(명칭)
     *
     * 제호란 저작물의 명칭을 의미하는 말입니다.
     */
    CONT_TITLE?: string & Placeholder<"제호 (명칭)">;

    /**
     * @title 저작권자 이름
     *
     * 이는 저작권자의 이름을 의미합니다. 사람의 이름일 수도 있고 기업이나 특정 단체의 이름일 수도 있습니다.
     */
    AUTHOR_NAME?: string & Placeholder<"저작자 이름">;
  }

  /**
   * @title 저작권 조회 결과
   */
  export interface IGetCopyRightOutput
    extends Pick<IGetCopyRightInput, "page" | "perPage"> {
    /**
     * @title 현재 페이지 개수
     */
    currentCount: number & tags.Type<"int32">;

    /**
     * @title 검색 조건에 일치하는 저작권 수
     */
    matchCount: number & tags.Type<"int32">;

    /**
     * @title 검색 결과
     */
    data: (Pick<IGetCopyRightInput, "REG_ID" | "CONT_TITLE" | "AUTHOR_NAME"> & {
      /**
       * @title 저작권 등록일
       */
      REG_DATE: string & tags.Format<"date">;
    })[];
  }
}
