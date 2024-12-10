import { Cheerio, CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { PaginationInfiniteExtractor } from "./PaginationInfiniteExtractor";
import { PaginationNumberExtractor } from "./PaginationNumberExtractor";
import { PaginationLoadMoreExtractor } from "./PaginationLoadMoreExtractor";

export namespace CommonExtractor {
  export const findPaginationElements = async (
    $: CheerioAPI,
  ): Promise<
    Array<{
      type: IWebCrawler.PaginationType;
      $element: Cheerio<any>;
    }>
  > => {
    const paginatorSelectors = [
      ...PaginationNumberExtractor.paginationSelectors,
      ...PaginationInfiniteExtractor.scriptSelectors,
      ...PaginationInfiniteExtractor.infiniteScrollSelectors,
      ...PaginationLoadMoreExtractor.loadMoreSelectors,
    ];

    const result: Array<{
      type: IWebCrawler.PaginationType;
      $element: Cheerio<any>;
    }> = [];

    console.log("Full HTML:", $.html()); // 전체 HTML 출력
    const reviews = $("contents");

    console.log(reviews);

    $("body")
      .find("*")
      .each((_, element) => {
        const $element = $(element);

        const hasPaginator = paginatorSelectors.some((selector) => {
          const req = $element.find(selector).length > 0;
          if (req) {
            console.log("selector", selector);
          }
          return req;
        });

        if (!hasPaginator) return;

        // 타입 감지 로직
        if (PaginationInfiniteExtractor.isInfiniteScroll($element)) {
          result.push({
            type: "infinite-scroll",
            $element,
          });
        } else if (PaginationNumberExtractor.isNumberedPagination($element)) {
          result.push({
            type: "numbered",
            $element,
          });
        } else if (PaginationLoadMoreExtractor.isLoadMore($element)) {
          result.push({
            type: "load-more",
            $element,
          });
        }
      });

    return result;
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

  export const getItemSelector = (url: string): string => {
    if (url.includes("youtube.com")) return "ytd-comment-thread-renderer";
    if (url.includes("oliveyoung.co.kr")) return "li";
    if (url.includes("coupang.com"))
      return 'article[class*="sdp-review__article__list"]';
    // 기타 사이트들...
    return "li"; // 기본값
  };
}
