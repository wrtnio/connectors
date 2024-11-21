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
   * Get web content
   *
   * @summary Get web content
   * @param input URL to get content
   * @returns Web content, URL
   */
  @ApiTags("Web Crawler")
  @core.TypedRoute.Patch()
  async getWebContent(
    @core.TypedBody() input: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse> {
    return retry(() => this.webCrawlerProvider.getWebContent(input.url))();
  }
}
