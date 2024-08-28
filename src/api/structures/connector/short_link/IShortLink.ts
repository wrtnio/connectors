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
     * 단축 URL
     *
     * @internal
     */
    shortUrl: string;
  }
}
