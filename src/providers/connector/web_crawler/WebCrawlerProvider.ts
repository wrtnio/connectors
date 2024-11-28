import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Cheerio, CheerioAPI, load } from "cheerio";
import { ZenRows, ZenRowsConfig } from "zenrows";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

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

    // // 1. 본문 컨텐츠 찾기
    // const mainContent = $(
    //   '#content, .content, article, .article, .post, .entry, main, [role="main"]',
    // );
    //
    // // 2. 본문이 있으면 본문만 남기고 모두 제거
    // if (mainContent.length) {
    //   $("body").empty().append(mainContent);
    // }
    //
    // // 3. 본문 내에서 필요한 태그만 남기기
    // $("body *").each((_, el) => {
    //   const $el = $(el);
    //   if (
    //     ![
    //       "p",
    //       "h1",
    //       "h2",
    //       "h3",
    //       "h4",
    //       "h5",
    //       "div",
    //       "span",
    //       "img",
    //       "a",
    //     ].includes(el.tagName)
    //   ) {
    //     $el.replaceWith($el.contents());
    //   }
    // });

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
    try {
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
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        "Failed to scrap web",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
      const content = await this.getContentByType(input.type, $);
      const metadata = await this.extractMetadata($);

      return {
        type: input.type,
        content: content,
        metadata: {
          ...metadata,
          url: input.url,
        },
      };
    } catch {
      throw new HttpException(
        "Failed to create response",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async analyzeAndSetType(
    input: IWebCrawler.IRequest,
    $: CheerioAPI,
  ): Promise<IWebCrawler.IRequest["type"]> {
    if (input.type) return input.type;

    // 타입이 지정되지 않은 경우 자동 분석
    const analyzedType = ContentTypeAnalyzer.analyzeContentType($);
    return analyzedType;
  }

  async getContentByType(
    type: IWebCrawler.IRequest["type"],
    $: CheerioAPI,
  ): Promise<IWebCrawler.IResponse["content"]> {
    try {
      // 메인 컨텐츠 영역 찾기
      const mainContentHtml = ContentTypeAnalyzer.findMainContent($, type);
      const $mainContent = load(mainContentHtml);

      // 기존 타입별 처리 로직 활용
      switch (type) {
        case "good":
          return await this.getGood($mainContent);
        case "review":
          return await this.getReview($mainContent);
        case "article":
          return await this.getArticle($mainContent);
        case "social":
          return await this.getSocial($mainContent);
        case "blog":
          return await this.getBlog($mainContent);
        case "community":
          return await this.getCommunity($mainContent);
        case null:
          return $mainContent.html()?.trim() || "";
        default:
          return $mainContent.html()?.trim() || "";
      }
    } catch (error) {
      this.logger.error("Failed to get content by type", error);
      throw new HttpException(
        "Failed to get content",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 할인율 추출 (20% -> 20)
   */
  private extractDiscountRate(text: string | undefined): number {
    if (!text) return 0;
    const matches = text.match(/\d+/);
    return matches ? Number(matches[0]) : 0;
  }

  /**
   * 가격에서 통화 정보 추출
   */
  private detectCurrency($: CheerioAPI): string {
    // Schema.org 통화 정보 확인
    const schemaCurrency = $('[itemprop="currency"]').attr("content");
    if (schemaCurrency) return schemaCurrency;

    // 페이지 전체 텍스트에서 통화 기호 찾기
    const text = $("body").text();
    if (text.includes("원") || text.includes("₩") || text.includes("KRW"))
      return "KRW";
    if (text.includes("$") || text.includes("USD")) return "USD";
    if (text.includes("€") || text.includes("EUR")) return "EUR";
    if (text.includes("¥") || text.includes("JPY")) return "JPY";

    return "KRW"; // 기본값
  }

  private async getGood($: CheerioAPI): Promise<IWebCrawler.GoodData> {
    const images = await this.extractImages($);

    // const current = currentPriceSelectors
    //   .map((selector) => $(selector))
    //   .find((el) => el.length > 0);
    //
    // const original = originalPriceSelectors
    //   .map((selector) => $(selector))
    //   .find((el) => el.length > 0);
    //
    // const discount = discountSelectors
    //   .map((selector) => $(selector))
    //   .find((el) => el.length > 0);

    return {
      name: $('meta[property="og:title"]').attr("content") || "",
      price: {
        current: 0 || 0,
        original: 0,
        currency: "",
        discountRate: 0,
      },
      manufacturer: $('[itemprop="manufacturer"]').text() || undefined,
      category: $('[itemtype="breadcrumb"] span')
        .map((_, el) => $(el).text())
        .get(),
      description: $('[itemprop="description"]').text() || "",
      images,
      availability: "in_stock",
    };
  }

  private async getReview($: CheerioAPI): Promise<IWebCrawler.ReviewData> {
    const items: IWebCrawler.ReviewData["items"] = [];

    $(".review-item").each((_, element) => {
      const $review = $(element);
      items.push({
        id: $review.attr("id") || String(Date.now()),
        author: {
          name: $review.find(".author").text(),
          verified: $review.find(".verified-buyer").length > 0,
        },
        rating: Number($review.find(".rating").attr("data-rating")) || 0,
        date: $review.find(".date").text(),
        content: $review.find(".content").text(),
        images: [],
      });
    });

    return {
      items,
      summary: {
        totalCount: items.length,
        averageRating:
          items.reduce((acc, item) => acc + item.rating, 0) / items.length,
        keywordFrequency: {},
      },
    };
  }

  private async getArticle($: CheerioAPI): Promise<IWebCrawler.ArticleData> {
    const images = await this.extractImages($);
    return {
      title: $("h1").first().text(),
      author: $(".author").text() || undefined,
      publishDate:
        $('meta[property="article:published_time"]').attr("content") ||
        new Date().toISOString(),
      modifiedDate: $('meta[property="article:modified_time"]').attr("content"),
      content: $(".article-content").text(),
      summary: $('meta[name="description"]').attr("content"),
      category: $(".category").text() || undefined,
      tags: $(".tags a")
        .map((_, el) => $(el).text())
        .get(),
      images,
      source: $(".source").text(),
      related: $(".related-articles a")
        .map((_, el) => ({
          title: $(el).text(),
          url: $(el).attr("href") || "",
        }))
        .get(),
    };
  }

  private async getSocial($: CheerioAPI): Promise<IWebCrawler.SocialData> {
    const images = await this.extractImages($);
    return {
      author: {
        name: $(".author-name").text(),
        handle: $(".author-handle").text(),
        verified: $(".verified-badge").length > 0,
      },
      content: $(".post-content").text(),
      date: $(".post-date").attr("datetime") || new Date().toISOString(),
      engagement: {
        likes: Number($(".likes-count").text()) || 0,
        shares: Number($(".shares-count").text()) || 0,
        comments: Number($(".comments-count").text()) || 0,
        views: Number($(".views-count").text()) || 0,
      },
      media: images,
      hashtags:
        $(".hashtags")
          .text()
          .match(/#[\w]+/g) || [],
      location: $(".location").text() || undefined,
    };
  }

  private async getBlog($: CheerioAPI): Promise<IWebCrawler.BlogData> {
    const images = await this.extractImages($);
    return {
      title: $(".blog-title").text(),
      author: {
        name: $(".blog-author").text(),
        profileUrl: $(".author-profile").attr("href"),
        description: $(".author-description").text(),
      },
      content: $(".blog-content").text(),
      publishDate:
        $(".publish-date").attr("datetime") || new Date().toISOString(),
      modifiedDate: $(".modified-date").attr("datetime"),
      category: $(".blog-category")
        .map((_, el) => $(el).text())
        .get(),
      tags: $(".blog-tags")
        .map((_, el) => $(el).text())
        .get(),
      images,
      stats: {
        views: Number($(".view-count").text()) || 0,
        likes: Number($(".like-count").text()) || 0,
      },
    };
  }

  private async getCommunity(
    $: CheerioAPI,
  ): Promise<IWebCrawler.CommunityData> {
    const images = await this.extractImages($);
    return {
      title: $(".post-title").text(),
      author: {
        name: $(".author-name").text(),
        rank: $(".author-rank").text(),
        joinDate: $(".join-date").text(),
        postCount: Number($(".post-count").text()) || 0,
      },
      content: $(".post-content").text(),
      board: {
        name: $(".board-name").text(),
        category: $(".board-category").text(),
      },
      publishDate:
        $(".publish-date").attr("datetime") || new Date().toISOString(),
      modifiedDate: $(".modified-date").attr("datetime"),
      images,
      stats: {
        views: Number($(".view-count").text()) || 0,
        likes: Number($(".like-count").text()) || 0,
        comments: Number($(".comment-count").text()) || 0,
      },
    };
  }

  private extractMetadata = async (
    $: CheerioAPI,
  ): Promise<IWebCrawler.IMetadata> => ({
    url: $('link[rel="canonical"]').attr("href") || "",
    timestamp: new Date().toISOString(),
    language: $("html").attr("lang") || null,
    lastUpdated: $('meta[property="article:modified_time"]').attr("content"),
    paginate: null,
  });

  private async extractImages($: CheerioAPI): Promise<IWebCrawler.IImage[]> {
    const images: IWebCrawler.IImage[] = [];

    $("img").each((_, element) => {
      const $img = $(element);
      const $parent = $img.parent();
      const url = $img.attr("src");

      if (url) {
        images.push({
          id: $img.attr("id"),
          url,
          alt: $img.attr("alt"),
          classNames: ($img.attr("class") || "").split(/\s+/).filter(Boolean),
          parentClassNames: ($parent.attr("class") || "")
            .split(/\s+/)
            .filter(Boolean),
        });
      }

      // 작은 이미지나 장식용 이미지 제거
      if (
        Number($img.attr("width")) < 100 ||
        Number($img.attr("height")) < 100 ||
        $img.attr("role") === "presentation"
      ) {
        $img.remove();
      }
    });
    return images;
  }
}
