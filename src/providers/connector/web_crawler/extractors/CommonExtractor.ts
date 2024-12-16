import { Cheerio, CheerioAPI, load } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { PaginationInfiniteExtractor } from "./PaginationInfiniteExtractor";
import { PaginationNumberExtractor } from "./PaginationNumberExtractor";
import { PaginationLoadMoreExtractor } from "./PaginationLoadMoreExtractor";
import { MutableSingleton } from "tstl";
import { ZenRows } from "zenrows";
import { ConnectorGlobal } from "../../../../ConnectorGlobal";

export namespace CommonExtractor {
  export const findPaginationElements = async (
    $: CheerioAPI,
  ): Promise<
    Array<{
      type: IWebCrawler.PaginationType;
      $element: Cheerio<any>;
    }>
  > => {
    const paginatorSelectors = [
      ...PaginationNumberExtractor.paginationSelectors,
      ...PaginationInfiniteExtractor.scriptSelectors,
      ...PaginationInfiniteExtractor.infiniteScrollSelectors,
      ...PaginationLoadMoreExtractor.loadMoreSelectors,
    ];

    const result: Array<{
      type: IWebCrawler.PaginationType;
      $element: Cheerio<any>;
    }> = [];

    $("body")
      .find("*")
      .each((_, element) => {
        const $element = $(element);

        const hasPaginator = paginatorSelectors.some((selector) => {
          const req = $element.find(selector).length > 0;
          if (req) {
            console.log("selector", selector);
          }
          return req;
        });

        if (!hasPaginator) return;

        // 타입 감지 로직
        if (PaginationInfiniteExtractor.isInfiniteScroll($element)) {
          result.push({
            type: "infinite-scroll",
            $element,
          });
        } else if (PaginationNumberExtractor.isNumberedPagination($element)) {
          result.push({
            type: "numbered",
            $element,
          });
        } else if (PaginationLoadMoreExtractor.isLoadMore($element)) {
          result.push({
            type: "load-more",
            $element,
          });
        }
      });

    return result;
  };

  export const extractPaginationInfo = async (
    $element: Cheerio<any>,
    type: IWebCrawler.PaginationType,
  ): Promise<IWebCrawler.IPagination> => {
    const pagination: IWebCrawler.IPagination = {
      type,
      hasNextPage: false,
    };

    return pagination;
  };

  export const extractImages = async (
    $: CheerioAPI,
    $context: Cheerio<any>,
  ): Promise<IWebCrawler.IImage[]> => {
    const images: IWebCrawler.IImage[] = [];

    $context.find("img").each((_, element) => {
      const $img = $(element);
      const $parent = $img.parent();
      const url = $img.attr("src");

      if (url && isValidImageUrl(url) && isValidImage($img)) {
        images.push({
          id: $img.attr("id") || undefined,
          url,
          alt: $img.attr("alt") || undefined,
          classNames:
            getClassNames($img).length > 0 ? getClassNames($img) : ["no-class"],
          parentClassNames: getClassNames($parent),
        });
      }
    });

    return images;
  };

  export const extractMetadata = async (
    $: CheerioAPI,
  ): Promise<IWebCrawler.IMetadata> => {
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
      metadata.description = { text: description.toString(), images: [] };
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
  };

  const isValidImageUrl = (url: string): boolean => {
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
  };

  const isValidImage = ($img: Cheerio<any>): boolean => {
    // 작은 이미지나 장식용 이미지 필터링
    const width = Number($img.attr("width"));
    const height = Number($img.attr("height"));
    const isDecorative = $img.attr("role") === "presentation";

    return !(width < 100 || height < 100 || isDecorative);
  };

  export const fetchPage = async (
    request: IWebCrawler.IRequest,
    js_instructions?: string,
  ): Promise<CheerioAPI> => {
    console.log("fetching");
    try {
      const response = await (
        await client.get()
      ).get(transformUrl(request.url), {
        js_render: true,
        wait: 5000,
        json_response: true,
        wait_for: request.wait_for,
        js_instructions: js_instructions
          ? encodeURIComponent(js_instructions)
          : undefined,

        ...getProxyOptions(request.url),
      });

      if (!response.ok) {
        console.log(await response.text());

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return load(data.html);
    } catch (error) {
      console.log("Failed to fetch page:", error);
      throw error;
    }
  };

  const getProxyOptions = (url: string) => {
    if (url.includes(ARXIV)) {
      return {
        premium_proxy: true,
        proxy_country: "kr",
      };
    }

    if (
      url.includes("https://brand.naver.com") ||
      url.includes("https://www.coupang.com")
    ) {
      return {
        premium_proxy: true,
        proxy_country: "kr",
      };
    }

    return undefined;
  };

  const transformUrl = (url: string): string => {
    return url.includes(NAVERBLOG) ? transformNaverBlogURL(url) : url;
  };

  const transformNaverBlogURL = (url: string): string => {
    const regex = /https:\/\/blog\.naver\.com\/([^/]+)\/(\d+)/;
    const match = url.match(regex);

    if (!match) return url;

    const [, blogId, logNo] = match;
    return `${NAVERBLOG}/PostView.naver?blogId=${blogId}&logNo=${logNo}`;
  };

  const getClassNames = ($element: Cheerio<any>): string[] => {
    return ($element.attr("class") || "").split(/\s+/).filter(Boolean);
  };
}

const NAVERBLOG = "https://blog.naver.com";
const ARXIV = "https://arxiv.org";

const client = new MutableSingleton(
  async () =>
    new ZenRows(ConnectorGlobal.env.ZENROWS_API_KEY, {
      retries: 3,
    }),
);
