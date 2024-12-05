export namespace IWebCrawler {
  /**
   * @title Request to crawl a web page
   */
  export interface IRequest {
    /**
     * @title Target URL to crawl
     */
    url: string;

    /**
     * @title Wait for a CSS selector to appear before returning content. (not required)
     */
    wait_for?: string;

    /**
     * 페이지네이션을 따라가는 옵션
     */
    pagination?: {
      /**
       * 페이지네이션이 발견되었을 경우 페이지네이션을 따라가는 옵션.
       */
      followNextPage: boolean;

      /**
       * 페이지네이션을 따라가는 최대 페이지 수. (기본 10).
       */
      followNextPageCount?: number;
    };
  }

  /**
   * @title Response from crawled web page
   */
  export interface IResponse {
    /**
     * 페이지네이션 처리가 안된 컴포넌트의 텍스트 정보
     */
    text: string;

    /**
     * 페이지네이션 처리가 안된 컴포넌트의 이미지 정보
     */
    images: IImage[];

    /**
     * 페이지네이션 처리가 안된 사이트의 메타데이터 정보
     */
    metadata?: IMetadata;

    /**
     * 페이지네이션 처리 된 컴포넌트의 정보의 배열
     */
    paginationGroups: {
      /**
       * 페이지네이션 그룹의 식별자 (html 의 section 의 id 와 같은 역할)
       */
      identifier: string[]; // 각 페이지네이션 그룹의 식별자

      /**
       * 페이지네이션 된 컴포넌트의 각 페이지 정보.
       */
      pages: IPage[];
    }[];
  }

  /**
   * @title Metadata of a web page
   */
  export interface IMetadata {
    /**
     * @title Title of the web page
     */
    title?: string;

    /**
     * @title Description of the web page
     */
    description?: {
      text?: string;
      images?: IImage[];
    };

    /**
     * @title Author of the web page
     */
    author?: string;

    /**
     * @title Published date of the web page
     */
    publishDate?: string;

    /**
     * 정규화 되지 않은 데이터
     */
    [key: string]: any;
  }

  /**
   * 페이지네이션된 데이터의 페이지 별 데이터 정보
   */
  export interface IPage {
    /**
     * 페이지네이션된 데이터의 페이지 별 클래스 정보
     */
    classNames: string[];

    /**
     * 페이지네이션 된 데이터의 URL 정보
     */
    url: string;

    /**
     * 페이지네이션된 페이지의 엘리먼트 데이터 정보
     */
    data: IData[];

    /**
     * 페이지네이션이 XHR 요청을 통해 이루어진 경우, 해당 요청의 응답 정보
     */
    res_json?: any;

    /**
     * 페이지네이션된 데이터의 메타데이터 정보
     */
    pagination: IPagination;
  }

  export interface IData {
    /**
     * 페이지네이션된 페이지의 엘리먼트의 텍스트 정보
     */
    text: string;

    /**
     * 페이지네이션된 페이지의 엘리먼트의 이미지 정보
     */
    images: IImage[];
  }

  export interface IImage {
    id?: string; // 이미지의 id 속성
    url: string; // 이미지 URL
    alt?: string; // 이미지 설명
    classNames: string[]; // 이미지에 할당된 클래스 배열
    parentClassNames?: string[]; // 부모 요소의 클래스 배열
  }

  export interface IPagination {
    /**
     * 페이지네이션의 타입
     */
    type: PaginationType;

    /**
     * 페이지네이션의 현재 페이지 번호
     */
    currentPage?: number;

    /**
     * 다음 페이지 존제 여부
     */
    hasNextPage: boolean;

    /**
     * 다음 페이지 URL (XHR 요청을 통해 페이지네이션이 이루어진 경우)
     */
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

  /**
   * ZENROWS 를 사용해 응답받은 정보.
   */
  export interface IFetch {
    /**
     * @title HTML content of the page
     */
    html: string;

    /**
     * XHR 요청 정보.
     */
    xhr: IWebCrawler.IXHR[];
  }

  export interface IXHR {
    url: string;
    method: string;
    body: string;
    headers?: Record<string, string>;
    timestamp: number; // 요청이 발생한 시간
    responseStatus?: number;
  }
}
