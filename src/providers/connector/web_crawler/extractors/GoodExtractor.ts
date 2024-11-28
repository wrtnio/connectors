import { ExtractorUtils, FieldExtractor } from "./CommonExtractor";
import { CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";

/**
 * Product (Good) Field Extractors
 */
namespace GoodExtractors {
  export class NameExtractor extends FieldExtractor<string> {
    private selectors = [
      '[itemprop="name"]',
      '[property="og:title"]',
      "h1.product-name",
      "h1.product-title",
      ".product-name",
      "#product-name",
      "h1",
    ];

    extract($: CheerioAPI): string {
      return ExtractorUtils.findFirstMatch($, this.selectors);
    }
  }

  export class PriceExtractor extends FieldExtractor<
    IWebCrawler.GoodData["price"]
  > {
    private priceSelectors = [
      '[itemprop="price"]',
      '[property="product:price:amount"]',
      ".price",
      ".current-price",
      "#product-price",
    ];

    private originalPriceSelectors = [
      "[data-original-price]",
      ".original-price",
      ".regular-price",
      ".list-price",
    ];

    extract($: CheerioAPI): IWebCrawler.GoodData["price"] {
      const currentPrice = this.extractCurrentPrice($);
      const originalPrice = this.extractOriginalPrice($);
      const currency = this.detectCurrency($);

      return {
        current: currentPrice,
        original: originalPrice,
        currency,
        discountRate: originalPrice
          ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
          : 0,
      };
    }

    private extractCurrentPrice($: CheerioAPI): number {
      const priceText = ExtractorUtils.findFirstMatch($, this.priceSelectors);
      return this.parsePrice(priceText);
    }

    private extractOriginalPrice($: CheerioAPI): number {
      const priceText = ExtractorUtils.findFirstMatch(
        $,
        this.originalPriceSelectors,
      );
      return this.parsePrice(priceText);
    }

    private parsePrice(text: string): number {
      return parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
    }

    private detectCurrency($: CheerioAPI): string {
      const text = $("body").text();
      if (text.includes("원") || text.includes("₩")) return "KRW";
      if (text.includes("$")) return "USD";
      if (text.includes("€")) return "EUR";
      return "KRW";
    }
  }

  export class ManufacturerExtractor extends FieldExtractor<string> {
    private selectors = [
      '[itemprop="manufacturer"]',
      '[itemprop="brand"]',
      ".manufacturer",
      ".brand",
    ];

    extract($: CheerioAPI): string {
      return ExtractorUtils.findFirstMatch($, this.selectors);
    }
  }

  export class CategoryExtractor extends FieldExtractor<string[]> {
    private selectors = [
      '[itemtype="breadcrumb"] span',
      ".breadcrumb span",
      ".category-path",
      ".product-category",
    ];

    extract($: CheerioAPI): string[] {
      const categories: string[] = [];
      this.selectors.forEach((selector) => {
        $(selector).each((_, el) => {
          const category = $(el).text().trim();
          if (category) categories.push(category);
        });
      });
      return Array.from(new Set(categories));
    }
  }

  export class DescriptionExtractor extends FieldExtractor<string> {
    private selectors = [
      '[itemprop="description"]',
      '[property="og:description"]',
      ".product-description",
      "#product-description",
      ".description",
    ];

    extract($: CheerioAPI): string {
      return ExtractorUtils.findFirstMatch($, this.selectors);
    }
  }
}
