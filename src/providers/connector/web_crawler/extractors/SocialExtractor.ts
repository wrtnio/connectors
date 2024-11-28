import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { Cheerio, CheerioAPI } from "cheerio";
import { ExtractorUtils, FieldExtractor } from "./CommonExtractor";

/**
 * Social Media Field Extractors
 */
namespace SocialExtractors {
  export class SocialContentExtractor extends FieldExtractor<IWebCrawler.SocialData> {
    private selectors = {
      author: {
        name: '.author-name, [itemprop="author"]',
        handle: ".author-handle, .username",
        verified: ".verified-badge, .verified-icon",
      },
      content: '.post-content, [itemprop="text"]',
      date: ".post-date, [datetime]",
      engagement: {
        likes: ".likes-count, .like-count",
        shares: ".shares-count, .share-count",
        comments: ".comments-count, .comment-count",
        views: ".views-count, .view-count",
      },
      hashtags: ".hashtags, .tags",
      location: '.location, [itemprop="location"]',
    };

    async extract($: CheerioAPI): Promise<IWebCrawler.SocialData> {
      return {
        author: {
          name: ExtractorUtils.findFirstMatch($, [this.selectors.author.name]),
          handle: ExtractorUtils.findFirstMatch($, [
            this.selectors.author.handle,
          ]),
          verified: $(this.selectors.author.verified).length > 0,
        },
        content: ExtractorUtils.findFirstMatch($, [this.selectors.content]),
        date: this.extractDate($),
        engagement: {
          likes: ExtractorUtils.extractNumber(
            $(this.selectors.engagement.likes).text(),
          ),
          shares: ExtractorUtils.extractNumber(
            $(this.selectors.engagement.shares).text(),
          ),
          comments: ExtractorUtils.extractNumber(
            $(this.selectors.engagement.comments).text(),
          ),
          views: ExtractorUtils.extractNumber(
            $(this.selectors.engagement.views).text(),
          ),
        },
        media: await ExtractorUtils.extractImages($),
        hashtags: this.extractHashtags($),
        location: ExtractorUtils.findFirstMatch($, [this.selectors.location]),
      };
    }

    private extractDate($: CheerioAPI): string {
      const dateText =
        $("[datetime]").attr("datetime") || $(".post-date").text();
      return ExtractorUtils.parseDate(dateText);
    }

    private extractHashtags($: CheerioAPI): string[] {
      const text = $(this.selectors.hashtags).text();
      return text.match(/#[\w]+/g) || [];
    }
  }
}

/**
 * Blog Field Extractors
 */
namespace BlogExtractors {
  export class BlogContentExtractor extends FieldExtractor<IWebCrawler.BlogData> {
    private selectors = {
      title: [
        "h1.blog-title",
        "h1.entry-title",
        "article h1",
        '[property="og:title"]',
        ".post-title",
        ".article-title",
      ],
      author: {
        name: [
          ".blog-author",
          ".author-name",
          '[rel="author"]',
          ".entry-author",
          '[itemprop="author"]',
        ],
        profileUrl: [".author-profile a", ".author-link", ".author-url"],
        description: [".author-description", ".author-bio", ".about-author"],
      },
      content: [
        ".blog-content",
        ".entry-content",
        "article",
        ".post-content",
        '[itemprop="articleBody"]',
      ],
      dates: {
        publish: [
          '[property="article:published_time"]',
          ".publish-date",
          ".entry-date",
          "time[datetime]",
        ],
        modified: [
          '[property="article:modified_time"]',
          ".modified-date",
          ".update-date",
        ],
      },
      category: [
        ".blog-category",
        ".post-category",
        ".entry-category",
        '[rel="category"]',
      ],
      tags: [".blog-tags", ".post-tags", ".entry-tags", '[rel="tag"]'],
      comments: {
        container: [".comment", ".comment-item", '[itemprop="comment"]'],
        author: [".comment-author"],
        content: [".comment-content"],
        date: [".comment-date"],
        likes: [".comment-likes"],
      },
      stats: {
        views: [".view-count", ".post-views", "[data-views]"],
        likes: [".like-count", ".post-likes", "[data-likes]"],
        shares: [".share-count", ".post-shares", "[data-shares]"],
        bookmarks: [".bookmark-count", ".post-bookmarks", "[data-bookmarks]"],
      },
      series: {
        name: [".series-name", ".post-series"],
        order: [".series-order", ".series-part"],
        total: [".series-total", ".total-posts"],
      },
    };

    async extract($: CheerioAPI): Promise<IWebCrawler.BlogData> {
      const comments = this.extractComments($);
      const stats = this.extractStats($);
      const series = this.extractSeries($);

      return {
        title: this.findFirstMatch($, this.selectors.title),
        author: {
          name: this.findFirstMatch($, this.selectors.author.name),
          profileUrl: this.findFirstLink($, this.selectors.author.profileUrl),
          description: this.findFirstMatch(
            $,
            this.selectors.author.description,
          ),
        },
        content: this.findFirstMatch($, this.selectors.content),
        publishDate: this.extractDate($, this.selectors.dates.publish),
        modifiedDate: this.extractDate($, this.selectors.dates.modified),
        category: this.extractArray($, this.selectors.category),
        tags: this.extractArray($, this.selectors.tags),
        images: await ExtractorUtils.extractImages($),
        comments,
        stats,
        ...(series && { series }),
      };
    }

    private findFirstMatch($: CheerioAPI, selectors: string[]): string {
      for (const selector of selectors) {
        const text = $(selector).first().text().trim();
        if (text) return text;
      }
      return "";
    }

    private findFirstLink(
      $: CheerioAPI,
      selectors: string[],
    ): string | undefined {
      for (const selector of selectors) {
        const href = $(selector).first().attr("href");
        if (href) return href;
      }
      return undefined;
    }

    private extractDate($: CheerioAPI, selectors: string[]): string {
      const dateText = this.findFirstMatch($, selectors);
      return ExtractorUtils.parseDate(dateText);
    }

    private extractArray($: CheerioAPI, selectors: string[]): string[] {
      const results: string[] = [];
      selectors.forEach((selector) => {
        $(selector).each((_, el) => {
          const text = $(el).text().trim();
          if (text) results.push(text);
        });
      });
      return Array.from(new Set(results));
    }

    private extractComments($: CheerioAPI): IWebCrawler.BlogData["comments"] {
      const comments: IWebCrawler.BlogData["comments"] = [];

      this.selectors.comments.container.forEach((selector) => {
        $(selector).each((_, element) => {
          const $comment = $(element);
          comments.push({
            id: $comment.attr("id") || String(Date.now() + Math.random()),
            author: $comment.find(this.selectors.comments.author).text().trim(),
            content: $comment
              .find(this.selectors.comments.content)
              .text()
              .trim(),
            date: $comment.find(this.selectors.comments.date).text().trim(),
            likes: ExtractorUtils.extractNumber(
              $comment.find(this.selectors.comments.likes).text(),
            ),
            replies: this.extractReplies($comment),
          });
        });
      });

      return comments;
    }

    private extractReplies(
      $comment: Cheerio<any>,
    ): IWebCrawler.CommunityData["comments"][0]["replies"] {
      const replies: NonNullable<
        IWebCrawler.CommunityData["comments"]
      >[0]["replies"] = [];

      this.selectors.comments.replies.container.forEach((containerSelector) => {
        $comment.find(containerSelector).each((_, element) => {
          const $reply = $(element);

          replies.push({
            author: {
              name: this.findFirstMatch(
                $reply,
                this.selectors.comments.author.name,
              ),
              rank: this.findFirstMatch(
                $reply,
                this.selectors.comments.author.rank,
              ),
            },
            content: this.findFirstMatch(
              $reply,
              this.selectors.comments.content,
            ),
            date: this.findFirstMatch($reply, this.selectors.comments.date),
          });
        });
      });

      return replies;
    }

    private extractStats($: CheerioAPI): IWebCrawler.BlogData["stats"] {
      return {
        views: ExtractorUtils.extractNumber(
          this.findFirstMatch($, this.selectors.stats.views),
        ),
        likes: ExtractorUtils.extractNumber(
          this.findFirstMatch($, this.selectors.stats.likes),
        ),
        shares: ExtractorUtils.extractNumber(
          this.findFirstMatch($, this.selectors.stats.shares),
        ),
        bookmarks: ExtractorUtils.extractNumber(
          this.findFirstMatch($, this.selectors.stats.bookmarks),
        ),
      };
    }

    private extractSeries(
      $: CheerioAPI,
    ): IWebCrawler.BlogData["series"] | undefined {
      const name = this.findFirstMatch($, this.selectors.series.name);
      const orderText = this.findFirstMatch($, this.selectors.series.order);
      const totalText = this.findFirstMatch($, this.selectors.series.total);

      if (!name) return undefined;

      return {
        name,
        order: ExtractorUtils.extractNumber(orderText),
        totalPosts: ExtractorUtils.extractNumber(totalText),
      };
    }
  }
}
