import { Cheerio, CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";

export namespace PaginationLoadMoreExtractor {
  export const loadMoreSelectors = [
    // 버튼 텍스트 기반
    'button:contains("load more")',
    'button:contains("show more")',
    'button:contains("view more")',
    'button:contains("see more")',
    'a:contains("load more")',
    'a:contains("show more")',
    'a:contains("view more")',
    'a:contains("see more")',

    // 클래스/ID 기반
    '[class*="load-more"]',
    '[class*="show-more"]',
    '[class*="view-more"]',
    '[id*="load-more"]',
    '[id*="show-more"]',
    "#loadMore",
    "#showMore",

    // 데이터 속성
    "[data-load-more]",
    "[data-more]",
    '[data-action="load-more"]',

    // 다국어 지원
    'button:contains("상품정보더보기")',
    'button:contains("もっと見る")',
    'button:contains("查看更多")',
    'button:contains("显示更多")',
    'button:contains("Показать еще")',
    'button:contains("Mehr anzeigen")',
    'button:contains("Voir plus")',

    'button:contains("Ver más")',
    'button:contains("Mostrar mais")',

    // 무신사 후기 더보기 버튼 관련 셀렉터
    ".GoodsReviewListFilterSection__FilterContainer-sc-7s7w6h-1",
    ".GoodsReviewTabGroup__Container-sc-gh2o5q-0",
    ".GoodsReviewStaticList__Container-sc-2iel5v-0",
    ".GoodsReviewListSection__Container-sc-1x35scp-0",
    ".GoodsReviewMoreButton__Wrapper-sc-dgupoo-0",
    '[data-shp-area="revlist.pgn"]',
    '[class*="GoodsReview"]', // GoodsReview로 시작하는 모든 클래스
  ];

  export const isLoadMore = ($element: Cheerio<any>): boolean => {
    const hasLoadMoreButton = loadMoreSelectors.some(
      (selector) => $element.find(selector).length > 0,
    );

    const hasLoadMoreAPI = hasLoadMoreAPICalls($element);
    const hasLoadingState = Boolean(
      $element.find(
        '[class*="loading"]:not(.hidden), [class*="spinner"]:not(.hidden)',
      ).length,
    );

    return hasLoadMoreButton || (hasLoadMoreAPI && hasLoadingState);
  };

  const hasLoadMoreAPICalls = ($element: Cheerio<any>): boolean => {
    const scriptContent = $element
      .find("script")
      .map(function () {
        return $element.text();
      })
      .get()
      .join(" ");

    const loadMorePatterns = [
      /loadMore/i,
      /load_more/i,
      /load-more/i,
      /showMore/i,
      /fetchMore/i,
      /getMore/i,
    ];

    return loadMorePatterns.some((pattern) => pattern.test(scriptContent));
  };

  export const handleLoadMore = async (
    $: CheerioAPI,
    currentUrl: string,
  ): Promise<IWebCrawler.IPagination> => {
    const loadMoreInfo = findLoadMoreButton($);
    let pattern: IWebCrawler.IPagination["pattern"] | undefined;

    if (loadMoreInfo.button) {
      pattern = extractAPIPatternFromElement(loadMoreInfo.button);
    }

    if (!pattern && loadMoreInfo.nextUrl) {
      pattern = {
        baseUrl: new URL(currentUrl).origin,
        queryParam: new URL(loadMoreInfo.nextUrl, currentUrl).searchParams.has(
          "page",
        )
          ? "page"
          : "offset",
      };
    }

    return {
      type: "load-more",
      hasNextPage: loadMoreInfo.found,
      nextPageUrl: loadMoreInfo.nextUrl,
      pattern: pattern,
      currentPage: undefined,
    };
  };

  const getNextUrl = (button: Cheerio<any>): string | undefined => {
    return (
      button.attr("href") ||
      button.attr("data-url") ||
      button.data("next-page")?.toString() ||
      button.parent("a").attr("href")
    );
  };

  const findLoadMoreButton = (
    $: CheerioAPI,
  ): {
    found: boolean;
    button?: Cheerio<any>;
    nextUrl?: string;
  } => {
    const loadMoreSelectors = [
      'button:contains("더보기")',
      'button:contains("load more")',
      '[class*="load-more"]',
      "[data-load-more]",
      'a:contains("더보기")',
      'a:contains("load more")',
      '[role="button"]:contains("more")',
    ];

    for (const selector of loadMoreSelectors) {
      const button = $(selector);
      if (button.length) {
        return {
          found: true,
          button,
          nextUrl: getNextUrl(button),
        };
      }
    }

    return { found: false };
  };

  const extractAPIPatternFromElement = (
    $el: Cheerio<any>,
  ): IWebCrawler.IPagination["pattern"] | undefined => {
    const dataAttributes = [
      "data-api",
      "data-url",
      "data-endpoint",
      "data-action",
      "data-source",
    ];

    const urlAttributes = ["href", "action", ...dataAttributes];
    const endpoint = urlAttributes
      .map((attr) => $el.attr(attr))
      .find((value) => {
        if (!value) return false;
        return (
          value.includes("/api/") ||
          value.includes("/endpoint/") ||
          value.match(/https?:\/\/[^/]+\/api\//)
        );
      });

    if (!endpoint) return undefined;

    const paramAttributes = [
      "data-param",
      "data-parameter",
      "data-key",
      "data-query",
    ];
    const queryParam = paramAttributes
      .map((attr) => $el.attr(attr))
      .find(Boolean);

    try {
      const url = new URL(endpoint);
      return {
        baseUrl: url.origin + url.pathname,
        queryParam:
          queryParam ||
          Array.from(url.searchParams.keys()).find((param) =>
            ["page", "offset", "cursor"].includes(param),
          ),
      };
    } catch {
      return {
        baseUrl: endpoint,
        queryParam,
      };
    }
  };
}
