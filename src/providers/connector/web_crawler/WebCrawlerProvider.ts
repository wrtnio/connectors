import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from "@nestjs/common";
import { load } from "cheerio";
import { ZenRows } from "zenrows";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";

@Injectable()
export class WebCrawlerProvider {
  private zenRowsClient = new ZenRows(ConnectorGlobal.env.ZENROWS_API_KEY);
  private logger = new Logger(WebCrawlerProvider.name);
  private readonly naverBlogBaseUrl = "https://blog.naver.com";
  private readonly arxivBaseUrl = "https://arxiv.org";

  async getWebContent(
    input: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse> {
    try {
      const html = await this.scrapWeb(input);

      if (!html) {
        throw new InternalServerErrorException(
          `failed to scrape web: ${input.url}`,
        );
      }

      const $ = load(html);

      $("script").remove();
      $("style").remove();
      $("header").remove();
      $("footer").remove();
      $("nav").remove();

      const text = $("body").text().trim();
      const textWithoutNewLines = text.replace(/\s+/g, " ");
      return {
        content: textWithoutNewLines,
        url: input.url,
      };
    } catch {
      throw new UnprocessableEntityException(
        `unsupported website: ${input.url}`,
      );
    }
  }

  private async scrapWeb(input: IWebCrawler.IRequest): Promise<string | null> {
    try {
      const request = await this.zenRowsClient.get(
        this.transformUrl(input.url),
        {
          js_render: true,
          wait: 4500,
          wait_for: input.wait_for,
          ...this.getProxyOptions(input.url),
        },
      );
      const data = await request.text();

      try {
        const json = JSON.parse(data);

        if (json.status % 100 !== 2) {
          this.logger.warn({
            message: "웹 스크래핑 비정상 응답",
            log_data: {
              status: json.status,
              code: json.code,
            },
          });

          if (json.code === "AUTH004") {
            throw new HttpException(
              `too many requests: ${input.url}`,
              HttpStatus.TOO_MANY_REQUESTS,
            );
          } else {
            throw new InternalServerErrorException(
              `failed to scrape web: ${input.url}`,
            );
          }
        }
      } catch {}

      return data;
    } catch (error) {
      this.logger.error({
        message: "웹 스크래핑 요청 실패",
        log_data: { error_message: error },
      });
      return null;
    }
  }

  transformNaverBlogURL(url: string): string {
    const regex = /https:\/\/blog\.naver\.com\/([^/]+)\/(\d+)/;
    const match = url.match(regex);

    if (match) {
      const blogId = match[1];
      const logNo = match[2];
      return `https://blog.naver.com/PostView.naver?blogId=${blogId}&logNo=${logNo}`;
    } else {
      return url;
    }
  }

  transformUrl(url: string): string {
    if (url.includes(this.naverBlogBaseUrl)) {
      return this.transformNaverBlogURL(url);
    } else {
      return url;
    }
  }

  getProxyOptions(url: string) {
    if (url.includes(this.arxivBaseUrl)) {
      return {
        proxy_country: "kr",
      };
    } else {
      return {};
    }
  }
}
