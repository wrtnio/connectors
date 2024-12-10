import { Cheerio, CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { PaginationInfiniteExtractor } from "./PaginationInfiniteExtractor";
import { PaginationNumberExtractor } from "./PaginationNumberExtractor";
import { PaginationLoadMoreExtractor } from "./PaginationLoadMoreExtractor";

export namespace CommonExtractor {
  const hasPageContent = ($element: Cheerio<any>): boolean => {
    const contentList = $element.find('[class*="feed__list"]');
    if (!contentList.length) return false;

    const paginator = $element.find('[class*="paginator"]');
    return paginator.length > 0;
  };

  export const findPaginationElements = async (
    $: CheerioAPI,
  ): Promise<Cheerio<any>[]> => {
    const paginatorSelectors = [
      ...PaginationInfiniteExtractor.scriptSelectors,
      ...PaginationInfiniteExtractor.infiniteScrollSelectors,
      ...PaginationLoadMoreExtractor.loadMoreSelectors,
      ...PaginationNumberExtractor.paginationSelectors,
    ];

    const listSelectors = [
      '[class*="list"]',
      '[class*="items"]',
      '[class*="feed"]',
      '[class*="review"]', // 리뷰 관련 클래스
      "ul",
      "ul:nth-child(1)",
      "ul:nth-child(2)",
      "ol",
      '[role="list"]',
      '[class*="grid"]',
    ];

    const excludeSelectors = ['[class="_spi_lst spi_list"]'];
    const containerSelectors = ["section", "div"];

    const sections: Cheerio<any>[] = []; // 모든 컨테이너 셀렉터에 대해 한 번의 로직으로 처리

    containerSelectors.forEach((containerSelector) => {
      $(containerSelector).each((_, element) => {
        const $element = $(element);

        // 페이지네이터 존재 여부 확인
        const hasPaginator = paginatorSelectors.some((selector) => {
          const req = $element.find(selector).length > 0;

          if (req) {
            console.log("selector", selector);
          }
          return req;
        });

        if (!hasPaginator) return;

        // 리스트 존재 여부 확인
        const hasList = listSelectors.some(
          (selector) => $element.find(selector).length > 0,
        );

        // // 제외할 요소 확인
        // const hasExclude = excludeSelectors.some(
        //   (selector) => $element.find(selector).length > 0,
        // );

        if (hasList) {
          sections.push($element);

          excludeSelectors.map((selector) => {
            $element.find(selector).remove();
          });
        }
      });
    });

    return sections;
  };

  export const detectPaginationType = async (
    $element: Cheerio<any>,
  ): Promise<{
    type: IWebCrawler.PaginationType;
    $element: Cheerio<any>;
  } | null> => {
    if (PaginationInfiniteExtractor.isInfiniteScroll($element)) {
      return {
        type: "infinite-scroll",
        $element: $element,
      };
    }

    if (PaginationNumberExtractor.isNumberedPagination($element)) {
      return {
        type: "numbered",
        $element: $element,
      };
    }

    if (PaginationLoadMoreExtractor.isLoadMore($element)) {
      return {
        type: "load-more",
        $element: $element,
      };
    }

    return null;
  };

  export const extractPaginationInfo = async (
    $element: Cheerio<any>,
    type: IWebCrawler.PaginationType,
  ): Promise<IWebCrawler.IPagination> => {
    const pagination: IWebCrawler.IPagination = {
      type,
      hasNextPage: false,
    };

    return pagination;
  };

  const extractPaginationPattern = (
    url: string,
  ): IWebCrawler.IPagination["pattern"] => {
    try {
      const urlObj = new URL(url);
      return {
        baseUrl: `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`,
        queryParam: urlObj.searchParams.has("page")
          ? "page"
          : urlObj.searchParams.has("p")
            ? "p"
            : undefined,
        fragment: urlObj.hash || undefined,
      };
    } catch {
      return {
        baseUrl: url,
      };
    }
  };
}
