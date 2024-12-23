import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { Cheerio, CheerioAPI } from "cheerio";
import { CommonExtractor } from "../extractors/CommonExtractor";

interface YoutubeComment {
  author: string;
  text: string;
  likes: number;
  timestamp: string;
  isPinned: boolean;
  isCreator: boolean;
}

export namespace YoutubeCrawlerProvider {
  export const crawl = async (
    request: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse> => {
    // 확장된 대기 시간과 상호작용 시퀀스
    const $ = await CommonExtractor.fetchPage(
      { ...request, wait_for: "ytd-comment-view-model" },
      `[
        { "click": "#expand-sizer, #expand, tp-yt-paper-button.button" },
        { "wait": 500 }
      ]`,
    );

    const title = extractTitle($);
    const description = await extractExpandedDescription($);
    const comments = extractComments($);

    return {
      text: formatOutput(title, description),
      images: await extractImages($),
      metadata: await extractEnhancedMetadata($),
      paginationGroups: [
        {
          identifier: ["youtube-comments"],
          pages: comments,
        },
      ],
    };
  };

  const extractTitle = ($: CheerioAPI): string => {
    return (
      $("#title h1 yt-formatted-string").text().trim() ||
      $("h1.title").text().trim() ||
      $("[class*='title']").first().text().trim()
    );
  };

  const extractExpandedDescription = async ($: CheerioAPI): Promise<string> => {
    const descriptionSelectors = [
      "ytd-text-inline-expander[force-formatted-text] yt-formatted-string",
      "ytd-text-inline-expander yt-attributed-string",
      "#description-inline-expander yt-attributed-string",
      "#description yt-formatted-string",
      "#description",
      "yt-attributed-string.ytd-text-inline-expander",
    ];

    for (const selector of descriptionSelectors) {
      const $description = $(selector);
      if ($description.length > 0) {
        const text = $description.text().trim();
        if (text) return cleanText(text);
      }
    }

    return "";
  };

  const extractComments = ($: CheerioAPI): IWebCrawler.IPage[] => {
    const commentsData: IWebCrawler.IData[] = [];

    $("ytd-comment-view-model").each((_, element) => {
      const comment = parseCommentElement($, $(element));

      console.log(comment);
      if (comment) {
        commentsData.push({
          text: formatCommentText(comment),
          images: [],
        });
      }
    });

    return [
      {
        url: "",
        data: commentsData,
        classNames: [],
        pagination: {
          type: "infinite-scroll",
          hasNextPage: $("ytd-continuation-item-renderer").length > 0,
        },
      },
    ];
  };

  const detectCommentBadges = (
    $: CheerioAPI,
    $comment: Cheerio<any>,
  ): { isPinned: boolean; isCreator: boolean } => {
    // 고정된 댓글 감지 - 정확한 선택자와 텍스트 매칭
    const isPinned =
      $comment.find("ytd-pinned-comment-badge-renderer").length > 0;

    // 크리에이터 댓글 감지 - creator 속성 확인
    const $creatorBadge = $comment.find(
      "ytd-author-comment-badge-renderer[creator]",
    );
    const isCreator = Boolean($creatorBadge.length > 0);

    return { isPinned, isCreator };
  };

  // 사용 예시:
  const parseCommentElement = (
    $: CheerioAPI,
    $comment: Cheerio<any>,
  ): YoutubeComment | null => {
    try {
      const author =
        $comment.find("#author-text").text().trim() ||
        $comment.find("#header-author yt-formatted-string").text().trim();

      const text = $comment.find("#content-text").text().trim();
      const likesText = $comment.find("#vote-count-middle").text().trim();
      const likes = parseInt(likesText.replace(/[^0-9]/g, "")) || 0;
      const timestamp = $comment.find("#published-time-text").text().trim();

      // 새로운 뱃지 감지 함수 사용
      const { isPinned, isCreator } = detectCommentBadges($, $comment);

      if (author && text) {
        return {
          author,
          text,
          likes,
          timestamp,
          isPinned,
          isCreator,
        };
      }
    } catch (error) {
      console.error("Error parsing comment:", error);
    }
    return null;
  };

  const extractImages = async (
    $: CheerioAPI,
  ): Promise<IWebCrawler.IImage[]> => {
    const images: IWebCrawler.IImage[] = [];

    // 썸네일 이미지
    const thumbnailUrl = $("meta[property='og:image']").attr("content");
    if (thumbnailUrl) {
      images.push({
        url: thumbnailUrl,
        alt: "Video Thumbnail",
        classNames: ["thumbnail"],
      });
    }

    return images;
  };

  const extractEnhancedMetadata = async (
    $: CheerioAPI,
  ): Promise<IWebCrawler.IMetadata> => {
    const metadata = await CommonExtractor.extractMetadata($);

    // 추가 메타데이터
    const viewCount = $("#info-container #info").text().trim();
    const channelName = $("#channel-name").text().trim();
    const publishDate = $("meta[itemprop='uploadDate']").attr("content");

    return {
      ...metadata,
      viewCount,
      channelName,
      publishDate,
    };
  };

  const formatOutput = (title: string, description: string): string => {
    const parts: string[] = [];

    if (title) parts.push(`Title: ${title}`);
    if (description) parts.push(`\nDescription: ${description}`);

    return parts.join("\n");
  };

  const formatCommentText = (comment: YoutubeComment): string => {
    const badges = [
      comment.isPinned ? "[고정됨]" : "",
      comment.isCreator ? "[크리에이터]" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return `${badges ? badges + " " : ""}${comment.author} (${comment.timestamp})\n${comment.text}${comment.likes > 0 ? `\n👍 ${comment.likes}` : ""}`;
  };

  const cleanText = (text: string): string => {
    return text
      .replace(/[\n\r]+/g, "\n")
      .replace(/\s+/g, " ")
      .replace(/\n\s+/g, "\n")
      .trim();
  };
}
