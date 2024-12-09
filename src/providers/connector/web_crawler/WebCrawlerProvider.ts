import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Cheerio, CheerioAPI, load } from "cheerio";
import { ZenRows } from "zenrows";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { CommonExtractor } from "./extractors/CommonExtractor";

@Injectable()
export class WebCrawlerProvider {
  private readonly logger = new Logger(WebCrawlerProvider.name);
  private readonly client: ZenRows;
  private readonly naverBlog = "https://blog.naver.com";
  private readonly arxiv = "https://arxiv.org";

  constructor() {
    this.client = new ZenRows(ConnectorGlobal.env.ZENROWS_API_KEY);
  }

  async crawl(request: IWebCrawler.IRequest): Promise<IWebCrawler.IResponse> {
    try {
      const { $, xhr } = await this.fetchPage(request);

      // Extract main content
      const mainContent = await this.extractMainContent($);

      // Extract paginated content
      const paginationGroups = await this.extractPaginatedContent(
        $,
        xhr,
        request,
      );

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

  private async fetchPage(
    request: IWebCrawler.IRequest,
    js_instructions?: string,
  ): Promise<{ $: CheerioAPI; xhr: IWebCrawler.IXHR[] }> {
    try {
      const response = await this.client.get(this.transformUrl(request.url), {
        js_render: true,
        wait: 5000,
        json_response: true,
        wait_for: request.wait_for,
        js_instructions: js_instructions
          ? encodeURIComponent(js_instructions)
          : undefined,

        ...this.getProxyOptions(request.url),
      });

      if (!response.ok) {
        console.log(await response.text());

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const $ = load(data.html);

      return {
        $,
        xhr: data.xhr || [],
      };
    } catch (error) {
      this.logger.error("Failed to fetch page:", error);
      throw error;
    }
  }

  private async extractMainContent(
    $: CheerioAPI,
  ): Promise<Omit<IWebCrawler.IResponse, "paginationGroups">> {
    return {
      text: await this.extractMainText($),
      images: await this.extractImages($, $("body")),
      metadata: await this.extractMetadata($),
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

  private async extractImages(
    $: CheerioAPI,
    $context: Cheerio<any>,
  ): Promise<IWebCrawler.IImage[]> {
    const images: IWebCrawler.IImage[] = [];

    $context.find("img").each((_, element) => {
      const $img = $(element);
      const $parent = $img.parent();
      const url = $img.attr("src");

      if (url && this.isValidImageUrl(url) && this.isValidImage($img)) {
        images.push({
          id: $img.attr("id") || undefined,
          url,
          alt: $img.attr("alt") || undefined,
          classNames:
            this.getClassNames($img).length > 0
              ? this.getClassNames($img)
              : ["no-class"],
          parentClassNames: this.getClassNames($parent),
        });
      }
    });

    return images;
  }

  private isValidImageUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const validPatterns = [
        /\.(jpg|jpeg|png|webp|gif)$/i,
        /\/i\/.*\.(jpg|jpeg|png|webp|gif)/i,
        /\/uploads\/.*\.(jpg|jpeg|png|webp|gif)/i,
        /bucketplace.*\.(jpg|jpeg|png|webp|gif)/i,
      ];

      return validPatterns.some((pattern) => pattern.test(url));
    } catch {
      return false;
    }
  }

  private isValidImage = ($img: Cheerio<any>): boolean => {
    // 작은 이미지나 장식용 이미지 필터링
    const width = Number($img.attr("width"));
    const height = Number($img.attr("height"));
    const isDecorative = $img.attr("role") === "presentation";

    return !(width < 100 || height < 100 || isDecorative);
  };

  private async extractMetadata($: CheerioAPI): Promise<IWebCrawler.IMetadata> {
    const metadata: IWebCrawler.IMetadata = {};

    // Basic metadata
    metadata.title =
      $("title").text().trim() ||
      $('meta[property="og:title"]').attr("content");
    metadata.author = $('meta[name="author"]').attr("content");
    metadata.publishDate = $('meta[property="article:published_time"]').attr(
      "content",
    );

    // Description
    const description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content");
    if (description) {
      metadata.description = { text: description };
    }

    // Additional metadata
    $("meta").each((_, element) => {
      const $meta = $(element);
      const name = $meta.attr("name") || $meta.attr("property");
      const content = $meta.attr("content");

      if (name && content) {
        metadata[name] = content;
      }
    });

    return metadata;
  }

  private async extractPaginatedContent(
    $: CheerioAPI,
    xhr: IWebCrawler.IXHR[],
    request: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse["paginationGroups"]> {
    const paginationGroups: IWebCrawler.IResponse["paginationGroups"] = [];
    const paginationElements = await CommonExtractor.findPaginationElements($);

    console.log(paginationElements);

    for (const section of paginationElements) {
      const $section = $(section);
      const type = await CommonExtractor.detectPaginationType($section);

      if (!type) continue;

      // 리스트 데이터 찾기
      const listSelectors = [
        '[class*="list"]',
        '[class*="items"]',
        '[class*="feed"]',
        '[class*="review"]', // 리뷰 관련 클래스
      ];

      const $listElements = listSelectors
        .map((selector) => $section.find(selector))
        .filter(($el) => $el.length > 0)[0];

      if (!$listElements) continue;

      const dataItems = await Promise.all(
        $listElements
          .children()
          .map(async (_, item) => {
            const $item = $(item);
            return {
              text: this.cleanText($item.text()),
              images: await this.extractImages($, $item),
            };
          })
          .get(),
      );

      const pages: IWebCrawler.IPage[] = [
        {
          url: request.url,
          classNames: this.getClassNames($listElements),
          data: dataItems,
          pagination: await CommonExtractor.extractPaginationInfo(
            $listElements,
            type.type,
            xhr,
          ),
        },
      ];

      if (request.pagination?.followNextPage) {
        const additionalPages = await this.followPagination(
          $,
          request.url,
          pages[0],
          xhr,
          request.pagination.followNextPageCount || 10,
        );
        pages.push(...additionalPages);
      }

      paginationGroups.push({
        identifier: [this.generateIdentifier($section)],
        pages,
      });
    }

    return paginationGroups;
  }

  private async followPagination(
    $: CheerioAPI,
    url: string,
    firstPage: IWebCrawler.IPage,
    xhr: IWebCrawler.IXHR[],
    maxPages: number,
  ): Promise<IWebCrawler.IPage[]> {
    const pages: IWebCrawler.IPage[] = [];
    let currentPage = firstPage;
    let pageCount = 1;

    while (
      pageCount < maxPages &&
      currentPage.pagination.hasNextPage &&
      currentPage.pagination.nextPageUrl
    ) {
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
            const selector = loadMoreSelectors.find((sel) => $(sel).length > 0);
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
            ].find((sel) => $(sel).length > 0);

            if (nextPageSelector) {
              jsInstructions = `[{ "click": "${nextPageSelector}" }, { "wait": 5000 }]`;
            }
            break;
          }
        }

        // 페이지 패치 및 데이터 추출
        const { $: $next } = await this.fetchPage(
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
                images: await this.extractImages($next, $item),
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
            xhr,
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

  private transformNaverBlogURL(url: string): string {
    const regex = /https:\/\/blog\.naver\.com\/([^/]+)\/(\d+)/;
    const match = url.match(regex);

    if (!match) return url;

    const [, blogId, logNo] = match;
    return `${this.naverBlog}/PostView.naver?blogId=${blogId}&logNo=${logNo}`;
  }

  private transformUrl(url: string): string {
    return url.includes(this.naverBlog) ? this.transformNaverBlogURL(url) : url;
  }

  private getProxyOptions(url: string) {
    if (url.includes(this.arxiv)) {
      return {
        premium_proxy: true,
        proxy_country: "kr",
      };
    }

    if (
      url.includes("https://brand.naver.com") ||
      url.includes("https://www.coupang.com")
    ) {
      return {
        premium_proxy: true,
        proxy_country: "kr",
      };
    }

    return undefined;
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
