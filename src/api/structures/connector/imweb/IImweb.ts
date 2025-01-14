import { DeepStrictOmit } from "@kakasoo/deep-strict-types";
import { IShoppingSale } from "@samchon/shopping-api/lib/structures/shoppings/sales/IShoppingSale";
import { IShoppingSaleUnit } from "@samchon/shopping-api/lib/structures/shoppings/sales/IShoppingSaleUnit";
import { tags } from "typia";
import { ContentMediaType } from "typia/lib/tags";
import { IPage } from "../../common/IPage";
import { StrictOmit } from "../../types/strictOmit";
import { ICommon } from "../common/ISecretValue";

export namespace IImweb {
  export namespace ShoppingBackend {
    /**
     * @title Sale Unit Summary
     */
    export interface ImwebSaleUnitSummary
      extends DeepStrictOmit<IShoppingSaleUnit, "stocks[*].inventory">,
        Pick<IShoppingSaleUnit.ISummary, "price_range"> {}

    /**
     * It is a type used by samchon/shoping-backend and refers to a product.
     * Here, in order to apply the Imweb product according to the type defined by samchon,
     * different types are Omit and defined.
     *
     * @title Sale
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Sale
      extends DeepStrictOmit<
          IShoppingSale,
          | "seller"
          | "closed_at"
          | "snapshot_id"
          | "suspended_at"
          | "section"
          | "content.thumbnails[*].created_at"
          | "units[*].stocks[*].inventory"
        >,
        IImweb.Common.IProductNumber {}

    /**
     * @title Summary of Sale
     */
    export interface SaleSummary
      extends DeepStrictOmit<
          IShoppingSale.ISummary,
          | "seller.customer"
          | "seller.member"
          | "seller.created_at"
          | "seller.citizen.id"
          | "seller.citizen.created_at"
          | "closed_at"
          | "content.id"
          | "snapshot_id"
          | "suspended_at"
          | "section"
          | "content.thumbnails[*].created_at"
          | "channels[*].created_at"
          | "channels[*].categories[*].created_at"
        >,
        IImweb.Common.IProductNumber {}
  }

  export namespace Common {
    /**
     * @title IError
     */
    export interface IError {
      /**
       * It means an error that can be spat out on the I'm Web.
       *
       * @title Error status code
       */
      statusCode: 400 | 401 | 402 | 403 | 404 | 500;

      /**
       * @title Error Object
       */
      error: {
        /**
         * This is an error that can be spit out by Imweb.
         * It specifies a code that is not related to the HTTP status code to distinguish more detailed errors.
         *
         * @title Error custom code
         */
        errorCode: string;

        /**
         * It refers to a detailed message that fits a custom error code.
         *
         * @title Error message
         */
        message: string;
      };
    }

    /**
     * @title IProductNumber
     */
    export interface IProductNumber {
      /**
       * On the Imweb, the number exists separately from the code value in the product.
       * This number counts the product from 1 for the same unit and starts
       * from 1 for the other unit or site again. The smaller the number,
       * the more recently created product, and if a deleted product exists,
       * there may be an empty number.
       *
       * Since most product search and APIs operate by using the number
       * rather than the product code, you have to inquire the product and deliver the value.
       *
       * @title Product Number
       */
      productNo: number;
    }

    /**
     * @title IUnitCode
     */
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

    /**
     * @title AccessToken
     */
    export interface IAccessToken {
      /**
       * On Imweb, the existing access token also expires on refresh.
       * Therefore, this key cannot be guaranteed to be used unconditionally.
       *
       * @title AccessToken
       */
      accessToken: string;
    }

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
  }

  /**
   * @title Response of getting option details
   */
  export type IGetOptionDetailOutput = IImweb.Common.ResponseForm<{
    /**
     * @title Product Option Detail List
     */
    list: IImweb.ProductOption[];
  }>;

  /**
   * Input condition to look up the details of the option.
   * The details of this option refer to the `option-details` resources defined on the Imweb,
   * and the option or option details may not exist in Sale.
   *
   * @title Condition of getting option details
   */
  export interface IGetOptionDetailInput
    extends IImweb.Common.IUnitCode,
      IImweb.Common.IProductNumber,
      IImweb.Common.IAccessToken {}

  /**
   * @title Response of getting detailed product information
   */
  export type IGetProductDetailOutput =
    IImweb.Common.ResponseForm<IImweb.Product>;

  /**
   * @title Condition of getting detailed product information
   */
  export interface IGetProductDetailInput
    extends IImweb.Common.IProductNumber,
      IImweb.Common.IAccessToken,
      IImweb.Common.IUnitCode {}

  /**
   * @title Response of getting categories
   */
  export type IGetCategoryOutput = IImweb.Common.ResponseForm<
    IImweb.Category[]
  >;

  /**
   * @title Condition of getting cateogires
   */
  export type IGetCategoryInput = IImweb.Common.IAccessToken;

  export interface IRefreshOutput {
    /**
     * It must be 200, OK.
     *
     * @title Status code
     */
    statusCode: 200;
    data: {
      /**
       * @title access token of authenticated site in Imweb OAuth app
       */
      accessToken: string;

      /**
       * It is a refresh token issued by an application
       * registered on the Imweb site, and the token is
       * valid only for the authenticated site.
       *
       * @title refresh token of imweb website
       */
      refreshToken: string;

      /**
       * The scope list that specifies the API that can be called on the Imweb
       *
       * @title scope
       */
      scope: string[];
    };
  }

  export interface IRefreshInput {
    /**
     * It is a refresh token issued by an application
     * registered on the Imweb site, and the token is
     * valid only for the authenticated site.
     *
     * @title refresh token of imweb website
     */
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

  export type IResponse = IPage<IImweb.ShoppingBackend.SaleSummary>;

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

  export interface Category {
    categoryCode: string;
    name: string;
    children: Category[];
  }

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
     * @title Whether or not mobile details are used
     */
    useMobileProdContent: boolean;

    /**
     * @title Description of mobile details
     */
    mobileContent?: string;

    /**
     * @title Setting the sales method
     *
     * It will be 'normal', 'digital' and 'subscribe' product.
     */
    prodType:
      | tags.Constant<"normal", { title: "일반 상품" }>
      | tags.Constant<"digital", { title: "디지털 상품" }>
      | tags.Constant<"subscribe", { title: "회원그룹 이용권" }>;

    /**
     * @title Sales method data
     */
    prodTypeData?: (
      | IImweb.ProdTypeData.DigitalData
      | IImweb.ProdTypeData.SubscribeData
    )[];

    /**
     * @title Whether the sales period is set or not
     */
    usePreSale: boolean;

    /**
     * @title Set up a reserve
     */
    point: IImweb.PointConfigData;

    /**
     * @title Set Discount Usage
     */
    productDiscountOptions: (
      | tags.Constant<"coupon", { title: "Coupon" }>
      | tags.Constant<"point", { title: "Points" }>
      | tags.Constant<"shopping_group_dc", { title: "Shopping Group Discount" }>
    )[];

    isBadgeBest: IImweb.YN;
    isBadgeNew: IImweb.YN;
    isBadgeMd: IImweb.YN;
    isBadgeHot: IImweb.YN;

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
    isExistOptions:
      | tags.Constant<"Y", { title: "Options Exist" }>
      | tags.Constant<"N", { title: "Single Product" }>;

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
   * @title Product Inquiry Request
   */
  export interface IGetProductInput extends IImweb.ISecret {
    /**
     * Page number.
     *
     * @title Page
     */
    page?: number & tags.Type<"uint32"> & tags.Minimum<1> & tags.Default<1>;

    /**
     * Limitation of records per a page.
     *
     * @title Limit
     */
    limit?: number & tags.Type<"uint32"> & tags.Maximum<100> & tags.Default<10>;

    search?: {
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
    };
  }

  /**
   * @title Product inquiry results
   */
  export type IGetProductListOutput =
    IImweb.Common.ResponseSummaryForm<IImweb.ProductSummary>;

  /**
   * @title Condition of Product inquiry
   */
  export interface IGetProductListInput
    extends StrictOmit<IImweb.IGetProductInput, "secretKey">,
      IImweb.Common.IAccessToken,
      IImweb.Common.IUnitCode {}

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

  /**
   * @title Response of getting unit list
   */
  export interface IGetUnitOutput extends IImweb.Common.IUnitCode {
    /**
     * @title Unit Name
     */
    name: string;

    /**
     * @title Whether this unit is the default
     */
    isDefault: boolean;

    /**
     * @title Company and business name
     */
    companyName: string;

    /**
     * @title President name
     */
    presidentName: string;

    /**
     * @title Company registration number
     */
    companyRegistrationNo: string;

    /**
     * @title Registration phone number
     */
    phone?: string;

    /**
     * @title Registration email address
     */
    email?: string;
  }

  /**
   * @title Condition of getting unit list
   */
  export interface IGetUnitInput
    extends IImweb.Common.IUnitCode,
      IImweb.Common.IAccessToken {}

  export type IGetReviewOutput = IImweb.Common.ResponseSummaryForm<{
    reviewNo: number;
    type: "shopping" | "booking";
    channel: "imweb" | "npay" | "talkpay" | "vreview" | "crema";
    reviewCode: string;
    siteCode: string;
    unitCode: string;
    prodNo: number;

    /**
     * @title Member Code
     */
    memberCode: string;

    /**
     * @title Reviewer name or nickname
     */
    nick: string;

    /**
     * @title Review subject
     */
    subject: string;

    /**
     * @title Review content body
     */
    body: string;

    /**
     * @title Review Image URL
     */
    img?: string;

    /**
     * @title whether this review is secret
     */
    secret: IImweb.YN;

    /**
     * @title whether this review is hidden
     */
    isHide: IImweb.YN;

    /**
     * @title Review Views
     */
    readCnt: number;

    /**
     * @title Option name of the product purchased by the reviewer
     */
    prodOption: string;
  }>;

  export interface IGetReviewInput
    extends IImweb.Common.IProductNumber,
      IImweb.Common.IAccessToken {
    /**
     * Page number.
     *
     * @title Page
     */
    page?: number & tags.Type<"uint32"> & tags.Minimum<1> & tags.Default<1>;

    /**
     * Limitation of records per a page.
     *
     * @title Limit
     */
    limit?: number & tags.Type<"uint32"> & tags.Maximum<100> & tags.Default<10>;

    /**
     * @title Rating
     */
    rating?: 1 | 2 | 3 | 4 | 5;

    /**
     * @title Whether this review obtain photos
     */
    isPhoto?: IImweb.YN;

    /**
     *  Indicates the range of dates when you want to search
     * for a review by the time it was added. Here, specify
     * the type of date range (gte/lte: one date, between: two dates)
     *
     * @title a review by the time it was added
     */
    reviewCreateTimeType?: IImweb.Range;

    /**
     * @title Time when the review was added
     */
    reviewCreateTime?: Array<string & tags.Format<"date-time">> &
      tags.MinItems<1> &
      tags.MaxItems<2>;
  }
}
