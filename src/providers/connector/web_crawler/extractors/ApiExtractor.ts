import { CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";

export namespace ApiExtractor {
  const API_CONFIG_PATTERNS = [
    // REST API 설정
    /api:\s*{\s*url:\s*['"`]([^'"`]+)['"`].*?param(?:eter)?:\s*['"`]([^'"`]+)['"`]/s,
    // GraphQL 설정
    /graphql:\s*{\s*endpoint:\s*['"`]([^'"`]+)['"`]/,
    // 일반 API 설정
    /apiConfig:\s*{\s*baseUrl:\s*['"`]([^'"`]+)['"`].*?pageParam:\s*['"`]([^'"`]+)['"`]/s,
    // 페이지네이션 설정
    /pagination:\s*{\s*endpoint:\s*['"`]([^'"`]+)['"`].*?param:\s*['"`]([^'"`]+)['"`]/s,
  ];

  const API_CALL_PATTERNS = [
    // fetch API
    /fetch\s*\(\s*['"`]([^'"`]+)['"`][^)]*\)/,
    // axios
    /axios\s*\.\s*(get|post)\s*\(\s*['"`]([^'"`]+)['"`]/,
    // jQuery AJAX
    /\$\s*\.\s*(ajax|get|post)\s*\(\s*['"`]([^'"`]+)['"`]/,
    // XMLHttpRequest
    /\.open\s*\(\s*['"`](GET|POST)['"`]\s*,\s*['"`]([^'"`]+)['"`]/,
  ];

  const EVENT_PATTERNS = [
    // 스크롤 이벤트
    /scroll[^{]*{\s*(?:.*?)(fetch|axios|ajax).*?['"`]([^'"`]+)['"`]/s,
    // 버튼 클릭 이벤트
    /click[^{]*{\s*(?:.*?)(fetch|axios|ajax).*?['"`]([^'"`]+)['"`]/s,
    // Intersection Observer
    /IntersectionObserver[^{]*{\s*(?:.*?)(fetch|axios|ajax).*?['"`]([^'"`]+)['"`]/s,
  ];

  const COMMON_PAGE_PARAMS = ["page", "p", "offset", "cursor", "start", "from"];

  const findPageParameter = (url: URL): string | undefined => {
    return COMMON_PAGE_PARAMS.find((param) => url.searchParams.has(param));
  };

  const extractJSONConfig = (
    script: string,
  ): IWebCrawler.IPagination["pattern"] | null => {
    const jsonPattern = /{[^{}]*}/g;
    const matches = script.match(jsonPattern);

    if (!matches) return null;

    for (const match of matches) {
      try {
        const config = JSON.parse(match);
        if (
          config.api?.url ||
          config.endpoint ||
          config.baseUrl ||
          config.apiUrl
        ) {
          const url =
            config.api?.url ||
            config.endpoint ||
            config.baseUrl ||
            config.apiUrl;
          const param = config.pageParam || config.param || "page";
          return {
            baseUrl: url,
            queryParam: param,
          };
        }
      } catch {
        continue;
      }
    }

    return null;
  };

  const findAPIConfigPattern = (
    scripts: string[],
  ): IWebCrawler.IPagination["pattern"] | null => {
    for (const script of scripts) {
      // API 설정 패턴 검사
      for (const pattern of API_CONFIG_PATTERNS) {
        const match = script.match(pattern);
        if (match) {
          return {
            baseUrl: match[1],
            queryParam: match[2],
          };
        }
      }

      // JSON 설정 객체 검사
      const jsonConfig = extractJSONConfig(script);
      if (jsonConfig) {
        return jsonConfig;
      }
    }

    return null;
  };

  const findAPICallPattern = (
    scripts: string[],
  ): IWebCrawler.IPagination["pattern"] | null => {
    for (const script of scripts) {
      for (const pattern of API_CALL_PATTERNS) {
        const match = script.match(pattern);
        if (match) {
          const url = match[2] || match[1];
          try {
            const urlObj = new URL(url, "http://example.com");
            const pageParam = findPageParameter(urlObj);
            if (pageParam) {
              return {
                baseUrl: url.split("?")[0],
                queryParam: pageParam,
              };
            }
          } catch {
            continue;
          }
        }
      }
    }

    return null;
  };

  const findEventHandlerPattern = (
    scripts: string[],
  ): IWebCrawler.IPagination["pattern"] | null => {
    for (const script of scripts) {
      for (const pattern of EVENT_PATTERNS) {
        const match = script.match(pattern);
        if (match) {
          const url = match[2];
          try {
            const urlObj = new URL(url, "http://example.com");
            const pageParam = findPageParameter(urlObj);
            if (pageParam) {
              return {
                baseUrl: url.split("?")[0],
                queryParam: pageParam,
              };
            }
          } catch {
            continue;
          }
        }
      }
    }

    return null;
  };

  const determineTypeFromPattern = (
    pattern: IWebCrawler.IPagination["pattern"],
    scripts: string[],
    $: CheerioAPI,
  ): IWebCrawler.PaginationType => {
    if (!pattern) return null;

    const { baseUrl, queryParam } = pattern;

    // GraphQL이나 REST API endpoint인 경우
    if (
      baseUrl.includes("/graphql") ||
      baseUrl.includes("/api/") ||
      queryParam === "cursor"
    ) {
      return "infinite-scroll";
    }

    // Intersection Observer 사용 확인
    const hasIntersectionObserver = scripts.some(
      (script) =>
        script.includes("IntersectionObserver") ||
        script.includes("intersection-observer"),
    );

    if (hasIntersectionObserver) {
      return "infinite-scroll";
    }

    // 스크롤 이벤트 확인
    const hasScrollEvent = scripts.some(
      (script) => script.includes("scroll") && script.includes("scrollHeight"),
    );

    if (hasScrollEvent) {
      return "infinite-scroll";
    }

    // Load More 버튼 확인
    const hasLoadMoreButton = Boolean(
      $('button:contains("더보기")').length ||
        $('button:contains("load more")').length ||
        $('[class*="load-more"]').length,
    );

    if (hasLoadMoreButton) {
      return "load-more";
    }

    // 일반적인 페이지 파라미터인 경우
    if (queryParam === "page" || queryParam === "p") {
      return "numbered";
    }

    // 오프셋 기반인 경우
    if (queryParam === "offset" || queryParam === "start") {
      return "load-more";
    }

    return null;
  };

  export const detectAPIPattern = (
    $: CheerioAPI,
  ): {
    found: boolean;
    pattern?: IWebCrawler.IPagination["pattern"];
    type?: IWebCrawler.PaginationType;
  } => {
    const scripts = $("script")
      .map((_, el) => $(el).html())
      .get()
      .filter(Boolean);

    // API 설정 객체 패턴 찾기
    const configPattern = findAPIConfigPattern(scripts);
    if (configPattern) {
      return {
        found: true,
        pattern: configPattern,
        type: determineTypeFromPattern(configPattern, scripts, $),
      };
    }

    // API 호출 패턴 찾기
    const apiCallPattern = findAPICallPattern(scripts);
    if (apiCallPattern) {
      return {
        found: true,
        pattern: apiCallPattern,
        type: determineTypeFromPattern(apiCallPattern, scripts, $),
      };
    }

    // 이벤트 핸들러에서 API 호출 찾기
    const eventPattern = findEventHandlerPattern(scripts);
    if (eventPattern) {
      return {
        found: true,
        pattern: eventPattern,
        type: determineTypeFromPattern(eventPattern, scripts, $),
      };
    }

    return { found: false };
  };
}
