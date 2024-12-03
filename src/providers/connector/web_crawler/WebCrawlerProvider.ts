import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Cheerio, CheerioAPI, load } from "cheerio";
import { ZenRows } from "zenrows";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { PaginationInfiniteExtractor } from "./extractors/PaginationInfiniteExtractor";
import { PaginationNumberExtractor } from "./extractors/PaginationNumberExtractor";
import { PaginationLoadMoreExtractor } from "./extractors/PaginationLoadMoreExtractor";
import { ApiExtractor } from "./extractors/ApiExtractor";

interface CrawlerConfig {
  readonly baseUrls: {
    readonly naverBlog: string;
    readonly arxiv: string;
  };
}

interface IFetch {
  html: string;
  xhr: IWebCrawler.IXHR[];
}

@Injectable()
export class WebCrawlerProvider {
  private readonly zenRowsClient: ZenRows;
  private readonly logger = new Logger(WebCrawlerProvider.name);
  private readonly config: CrawlerConfig;

  constructor() {
    this.config = {
      baseUrls: {
        naverBlog: "https://blog.naver.com",
        arxiv: "https://arxiv.org",
      },
    };

    this.zenRowsClient = new ZenRows(ConnectorGlobal.env.ZENROWS_API_KEY);
  }

  async crawl(input: IWebCrawler.IRequest): Promise<IWebCrawler.IResponse> {
    try {
      const { $, xhr } = await this.getHTMLBody(input.url, input);

      // 페이지네이션/비페이지네이션 영역 분리
      const { paginatedContent, nonPaginatedContent } =
        await this.separateContent($);

      // 비페이지네이션 컨텐츠 처리
      const nonPaginatedResult = await this.processNonPaginatedContent(
        $,
        nonPaginatedContent,
      );

      // 페이지네이션 컨텐츠 처리
      const paginationGroups = await this.processPaginatedContent(
        $,
        xhr,
        input,
        paginatedContent,
      );

      return {
        // 비페이지네이션 컨텐츠는 최상위 레벨에 배치
        ...nonPaginatedResult,
        // 페이지네이션된 컨텐츠는 paginationGroups 아래에 배치
        paginationGroups,
      };
    } catch (error) {
      this.logger.error("Failed to process request:", error);
      throw new HttpException(
        "Failed to process request",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async separateContent($: CheerioAPI): Promise<{
    paginatedContent: Cheerio<any>[];
    nonPaginatedContent: Cheerio<any>[];
  }> {
    const paginatedContent: Cheerio<any>[] = [];
    const nonPaginatedContent: Cheerio<any>[] = [];

    // 모든 요소를 재귀적으로 순회하는 함수
    const traverseElements = ($element: Cheerio<any>) => {
      console.log("Checking element:", {
        classes: $element.attr("class"),
        id: $element.attr("id"),
        tag: $element.prop("tagName"),
      });

      // 현재 요소의 페이지네이션 특성 확인
      const hasPaginationFeatures = this.checkForPaginationFeatures(
        $,
        $element,
      );

      if (hasPaginationFeatures) {
        paginatedContent.push($element);

        // 해당 요소와 연관된 컨텐츠 블록도 포함
        const relatedContent = this.findRelatedContent($, $element);
        if (relatedContent) {
          paginatedContent.push(relatedContent);
        }
      } else {
        nonPaginatedContent.push($element);
      }

      // 자식 요소들을 순회
      $element.children().each((_, child) => {
        traverseElements($(child));
      });
    };

    // body부터 시작하여 모든 요소 순회
    traverseElements($("body"));

    return { paginatedContent, nonPaginatedContent };
  }

  private checkForPaginationFeatures(
    $: CheerioAPI,
    $element: Cheerio<any>,
  ): boolean {
    // 페이지네이션 관련 클래스나 속성 확인
    const paginationIndicators = [
      "pagination",
      "paging",
      "paginator",
      "infinite",
      "load-more",
      "reviews",
      "comments",
      "list",
      "board",
    ];

    const elementClasses = ($element.attr("class") || "").toLowerCase();
    const elementId = ($element.attr("id") || "").toLowerCase();

    console.log(elementClasses);
    console.log(elementId);

    // 클래스나 ID에 페이지네이션 관련 키워드가 있는지 확인
    const hasPaginationClass = paginationIndicators.some(
      (indicator) =>
        elementClasses.includes(indicator) || elementId.includes(indicator),
    );

    // 페이지네이션 UI 요소 확인
    const hasPaginationUI = Boolean(
      $element.find(
        '.pagination, .paging, [class*="page-"], [class*="load-more"]',
      ).length,
    );

    // 목록 형태 확인
    const hasListStructure = Boolean(
      $element.find("ul > li, ol > li, .item, article").length > 2,
    );

    return hasPaginationClass || hasPaginationUI || hasListStructure;
  }

  private findRelatedContent(
    $: CheerioAPI,
    $paginationElement: Cheerio<any>,
  ): Cheerio<any> | null {
    // 페이지네이션 요소와 관련된 컨텐츠 블록 찾기
    const contentSelectors = [
      ".list",
      ".items",
      ".content",
      "ul",
      "ol",
      "article",
      '[class*="list"]',
      '[class*="items"]',
      '[class*="content"]',
    ];

    // 형제 요소 중에서 찾기
    let $related = $paginationElement.siblings(contentSelectors.join(","));
    if ($related.length) return $related;

    // 부모의 형제 요소 중에서 찾기
    $related = $paginationElement.parent().siblings(contentSelectors.join(","));
    if ($related.length) return $related;

    // 가까운 상위 요소 중에서 찾기
    const $closest = $paginationElement.closest(contentSelectors.join(","));
    if ($closest.length) return $closest;

    return null;
  }

  private async processNonPaginatedContent(
    $: CheerioAPI,
    nonPaginatedContent: Cheerio<any>[],
  ): Promise<{
    text: string;
    images: IWebCrawler.IImage[];
    metadata: Record<string, any>;
  }> {
    // 페이지네이션되지 않은 컨텐츠에서만 텍스트 추출
    const nonPaginatedText = nonPaginatedContent
      .map(($element) => {
        if (this.checkForPaginationFeatures($, $element)) {
          return ""; // 페이지네이션 특성이 있는 요소는 제외
        }
        const text = this.cleanText($element.text());
        return text.length > 10 ? text : "";
      })
      .filter(Boolean)
      .join("\n\n");

    return {
      text: nonPaginatedText, // 페이지네이션되지 않은 텍스트만 포함
      images: await this.extractImagesFromElements($, nonPaginatedContent),
      metadata: await this.extractMetadata($),
    };
  }

  private async processPaginatedContent(
    $: CheerioAPI,
    xhr: IWebCrawler.IXHR[],
    input: IWebCrawler.IRequest,
    paginatedContent: Cheerio<any>[],
  ): Promise<IWebCrawler.IResponse["paginationGroups"]> {
    const paginationGroups: IWebCrawler.IResponse["paginationGroups"] = [];

    for (const $content of paginatedContent) {
      // 페이지네이션 타입 감지
      const paginationType = await this.detectPaginationType($, $content);
      if (!paginationType) continue;

      // 첫 페이지 정보 추출
      const firstPageData = {
        url: input.url,
        text: this.extractTextFromElements($, [$content]),
        images: await this.extractImagesFromElements($, [$content]),
        classNames: this.extractElementClasses($content),
        pagination: await this.extractPaginationInfo(
          $,
          xhr,
          input.url,
          $content,
        ),
      };

      // 그룹 식별자 생성
      const identifier = this.generatePageIdentifier({
        url: input.url,
        classNames: firstPageData.classNames,
        pagination: firstPageData.pagination,
      });

      const pages = [firstPageData];

      // 페이지네이션 옵션이 있고 다음 페이지가 있다면 순회
      if (
        input.pagination?.followNextPage &&
        firstPageData.pagination.hasNextPage &&
        firstPageData.pagination.nextPageUrl
      ) {
        let currentPage = firstPageData;
        let pageCount = 1;
        const maxPages = input.pagination.followNextPageCount || 10;

        while (
          pageCount < maxPages &&
          currentPage.pagination.hasNextPage &&
          currentPage.pagination.nextPageUrl
        ) {
          try {
            // 다음 페이지 데이터 가져오기
            const { $: $nextPage, xhr: nextXhr } = await this.getHTMLBody(
              currentPage.pagination.nextPageUrl,
              input,
            );

            // 동일한 페이지네이션 영역 찾기 (같은 클래스나 구조를 가진)
            const $nextContent = this.findMatchingContent(
              $nextPage,
              firstPageData.classNames,
            );

            if (!$nextContent) {
              this.logger.warn("Cannot find matching content in next page");
              break;
            }

            // 다음 페이지 데이터 추출
            const nextPageData = {
              url: currentPage.pagination.nextPageUrl,
              text: this.extractTextFromElements($nextPage, [$nextContent]),
              images: await this.extractImagesFromElements($nextPage, [
                $nextContent,
              ]),
              classNames: this.extractElementClasses($nextContent),
              pagination: await this.extractPaginationInfo(
                $nextPage,
                nextXhr,
                currentPage.pagination.nextPageUrl,
                $nextContent,
              ),
            };

            pages.push(nextPageData);
            currentPage = nextPageData;
            pageCount++;
          } catch (error) {
            this.logger.error("Error fetching next page:", error);
            break;
          }
        }
      }

      paginationGroups.push({
        identifier: [identifier],
        pages,
      });
    }

    return paginationGroups;
  }

  // 다음 페이지에서 매칭되는 컨텐츠 영역을 찾는 헬퍼 메서드
  private findMatchingContent(
    $: CheerioAPI,
    originalClassNames: string[],
  ): Cheerio<any> | null {
    // 클래스명으로 매칭 시도
    for (const className of originalClassNames) {
      const $matched = $(`.${className}`);
      if ($matched.length) {
        return $matched;
      }
    }

    // 구조적 특성으로 매칭 시도
    const selectors = [
      '[class*="reviews"]',
      '[class*="comments"]',
      '[class*="qna"]',
      '[class*="list"]',
      '[class*="board"]',
    ];

    for (const selector of selectors) {
      const $matched = $(selector);
      if ($matched.length) {
        return $matched;
      }
    }

    return null;
  }

  private extractTextFromElements(
    $: CheerioAPI,
    elements: Cheerio<any>[],
  ): string {
    return elements
      .map(($element) => {
        const text = this.cleanText($element.text());
        return text.length > 10 ? text : ""; // 의미있는 텍스트만 포함
      })
      .filter(Boolean)
      .join("\n\n");
  }

  private cleanText(text: string): string {
    return text
      .replace(/[\n\r\t]+/g, " ") // 개행문자와 탭을 공백으로 변환
      .replace(/\s+/g, " ") // 연속된 공백을 하나로 변환
      .trim(); // 앞뒤 공백 제거
  }

  private async extractImagesFromElements(
    $: CheerioAPI,
    elements: Cheerio<any>[],
  ): Promise<IWebCrawler.IImage[]> {
    const images: IWebCrawler.IImage[] = [];

    for (const $element of elements) {
      $element.find("img").each((_, element) => {
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
    }

    return images;
  }

  private async detectPaginationType(
    $: CheerioAPI,
    $content: Cheerio<any>,
  ): Promise<IWebCrawler.PaginationType> {
    if (PaginationInfiniteExtractor.isInfiniteScroll($)) {
      return "infinite-scroll";
    }
    if (PaginationNumberExtractor.isNumberedPagination($)) {
      return "numbered";
    }
    if (PaginationLoadMoreExtractor.isLoadMore($)) {
      return "load-more";
    }
    return null;
  }

  private async extractPaginationInfo(
    $: CheerioAPI,
    xhr: IWebCrawler.IXHR[],
    currentUrl: string,
    $content: Cheerio<any>,
  ): Promise<IWebCrawler.IPagination> {
    const type = await this.detectPaginationType($, $content);
    const apiPattern = ApiExtractor.detectAPIPattern($);

    let paginationInfo: IWebCrawler.IPagination;

    switch (type) {
      case "numbered":
        paginationInfo =
          await PaginationNumberExtractor.handleNumberedPagination(
            $,
            currentUrl,
          );
        break;
      case "infinite-scroll":
        paginationInfo =
          await PaginationInfiniteExtractor.handleInfiniteScroll($);
        break;
      case "load-more":
        paginationInfo = await PaginationLoadMoreExtractor.handleLoadMore(
          $,
          currentUrl,
        );
        break;
      default:
        paginationInfo = {
          type: null,
          hasNextPage: false,
        };
    }

    // API 패턴이 감지된 경우 패턴 정보 병합
    if (apiPattern.found) {
      paginationInfo.pattern = apiPattern.pattern;
    }

    return paginationInfo;
  }

  private generatePageIdentifier(page: {
    url: string;
    classNames: string[];
    pagination: IWebCrawler.IPagination;
  }): string {
    // URL의 경로 첫 번째 세그먼트 추출
    const urlPattern = new URL(page.url).pathname.split("/")[1] || "";

    // 컨텐츠 관련 클래스만 필터링
    const contentClasses = page.classNames
      .filter(
        (cls) =>
          cls.includes("content") ||
          cls.includes("article") ||
          cls.includes("post") ||
          cls.includes("review") ||
          cls.includes("comment"),
      )
      .sort();

    // 페이지네이션 타입 포함
    const paginationType = page.pagination.type || "none";

    return `${urlPattern}-${contentClasses.join("-")}-${paginationType}`;
  }

  private isSameGroup(identifier1: string, identifier2: string): boolean {
    // 식별자가 동일하거나 유사한 패턴을 가진 경우 같은 그룹으로 처리
    return (
      identifier1 === identifier2 ||
      this.hasCommonPattern(identifier1, identifier2)
    );
  }

  private hasCommonPattern(id1: string, id2: string): boolean {
    // 식별자에서 컨텐츠 클래스 부분 추출
    const getContentPart = (id: string) => {
      const parts = id.split("-");
      return parts.filter(
        (part) =>
          part.includes("content") ||
          part.includes("article") ||
          part.includes("post") ||
          part.includes("review") ||
          part.includes("comment"),
      );
    };

    const content1 = getContentPart(id1);
    const content2 = getContentPart(id2);

    // 최소 하나의 공통된 컨텐츠 클래스가 있어야 함
    return content1.some((c1) => content2.includes(c1));
  }

  private extractElementClasses($element: Cheerio<any>): string[] {
    return ($element.attr("class") || "").split(/\s+/).filter(Boolean);
  }

  private async getHTMLBody(
    url: string,
    input: IWebCrawler.IRequest,
  ): Promise<{ $: CheerioAPI; xhr: IWebCrawler.IXHR[] }> {
    try {
      const body = await this.scrapWeb({
        ...input,
        url: this.transformUrl(url),
      });

      const $ = load(body.html);
      this.cleanupHTML($);
      return { $, xhr: body.xhr };
    } catch (error) {
      this.logger.error("Failed to get HTML body:", error);
      throw new HttpException(
        "Failed to get HTML body",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private cleanupHTML($: CheerioAPI): void {
    // 불필요한 태그 제거
    [
      "script",
      "style",
      "link",
      "iframe",
      "input",
      "footer",
      "header",
      "nav",
      "noscript",
      "svg",
      "canvas",
      "form",
    ].forEach((tag) => $(tag).remove());

    // 숨겨진 요소 제거
    $(
      "[hidden], [style*='display:none'], [placeholder], [aria-hidden='true']",
    ).remove();

    // 빈 요소 제거
    $("*:empty").not("img").remove();

    // 공백, \n 정리
    $("*")
      .contents()
      .each((_, element) => {
        if (element.type === "text") {
          element.data = element.data.replace(/\s+/g, " ").trim();
        }
      });
  }

  private async scrapWeb(input: IWebCrawler.IRequest): Promise<IFetch> {
    const response = await this.zenRowsClient.get(input.url, {
      js_render: true,
      wait: 6000,
      json_response: true,

      wait_for: input.wait_for,
      ...this.getProxyOptions(input.url),
    });

    if (!response.ok) {
      const data = await response.json();
      if (data.code === "AUTH004") {
        throw new HttpException(
          "Rate limit exceeded",
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  private transformNaverBlogURL(url: string): string {
    const regex = /https:\/\/blog\.naver\.com\/([^/]+)\/(\d+)/;
    const match = url.match(regex);

    if (!match) return url;

    const [, blogId, logNo] = match;
    return `${this.config.baseUrls.naverBlog}/PostView.naver?blogId=${blogId}&logNo=${logNo}`;
  }

  private transformUrl(url: string): string {
    return url.includes(this.config.baseUrls.naverBlog)
      ? this.transformNaverBlogURL(url)
      : url;
  }

  private getProxyOptions(url: string): Record<string, string> {
    return url.includes(this.config.baseUrls.arxiv)
      ? { proxy_country: "kr" }
      : {};
  }

  private async extractMetadata($: CheerioAPI): Promise<Record<string, any>> {
    const metadata: Record<string, any> = {};

    // Open Graph 메타데이터 추출
    $('meta[property^="og:"]').each((_, element) => {
      const property = $(element).attr("property")?.replace("og:", "");
      const content = $(element).attr("content");
      if (property && content) {
        metadata[property] = content;
      }
    });

    // Twitter 카드 메타데이터 추출
    $('meta[name^="twitter:"]').each((_, element) => {
      const name = $(element).attr("name")?.replace("twitter:", "");
      const content = $(element).attr("content");
      if (name && content) {
        metadata[name] = content;
      }
    });

    // 일반 메타데이터 추출
    $("meta[name]").each((_, element) => {
      const name = $(element).attr("name");
      const content = $(element).attr("content");
      if (name && content && !name.startsWith("twitter:")) {
        metadata[name] = content;
      }
    });

    // 제목 추출
    const title = $("title").text().trim();
    if (title) {
      metadata.title = title;
    }

    // JSON-LD 구조화 데이터 추출
    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const jsonLd = JSON.parse($(element).html() || "");
        if (jsonLd["@type"]) {
          metadata.jsonLd = jsonLd;
        }
      } catch {
        // JSON 파싱 실패 시 무시
      }
    });

    // undefined 값 정리
    Object.keys(metadata).forEach((key) => {
      if (metadata[key] === undefined) {
        delete metadata[key];
      }
    });

    return metadata;
  }
}
