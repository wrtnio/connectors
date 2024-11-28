import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { Cheerio, CheerioAPI } from "cheerio";
import { FieldExtractor } from "./CommonExtractor";

/**
 * Review Field Extractors
 */
namespace ReviewExtractors {
  export class ReviewItemExtractor extends FieldExtractor<
    IWebCrawler.ReviewData["items"]
  > {
    private selectors = {
      container: '.review-item, .review, [itemprop="review"]',
      author: '.author, .reviewer, [itemprop="author"]',
      rating: '.rating, .stars, [itemprop="ratingValue"]',
      date: '.review-date, .date, [itemprop="datePublished"]',
      content: '.review-content, .review-text, [itemprop="reviewBody"]',
      verified: ".verified-buyer, .verified-purchase",
    };

    async extract($: CheerioAPI): Promise<IWebCrawler.ReviewData["items"]> {
      const items: IWebCrawler.ReviewData["items"] = [];

      $(this.selectors.container).each((_, element) => {
        const $review = $(element);

        const reviewItem = {
          id: $review.attr("id") || String(Date.now() + Math.random()),
          author: {
            name: $review.find(this.selectors.author).text().trim(),
            verified: $review.find(this.selectors.verified).length > 0,
          },
          rating: this.extractRating($review),
          date: $review.find(this.selectors.date).text().trim(),
          content: $review.find(this.selectors.content).text().trim(),
          images: [],
        };

        if (reviewItem.content) {
          items.push(reviewItem);
        }
      });

      return items;
    }

    private extractRating($review: Cheerio<Element>): number {
      const ratingText = $review.find(this.selectors.rating).text().trim();
      const ratingMatch = ratingText.match(/(\d+(\.\d+)?)/);
      return ratingMatch ? parseFloat(ratingMatch[1]) : 0;
    }
  }

  export class ReviewSummaryExtractor extends FieldExtractor<
    IWebCrawler.ReviewData["summary"]
  > {
    async extract($: CheerioAPI): Promise<IWebCrawler.ReviewData["summary"]> {
      const reviewItemExtractor = new ReviewItemExtractor();
      const items = await reviewItemExtractor.extract($);

      return {
        totalCount: items.length,
        averageRating: this.calculateAverageRating(items),
        keywordFrequency: this.analyzeKeywords(items),
      };
    }

    private calculateAverageRating(
      items: IWebCrawler.ReviewData["items"],
    ): number {
      if (items.length === 0) return 0;
      const sum = items.reduce((acc: any, item: any) => acc + item.rating, 0);
      return Number((sum / items.length).toFixed(1));
    }

    private analyzeKeywords(
      items: IWebCrawler.ReviewData["items"],
    ): Record<string, number> {
      const keywords: Record<string, number> = {};
      items.forEach((item: any) => {
        const words = item.content.toLowerCase().split(/\s+/);
        words.forEach((word: any) => {
          if (word.length > 3) {
            keywords[word] = (keywords[word] || 0) + 1;
          }
        });
      });
      return keywords;
    }
  }
}
