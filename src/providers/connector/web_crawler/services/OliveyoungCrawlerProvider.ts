import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { CommonExtractor } from "../extractors/CommonExtractor";
import { CheerioAPI } from "cheerio";

interface ProductInfo {
  brand: string;
  name: string;
  originalPrice: string;
  salePrice: string;
  flags: string[];
  viewCount: string;
  options: ProductOption[];
}

interface ProductOption {
  name: string;
  price: string;
  imageUrl: string;
  todayDelivery: boolean;
}

interface BenefitInfo {
  discount: string;
  coupon: string;
  totalPrice: string;
}

interface Review {
  author: string;
  topReviewer?: string;
  date: string;
  rating: number;
  option?: string;
  content: string;
  photos: string[];
  helpful: number;
  evaluations: {
    scent?: string;
    lasting?: string;
    packaging?: string;
  };
  isMonthLongUse?: boolean;
}

export namespace OliveyoungCrawlerProvider {
  export const crawl = async (
    request: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse> => {
    const $ = await CommonExtractor.fetchPage(
      request,
      `[
        { "click": "#buyOpt" },
        {"wait_for": ".option_list"},
        
        { "click": "//*[@id='reviewInfo']" },
        { "wait_for": "#gdasList > li:nth-child(1)" }
      ]`,
    );

    const productInfo = extractProductInfo($);
    const benefitInfo = extractBenefitInfo($);
    const deliveryInfo = extractDeliveryInfo($);
    const paymentInfo = extractPaymentInfo($);

    const imageSelectors = [
      "#prd_thumb_list li img",
      "#prd_thumb_list li a[data-img]",
      "#tempHtml2 > div:nth-child(4) img.s-loaded",
      "#tempHtml2 > div:nth-child(4) img[data-src]",
    ];

    const allImages = await Promise.all(
      imageSelectors.map((selector) =>
        CommonExtractor.extractImages($, $(selector)),
      ),
    );
    const images = allImages.flat();

    const uniqueImages = [
      ...new Map(images.map((img) => [img.url, img])).values(),
    ];

    const reviewsPaginationGroup = await extractPaginatedReviews($, request);

    return {
      text: formatOutput(productInfo, benefitInfo, deliveryInfo, paymentInfo),
      images: uniqueImages,
      metadata: await extractMetadata($),
      paginationGroups: reviewsPaginationGroup,
    };
  };

  const extractPaginatedReviews = async (
    $: CheerioAPI,
    request: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse["paginationGroups"]> => {
    const pages: IWebCrawler.IPage[] = [];
    let currentPageHtml = $;
    const maxPages = request.pagination?.followNextPageCount ?? 10;

    const collectPageData = (html: CheerioAPI): IWebCrawler.IPage => {
      const reviews = extractReviews(html);
      const extractPagination = extractPaginationInfo(html);
      const paginationInfo = extractPagination.pagination;

      return {
        url: request.url,
        data: reviews.map((review) => ({
          text: formatReviewText(review),
          images: review.photos.map((url) => ({
            url,
            alt: "리뷰 이미지",
            classNames: ["review-image"],
          })),
        })),
        classNames: ["review-page"],
        pagination: {
          type: "numbered",
          hasNextPage: paginationInfo.hasNextPage,
          currentPage: paginationInfo.currentPage,
          nextPageNo: paginationInfo.nextPageNo,
        },
      };
    };

    pages.push(collectPageData(currentPageHtml));

    if (request.pagination?.followNextPage === true) {
      let currentPageNum = 1;

      while (currentPageNum < maxPages) {
        const extractPagination = extractPaginationInfo(currentPageHtml);
        const paginationInfo = extractPagination.pagination;

        if (!paginationInfo.hasNextPage || !paginationInfo.nextPageNo) {
          break;
        }

        try {
          const nextPageHtml = await CommonExtractor.fetchPage(
            request,
            buildClickInstructions(
              extractPagination.nextButton,
              paginationInfo.nextPageNo,
            ),
          );

          pages.push(collectPageData(nextPageHtml));

          currentPageHtml = nextPageHtml;
          currentPageNum++;
        } catch (error) {
          console.error("Failed to fetch next page:", error);
          break;
        }
      }
    }

    return [
      {
        identifier: ["review-list"],
        pages,
      },
    ];
  };

  const formatReviewText = (review: Review): string => {
    const badges = [
      review.topReviewer ? "[파워리뷰어]" : "",
      review.isMonthLongUse ? "[한달사용]" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const evaluationTexts = Object.entries(review.evaluations)
      .filter(([_, value]) => value)
      .map(([key, value]) => {
        const koreanKey = {
          scent: "향",
          lasting: "지속력",
          packaging: "포장상태",
        }[key as keyof typeof review.evaluations];
        return `${koreanKey}: ${value}`;
      });

    return [
      `${badges ? badges + " " : ""}${review.author} (${review.date})`,
      `평점: ${"★".repeat(Math.round(review.rating))}${"☆".repeat(5 - Math.round(review.rating))} (${review.rating})`,
      review.option ? `옵션: ${review.option}` : "",
      evaluationTexts.length > 0 ? `평가: ${evaluationTexts.join(" / ")}` : "",
      `내용: ${review.content}`,
      review.helpful > 0 ? `도움됐어요: ${review.helpful}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const extractPaginationInfo = (
    $: CheerioAPI,
  ): { pagination: IWebCrawler.IPagination; nextButton: boolean } => {
    const paginationContainer = $(".pageing");
    if (!paginationContainer.length) {
      return {
        pagination: {
          type: "numbered",
          currentPage: 1,
          hasNextPage: false,
        },
        nextButton: false,
      };
    }

    const currentPageElement = paginationContainer.find("strong");
    const currentPage = currentPageElement.length
      ? parseInt(currentPageElement.text().trim())
      : 1;

    const nextPageNo = currentPage + 1;

    const hasNextPageNumber =
      paginationContainer.find(`a[data-page-no="${nextPageNo}"]`).length > 0;
    const hasNextButton = paginationContainer.find(".next").length > 0;
    const hasNextPage = hasNextPageNumber || hasNextButton;

    return {
      pagination: {
        type: "numbered",
        currentPage,
        hasNextPage,
        nextPageNo: hasNextPage ? nextPageNo : undefined,
      },
      nextButton: !hasNextPageNumber && hasNextButton,
    };
  };

  const buildClickInstructions = (
    nextButton: boolean,
    pageNo: number,
  ): string => {
    if (nextButton) {
      return `[
        { "click": "#buyOpt" },
        {"wait_for": ".option_list"},
        
        { "click": "//*[@id='reviewInfo']" },
        { "wait_for": "#gdasList > li:nth-child(1)" },
        
        { "click": ".pageing .next" },
        { "wait_for": "#gdasList > li:nth-child(1)" }
      ]`;
    }

    return `[
        { "click": "#buyOpt" },
        { "wait_for": ".option_list"},
        
        { "click": "//*[@id='reviewInfo']" },
        { "wait_for": "#gdasList > li:nth-child(1)" },
        { "wait": 1000 },
        
        { "click": "a[data-page-no='${pageNo}']" },
        { "wait": 2000 }
      ]`;
  };

  const extractProductInfo = ($: CheerioAPI): ProductInfo => {
    return {
      brand: $(".prd_brand a").text().trim(),
      name: $(".prd_name").text().trim(),
      originalPrice: $(".price-1 strike").text().trim(),
      salePrice: $(".price-2 strong").text().trim(),
      flags: $(".prd_flag span")
        .map((_, el) => $(el).text().trim())
        .get(),
      viewCount: $("#goodsViewNum").text().trim(),
      options: extractProductOptions($),
    };
  };

  const extractProductOptions = ($: CheerioAPI): ProductOption[] => {
    const options: ProductOption[] = [];

    $("#option_list li.type1").each((_, element) => {
      const $option = $(element);

      const name = $option
        .find(".option_value")
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim();

      const price = $option.find(".tx_num").text().trim();
      const imageUrl = $option.find(".color img").attr("src") || "";
      const todayDelivery = $option.find(".icon_flag.delivery").length > 0;

      options.push({
        name,
        price,
        imageUrl,
        todayDelivery,
      });
    });

    return options;
  };

  const extractBenefitInfo = ($: CheerioAPI): BenefitInfo => {
    const saleLayer = $("#saleLayer");
    return {
      discount: saleLayer.find(".price_child .price").first().text().trim(),
      coupon: saleLayer
        .find(".price_child .flex-item:contains('쿠폰')")
        .find(".price")
        .text()
        .trim(),
      totalPrice: saleLayer.find(".price.total").text().trim(),
    };
  };

  const extractDeliveryInfo = ($: CheerioAPI): string[] => {
    return $(".bl_list li")
      .map((_, el) => {
        const $li = $(el);
        const type = $li.find("span").first().text().trim();
        const info = $li.find("div").text().trim();
        return `${type}: ${info}`;
      })
      .get();
  };

  const extractPaymentInfo = ($: CheerioAPI): string[] => {
    return $(".row:contains('결제혜택') .txt_list p")
      .map((_, el) => $(el).text().trim())
      .get();
  };

  const extractReviews = ($: CheerioAPI): Review[] => {
    const reviews: Review[] = [];

    $("#gdasList li").each((_, element) => {
      const $review = $(element);

      const content = $review.find(".txt_inner").text().trim();
      const author = $review.find(".info_user .id").text().trim();

      if (!content || !author) {
        return;
      }

      const topReviewer = $review.find(".info_user .top").text().trim();
      const rating =
        $review.find(".review_point .point").css("width")?.replace("%", "") ??
        "0";
      const date = $review.find(".score_area .date").text().trim();
      const option = $review.find(".item_option").text().trim();

      const evaluations: Review["evaluations"] = {};
      $review.find(".poll_type1").each((_, el) => {
        const type = $(el).find("dt span").text().trim();
        const value = $(el).find("dd .txt").text().trim();

        switch (type) {
          case "향":
            evaluations.scent = value;
            break;
          case "지속력":
            evaluations.lasting = value;
            break;
          case "포장상태":
            evaluations.packaging = value;
            break;
        }
      });

      const photos = $review
        .find(".review_thum img")
        .map((_, img) => $(img).attr("src") || "")
        .get()
        .filter((url) => url && url.length > 0);

      const helpful =
        parseInt($review.find(".recom_area .num").text().trim()) || 0;

      const isMonthLongUse =
        $review.find(".point_flag:contains('한달이상사용')").length > 0;

      reviews.push({
        author,
        topReviewer: topReviewer || undefined,
        date,
        rating: parseInt(rating) / 20,
        option: option || undefined,
        content,
        photos,
        helpful,
        evaluations,
        isMonthLongUse,
      });
    });

    return reviews;
  };

  const extractMetadata = async (
    $: CheerioAPI,
  ): Promise<IWebCrawler.IMetadata> => {
    const metadata = await CommonExtractor.extractMetadata($);
    const productInfo = extractProductInfo($);

    return {
      ...metadata,
      brand: productInfo.brand,
      productName: productInfo.name,
      originalPrice: productInfo.originalPrice,
      salePrice: productInfo.salePrice,
    };
  };

  const formatOutput = (
    productInfo: ProductInfo,
    benefitInfo: BenefitInfo,
    deliveryInfo: string[],
    paymentInfo: string[],
  ): string => {
    const sections = [
      `Brand: ${productInfo.brand}`,
      `Product Name: ${productInfo.name}`,
      `Price: ${productInfo.originalPrice}won → ${productInfo.salePrice}won`,
      `Product Tags: ${productInfo.flags.join(", ")}`,
      `Views: ${productInfo.viewCount} people`,
      "\n[Product Options]",
      ...productInfo.options.map(
        (opt) =>
          `- ${opt.name}\n  Price: ${opt.price}\n  Today Delivery: ${opt.todayDelivery ? "Yes" : "No"}`,
      ),
      "\n[Discount Information]",
      `- Discount: ${benefitInfo.discount}`,
      `- Coupon: ${benefitInfo.coupon}`,
      `- Final Price: ${benefitInfo.totalPrice}`,
      "\n[Delivery Information]",
      ...deliveryInfo.map((info) => `- ${info}`),
      "\n[Payment Benefits]",
      ...paymentInfo.map((info) => `- ${info}`),
    ];

    return sections.join("\n");
  };
}
