export namespace IWebCrawler {
  /**
   * @title Web crawler request
   */
  export interface IRequest {
    /**
     * URL to crawl.
     *
     * @title Web page URL
     */
    url: string;
  }

  export interface IResponse {
    /**
     * URL to crawl.
     *
     * @title Web page URL
     */
    url: string;

    /**
     * Web page content.
     *
     * @title Web page content
     */
    content: string;
  }
}
