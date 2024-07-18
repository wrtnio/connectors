import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

/**
 * @title 정렬기준
 *
 * accuracy: 정확도순 (default)
 *
 * recency: 최신순
 */
type Sort = "accuracy" | "recency";

export namespace IDaum {
  /**
   * @title 다음 검색에 필요한 정보
   */
  export interface ISearchDaumInput {
    /**
     * 다음 검색 결과에 들어가야하는 키워드를 설정합니다.
     *
     * @title 꼭 들어가야하는 키워드
     */
    andKeywords: string & Placeholder<"뤼튼">;

    /**
     * 다음 검색 결과에 들어가면 좋은 키워드를 설정합니다.
     *
     * @title 들어가면 좋은 키워드
     */
    orKeywords?: string & Placeholder<"스튜디오">;

    /**
     * 다음 검색 결과에 들어가면 안되는 키워드를 설정합니다.
     *
     * @title 들어가면 안되는 키워드
     */
    notKeywords?: string & Placeholder<"폭력">;

    /**
     * - accuracy: 정확도순 (default)
     * - recency: 최신순
     *
     * @title 결과 문서 정렬 방식
     */
    sort?: Sort & tags.Default<"accuracy"> & Placeholder<"accuracy">;

    /**
     * 결과 페이지의 번호입니다.
     *
     * @title 결과 페이지 번호
     */
    page?: number & tags.Minimum<1> & tags.Maximum<50> & tags.Default<1>;

    /**
     * 한 페이지에 보여질 문서 수 입니다.
     *
     * @title 한 페이지에 보여질 문서 수
     */
    size?: number & tags.Minimum<1> & tags.Maximum<50> & tags.Default<10>;
  }

  /**
   * @title 다음 블로그 검색 결과
   */
  export interface IBlogDaumOutput {
    meta: {
      /**
       * 검색된 문서의 총 개수입니다.
       *
       * @title 검색된 컨텐츠 수
       */
      totalCount: number;

      /**
       * 검색된 문서 중 노출 가능한 컨텐츠의 개수입니다.
       *
       * @title 검색된 문서 중 노출 가능한 컨텐츠 수
       */
      pageableCount: number;

      /**
       * 값이 false면 page를 증가시켜 다음 페이지를 요청할 수 있습니다.
       *
       * @title 현재 페이지가 마지막 페이지인지 여부
       */
      isEnd: boolean;
    };

    documents: {
      /**
       * 검색된 문서의 제목입니다.
       *
       * @title 문서의 제목
       */
      title: string;

      /**
       * 검색된 문서의 본문 중 일부입니다.
       *
       * @title 문서 본문중 일부
       */
      contents: string;

      /**
       * 검색된 문서의 URL입니다.
       *
       * @title 문서 URL
       */
      url: string;

      /**
       * 검색된 블로그의 이름입니다.
       *
       * @title 블로그의 이름
       */
      blogName: string;

      /**
       * 검색 시스템에서 추출한 대표 미리보기 이미지 URL.
       *
       * @title 썸네일 이미지 URL
       */
      thumbnail: string & tags.ContentMediaType<"image/*">;

      /**
       * 검색된 문서가 작성된 시간입니다.
       *
       * @title 문서 작성 시간
       */
      dateTime: string;
    }[];
  }

  /**
   * @title 다음 카페 검색 결과
   */
  export interface ICafeDaumOutput {
    meta: {
      /**
       * 검색된 다음 카페의 총 갯수 입니다.
       *
       * @title 검색된 다음 카페 컨텐츠 수
       */
      totalCount: number;

      /**
       * 검색된 다음 카페 컨텐츠 중 노출 가능한 컨텐츠의 개수입니다.
       *
       * @title 검색된 다음 카페 컨텐츠 중 노출 가능한 컨텐츠 수
       */
      pageableCount: number;

      /**
       * 값이 false면 page를 증가시켜 다음 페이지를 요청할 수 있습니다.
       *
       * @title 현재 페이지가 마지막 페이지인지 여부
       */
      isEnd: boolean;
    };

    documents: {
      /**
       * 검색된 문서의 제목입니다.
       *
       * @title 문서의 제목
       */
      title: string;

      /**
       * 검색된 문서의 본문 중 일부입니다.
       *
       * @title 문서 본문중 일부
       */
      contents: string;

      /**
       * 검색된 문서의 URL입니다.
       *
       * @title 문서 URL
       */
      url: string;

      /**
       * 검색된 다음 카페 이름입니다.
       *
       * @title 카페 이름
       */
      cafeName: string;

      /**
       * 검색 시스템에서 추출한 대표 미리보기 이미지 URL.
       *
       * @title 썸네일 이미지 URL
       */
      thumbnail: string & tags.ContentMediaType<"image/*">;

      /**
       * 검색된 문서가 작성된 시간입니다.
       *
       * @title 문서 작성 시간
       */
      dateTime: string;
    }[];
  }
}
