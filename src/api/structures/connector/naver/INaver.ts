import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

export namespace INaver {
  /**
   * @title 검색 조건
   */
  export interface INaverKeywordInput {
    /**
     * 검색 결과에 반드시 포함되어야 하는 키워드입니다.
     *
     * @title 꼭 들어가야하는 키워드
     */
    andKeywords: string & Placeholder<"뤼튼">;

    /**
     * 검색 결과에 포함되면 좋겠는 키워드입니다.
     *
     * @title 들어가면 좋은 키워드
     */
    orKeywords?: string & Placeholder<"스튜디오">;

    /**
     * 검색 결과에 포함되면 안되는 키워드입니다.
     *
     * @title 들어가면 안되는 키워드
     */
    notKeywords?: string & Placeholder<"폭력">;

    /**
     * 검색 결과를 몇 개 받아올 것인지 설정합니다.
     * 최소 1개, 최대 100개, 기본 10개입니다.
     *
     * @title 검색할 개수
     */
    display?: number &
      tags.Minimum<1> &
      tags.Maximum<100> &
      tags.Default<10> &
      Placeholder<"10">;

    /**
     * 어떤 방법으로 정렬할지를 의미합니다.
     *
     * - sim: 정확도순 내림차수 정렬 (default).
     * - date: 날짜순 내림차수 정렬.
     *
     * @title 정렬 기준
     */
    sort?: (
      | tags.Constant<
          "sim",
          { title: "sim"; description: "정확도 순 내림착순 정렬" }
        >
      | tags.Constant<
          "date",
          { title: "date"; description: "날짜순 내림차수 정렬" }
        >
    ) &
      Placeholder<"sim">;
  }

  /**
   * @title 네이버 카페 검색 데이터
   */
  export interface ICafeNaverItemOutput {
    /**
     * 네이버 카페 게시글의 제목.
     *
     * @title 게시글 제목.
     */
    title: string;

    /**
     * 네이버 카페 게시글의 링크.
     *
     * @title 게시글 링크.
     */
    link: string;

    /**
     * 네이버 카페 게시글의 요약 내용.
     *
     * @title 게시글 요약 내용.
     */
    description: string;

    /**
     * 네이버 카페 게시글이 있는 카페의 이름.
     *
     * @title 게시글이 있는 카페 이름.
     */
    cafename: string;

    /**
     * 네이버 카페 게시글이 있는 카페의 링크.
     *
     * @title 게시글이 있는 카페 링크.
     */
    cafeurl: string;
  }

  /**
   * @title 네이버 블로그 검색 데이터
   */
  export interface IBlogNaverItemOutput {
    /**
     * 네이버 블로그 게시물의 제목.
     *
     * @title 게시글 제목.
     */
    title: string;

    /**
     * 네이버 블로그 게시물의 링크.
     *
     * @title 게시글 링크.
     */
    link: string;

    /**
     * 네이버 블로그 게시물의 요약 내용.
     *
     * @title 게시글 요약 내용.
     */
    description: string;

    /**
     * 네이버 블로그 게시물이 있는 블로그의 이름.
     *
     * @title 블로그 포스트가 있는 블로그의 이름.
     */
    bloggername: string;

    /**
     * 네이버 블로그 게시물이 있는 블로그의 주소.
     *
     * @title 블로그 포스트가 있는 블로그의 주소.
     */
    bloggerlink: string;

    /**
     * 네이버 블로그 게시물이 작성된 날짜.
     *
     * @title 블로그 포스트가 작성된 날짜.
     */
    postdate: string;
  }

  /**
   * @title 네이버 카페 검색 결과
   */
  export interface ICafeNaverOutput {
    /**
     *  네이버 카페 검색 결과물 데이터.
     *
     * @title 네이버 카페 검색 결과물 데이터.
     */
    data: {
      /**
       * 검색 결과를 생성한 시간입니다.
       *
       * @title 검색 결과를 생성한 시간.
       */
      lastBuildDate: string;

      /**
       * 검색 결과의 총 개수입니다.
       *
       * @title 총 검색 결과 개수.
       */
      total: number;

      /**
       * 검색 결과의 시작 위치입니다.
       *
       * @title 검색 시작 위치.
       */
      start: number;

      /**
       * 한 번에 표시할 검색 결과의 개수입니다.
       *
       * @title 한 번에 표시할 검색 결과 개수.
       */
      display: number;

      /**
       * 개별 검색 결과입니다.
       *
       * @title 개별 검색 결과.
       */
      items: ICafeNaverItemOutput[];
    };
  }

  /**
   * @title 네이버 블로그 검색 결과
   */
  export interface IBlogNaverOutput {
    /**
     * 검색 결과를 생성한 시간입니다.
     *
     * @title 검색 결과를 생성한 시간.
     */
    lastBuildDate: string;

    /**
     * 검색 결과의 총 개수입니다.
     *
     * @title 총 검색 결과 개수.
     */
    total: number;

    /**
     * 검색 결과의 시작 위치입니다.
     *
     * @title 검색 시작 위치.
     */
    start: number;

    /**
     * 한 번에 표시할 검색 결과의 개수입니다.
     *
     * @title 한 번에 표시할 검색 결과 개수.
     */
    display: number;

    /**
     * 개별 검색 결과입니다.
     *
     * @title 개별 검색 결과.
     */
    items: IBlogNaverItemOutput[];
  }

  export interface INewsNaverOutput {
    /**
     * 검색 결과를 생성한 시간입니다.
     *
     * @title 검색 결과를 생성한 시간.
     */
    lastBuildDate: string & tags.Format<"date-time">;

    /**
     * 검색 결과의 총 개수입니다.
     *
     * @title 총 검색 결과 개수.
     */
    total: number;

    /**
     * 검색 결과의 시작 위치입니다.
     *
     * @title 검색 시작 위치.
     */
    start: number;

    /**
     * 한 번에 표시할 검색 결과의 개수입니다.
     *
     * @title 한 번에 표시할 검색 결과 개수.
     */
    display: number;

    /**
     * 개별 검색 결과입니다.
     *
     * @title 개별 검색 결과.
     */
    items: INewsNaverItemOutput[];
  }

  /**
   * @title 네이버 뉴스 검색 데이터
   */
  export interface INewsNaverItemOutput {
    /**
     * 뉴스 제목.
     *
     * @title 제목
     */
    title: string;

    /**
     * 네이버 뉴스 URL.
     *
     * @title 네이버 뉴스 URL
     */
    link: string & tags.Format<"uri">;

    /**
     * 뉴스 기사 원문 URL.
     *
     * @title 원문 URL
     */
    originallink: string & tags.Format<"uri">;

    /**
     * 검색어와 일치하는 부분은 <b> 태그로 감싸져 있습니다.
     *
     * @title 뉴스 기사의 내용 요약
     */
    description: string;

    /**
     * 뉴스 기사가 네이버에 제공된 시간.
     *
     * @title 뉴스 기사 발행 시간
     */
    pubDate: string & tags.Format<"date-time">;
  }
}
