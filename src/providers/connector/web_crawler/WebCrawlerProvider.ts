import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Cheerio, CheerioAPI, load } from "cheerio";
import { ZenRows, ZenRowsConfig } from "zenrows";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { CommonExtractor } from "./extractors/CommonExtractor";

interface CrawlerConfig {
  readonly baseUrls: {
    readonly naverBlog: string;
    readonly arxiv: string;
  };
  readonly zenRowsConfig: ZenRowsConfig;
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
      zenRowsConfig: {
        defaultWaitTime: 4500,
      },
    };

    this.zenRowsClient = new ZenRows(ConnectorGlobal.env.ZENROWS_API_KEY);
  }

  async crawl(input: IWebCrawler.IRequest): Promise<IWebCrawler.IResponse> {
    try {
      const body = await this.getHTMLBody(input);
      return this.createResponse(input, body);
    } catch {
      throw new HttpException(
        "Failed to process request",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async getHTMLBody(input: IWebCrawler.IRequest): Promise<CheerioAPI> {
    try {
      const html = await this.scrapWeb(input);
      if (!html) throw new Error();

      const $ = load(html);
      this.cleanupHTML($);
      return $;
    } catch {
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
      "[hidden], [style*='display:none'], [placeholder], [aria-hidden]",
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

  private async scrapWeb(input: IWebCrawler.IRequest): Promise<string | null> {
    const response = await this.zenRowsClient.get(
      this.transformUrl(input.url),
      {
        js_render: true,
        wait: 4500,
        wait_for: input.wait_for,
        ...this.getProxyOptions(input.url),
      },
    );

    const data = await response.text();

    try {
      const json = JSON.parse(data);
      if (json.status % 100 !== 2) {
        if (json.code === "AUTH004") {
          throw new HttpException(
            "Rate limit exceeded",
            HttpStatus.TOO_MANY_REQUESTS,
          );
        }
        throw new Error();
      }
    } catch (e) {
      if (e instanceof HttpException) throw e;
    }

    return data;
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

  private async createResponse(
    input: IWebCrawler.IRequest,
    $: CheerioAPI,
  ): Promise<IWebCrawler.IResponse> {
    try {
      // Extract initial pagination info
      const pagination = await CommonExtractor.extractPaginationInfo(
        $,
        input.url,
      );

      // Initialize pages array with first page
      const pages: IWebCrawler.IPage[] = [
        {
          url: input.url,
          index: 0,
          content: {
            text: this.extractMainContent($),
            images: await CommonExtractor.extractImages($),
            metadata: await this.extractMetadata($),
          },
          rawContent: input.rawContent ? $.html() : null,
          pagination,
        },
      ];

      // Handle pagination if requested
      if (input.pagination?.followNextPage && pagination.hasNextPage) {
        const maxPages = input.pagination.followNextPageCount || 10;
        let currentUrl = pagination.nextPageUrl;
        let pageIndex = 1;

        while (currentUrl && pageIndex < maxPages) {
          // Fetch and parse next page
          const nextPageHtml = await this.scrapWeb({
            ...input,
            url: currentUrl,
          });
          if (!nextPageHtml) break;

          const next$ = load(nextPageHtml);
          this.cleanupHTML(next$);

          // Get pagination info for next page
          const nextPagination = await CommonExtractor.extractPaginationInfo(
            next$,
            currentUrl,
          );

          // Add page to results
          pages.push({
            url: currentUrl,
            index: pageIndex,
            content: {
              text: this.extractMainContent(next$),
              images: await CommonExtractor.extractImages(next$),
              metadata: await this.extractMetadata(next$),
            },
            rawContent: input.rawContent ? next$.html() : null,
            pagination: nextPagination,
          });

          // Update for next iteration
          currentUrl = nextPagination.nextPageUrl;
          pageIndex++;

          // Break if no more pages
          if (!nextPagination.hasNextPage) break;
        }
      }

      // Create summary
      const summary: IWebCrawler.ISummary = {
        totalPages: pages.length,
        timestamp: new Date().toISOString(),
        hasMore: pages[pages.length - 1].pagination.hasNextPage,
        pagination: pages[pages.length - 1].pagination,
      };

      return {
        pages,
        summary,
      };
    } catch (error) {
      this.logger.error("Failed to create response:", error);
      throw new HttpException(
        "Failed to create response",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private extractMainContent($: CheerioAPI): string {
    // Target main content containers
    const contentSelectors = [
      "article",
      '[role="main"]',
      ".post-content",
      ".article-content",
      ".entry-content",
      "main",
      "#content",
      ".content",
    ];

    let mainContent = "";

    // Try each selector until we find content
    for (const selector of contentSelectors) {
      const content = $(selector).first();
      if (content.length) {
        mainContent = content.text().trim();
        if (mainContent) break;
      }
    }

    // If no content found with selectors, try to get body content
    if (!mainContent) {
      mainContent = $("body").text().trim();
    }

    return mainContent;
  }

  private async extractMetadata($: CheerioAPI): Promise<Record<string, any>> {
    const metadata: Record<string, any> = {};

    // Extract title
    metadata.title =
      $("title").text().trim() ||
      $('meta[property="og:title"]').attr("content") ||
      $("h1").first().text().trim();

    // Extract description
    metadata.description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content");

    // Extract author
    metadata.author =
      $('meta[name="author"]').attr("content") ||
      $(".author").first().text().trim() ||
      $('[rel="author"]').first().text().trim();

    // Extract publish date
    const publishDate =
      $('meta[property="article:published_time"]').attr("content") ||
      $("time").attr("datetime") ||
      $(".date").first().text().trim();

    if (publishDate) {
      try {
        metadata.publishDate = new Date(publishDate).toISOString();
      } catch {
        metadata.publishDate = publishDate;
      }
    }

    // Clean up metadata by removing undefined values
    Object.keys(metadata).forEach((key) => {
      if (metadata[key] === undefined) {
        delete metadata[key];
      }
    });

    return metadata;
  }
}
