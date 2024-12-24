import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";

export namespace INaver {
  export interface NaverStoreProduct {
    brand: string;
    title: string;
    price: {
      original: number;
      sale: number;
      discount: number;
    };
    benefits: {
      points: {
        total: number;
        basic: number;
      };
      events: string[];
      gifts: Array<{
        description: string;
        images: string[];
      }>;
    };
    delivery: {
      type: string;
      fee: string;
      provider: string;
      extraInfo?: string;
    };
    purchase: {
      maxQuantity: number;
    };
  }

  export interface ReviewStats {
    totalCount: number;
    averageRating: number;
    ratingDistribution: {
      [key: number]: number; // key: rating (1-5), value: count
    };
  }

  export interface Review {
    rating: number;
    date: string;
    productOption?: string;
    content: string;
    helpful: number;
    evaluations: {
      [key: string]: string;
    };
    badges: string[];
    images: IWebCrawler.IImage[];
    sellerResponse?: {
      date: string;
      content: string;
    };
  }
}
