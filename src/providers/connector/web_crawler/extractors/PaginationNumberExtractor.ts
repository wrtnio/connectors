import { Cheerio, CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";

export namespace PaginationNumberExtractor {
  export const isNumberedPagination = ($: CheerioAPI): boolean => {
    const paginationSelectors = [
      // 기본 페이지네이션 구조
      ".pagination",
      ".paging",
      ".pager",
      '[role="navigation"]',
      'nav[aria-label*="pagination" i]',

      // URL 패턴 기반
      'a[href*="page="]',
      'a[href*="p="]',
      'a[href*="offset="]',
      'a[href*="start="]',
      'a[href*="/page/"]',

      // 일반적인 페이지 번호 컨테이너
      ".page-numbers",
      ".page-links",
      ".page-nav",

      // 특정 페이지네이션 컴포넌트
      '[class*="pagination"]',
      '[class*="paging"]',
      '[class*="paginator"]',
      "[data-pagination]",

      // 페이지 번호 표시 요소
      ".current-page",
      ".page-current",
      '[aria-current="page"]',
    ];

    // 숫자 기반 페이지네이션 확인
    const hasNumberedLinks = Boolean(
      $("a").filter(function () {
        const href = $(this).attr("href");
        const text = $(this).text().trim();
        // 숫자만 포함된 텍스트를 가진 링크이고
        // URL에 페이지 관련 파라미터가 있는 경우만 true 반환
        return (
          /^\d+$/.test(text) &&
          Boolean(href?.match(/(?:page|p|offset|start)=\d+|\/page\/\d+/i))
        );
      }).length,
    );

    // 이전/다음 네비게이션 확인
    const hasNavigation = Boolean(
      $("a, button").filter(function () {
        const text = $(this).text().toLowerCase();
        const hasNavigationText = Boolean(
          text.match(/prev|next|이전|다음|◀|▶|←|→/i),
        );
        const hasNavigationImage =
          $(this).find('img[alt*="prev" i], img[alt*="next" i]').length > 0;
        return hasNavigationText || hasNavigationImage;
      }).length,
    );

    return (
      paginationSelectors.some((selector) => $(selector).length > 0) ||
      hasNumberedLinks ||
      hasNavigation
    );
  };

  export const handleNumberedPagination = async (
    $: CheerioAPI,
    currentUrl: string,
  ): Promise<IWebCrawler.IPagination> => {
    const url = new URL(currentUrl);
    const pageParam = url.searchParams.get("page") || "1";
    const currentPage = parseInt(pageParam, 10);

    // 페이지네이션 정보 찾기
    const { nextPageUrl, hasNextPage } = findNextPageInfo($);
    const pattern = detectHTMLPaginationPattern($);

    return {
      type: "numbered",
      currentPage,
      hasNextPage,
      nextPageUrl,
      pattern,
    };
  };

  const findNextPageInfo = (
    $: CheerioAPI,
  ): { nextPageUrl?: string; hasNextPage: boolean } => {
    // 페이지네이션 컨테이너에서 찾기
    const paginationContainerResult = findInPaginationContainer($);
    if (paginationContainerResult.hasNextPage) {
      return paginationContainerResult;
    }

    // 명시적인 다음 페이지 링크에서 찾기
    const explicitNextResult = findExplicitNextLink($);
    if (explicitNextResult.hasNextPage) {
      return explicitNextResult;
    }

    return { hasNextPage: false };
  };

  const findInPaginationContainer = (
    $: CheerioAPI,
  ): { nextPageUrl?: string; hasNextPage: boolean } => {
    const paginationSelectors = [
      ".pagination",
      '[class*="pagination"]',
      ".paging",
      '[class*="paginator"]',
    ];

    for (const selector of paginationSelectors) {
      const container = $(selector);
      if (!container.length) continue;

      const currentPageElement = findCurrentPageElement($, container);
      if (currentPageElement.length) {
        const nextElement = currentPageElement.next("a");
        if (nextElement.length) {
          const nextUrl = nextElement.attr("href");
          if (nextUrl) {
            return { nextPageUrl: nextUrl, hasNextPage: true };
          }
        }
      }
    }

    return { hasNextPage: false };
  };

  const findExplicitNextLink = (
    $: CheerioAPI,
  ): { nextPageUrl?: string; hasNextPage: boolean } => {
    const nextPageSelectors = [
      'a[rel="next"]',
      ".next:not(.disabled)",
      ".next-page:not(.disabled)",
      'a:contains("다음"):not(.disabled)',
      'a:contains("Next"):not(.disabled)',
    ];

    for (const selector of nextPageSelectors) {
      const nextLink = $(selector).first();
      if (nextLink.length) {
        const nextUrl = nextLink.attr("href");
        if (nextUrl) {
          return { nextPageUrl: nextUrl, hasNextPage: true };
        }
      }
    }

    return { hasNextPage: false };
  };

  const findCurrentPageElement = (
    $: CheerioAPI,
    container: Cheerio<any>,
  ): Cheerio<any> => {
    const currentPageSelectors = [
      // 일반적인 active/current 클래스
      "a.active",
      "a.current",
      "span.active",
      "span.current",
      '[class*="active"]',
      '[class*="current"]',

      // ARIA 속성
      '[aria-current="page"]',
      '[aria-selected="true"]',

      // strong 태그 (한국 사이트에서 흔히 사용)
      "strong",

      // 선택된 페이지 스타일 클래스
      '[class*="selected"]',
      '[class*="on"]',
      '[class*="now"]',

      // 기타 일반적인 패턴
      ".page-item.active",
      ".pagination-current",
      '[class*="page-current"]',
    ];

    for (const selector of currentPageSelectors) {
      const element = container.find(selector);
      if (element.length) {
        const text = element.text().trim();
        if (/\d+/.test(text)) {
          return element;
        }
      }
    }

    // 대안: 링크가 아닌 숫자 요소 찾기
    return container
      .find("*")
      .filter(function () {
        const element = $(this);
        const isNotLink = !element.is("a") && !element.parent().is("a");
        const hasNumber = /\d+/.test(element.text().trim());
        const classAttr = element.attr("class");
        const hasDistinctStyle =
          classAttr !== undefined && classAttr.length > 0;

        return isNotLink && hasNumber && hasDistinctStyle;
      })
      .first();
  };

  const detectHTMLPaginationPattern = (
    $: CheerioAPI,
  ): IWebCrawler.IPagination["pattern"] | undefined => {
    const paginationSelectors = [
      ".pagination",
      '[class*="pagination"]',
      ".paging",
      '[class*="paging"]',
      'nav[role="navigation"]',
      '[class*="page-navigation"]',
    ];

    for (const selector of paginationSelectors) {
      const paginationElement = $(selector).first();
      if (!paginationElement.length) continue;

      const links = paginationElement
        .find("a")
        .map((_, el) => $(el).attr("href"))
        .get()
        .filter(Boolean);

      if (links.length === 0) continue;

      const validUrls = links.filter((link) => !link.startsWith("#"));
      if (validUrls.length === 0) continue;

      try {
        const baseUrl = new URL(validUrls[0]).origin;
        const queryParams = validUrls
          .map((url) => {
            const urlObj = new URL(url, baseUrl);
            return Array.from(urlObj.searchParams.keys());
          })
          .flat();

        // 가장 많이 사용된 쿼리 파라미터 찾기
        const paramCounts = queryParams.reduce(
          (acc, param) => {
            acc[param] = (acc[param] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        );

        const queryParam = Object.entries(paramCounts)
          .filter(([param]) => ["page", "p", "offset", "start"].includes(param))
          .sort(([, a], [, b]) => b - a)[0]?.[0];

        // fragment 패턴 확인
        const fragments = validUrls
          .map((url) => new URL(url, baseUrl).hash)
          .filter((hash) => hash.match(/#.*?(page|p)-(\d+)/));

        if (queryParam || fragments.length > 0) {
          return {
            baseUrl,
            queryParam,
            fragment: fragments[0],
          };
        }
      } catch {
        continue;
      }
    }

    return undefined;
  };
}
