import { CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { CommonExtractor } from "../extractors/CommonExtractor";
import { INaver } from "@wrtn/connector-api/lib/structures/connector/web_crawler/INaver";

export namespace NaverShoppingCrawlerProvider {
  export const crawl = async (
    request: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse> => {
    const $ = await CommonExtractor.fetchPage(
      request,
      `[
        { "click": "#_productTabContainer > div > ul > li:nth-child(2) > a" },
        { "wait_for": "#REVIEW > div > div > div._2LvIMaBiIO > div._2g7PKvqCKe > ul > li:nth-child(20) > div" }   
      ]`,
    );

    const productInfo = extractProductInfo($);
    const reviewStatus = formatReviewStatusOutput(extractReviewStats($));
    const paginationGroups = await extractPaginationReviews($, request);

    return {
      text: formatOutput(productInfo, reviewStatus),
      images: [],
      metadata: await extractMetadata($),
      paginationGroups: paginationGroups,
    };
  };

  const extractPaginationReviews = async (
    $: CheerioAPI,
    request: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse["paginationGroups"]> => {
    const pages: IWebCrawler.IPage[] = [];
    let currentPageHtml = $;
    const maxPages = request.pagination?.followNextPageCount ?? 10;

    const collectPageData = async (
      $: CheerioAPI,
    ): Promise<IWebCrawler.IPage> => {
      const reviews = extractReviews($);

      console.log(reviews);
      return {
        url: request.url,
        data: reviews.map((review) => ({
          text: formatReviewText(review),
          images: review.images.map((image) => ({
            classNames: ["review-image"],
            url: image.url,
            alt: image.alt,
          })),
        })),
        classNames: ["review-page"],
        pagination: {
          type: "numbered",
          hasNextPage: true,
        },
      };
    };

    pages.push(await collectPageData(currentPageHtml));

    return [
      {
        identifier: ["review-list"],
        pages,
      },
    ];
  };

  const extractReviews = ($: CheerioAPI): INaver.Review[] => {
    // 메인 리뷰 컨테이너 선택
    const $reviewContainer = $(
      "#REVIEW > div > div > div._2LvIMaBiIO > div._2g7PKvqCKe > ul",
    );
    const reviews: INaver.Review[] = [];

    console.log($reviewContainer.text());

    // 각 리뷰 아이템 처리
    $reviewContainer.find("li.BnwL_cs1av").each((_, element) => {
      const $review = $(element);

      // 기본 정보 추출
      const id = $review.attr("data-shp-contents-id") || "";
      const author = $review.find("._2L3vDiadT9").first().text().trim();
      const date = $review.find("._2L3vDiadT9").eq(1).text().trim();
      const rating = parseInt($review.find("._15NU42F3kT").text()) || 0;
      const content = $review.find("._1kMfD5ErZ6").text().trim();
      const helpful = parseInt($review.find(".count").text()) || 0;

      // 상품 옵션 추출
      const productOption = $review.find("._2FXNMst_ak").text().trim();

      // 평가 항목 추출
      const evaluations: { [key: string]: string } = {};
      $review.find(".XbGQRlzveO .CCKYhxjMDd").each((_, el) => {
        const key = $(el).text().trim();
        const value = $(el).next("._3y5bSL-H_P").text().trim();
        if (key && value) {
          evaluations[key] = value;
        }
      });

      // 뱃지 추출
      const badges = $review
        .find(".byXA4FP1Bq")
        .map((_, el) => $(el).text().trim())
        .get();

      // 이미지 정보 추출
      const images: IWebCrawler.IImage[] = [];
      const $imageContainer = $review.find("._3Bbv1ae9fg");
      $imageContainer.find("._1DOkWFrX74").each((_, el) => {
        const $img = $(el);
        const url = $img.find("._3Lp-477Dqi").attr("data-src") || "";
        const alt = $img.find("._3Lp-477Dqi").attr("alt") || "";
        const countText = $img.find("._1pArV0Fwcx").text();
        const count = parseInt(countText.replace(/[^0-9]/g, "")) || 1;

        if (url) {
          images.push({ url, alt, classNames: ["review-image"] });
        }
      });

      // 판매자 답변 추출
      let sellerResponse;
      const $seller = $review.find(".Nl1f31wsR8");
      if ($seller.length) {
        sellerResponse = {
          date: $seller.find("._3SyGNClj2z").eq(1).text().trim(),
          content: $seller.find("._12c2ihQYKc").text().trim(),
        };
      }

      // 유효한 리뷰만 추가
      if (id && author && content) {
        reviews.push({
          rating,
          date,
          productOption,
          content,
          helpful,
          evaluations,
          badges,
          images,
          sellerResponse,
        });
      }
    });

    return reviews;
  };

  const extractProductInfo = ($: CheerioAPI): INaver.NaverStoreProduct => {
    // 브랜드명 추출
    const brand = $(".bd_T6VAj").text().trim();

    // 상품 제목 추출
    const title = $("._22kNQuEXmb").text().trim();

    // 가격 정보 추출
    const originalPrice = parseInt(
      $(".Xdhdpm0BD9 ._1LY7DqCnwR").text().replace(/,/g, ""),
    );
    const salePrice = parseInt(
      $(".aICRqgP9zw ._1LY7DqCnwR").text().replace(/,/g, ""),
    );
    const discount = Math.round(
      ((originalPrice - salePrice) / originalPrice) * 100,
    );

    // 적립금 정보 추출
    const points = {
      total: parseInt($(".bd_AoQmU").text().replace(/,/g, "")),
      basic: parseInt(
        $("li.bd_3hovx:first-child .bd_2AsXs")
          .text()
          .replace(/[^0-9]/g, ""),
      ),
    };

    // 이벤트/혜택 정보 추출
    const events = $("._3PSm5YaiyP")
      .map((_, el) => {
        const type = $(el).find("._10YmOw_HhF").text().trim();
        const description = $(el).find("._3gflBuXw8G").text().trim();
        return description ? `${type}: ${description}` : "";
      })
      .get()
      .filter(Boolean);

    // 사은품 정보 추출
    const gifts = $(".l5yD5qEf0t li")
      .map((_, el) => ({
        description: $(el)
          .closest("._3PSm5YaiyP")
          .find("._3gflBuXw8G")
          .text()
          .trim(),
        images: [$(el).find("img").attr("src") || ""],
      }))
      .get();

    // 배송 정보 추출
    const deliveryInfo = {
      type: $(".bd_ChMMo").first().text().trim(),
      fee: $(".bd_ChMMo").eq(1).text().trim(),
      provider: $(".bd_2YSzf").text().trim(),
      extraInfo: $(".bd_1g_zz").text().trim(),
    };

    // 최대 구매 수량 추출
    const maxQuantityText = $("._1nLOlSBJaD")
      .text()
      .match(/최대구매\s+(\d+)개/);
    const maxQuantity = maxQuantityText ? parseInt(maxQuantityText[1]) : 1;

    return {
      brand,
      title,
      price: {
        original: originalPrice,
        sale: salePrice,
        discount,
      },
      benefits: {
        points,
        events,
        gifts,
      },
      delivery: deliveryInfo,
      purchase: {
        maxQuantity,
      },
    };
  };

  const extractMetadata = async (
    $: CheerioAPI,
  ): Promise<IWebCrawler.IMetadata> => {
    return {
      title: $("._22kNQuEXmb").text().trim(),
      description: {
        text: $("._3gflBuXw8G").first().text().trim(),
        images: [],
      },
    };
  };

  const formatOutput = (
    product: INaver.NaverStoreProduct,
    reviewStatus: string,
  ): string => {
    const sections = [
      `브랜드: ${product.brand}`,
      `상품명: ${product.title}`,
      "\n가격 정보:",
      `- 정가: ${product.price.original.toLocaleString()}원`,
      `- 판매가: ${product.price.sale.toLocaleString()}원`,
      `- 할인율: ${product.price.discount}%`,
      "\n적립 혜택:",
      `- 최대 적립금: ${product.benefits.points.total.toLocaleString()}원`,
      `- 기본 적립: ${product.benefits.points.basic.toLocaleString()}원`,
      "\n이벤트/혜택:",
      ...product.benefits.events.map((event) => `- ${event}`),
      "\n배송 정보:",
      `- 배송방식: ${product.delivery.type}`,
      `- 배송비: ${product.delivery.fee}`,
      `- 배송업체: ${product.delivery.provider}`,
      product.delivery.extraInfo
        ? `- 추가정보: ${product.delivery.extraInfo}`
        : "",
      `\n최대 구매수량: ${product.purchase.maxQuantity}개`,
    ];

    return sections.filter(Boolean).join("\n") + "\n" + reviewStatus;
  };
  const formatReviewText = (review: INaver.Review): string => {
    // 리뷰 뱃지들 (재구매 등)
    const badgeText =
      review.badges.length > 0
        ? `${review.badges.map((badge) => `[${badge}]`).join(" ")} `
        : "";

    // 평가 항목들 (소음 등)
    const evaluationText = Object.entries(review.evaluations)
      .map(([key, value]) => `${key}: ${value}`)
      .join(" | ");

    // 이미지 정보
    const imageText =
      review.images.length > 0 ? `첨부 이미지 ${review.images.length}장` : "";

    const parts = [
      // 별점과 날짜
      `평점: ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)} (${review.rating}점)`,
      `작성일: ${review.date}`,

      // 뱃지와 상품 옵션
      badgeText && `${badgeText.trim()}`,
      review.productOption && `상품옵션: ${review.productOption}`,

      // 평가 항목
      evaluationText && `평가: ${evaluationText}`,

      // 리뷰 내용
      `내용: ${review.content}`,

      // 이미지 정보
      imageText,

      // 도움돼요 수
      review.helpful > 0 ? `도움돼요 ${review.helpful}명` : "",

      // 판매자 답변
      review.sellerResponse &&
        [
          "",
          "━━━━━━━━━━━━━━━━",
          `[판매자 답변] ${review.sellerResponse.date}`,
          review.sellerResponse.content,
        ].join("\n"),
    ];

    return parts.filter(Boolean).join("\n").trim();
  };

  const extractReviewStats = ($: CheerioAPI): INaver.ReviewStats => {
    const totalCount =
      parseInt($("._9Fgp3X8HT7").text().replace(/,/g, "")) || 0;
    const averageRating =
      parseFloat($("._1T5uchuSaW").text().split(" ")[2]) || 0;

    // 별점 분포 추출
    const ratingDistribution: { [key: number]: number } = {};
    $("._2Vmt6-4BvP").each((_, el) => {
      const rating = parseInt($(el).find("._2brt3S10IE").text());
      const count = parseInt(
        $(el).find("._1JW7r9h1sP").text().replace(/,/g, ""),
      );
      if (!isNaN(rating) && !isNaN(count)) {
        ratingDistribution[rating] = count;
      }
    });

    return {
      totalCount,
      averageRating,
      ratingDistribution,
    };
  };

  const formatReviewStatusOutput = (stats: INaver.ReviewStats): string => {
    const sections = [
      `총 리뷰 수: ${stats.totalCount.toLocaleString()}개`,
      `평균 평점: ${stats.averageRating.toFixed(2)}`,
      "\n별점 분포:",
      ...Object.entries(stats.ratingDistribution)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(
          ([rating, count]) =>
            `${rating}점: ${count.toLocaleString()}개 (${((count / stats.totalCount) * 100).toFixed(1)}%)`,
        ),
    ];

    return sections.join("\n");
  };
}
