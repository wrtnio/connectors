import { Cheerio, CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { ApiExtractor } from "./ApiExtractor";

export namespace PaginationInfiniteExtractor {
  export const infiniteScrollSelectors = [
    // 클래스 기반 셀렉터
    '[class*="infinite"]',
    '[class*="endless"]',
    '[class*="load-more"]',
    '[class*="continuous"]',
    '[class*="scroll-load"]',
    "[data-infinite]",

    // 데이터 속성
    "[data-infinite-scroll]",
    "[data-endless-scroll]",
    "[data-continuous-scroll]",
    "[data-scroll-loading]",

    // 일반적인 컨테이너
    ".infinite-container",
    ".infinite-wrapper",
    ".scroll-container",
    ".stream-container",
  ];

  // 스크립트 기반 감지
  export const scriptSelectors = [
    // IntersectionObserver 사용 감지
    'script:contains("IntersectionObserver")',
    // 일반적인 무한 스크롤 라이브러리 감지
    'script:contains("infinite-scroll")',
    'script:contains("infiniteScroll")',
    'script[src*="infinite-scroll"]',
    'script[src*="ias.min.js"]',
    // 스크롤 이벤트 리스너 감지
    'script:contains("scroll")',
    'script:contains("scrollTop")',
    'script:contains("scrollHeight")',
    // 커스텀 스크롤 관련 함수 감지
    'script:contains("loadMore")',
    'script:contains("fetchMore")',
    'script:contains("getNextPage")',
  ];

  export const isInfiniteScroll = ($element: Cheerio<any>): boolean => {
    return (
      infiniteScrollSelectors.some(
        (selector) => $element.find(selector).length > 0,
      ) ||
      scriptSelectors.some((selector) => $element.find(selector).length > 0) ||
      hasScrollEventHandlers($element)
    );
  };

  const hasScrollEventHandlers = ($element: Cheerio<any>): boolean => {
    const hasSentinel =
      $element.find(
        '[class*="sentinel"], [class*="observer"], [class*="waypoint"]',
      ).length > 0;

    const hasLoadingIndicator =
      $element.find(
        '[class*="loading"], [class*="spinner"], .loader:not(.hidden)',
      ).length > 0;

    const scripts = $element
      .find("script")
      .map((_, el) => el.name || "")
      .get()
      .filter(Boolean);

    const hasScrollScript = scripts.some(
      (script) =>
        script?.includes("addEventListener('scroll'") ||
        script?.includes('addEventListener("scroll"') ||
        script?.includes("onscroll") ||
        script?.includes(".on('scroll'") ||
        script?.includes('.on("scroll"'),
    );

    return hasSentinel || (hasLoadingIndicator && hasScrollScript);
  };

  export const handleInfiniteScroll = async (
    $: CheerioAPI,
  ): Promise<IWebCrawler.IPagination> => {
    const containerInfo = findInfiniteScrollContainer($);
    const apiPattern = ApiExtractor.detectAPIPattern($).pattern;

    const basePattern = apiPattern || extractScrollPattern($);

    return {
      type: "infinite-scroll",
      hasNextPage: containerInfo.found,
      pattern: basePattern,
      currentPage: undefined,
    };
  };

  const findInfiniteScrollContainer = (
    $: CheerioAPI,
  ): { found: boolean; container?: Cheerio<any> } => {
    const infiniteScrollSelectors = [
      '[class*="infinite"]',
      '[class*="infinite-scroll"]',
      "[data-infinite-scroll]",
      ".scroll-container",
      "#infinite-content",
      '[role="feed"]',
    ];

    for (const selector of infiniteScrollSelectors) {
      if ($(selector).length) {
        return { found: true, container: $(selector) };
      }
    }

    return { found: false };
  };

  const extractScrollPattern = (
    $: CheerioAPI,
  ): IWebCrawler.IPagination["pattern"] | undefined => {
    const scripts = $("script")
      .map((_, el) => $(el).html())
      .get()
      .filter(Boolean);

    // API endpoint 패턴 찾기
    const endpointPattern = /['"`](\/api\/[\w\/-]+|https?:\/\/[^'"`]+)['"`]/;
    const configPattern = /api:\s*{[^}]*url:\s*['"`]([^'"`]+)['"`]/;

    for (const script of scripts) {
      // API endpoint 찾기
      const endpointMatch = script?.match(endpointPattern);
      if (endpointMatch) {
        const url = endpointMatch[1];
        return {
          baseUrl: url,
          queryParam: findQueryParameter(script || "", url),
        };
      }

      // API 설정 객체 찾기
      const configMatch = script?.match(configPattern);
      if (configMatch) {
        const url = configMatch[1];
        return {
          baseUrl: url,
          queryParam: findQueryParameter(script || "", url),
        };
      }
    }

    return undefined;
  };

  const findQueryParameter = (
    script: string,
    url: string,
  ): string | undefined => {
    const paramPatterns = [
      /pageParam:\s*['"`](\w+)['"`]/,
      /param:\s*['"`](\w+)['"`]/,
      /cursor:\s*['"`](\w+)['"`]/,
    ];

    for (const pattern of paramPatterns) {
      const match = script.match(pattern);
      if (match) return match[1];
    }

    try {
      const urlObj = new URL(url, "http://example.com");
      return Array.from(urlObj.searchParams.keys()).find((param) =>
        ["page", "offset", "cursor", "start"].includes(param),
      );
    } catch {
      return undefined;
    }
  };
}
