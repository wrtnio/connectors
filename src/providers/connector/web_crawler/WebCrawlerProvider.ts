import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Cheerio, CheerioAPI, load } from "cheerio";
import { ZenRows } from "zenrows";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { CommonExtractor } from "./extractors/CommonExtractor";
import { ServiceExtractor } from "./extractors/ServiceExtractor";

@Injectable()
export class WebCrawlerProvider {
  private readonly logger = new Logger(WebCrawlerProvider.name);
  private readonly client: ZenRows;

  constructor() {
    this.client = new ZenRows(ConnectorGlobal.env.ZENROWS_API_KEY, {
      retries: 3,
    });
  }

  async crawl(request: IWebCrawler.IRequest): Promise<IWebCrawler.IResponse> {
    const serviceCrawl = await ServiceExtractor.getServiceCrawl(request);

    if (serviceCrawl !== null) {
      return serviceCrawl;
    }

    try {
      const $ = await CommonExtractor.fetchPage(request);

      // Extract main content
      const mainContent = await this.extractMainContent($);

      // Extract paginated content
      const paginationGroups = await this.extractPaginatedContent($, request);

      return {
        ...mainContent,
        paginationGroups,
      };
    } catch (error) {
      this.logger.error("Crawling failed:", error);
      throw new HttpException(
        "Failed to crawl page",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  private async extractMainContent(
    $: CheerioAPI,
  ): Promise<Omit<IWebCrawler.IResponse, "paginationGroups">> {
    return {
      text: await this.extractMainText($),
      images: await CommonExtractor.extractImages($, $("body")),
      metadata: await CommonExtractor.extractMetadata($),
    };
  }

  private async extractMainText($: CheerioAPI): Promise<string> {
    // Remove unwanted elements
    $("script, style, noscript, iframe, header, footer, nav").remove();

    // Get main content areas
    // const mainSelectors =
    //   'description, article, main, content, post, [role="main"]';
    // const mainContent = $(mainSelectors);
    //
    // if (mainContent.length) {
    //   return this.cleanText(mainContent.text());
    // }

    // TODO

    // Fallback to body content
    return this.cleanText($("body").text());
  }

  private async extractPaginatedContent(
    $: CheerioAPI,
    request: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse["paginationGroups"]> {
    const paginationGroups: IWebCrawler.IResponse["paginationGroups"] = [];
    const paginationElements = await CommonExtractor.findPaginationElements($);

    for (const { type, $element } of paginationElements) {
      const newIdentifier = this.generateIdentifier($element);
      if (
        paginationGroups.some((group) =>
          group.identifier.includes(newIdentifier),
        )
      ) {
        continue;
      }

      const dataItems = await Promise.all(
        $element
          .children()
          .map(async (_, item) => {
            const $item = $(item);
            return {
              text: this.cleanText($item.text()),
              images: await CommonExtractor.extractImages($, $item),
            };
          })
          .get(),
      );

      if (!dataItems.length) continue;

      const pages: IWebCrawler.IPage[] = [
        {
          url: request.url,
          classNames: this.getClassNames($element),
          data: dataItems,
          pagination: await CommonExtractor.extractPaginationInfo(
            $element,
            type,
          ),
        },
      ];

      // if (request.pagination?.followNextPage) {
      //   const additionalPages = await this.followPagination(
      //     $,
      //     request.url,
      //     pages[0],
      //     request.pagination.followNextPageCount ?? 10,
      //   );
      //   pages.push(...additionalPages);
      // }

      paginationGroups.push({
        identifier: [newIdentifier],
        pages,
      });
    }

    return paginationGroups;
  }

  private async followPagination(
    $: CheerioAPI,
    url: string,
    firstPage: IWebCrawler.IPage,
    maxPages: number,
  ): Promise<IWebCrawler.IPage[]> {
    const pages: IWebCrawler.IPage[] = [];
    let currentPage = firstPage;
    let pageCount = 1;

    while (pageCount < maxPages && currentPage.pagination.hasNextPage) {
      try {
        let jsInstructions: string | undefined;

        // Pagination type별 처리 로직
        switch (currentPage.pagination.type) {
          case "load-more": {
            // "더보기" 버튼 클릭
            const loadMoreSelectors = [
              'button:contains("더보기")',
              'button:contains("load more")',
              '[class*="load-more"]',
              "[data-load-more]",
            ];
            const selector = loadMoreSelectors.find(
              (sel) => $next(sel).length > 0,
            );
            if (selector) {
              jsInstructions = `[{ "click": "${selector}" }, { "wait": 5000 }]`;
            }
            break;
          }

          case "infinite-scroll": {
            // 무한 스크롤 처리
            const scrollHeight = await this.getScrollHeight($);
            jsInstructions = `[
              { "scroll_y": ${scrollHeight} },
              { "wait": 2000 }
            ]`;
            break;
          }

          case "numbered": {
            // 오늘의집 페이지네이션 처리
            const nextPageSelector = [
              "button._2XI47._3I7ex",
              'button[class="_2XI47 _3I7ex"]',
              "a[class*='_2Ar8-aEUTq']",
            ].find((sel) => $(sel).length > 0);

            if (nextPageSelector) {
              jsInstructions = `[{ "click": "${nextPageSelector}" }, { "wait": 5000 }]`;
            }
            break;
          }
        }

        // 페이지 패치 및 데이터 추출
        const $next = await CommonExtractor.fetchPage(
          {
            url: url,
          },
          jsInstructions,
        );

        const $matchingContent = this.findMatchingContent(
          $next,
          currentPage.classNames,
        );

        const listSelectors = [
          '[class*="list"]',
          '[class*="items"]',
          '[class*="feed"]',
          'ul[class*="_2ms2i3dD92"]',
        ];

        const $listElements = listSelectors
          .map((selector) => $matchingContent.find(selector))
          .filter(($el) => $el.length > 0)[0];

        if (!$listElements) continue;

        const dataItems = await Promise.all(
          $listElements
            .children()
            .map(async (_, item) => {
              const $item = $next(item);
              return {
                text: this.cleanText($item.text()),
                images: await CommonExtractor.extractImages($next, $item),
              };
            })
            .get(),
        );

        const newPage: IWebCrawler.IPage = {
          url: url,
          classNames: this.getClassNames($listElements),
          data: dataItems,
          pagination: await CommonExtractor.extractPaginationInfo(
            $matchingContent,
            currentPage.pagination.type,
          ),
        };

        pages.push(newPage);
        currentPage = newPage;
        pageCount++;
      } catch (error) {
        this.logger.error("Error following pagination:", error);
        break;
      }
    }

    return pages;
  }

  // 스크롤 높이 계산을 위한 헬퍼 메소드
  private async getScrollHeight($: CheerioAPI): Promise<number> {
    // 페이지의 주요 컨테이너들을 찾아서 예상 높이 계산
    const mainContainers = [
      "main",
      "article",
      '[role="main"]',
      ".container",
      "#content",
      ".content",
      ".main-content",
    ];

    let totalHeight = 0;
    for (const selector of mainContainers) {
      const elements = $(selector);
      if (elements.length) {
        // 각 요소의 상대적 위치와 크기를 기반으로 높이 추정
        elements.each((_, el) => {
          const marginBottom = parseInt($(el).css("margin-bottom") || "0", 10);
          const paddingBottom = parseInt(
            $(el).css("padding-bottom") || "0",
            10,
          );
          totalHeight +=
            $(el).children().length * 100 + marginBottom + paddingBottom;
        });
      }
    }

    // 컨테이너를 찾지 못했거나 높이가 너무 작은 경우 기본값 사용
    return Math.max(totalHeight, 2000);
  }

  // 대기할 셀렉터 결정을 위한 헬퍼 메소드
  // private getWaitForSelector(classNames: string[]): string {
  //   // 컨텐츠 관련 클래스를 찾아 대기 셀렉터로 사용
  //   const contentClass = classNames.find(
  //     (cls) =>
  //       cls.includes("list") ||
  //       cls.includes("items") ||
  //       cls.includes("content"),
  //   );
  //
  //   return contentClass ? `.${contentClass}` : "body";
  // }

  // Helper methods
  private cleanText(text: string): string {
    return text.replace(/[\s\n\r\t]+/g, " ").trim();
  }

  private getClassNames($element: Cheerio<any>): string[] {
    return ($element.attr("class") || "").split(/\s+/).filter(Boolean);
  }

  private generateIdentifier($element: Cheerio<any>): string {
    return (
      [$element.attr("id"), ...this.getClassNames($element)]
        .filter(Boolean)
        .join("-") || "default-group"
    );
  }

  private findMatchingContent(
    $: CheerioAPI,
    classNames: string[],
  ): Cheerio<any> {
    for (const className of classNames) {
      const $matched = $(`.${className}`);
      if ($matched.length) return $matched;
    }
    return $();
  }
}
