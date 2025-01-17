import { Controller } from "@nestjs/common";
import { WebCrawlerProvider } from "../../../providers/connector/web_crawler/WebCrawlerProvider";
import core from "@nestia/core";
import { retry } from "../../../utils/retry";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { ApiTags } from "@nestjs/swagger";
import { RouteIcon } from "@wrtnio/decorators";

@Controller("connector/crawler")
export class WebCrawlerController {
  constructor(private readonly webCrawlerProvider: WebCrawlerProvider) {}

  /**
   * Get HTML content from the URL
   *
   * This API accepts a URL as input and returns the HTML content of the body of the corresponding web page.
   * It fetches only the <body> element, excluding the head and other parts of the HTML structure, providing developers
   * with a streamlined way to access the main content of a web page for further processing or analysis.
   *
   * The API includes a "Wait For Selector" option, allowing it to wait for a specific CSS selector
   * to be present in the DOM before returning the content.
   * This is useful for ensuring that dynamic elements or data are fully loaded.
   *
   * @summary Get HTML content from the URL
   */
  @ApiTags("Web Crawler")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/connector_default.svg",
  )
  @core.TypedRoute.Patch("get-web-content")
  async getWebContent(
    @core.TypedBody() input: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse> {
    return retry(() => this.webCrawlerProvider.getWebContent(input))();
  }
}
