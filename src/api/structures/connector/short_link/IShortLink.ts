export namespace IShortLink {
  export interface IRequest {
    /**
     * URL
     *
     * @internal
     */
    url: string;
  }

  export interface IResponse {
    /**
     * Short URL
     *
     * @internal
     */
    shortUrl: string;
  }
}
