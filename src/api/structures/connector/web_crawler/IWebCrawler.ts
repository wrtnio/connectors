import { tags } from "typia";

export namespace IWebCrawler {
  /**
   * @title Request to crawl a web page
   */
  export interface IRequest {
    /**
     * @title Target URL to crawl
     */
    url: string;

    rawContent: boolean;

    /**
     * @title Wait for a CSS selector to appear before returning content. (not required)
     */
    wait_for?: string;

    pagination?: {
      followNextPage: boolean;

      /**
       * 기본 10.
       */
      followNextPageCount?: number;
    };
  }

  /**
   * @title Response from crawled web page
   */
  export interface IResponse {
    pages: IPage[];
    summary: ISummary;
  }

  export interface IPage {
    url: string;
    index: number; // 페이지 순서
    content: {
      text: string; // 핵심 텍스트 컨텐츠
      images: IImage[];
      metadata?: {
        title?: string;
        description?: string;
        author?: string;
        publishDate?: string;
        [key: string]: any; // 기타 메타데이터는 유연하게 수집
      };
    };

    rawContent: string | null; // 필요한 경우 원본 HTML애서 text만 뽑아 전달

    pagination: IPagination;
  }

  export interface ISummary {
    totalPages: number;
    timestamp: string;
    hasMore: boolean;
    pagination: IPagination;
  }

  export interface IImage {
    id?: string; // 이미지의 id 속성
    url: string; // 이미지 URL
    alt?: string; // 이미지 설명
    classNames: string[]; // 이미지에 할당된 클래스 배열
    parentClassNames?: string[]; // 부모 요소의 클래스 배열
  }

  export interface IPagination {
    type: PaginationType;
    currentPage?: number;
    hasNextPage: boolean;
    nextPageUrl?: string;
    // 발견된 페이지네이션 패턴 (있는 경우)
    pattern?: {
      baseUrl: string;
      queryParam?: string; // e.g., "page", "offset"
      fragment?: string; // e.g., "#page-2"
    };
  }

  export type PaginationType =
    | "numbered"
    | "infinite-scroll"
    | "load-more"
    | null;
}
