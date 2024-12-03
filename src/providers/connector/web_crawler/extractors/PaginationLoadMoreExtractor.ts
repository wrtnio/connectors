import { Cheerio, CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";

export namespace PaginationLoadMoreExtractor {
  export const isLoadMore = ($: CheerioAPI): boolean => {
    const loadMoreSelectors = [
      // 버튼 텍스트 기반
      'button:contains("더보기")',
      'button:contains("load more")',
      'button:contains("show more")',
      'button:contains("view more")',
      'button:contains("see more")',
      'a:contains("더보기")',
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

      // WAI-ARIA 속성
      '[aria-label*="load more" i]',
      '[aria-label*="show more" i]',
      '[role="button"]:contains("more")',

      // 다국어 지원
      'button:contains("더보기")',
      'button:contains("もっと見る")',
      'button:contains("查看更多")',
      'button:contains("显示更多")',
      'button:contains("Показать еще")',
      'button:contains("Mehr anzeigen")',
      'button:contains("Voir plus")',
      'button:contains("Ver más")',
      'button:contains("Mostrar mais")',
    ];

    // 버튼 요소 존재 확인
    const hasLoadMoreButton = loadMoreSelectors.some(
      (selector) => $(selector).length > 0,
    );

    // API/Script 패턴 확인
    const hasLoadMoreAPI = hasLoadMoreAPICalls($);

    // 로딩 상태 요소 확인
    const hasLoadingState = Boolean(
      $('[class*="loading"]:not(.hidden), [class*="spinner"]:not(.hidden)')
        .length,
    );

    return hasLoadMoreButton || (hasLoadMoreAPI && hasLoadingState);
  };

  const hasLoadMoreAPICalls = ($: CheerioAPI): boolean => {
    const scriptContent = $("script")
      .map((_, el) => $(el).html())
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
