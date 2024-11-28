import { CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";

/**
 * Base field extractor class
 */
export abstract class FieldExtractor<T> {
  // 기본 extract 메서드를 async로 변경
  abstract extract($: CheerioAPI): Promise<T> | T;
  protected getPriority(): number {
    return 1;
  }
}

/**
 * Common utilities for extractors
 */
export class ExtractorUtils {
  static cleanText(text: string): string {
    return text.replace(/\s+/g, " ").trim();
  }

  static parseDate(text: string): string {
    const date = new Date(text);
    return !isNaN(date.getTime())
      ? date.toISOString()
      : new Date().toISOString();
  }

  static extractNumber(text: string): number {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  static findFirstMatch($: CheerioAPI, selectors: string[]): string {
    for (const selector of selectors) {
      const element = $(selector);
      if (element.length) {
        const text = element.text().trim();
        if (text) return text;
      }
    }
    return "";
  }

  static async extractImages($: CheerioAPI): Promise<IWebCrawler.IImage[]> {
    const images: IWebCrawler.IImage[] = [];
    $("img").each((_, element) => {
      const $img = $(element);
      const url = $img.attr("src");
      if (url && !url.startsWith("data:")) {
        images.push({
          id: $img.attr("id"),
          url,
          alt: $img.attr("alt"),
          classNames: ($img.attr("class") || "").split(/\s+/).filter(Boolean),
          parentClassNames: ($img.parent().attr("class") || "")
            .split(/\s+/)
            .filter(Boolean),
        });
      }
    });
    return images;
  }
}
