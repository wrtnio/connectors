import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { CheerioAPI } from "cheerio";
import { ExtractorUtils, FieldExtractor } from "./CommonExtractor";

/**
 * Article Field Extractors
 */
namespace ArticleExtractors {
  export class ArticleContentExtractor extends FieldExtractor<IWebCrawler.ArticleData> {
    private selectors = {
      title: 'h1, [property="og:title"]',
      author: '[rel="author"], .author, [itemprop="author"]',
      publishDate: '[property="article:published_time"], .published-date',
      modifiedDate: '[property="article:modified_time"], .modified-date',
      content: 'article, [itemprop="articleBody"], .article-content',
      summary: '[name="description"], [property="og:description"]',
      category: '[property="article:section"], .category',
      tags: '[property="article:tag"], .tags a',
      source: '.source, [property="og:site_name"]',
    };

    async extract($: CheerioAPI): Promise<IWebCrawler.ArticleData> {
      return {
        title: ExtractorUtils.findFirstMatch($, [this.selectors.title]),
        author: ExtractorUtils.findFirstMatch($, [this.selectors.author]),
        publishDate: this.extractDate($, this.selectors.publishDate),
        modifiedDate: this.extractDate($, this.selectors.modifiedDate),
        content: $(this.selectors.content).text().trim(),
        summary: ExtractorUtils.findFirstMatch($, [this.selectors.summary]),
        category: ExtractorUtils.findFirstMatch($, [this.selectors.category]),
        tags: this.extractTags($),
        images: await ExtractorUtils.extractImages($),
        source: ExtractorUtils.findFirstMatch($, [this.selectors.source]),
        related: this.extractRelatedArticles($),
      };
    }

    private extractDate($: CheerioAPI, selector: string): string {
      const dateText = ExtractorUtils.findFirstMatch($, [selector]);
      return ExtractorUtils.parseDate(dateText);
    }

    private extractTags($: CheerioAPI): string[] {
      const tags: string[] = [];
      $(this.selectors.tags).each((_, el) => {
        const tag = $(el).text().trim();
        if (tag) tags.push(tag);
      });
      return tags;
    }

    private extractRelatedArticles(
      $: CheerioAPI,
    ): { title: string; url: string }[] {
      const related: { title: string; url: string }[] = [];
      $(".related-articles a, .related a").each((_, el) => {
        const $el = $(el);
        const title = $el.text().trim();
        const url = $el.attr("href");
        if (title && url) {
          related.push({ title, url });
        }
      });
      return related;
    }
  }
}
