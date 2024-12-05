import { Injectable, Logger, HttpException, HttpStatus } from "@nestjs/common";
import { CheerioAPI, Cheerio, load } from "cheerio";
import { ZenRows } from "zenrows";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { CommonExtractor } from "./extractors/CommonExtractor";

@Injectable()
export class WebCrawlerProvider {
  private readonly logger = new Logger(WebCrawlerProvider.name);
  private readonly client: ZenRows;

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
  ): Promise<{ $: CheerioAPI; xhr: IWebCrawler.IXHR[] }> {
    try {
      const response = await this.client.get(request.url, {
        js_render: true,
        wait: 5000,
        json_response: true,
        wait_for: request.wait_for,
      });

      if (!response.ok) {
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

    for (const section of paginationElements) {
      const $section = $(section);
      const type = await CommonExtractor.detectPaginationType($section);

      if (!type) continue;

      // 리스트 데이터 찾기
      const listSelectors = [
        '[class*="list"]',
        '[class*="items"]',
        '[class*="feed"]',
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
          pagination: await this.extractPaginationInfo(
            $section,
            type.type,
            xhr,
          ),
        },
      ];

      if (request.pagination?.followNextPage) {
        const additionalPages = await this.followPagination(
          $,
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

  private async extractPaginationInfo(
    $element: Cheerio<any>,
    type: IWebCrawler.PaginationType,
    xhr: IWebCrawler.IXHR[],
  ): Promise<IWebCrawler.IPagination> {
    const pagination: IWebCrawler.IPagination = {
      type,
      hasNextPage: false,
    };

    // XHR에서 pagination 관련 API 찾기
    const paginationXHR = xhr.find((req) => {
      return (
        req.url.includes("page=") ||
        req.url.includes("offset=") ||
        req.url.includes("cursor=") ||
        /\/api\/.*\/(list|items|page)/.test(req.url)
      );
    });

    if (paginationXHR) {
      pagination.hasNextPage = true;
      pagination.nextPageUrl = paginationXHR.url;
      pagination.pattern = {
        baseUrl: new URL(paginationXHR.url).pathname,
        queryParam: new URLSearchParams(paginationXHR.url).has("page")
          ? "page"
          : new URLSearchParams(paginationXHR.url).has("offset")
            ? "offset"
            : "cursor",
      };

      // 현재 페이지 번호 추출
      const pageMatch = paginationXHR.url.match(/page=(\d+)/);
      if (pageMatch) {
        pagination.currentPage = parseInt(pageMatch[1], 10);
      }

      return pagination;
    }

    // XHR이 없는 경우 기존 DOM 기반 처리
    const $nextLink = $element.find('a:contains("Next"), a[rel="next"]');
    if ($nextLink.length) {
      pagination.hasNextPage = true;
      pagination.nextPageUrl = $nextLink.attr("href");
      const currentPageElement = $element.find(".current, .active");
      if (currentPageElement.length) {
        pagination.currentPage = parseInt(currentPageElement.text(), 10);
      }
      if (pagination.nextPageUrl) {
        pagination.pattern = this.extractPaginationPattern(
          pagination.nextPageUrl,
        );
      }
    }

    return pagination;
  }

  private async followPagination(
    $: CheerioAPI,
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
        const { $: $next } = await this.fetchPage({
          url: currentPage.pagination.nextPageUrl,
        });
        const $matchingContent = this.findMatchingContent(
          $next,
          currentPage.classNames,
        );

        if (!$matchingContent.length) break;

        const newPage: IWebCrawler.IPage = {
          url: currentPage.pagination.nextPageUrl,
          classNames: this.getClassNames($matchingContent),
          data: [
            {
              text: this.cleanText($matchingContent.text()),
              images: await this.extractImages($next, $matchingContent),
            },
          ],
          pagination: await this.extractPaginationInfo(
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

  private extractPaginationPattern(
    url: string,
  ): IWebCrawler.IPagination["pattern"] {
    try {
      const urlObj = new URL(url);
      return {
        baseUrl: `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`,
        queryParam: urlObj.searchParams.has("page")
          ? "page"
          : urlObj.searchParams.has("p")
            ? "p"
            : undefined,
        fragment: urlObj.hash || undefined,
      };
    } catch {
      return {
        baseUrl: url,
      };
    }
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
