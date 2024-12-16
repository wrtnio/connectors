import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { YoutubeCrawlerProvider } from "../services/YoutubeCrawlerProvider";
import { OliveyoungCrawlerProvider } from "../services/OliveyoungCrawlerProvider";

export namespace ServiceExtractor {
  export const getServiceCrawl = async (
    request: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse | null> => {
    // Extract youtube service
    if (request.url.includes("www.youtube.com")) {
      return YoutubeCrawlerProvider.crawl(request);
    }

    // Extract oliveyoung service
    if (request.url.includes("www.oliveyoung.co.kr")) {
      return OliveyoungCrawlerProvider.crawl(request);
    }

    // Extract naver store service
    if (request.url.includes("brand.naver.com")) {
    }

    // Extract ohou service≠
    if (request.url.includes("ohou.se")) {
    }

    // Extract musinsa service
    if (request.url.includes("www.musinsa.com")) {
    }

    // Extract iherb service
    if (request.url.includes("kr.iherb.com")) {
    }

    // Extract coupang service
    if (request.url.includes("www.coupang.com")) {
    }

    // Extract aladin service
    if (request.url.includes("www.aladin.co.kr")) {
    }

    // Extract aliexpress service
    if (request.url.includes("ko.aliexpress.com")) {
    }

    return null;
  };
}
