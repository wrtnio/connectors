import { Cheerio, CheerioAPI } from "cheerio";
import { ExtractorUtils, FieldExtractor } from "./CommonExtractor";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";

/**
 * Community Field Extractors
 */
class CommunityContentExtractor extends FieldExtractor<IWebCrawler.CommunityData> {
  private selectors = {
    // 게시글 제목 관련 선택자
    title: [
      "h1.title",
      ".post-title",
      ".thread-title",
      ".topic-title",
      '[property="og:title"]',
      "article h1",
      ".subject",
      ".board-title",
    ],

    // 작성자 정보 관련 선택자
    author: {
      name: [
        ".author-name",
        ".writer",
        ".nickname",
        ".username",
        '[itemprop="author"]',
        ".post-writer",
        ".member-name",
      ],
      rank: [
        ".author-rank",
        ".user-level",
        ".member-rank",
        ".grade",
        ".user-grade",
      ],
      joinDate: [
        ".join-date",
        ".member-since",
        ".registration-date",
        ".user-join-date",
      ],
      postCount: [
        ".post-count",
        ".total-posts",
        ".member-posts",
        ".article-count",
      ],
    },

    // 본문 내용 관련 선택자
    content: [
      ".post-content",
      ".article-content",
      ".board-content",
      '[itemprop="articleBody"]',
      ".message-content",
      ".thread-content",
      "#article_content",
      ".content",
    ],

    // 게시판 정보 관련 선택자
    board: {
      name: [
        ".board-name",
        ".forum-name",
        ".category-name",
        ".board-title",
        ".section-name",
      ],
      category: [
        ".board-category",
        ".forum-category",
        ".parent-board",
        ".upper-category",
        ".main-category",
      ],
    },

    // 날짜 정보 관련 선택자
    dates: {
      publish: [
        '[property="article:published_time"]',
        ".publish-date",
        ".created-at",
        ".post-date",
        "time[datetime]",
        ".date",
        '[itemprop="datePublished"]',
      ],
      modified: [
        '[property="article:modified_time"]',
        ".modified-date",
        ".updated-at",
        ".edit-date",
        '[itemprop="dateModified"]',
      ],
    },

    // 첨부파일 관련 선택자
    attachments: {
      container: [
        ".attachment",
        ".attached-file",
        ".file-item",
        ".upload-file",
        ".download-file",
      ],
      name: [".file-name", ".attachment-name", ".filename"],
      url: ["a[href]", ".download-link", ".file-link"],
      size: [".file-size", ".attachment-size", ".size"],
    },

    // 통계 정보 관련 선택자
    stats: {
      views: [".view-count", ".views", ".hit", ".read-count", "[data-views]"],
      likes: [
        ".like-count",
        ".recommend-count",
        ".up-count",
        ".thumbs-up",
        "[data-likes]",
      ],
      comments: [
        ".comment-count",
        ".reply-count",
        ".response-count",
        ".total-comments",
        "[data-comments]",
      ],
    },

    // 댓글 관련 선택자
    comments: {
      container: [
        ".comment",
        ".reply",
        ".response",
        ".comment-item",
        ".reply-item",
      ],
      author: {
        name: [
          ".comment-author",
          ".reply-writer",
          ".responder",
          ".comment-username",
        ],
        rank: [".commenter-rank", ".reply-author-rank", ".comment-user-level"],
      },
      content: [
        ".comment-content",
        ".reply-text",
        ".comment-message",
        ".response-body",
      ],
      date: [
        ".comment-date",
        ".reply-time",
        ".comment-created-at",
        "time[datetime]",
      ],
      likes: [".comment-likes", ".reply-recommends", ".response-likes"],
      isAnswer: [".is-answer", ".accepted-answer", ".best-answer", ".solution"],
      replies: {
        container: [
          ".nested-reply",
          ".child-comment",
          ".sub-reply",
          ".re-reply",
        ],
      },
    },

    // 공지사항 관련 선택자
    notices: {
      container: [".notice", ".announcement", ".pinned-post", ".sticky-post"],
      content: [".notice-content", ".announcement-text", ".pinned-content"],
      date: [".notice-date", ".announcement-time", ".pinned-date"],
    },
  };

  async extract($: CheerioAPI): Promise<IWebCrawler.CommunityData> {
    return {
      title: this.extractTitle($),
      author: this.extractAuthor($),
      content: this.extractContent($),
      board: this.extractBoard($),
      publishDate: this.extractDate($, this.selectors.dates.publish),
      modifiedDate: this.extractDate($, this.selectors.dates.modified),
      images: await ExtractorUtils.extractImages($),
      attachments: this.extractAttachments($),
      stats: this.extractStats($),
      comments: this.extractComments($),
      notices: this.extractNotices($),
    };
  }

  private extractTitle($: CheerioAPI): string {
    return this.findFirstMatch($, this.selectors.title) || "";
  }

  private extractAuthor($: CheerioAPI): IWebCrawler.CommunityData["author"] {
    return {
      name: this.findFirstMatch($, this.selectors.author.name),
      rank: this.findFirstMatch($, this.selectors.author.rank),
      joinDate: this.findFirstMatch($, this.selectors.author.joinDate),
      postCount: ExtractorUtils.extractNumber(
        this.findFirstMatch($, this.selectors.author.postCount),
      ),
    };
  }

  private extractContent($: CheerioAPI): string {
    return this.findFirstMatch($, this.selectors.content);
  }

  private extractBoard($: CheerioAPI): IWebCrawler.CommunityData["board"] {
    return {
      name: this.findFirstMatch($, this.selectors.board.name),
      category: this.findFirstMatch($, this.selectors.board.category),
    };
  }

  private extractAttachments(
    $: CheerioAPI,
  ): IWebCrawler.CommunityData["attachments"] {
    const attachments: NonNullable<IWebCrawler.CommunityData["attachments"]> =
      [];

    this.selectors.attachments.container.forEach((containerSelector) => {
      $(containerSelector).each((_, element) => {
        const $attachment = $(element);
        const name = this.findFirstMatch(
          $attachment,
          this.selectors.attachments.name,
        );
        const url = $attachment
          .find(this.selectors.attachments.url[0])
          .attr("href");
        const sizeText = this.findFirstMatch(
          $attachment,
          this.selectors.attachments.size,
        );

        if (name && url) {
          attachments.push({
            name,
            url,
            size: ExtractorUtils.extractNumber(sizeText),
          });
        }
      });
    });

    return attachments;
  }

  private extractStats($: CheerioAPI): IWebCrawler.CommunityData["stats"] {
    return {
      views: ExtractorUtils.extractNumber(
        this.findFirstMatch($, this.selectors.stats.views),
      ),
      likes: ExtractorUtils.extractNumber(
        this.findFirstMatch($, this.selectors.stats.likes),
      ),
      comments: ExtractorUtils.extractNumber(
        this.findFirstMatch($, this.selectors.stats.comments),
      ),
    };
  }

  private extractComments(
    $: CheerioAPI,
  ): IWebCrawler.CommunityData["comments"] {
    const comments: NonNullable<IWebCrawler.CommunityData["comments"]> = [];

    this.selectors.comments.container.forEach((containerSelector) => {
      $(containerSelector).each((_, element) => {
        const $comment = $(element);

        const comment: IWebCrawler.CommunityData["comments"][0] = {
          id: $comment.attr("id") || String(Date.now() + Math.random()),
          author: {
            name: this.findFirstMatch(
              $comment,
              this.selectors.comments.author.name,
            ),
            rank: this.findFirstMatch(
              $comment,
              this.selectors.comments.author.rank,
            ),
          },
          content: this.findFirstMatch(
            $comment,
            this.selectors.comments.content,
          ),
          date: this.findFirstMatch($comment, this.selectors.comments.date),
          likes: ExtractorUtils.extractNumber(
            this.findFirstMatch($comment, this.selectors.comments.likes),
          ),
          isAnswer:
            $comment.find(this.selectors.comments.isAnswer.join(",")).length >
            0,
          replies: this.extractReplies($comment),
        };

        if (comment.content) {
          comments.push(comment);
        }
      });
    });

    return comments;
  }

  private extractReplies(
    $comment: Cheerio<Element>,
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
          content: this.findFirstMatch($reply, this.selectors.comments.content),
          date: this.findFirstMatch($reply, this.selectors.comments.date),
        });
      });
    });

    return replies;
  }

  private extractNotices($: CheerioAPI): IWebCrawler.CommunityData["notices"] {
    const notices: NonNullable<IWebCrawler.CommunityData["notices"]> = [];

    this.selectors.notices.container.forEach((containerSelector) => {
      $(containerSelector).each((_, element) => {
        const $notice = $(element);

        notices.push({
          content: this.findFirstMatch($notice, this.selectors.notices.content),
          date: this.findFirstMatch($notice, this.selectors.notices.date),
        });
      });
    });

    return notices;
  }

  private findFirstMatch(
    $: Cheerio<any> | CheerioAPI,
    selectors: string[],
  ): string {
    for (const selector of selectors) {
      const text = $.find
        ? $.find(selector).text().trim()
        : $(selector).first().text().trim();
      if (text) return text;
    }
    return "";
  }

  private extractDate($: CheerioAPI, selectors: string[]): string {
    const dateText = this.findFirstMatch($, selectors);
    return ExtractorUtils.parseDate(dateText);
  }
}
