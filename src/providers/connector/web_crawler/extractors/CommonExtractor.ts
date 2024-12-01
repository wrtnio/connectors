import { Cheerio, CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";

export namespace CommonExtractor {
  export const extractImages = async (
    $: CheerioAPI,
  ): Promise<IWebCrawler.IImage[]> => {
    const images: IWebCrawler.IImage[] = [];

    $("img").each((_, element) => {
      const $img = $(element);
      const $parent = $img.parent();
      const url = $img.attr("src");

      if (url) {
        images.push({
          id: $img.attr("id"),
          url,
          alt: $img.attr("alt"),
          classNames: ($img.attr("class") || "").split(/\s+/).filter(Boolean),
          parentClassNames: ($parent.attr("class") || "")
            .split(/\s+/)
            .filter(Boolean),
        });
      }

      // 작은 이미지나 장식용 이미지 제거
      if (
        Number($img.attr("width")) < 100 ||
        Number($img.attr("height")) < 100 ||
        $img.attr("role") === "presentation"
      ) {
        $img.remove();
      }
    });
    return images;
  };

  const detectPaginationType = async (
    $: CheerioAPI,
  ): Promise<IWebCrawler.PaginationType> => {
    // 1. Infinite Scroll 감지
    if (
      $('[class*="infinite"]').length > 0 ||
      $('[class*="load-more"]').length > 0
    ) {
      return "infinite-scroll";
    }

    // 2. 일반적인 페이지네이션 버튼
    if (
      $('a[href*="page="]').length > 0 ||
      $('a[href*="offset="]').length > 0 ||
      $(".pagination").length > 0
    ) {
      return "numbered";
    }

    // 3. "더보기" 버튼
    if (
      $('button:contains("더보기"), button:contains("load more")').length > 0
    ) {
      return "load-more";
    }

    return null;
  };

  const handleNumberedPagination = async (
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

  // 다음 페이지 정보를 찾는 함수를 분리
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
      ".paging" /* ... */,
    ];

    for (const selector of paginationSelectors) {
      const container = $(selector);
      if (!container.length) continue;

      const currentPageElement = findCurrentPageElement($, container.text());
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

  const handleInfiniteScroll = async (
    $: CheerioAPI,
  ): Promise<IWebCrawler.IPagination> => {
    const containerInfo = findInfiniteScrollContainer($);
    const apiInfo = extractAPIPatternFromScripts($);

    return {
      type: "infinite-scroll",
      hasNextPage: containerInfo.found,
      pattern: apiInfo
        ? {
            baseUrl: apiInfo.endpoint,
            queryParam: apiInfo.param,
          }
        : undefined,
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
    ];

    for (const selector of infiniteScrollSelectors) {
      const container = $(selector);
      if (container.length) {
        return { found: true, container };
      }
    }

    return { found: false };
  };

  const handleLoadMore = async (
    $: CheerioAPI,
    currentUrl: string,
  ): Promise<IWebCrawler.IPagination> => {
    const loadMoreInfo = findLoadMoreButton($);
    const apiPattern = loadMoreInfo.button
      ? extractAPIPatternFromElement(loadMoreInfo.button)
      : undefined;

    return {
      type: "load-more",
      hasNextPage: loadMoreInfo.found,
      nextPageUrl: loadMoreInfo.nextUrl,
      pattern:
        apiPattern ||
        (loadMoreInfo.nextUrl
          ? {
              baseUrl: new URL(currentUrl).origin,
              queryParam: new URL(
                loadMoreInfo.nextUrl,
                currentUrl,
              ).searchParams.get("page")
                ? "page"
                : "offset",
            }
          : undefined),
    };
  };

  const getNextUrl = (button: Cheerio<any>): string | undefined => {
    const href = button.attr("href");
    if (href) return href;

    const dataUrl = button.attr("data-url");
    if (dataUrl) return dataUrl;

    const nextPage = button.data("next-page");
    if (typeof nextPage === "string") return nextPage;

    const parentHref = button.parent("a").attr("href");
    if (parentHref) return parentHref;

    return undefined;
  };

  const findLoadMoreButton = (
    container: CheerioAPI,
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
    ];

    for (const selector of loadMoreSelectors) {
      const button = container(selector);
      if (button.length) {
        const nextUrl = getNextUrl(button);
        return {
          found: true,
          button,
          nextUrl,
        };
      }
    }

    return { found: false };
  };

  export const extractPaginationInfo = async (
    $: CheerioAPI,
    currentUrl: string,
    type?: IWebCrawler.PaginationType,
  ): Promise<IWebCrawler.IPagination> => {
    const detectType: IWebCrawler.PaginationType =
      type ?? (await detectPaginationType($));

    switch (type) {
      case "numbered":
        return await handleNumberedPagination($, currentUrl);
      case "infinite-scroll":
        return await handleInfiniteScroll($);
      case "load-more":
        return await handleLoadMore($, currentUrl);
      default:
        return {
          type: detectType,
          hasNextPage: false,
        };
    }
  };

  const detectHTMLPaginationPattern = (
    $: CheerioAPI,
  ): IWebCrawler.IPagination["pattern"] | undefined => {
    // 페이지네이션 엘리먼트 찾기
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

      // 페이지네이션 링크들 분석
      const links = paginationElement
        .find("a")
        .map((_, el) => $(el).attr("href"))
        .get()
        .filter(Boolean); // undefined/null 제거

      if (links.length === 0) continue;

      // 기준이 될 수 있는 첫 번째 유효한 URL 찾기
      const validUrls = links.filter((link) => !link.startsWith("#"));
      if (validUrls.length === 0) continue;

      const baseUrl = new URL(validUrls[0]).origin;

      // URL들의 패턴 분석
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

      return {
        baseUrl,
        queryParam,
        fragment: fragments[0] || undefined,
      };
    }

    return undefined;
  };

  const extractAPIPatternFromScripts = (
    $: CheerioAPI,
  ): {
    endpoint: string;
    param?: string;
  } | null => {
    const scriptContents = $("script")
      .map((_, el) => $(el).html())
      .get()
      .filter(Boolean);

    // API 관련 패턴들
    const apiPatterns = [
      // URL 패턴
      /['"`](\/api\/[^'"`]+|https?:\/\/[^'"`]+(?:api|service|endpoint)[^'"`]+)['"`]/,
      // 설정 객체 패턴
      /apiUrl['"]*:\s*['"`]([^'"`]+)['"`]/,
      /endpoint['"]*:\s*['"`]([^'"`]+)['"`]/,
      // Ajax URL 패턴
      /\$\.(?:get|post|ajax)\s*\(\s*['"`]([^'"`]+)['"`]/,
    ];

    // 파라미터 패턴들
    const paramPatterns = [
      /['"`](page|offset|cursor|start)['"`]\s*:/,
      /param['"]*:\s*['"`](page|offset|cursor|start)['"`]/,
      /data['"]*:\s*{[^}]*['"`](page|offset|cursor|start)['"`]/,
    ];

    for (const content of scriptContents) {
      // API 엔드포인트 찾기
      for (const pattern of apiPatterns) {
        const apiMatch = content.match(pattern);
        if (!apiMatch) continue;

        // 파라미터 찾기
        for (const paramPattern of paramPatterns) {
          const paramMatch = content.match(paramPattern);
          if (paramMatch) {
            return {
              endpoint: apiMatch[1],
              param: paramMatch[1],
            };
          }
        }

        // 파라미터를 못찾았더라도 엔드포인트는 반환
        return {
          endpoint: apiMatch[1],
        };
      }
    }

    return null;
  };

  const extractAPIPatternFromElement = (
    $el: Cheerio<any>,
  ): IWebCrawler.IPagination["pattern"] | undefined => {
    // API 관련 data 속성들
    const dataAttributes = [
      "data-api",
      "data-url",
      "data-endpoint",
      "data-action",
      "data-source",
    ];

    // URL을 찾을 수 있는 속성들
    const urlAttributes = ["href", "action", ...dataAttributes];

    // 엔드포인트 찾기
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

    // 파라미터 찾기
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

  const findCurrentPageElement = (
    container: CheerioAPI,
    containerSelector: string,
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

    // containerSelector를 기준으로 검색
    for (const selector of currentPageSelectors) {
      const element = container(`${containerSelector} ${selector}`);
      if (element.length) {
        // 숫자가 포함된 요소인지 확인
        const text = element.text().trim();
        if (/\d+/.test(text)) {
          return element;
        }
      }
    }

    // 대안: 링크가 아닌 숫자 요소 찾기
    const nonLinkNumbers = container(`${containerSelector} *`).filter(
      (_, el) => {
        const element = container(el);
        // 링크가 아니고
        const isNotLink = !element.is("a") && !element.parent().is("a");
        // 숫자를 포함하고
        const hasNumber = /\d+/.test(element.text().trim());

        // 주변 요소와 다른 스타일을 가진 경우
        const classAttr = element.attr("class");
        const hasDistinctStyle =
          classAttr !== undefined && classAttr.length > 0;

        return isNotLink && hasNumber && hasDistinctStyle;
      },
    );

    return nonLinkNumbers.first();
  };
}
