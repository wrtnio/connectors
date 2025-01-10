import { DeepStrictOmit } from "@kakasoo/deep-strict-types";
import { tags } from "typia";
import { ContentMediaType } from "typia/lib/tags";
import { IPage } from "../../common/IPage";
import { IShoppingSale } from "../../shoppings/sales/IShoppingSale";
import { ICommon } from "../common/ISecretValue";

export namespace IImweb {
  export interface IGetOptionDetailInput extends IUnitCode, IAccessToken {
    product_no: number;
  }

  export interface IGetProductDetailInput extends IUnitCode, IAccessToken {
    product_no: number;
  }

  export interface Error {
    statusCode: 400 | 401 | 402 | 403 | 404 | 500;
    error: {
      errorCode: string;
      message: string;
    };
  }

  export interface IRefreshOutput {
    statusCode: 200;
    data: {
      accessToken: string;
      refreshToken: string;
      scope: string[];
    };
  }

  export interface IRefreshInput {
    refreshToken: string;
  }

  export type ISecret = ICommon.ISecret<
    "imweb",
    [
      "site-info:read",
      "member-info:read",
      "promotion:read",
      "community:read",
      "product:read",
      "order:read",
      "payment:read",
    ]
  >;

  /**
   * @title Response Format of Imweb
   */
  export interface ResponseForm<T> {
    /**
     * @title Status Code
     */
    code: number;

    /**
     * @title Response Data
     */
    data: T;
  }

  /**
   * @title Response Format of Imweb
   */
  export interface ResponseSummaryForm<T> {
    /**
     * @title Status Code
     */
    code: number;

    /**
     * @title Response Data
     */
    data: {
      totalCount: number;
      totalPage: number;
      currentPage: number;
      pageSize: number;
      list: T[];
    };
  }

  export interface IUnitCode {
    /**
     * On Imweb, even one site can have multiple unit codes if
     * it is a multilingual site. For example, when a shopping
     * mall has an English site for Americans and a Korean site
     * for Koreans, two unit codes exist in one site code.
     *
     * These unit codes exist for different price and shipping
     * costs policies in each country in commerce, so they are
     * more than just for distinguishing between user languages.
     *
     * @title Unit Code
     */
    unitCode: string;
  }

  export type IResponse = IPage<IImweb.ProductInfomation>;

  export interface ProductOption {
    optionDetailCode: string;
    isRequire: IImweb.YN;
    isCombine: IImweb.YN;
    price: number;
    stock: number;
    stockSku: string;
    status:
      | tags.Constant<"SALE", { title: "판매중" }>
      | tags.Constant<"SOLDOUT", { title: "품절" }>
      | tags.Constant<"HIDDEN", { title: "숨김" }>;
    optionDetailInfoList: Array<{
      optionCode: string;
      name: string;
      optionValue: {
        optionValueCode: string;
        optionValueName: string;
        color: string;
        imageUrl: string;
      };
    }>;
  }

  export type ProductInfomation = DeepStrictOmit<
    IShoppingSale.ISummary,
    | "channels"
    | "closed_at"
    | "content.id"
    | "snapshot_id"
    | "suspended_at"
    | "section"
    | "tags"
  >;

  /**
   * @title AccessToken
   */
  export interface IAccessToken {
    /**
     * 기존의 키를 재사용하여 리프레시로 인한 만료를 막는다.
     *
     * @title AccessToken
     */
    accessToken: string;
  }

  /**
   * @title Product Inquiry Request
   */
  export interface IGetProductInput
    extends IImweb.IUnitCode,
      IImweb.ISecret,
      Required<IPage.IRequest> {
    /**
     * You can deliver the value when you want to inquire based on the sales status of the product.
     * You can select 'sale', 'soldout', 'nosale'.
     *
     * @title the sales status of a product
     */
    prodStatus?: IImweb.ProductStatus;

    /**
     * There are normal, digital, and subscription types,
     * which mean general commerce products, digital gift
     * certificates, and subscription products.
     * If not, it means the whole product.
     *
     * @title Product Type
     */
    prodType?: IImweb.ProductType;

    /**
     * You can also search with the product's category code,
     * If you don't know the exact category code, it's better not to use it.
     *
     * @title product category code
     */
    category?: string;

    /**
     * This refers to the case of selling with a specific sales
     * period. It will usually be used when selling a limited
     * product or when operating a seasonal system.
     *
     * @title Use of the sales period
     */
    usePreSale?: IImweb.YN;

    /**
     *  Indicates the range of dates when you want to search
     * for a product by the time it was added. Here, specify
     * the type of date range (gte/lte: one date, between: two dates)
     *
     * @title a product by the time it was added
     */
    productAddTimeType?: IImweb.Range;

    /**
     * @title Time when the product was added
     */
    productAddTime?: Array<string & tags.Format<"date-time">> &
      tags.MinItems<1> &
      tags.MaxItems<2>;

    /**
     *  Indicates the range of dates when you want to search
     * for a product by the time it was edited. Here, specify
     * the type of date range (gte/lte: one date, between: two dates)
     *
     * @title a product by the time it was edited
     */
    productEditTimeType?: IImweb.Range;

    /**
     * @title Time when the product was added
     */
    productEditTime?: Array<string & tags.Format<"date-time">> &
      tags.MinItems<1> &
      tags.MaxItems<2>;
  }

  /**
   * @title Product inquiry results
   */
  export type IGetProductOutput = ResponseSummaryForm<IImweb.ProductSummary>;

  export interface Product extends ProductSummary {
    simpleContent: string;
    preSaleStartDate: null | (string & tags.Format<"date-time">);
    preSaleEndDate: null | (string & tags.Format<"date-time">);
  }

  export interface ProductSummary {
    /**
     * @title Product number
     */
    prodNo: number;

    siteCode: string;
    unitCode: string;
    prodCode: string;

    /**
     * @title Category codes
     */
    categories: string[];

    /**
     * @title Name of product
     */
    name: string;

    /**
     * @title Price
     */
    price: number;

    /**
     * To provide an experience as if the product was discounted,
     * the seller can also set the original price of the product differently from the actual price it sells.
     * This is a common sales promotion strategy in commerce.
     *
     * @title The price before the discount
     */
    priceOrg?: number;

    /**
     * @title Whether taxes are included or not
     */
    priceTax: boolean;

    /**
     * @title Status of product
     */
    prodStatus: IImweb.ProductStatus;

    /**
     * @title Custom product code
     */
    customProdCode: string | null;

    /**
     * @title File urls
     *
     * Can't call it right away because it's not a completed URL.
     */
    productImages: (string & ContentMediaType<"image/*">)[];

    /**
     * @title Detailed description
     */
    content: string;

    /**
     * Text that contains html tags and is generally difficult to use
     *
     * @title Simple description of product's content
     */
    simpleContent: string;

    /**
     * Pure string except html tag
     *
     * @title Simple description of product's content
     */
    simple_content_plain: string;

    /**
     * @title Whether or not mobile details are used
     */
    use_mobile_prod_content: boolean;

    /**
     * @title Description of mobile details
     */
    mobile_content?: string;

    /**
     * @title Setting the sales method
     *
     * It will be 'normal', 'digital' and 'subscribe' product.
     */
    prod_type:
      | tags.Constant<"normal", { title: "일반 상품" }>
      | tags.Constant<"digital", { title: "디지털 상품" }>
      | tags.Constant<"subscribe", { title: "회원그룹 이용권" }>;

    /**
     * @title Sales method data
     */
    prod_type_data?: (
      | IImweb.ProdTypeData.DigitalData
      | IImweb.ProdTypeData.SubscribeData
    )[];

    /**
     * @title Whether the sales period is set or not
     */
    use_pre_sale: boolean;

    /**
     * @title Set up a reserve
     */
    point: IImweb.PointConfigData;

    /**
     * @title Set Discount Usage
     */
    product_discount_options: (
      | tags.Constant<"coupon", { title: "Coupon" }>
      | tags.Constant<"point", { title: "Points" }>
      | tags.Constant<"shopping_group_dc", { title: "Shopping Group Discount" }>
    )[];

    /**
     * @title Product Weight
     */
    weight: string;

    /**
     * @title Product Stock Information
     */
    stock: IImweb.ProdStockConfigData;

    /**
     * @title Origin
     */
    origin: string;

    /**
     * @title Manufacturer
     */
    maker: string;

    /**
     * @title Brand
     */
    brand: string;

    /**
     * @title Badge Information
     */
    badge: IImweb.ProdBadgeData;

    /**
     * @title External Integration Information
     */
    sync: IImweb.ProdSyncData;

    /**
     * @title Miscellaneous Settings
     */
    etc: IImweb.ProdEtcData;

    /**
     * @title Product Information Disclosure
     *
     * Type is not specified, so it is denoted as an array of `any`.
     */
    prodinfo: any[];

    /**
     * @title Existence of Product Options
     */
    is_exist_options:
      | tags.Constant<"Y", { title: "Options Exist" }>
      | tags.Constant<"N", { title: "Single Product" }>;

    /**
     * @title Combination Option for Product
     */
    is_mix:
      | tags.Constant<"Y", { title: "Combination Option" }>
      | tags.Constant<"N", { title: "Single Option" }>;

    /**
     * @title Product Add Time Timestamp
     */
    addTime: string & tags.Format<"date-time">;

    /**
     * @title Product Last Edit Time Timestamp
     */
    editTime: string & tags.Format<"date-time">;
  }

  /**
   * @title Range
   */
  export type Range =
    | tags.Constant<"GTE", { title: "greater than or Equal" }>
    | tags.Constant<"LTE", { title: "less than or Equal" }>
    | tags.Constant<"BETWEEN", { title: "between specified periods" }>;

  /**
   * @title Boolean
   */
  export type YN =
    | tags.Constant<"Y", { title: "TRUE" }>
    | tags.Constant<"N", { title: "FALSE" }>;

  /**
   * @title Type Of Product
   */
  export type ProductType =
    | tags.Constant<"normal", { title: "general commerce products" }>
    | tags.Constant<"digital", { title: "digital gift certificates" }>
    | tags.Constant<"subscribe", { title: "subscription products" }>;

  /**
   * @title Status of Product
   */
  export type ProductStatus =
    | tags.Constant<"sale", { title: "sale" }>
    | tags.Constant<"soldout", { title: "soldout" }>
    | tags.Constant<"nosale", { title: "hidden products" }>;

  export namespace ProdTypeData {
    export interface DigitalData {
      /**
       * @title Download Limit Setting
       */
      use_limit: boolean;

      /**
       * @title Period Limit
       */
      period: number & tags.Type<"int64">;

      /**
       * @title Usage Limit
       */
      maximum: number & tags.Type<"int64">;
    }

    export interface SubscribeData {
      /**
       * @title Target Group Code
       */
      group_code: string;

      /**
       * @title Group Retention Period (Days)
       */
      period: number & tags.Type<"int64">;
    }
  }
  /**
   * @title Point Configuration Data Structure
   */
  export interface PointConfigData {
    /**
     * @title Point Configuration Type
     */
    type:
      | tags.Constant<"common", { title: "Default Settings" }>
      | tags.Constant<"individual", { title: "Individual Point Settings" }>;

    /**
     * @title Point Accumulation Unit
     */
    value_type?:
      | tags.Constant<"percent", { title: "Percentage" }>
      | tags.Constant<"price", { title: "Currency Unit" }>;

    /**
     * @title Point Value
     *
     * Calculated as a percentage if `value_type` is percent
     */
    value?: `${number}`;
  }

  /**
   * @title Product Stock Information Data Structure
   */
  export interface ProdStockConfigData {
    /**
     * @title Use Stock
     */
    stock_use: boolean;

    /**
     * @title Allow Orders After Stock Depletion
     */
    stock_unlimit: boolean;

    /**
     * @title Product Stock Quantity
     */
    stock_no_option: (number & tags.Type<"int64">) | "";

    /**
     * @title Product Stock Number (SKU)
     */
    sku_no_option: (number & tags.Type<"int64">) | "";
  }

  /**
   * @title Badge Information Data Structure
   */
  export interface ProdBadgeData {
    /**
     * @title New Product
     */
    new: boolean;

    /**
     * @title Best Product
     */
    best: boolean;

    /**
     * @title MD Recommended
     */
    md: boolean;

    /**
     * @title High Demand
     */
    hot: boolean;
  }

  /**
   * @title External Integration Information Data Structure
   */
  export interface ProdSyncData {
    /**
     * @title Product Name for Naver and Kakao Shopping Exposure
     */
    pay_product_name: string;

    /**
     * @title Naver Shopping Event Phrase
     */
    event_words: string;

    /**
     * @title Naver Shopping Category ID
     */
    naver_category: string;

    /**
     * @title Naver Shopping Sales Method
     */
    product_flag:
      | tags.Constant<"소매", { title: "Retail" }>
      | tags.Constant<"도매", { title: "Wholesale" }>
      | tags.Constant<"렌탈", { title: "Rental" }>
      | tags.Constant<"대여", { title: "Lease" }>
      | tags.Constant<"할부", { title: "Installment" }>
      | tags.Constant<"예약판매", { title: "Pre-order" }>
      | tags.Constant<"구매대행", { title: "Buying Agent" }>;

    /**
     * @title Naver Shopping Product Condition
     */
    product_condition:
      | tags.Constant<"신상품", { title: "New" }>
      | tags.Constant<"중고", { title: "Used" }>
      | tags.Constant<"리퍼", { title: "Refurbished" }>
      | tags.Constant<"전시", { title: "Exhibition" }>
      | tags.Constant<"반품", { title: "Returned" }>
      | tags.Constant<"스크래치", { title: "Scratch" }>;

    /**
     * @title Overseas Buying Agent
     */
    import_flag: boolean;

    /**
     * @title Parallel Import
     */
    parallel_import: boolean;

    /**
     * @title Cultural Performance Income Deduction
     */
    is_culture_benefit: boolean;

    /**
     * @title Made to Order
     */
    order_made: boolean;
  }

  /**
   * @title Miscellaneous Settings Data Structure
   */
  export interface ProdEtcData {
    /**
     * @title Minimum Purchase Quantity
     */
    minimum_purchase_quantity: number & tags.Type<"int64">;

    /**
     * @title Maximum Quantity per Purchase
     */
    maximum_purchase_quantity: number & tags.Type<"int64">;

    /**
     * @title Maximum Quantity per Member Purchase
     */
    member_maximum_purchase_quantity: number & tags.Type<"int64">;

    /**
     * @title Maximum Purchase Quantity Limit Type for Free Options
     */
    optional_limit_type:
      | tags.Constant<
          "relative",
          { title: "Can Purchase as Much as the Main Product" }
        >
      | tags.Constant<"limit", { title: "Maximum Purchase Quantity Limit" }>
      | tags.Constant<"unique", { title: "Can Purchase Only One" }>;

    /**
     * @title Maximum Purchase Quantity for Free Options
     *
     * Maximum Purchase Quantity Limit
     */
    optional_limit?: number & tags.Type<"int64">;

    /**
     * @title use_unipass_number
     */
    use_unipass_number:
      | tags.Constant<
          "default",
          {
            title: "Follow Default Method";
            description: "May vary depending on shopping environment settings";
          }
        >
      | tags.Constant<"Y", { title: "Use" }>
      | tags.Constant<"N", { title: "Do Not Use" }>;

    /**
     * @title Minor Purchase Restriction
     */
    adult: boolean;
  }

  /**
   * @title Imweb Token Issuance Request Response DTO
   */
  export interface IGetAccessTokenOutput {
    /**
     * @title Response Message
     */
    msg: "SUCCESS";

    /**
     * @title IMWEB Custom Code
     */
    code: tags.Constant<200, { title: "Value Indicating Success" }>;

    /**
     * @title HTTP Status Code
     */
    http_code: tags.Constant<200, { title: "HTTP STATUS CODE 200" }>;

    /**
     * @title Access Token
     */
    access_token: string;
  }
}
