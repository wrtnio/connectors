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
    text: string;
    images: IImage[];
    metadata?: IMetadata;
    paginationGroups: {
      identifier: string[]; // 각 페이지네이션 그룹의 식별자
      pages: IPage[];
    }[];
  }

  export interface IMetadata {
    title?: string;
    description?: string;
    author?: string;
    publishDate?: string;
    [key: string]: any;
  }

  export interface IPage {
    classNames: string[];
    url: string;
    text: string;
    res_json?: any;
    images: IImage[];
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

  export interface IXHR {
    url: string;
    method: string;
    body: string;
    headers?: Record<string, string>;
    timestamp: number; // 요청이 발생한 시간
    responseStatus?: number;
  }
}
