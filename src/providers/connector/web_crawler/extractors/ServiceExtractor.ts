import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { YoutubeCrawlerProvider } from "../services/YoutubeCrawlerProvider";
import { OliveyoungCrawlerProvider } from "../services/OliveyoungCrawlerProvider";
import { NaverBrandStoreCrawlerProvider } from "../services/NaverBrandStoreCrawlerProvider";
import { NaverShoppingCrawlerProvider } from "../services/NaverShoppingCrawlerProvider";
import { NaverSmartStoreCrawlerProvider } from "../services/NaverSmartStoreCrawlerProvider";

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

    // Extract naver brand store service
    if (request.url.includes("brand.naver.com")) {
      return NaverBrandStoreCrawlerProvider.crawl(request);
    }

    // Extract naver shopping service
    if (request.url.includes("shopping.naver.com")) {
      return NaverShoppingCrawlerProvider.crawl(request);
    }

    // Extract naver brand store service
    if (request.url.includes("smartstore.naver.com")) {
      return NaverSmartStoreCrawlerProvider.crawl(request);
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
