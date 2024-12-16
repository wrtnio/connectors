import { Controller } from "@nestjs/common";
import { WebCrawlerProvider } from "../../../providers/connector/web_crawler/WebCrawlerProvider";
import core from "@nestia/core";
import { retry } from "../../../utils/retry";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/crawler")
export class WebCrawlerController {
  constructor(private readonly webCrawlerProvider: WebCrawlerProvider) {}

  /**
   * @title Web Crawler Service
   *
   * A comprehensive web crawling service that extracts structured content from web pages,
   * including text, images, metadata, and paginated content. The crawler can:
   *
   * - Extract main content and images from the target webpage
   * - Handle different types of pagination (numbered, infinite scroll, load more)
   * - Process dynamic content by waiting for specific selectors
   * - Collect metadata and structural information
   * - Follow pagination patterns up to a specified limit
   *
   * The service is designed to provide developers with structured, organized data
   * that preserves the hierarchical relationships found in the original webpage while
   * making the content easily accessible for further processing or analysis.
   *
   * Features include:
   * - Configurable pagination following
   * - Dynamic content loading support
   * - Metadata extraction
   * - Image collection with context
   *
   * @summary An advanced web crawler that supports extraction of structured content with pagination support
   */
  @ApiTags("Web Crawler")
  @core.TypedRoute.Post("get-web-content")
  async getWebContent(
    @core.TypedBody() input: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse> {
    return retry(() => this.webCrawlerProvider.crawl(input))();
  }
}
