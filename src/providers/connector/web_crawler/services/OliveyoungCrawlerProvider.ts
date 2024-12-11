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

export namespace OliveyoungCrawlerProvider {
  export const crawl = async (
    request: IWebCrawler.IRequest,
  ): Promise<IWebCrawler.IResponse> => {
    // Fetch the page with needed JS instructions
    const $ = await CommonExtractor.fetchPage(
      request,
      `[
        { "wait": 3000 },
        { "click": "a.goods_reputation, #buyOpt" }
      ]`,
    );

    // Extract all product information
    const productInfo = extractProductInfo($);
    const benefitInfo = extractBenefitInfo($);
    const deliveryInfo = extractDeliveryInfo($);
    const paymentInfo = extractPaymentInfo($);

    return {
      text: formatOutput(productInfo, benefitInfo, deliveryInfo, paymentInfo),
      images: await CommonExtractor.extractImages($, $("#tempHtml2")),
      metadata: await extractMetadata($),
      paginationGroups: [],
    };
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
