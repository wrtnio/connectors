import { tags } from "typia";
import { IConnector } from "../../common/IConnector";
import { MyPartial } from "../../types/MyPartial";
import { IKeywordExtraction } from "../extract/IKeywordExtractor";

/**
 * A list of channels on which to use your marketing copy.
 *
 * @title Channels on which to use your marketing copy
 */
type ContentChannel =
  | "facebook"
  | "instagram_feed"
  | "instagram_story"
  | "youtube"
  | "naver"
  | "kakao";

/**
 * Information to pull from the channels you will use your marketing copy on.
 *
 * @title Information to pull from the channels you will use your marketing copy on
 */
type ContentChannelComponent = "title" | "cta" | "subtitle";

/**
 * - `sign_up`: Sign up
 * - `purchase`: Purchase
 * - `visit`: Visit
 *
 * @title Purpose of marketing
 */
type MarketingDesiredAction = "sign_up" | "purchase" | "visit";

export interface IMarketingPurpose {
  /**
   * The purpose is to do marketing.
   *
   * Only three possible values are available: sign_up, purchase, and visit.
   *
   * @title Marketing purpose
   */
  purpose: MarketingDesiredAction;

  /**
   * This is the product name to be marketed.
   *
   * @title This is the product name to be marketed
   */
  product_name: string;

  /**
   * This is the selling point of the product.
   *
   * @title This is the selling point of the product
   */
  unique_selling_point: string[];

  /**
   * Benefits of the product you are marketing.
   *
   * @title Benefits of the product you are marketing
   */
  user_benefit: string[];
}

export interface IDistributionChannel {
  /**
   * Channels to use marketing copy.
   *
   * Only 6 possible values are possible: facebook, instagram_feed, instagram_story, youtube, naver, kakao.
   *
   * @title Channels to use marketing copy
   */
  channel: ContentChannel;

  /**
   * Information to retrieve from the channel where the marketing copy will be used.
   *
   * Only three possible values are possible: title, cta, subtitle.
   *
   * @title Information to retrieve from the channel where the marketing copy will be used
   */
  components: ContentChannelComponent[];
}

export interface IMarketingCopyGeneratorRequest {
  /**
   * The number of marketing copy drafts to be generated.
   *
   * @title The number of marketing copy drafts to be generated
   */
  number_of_copies: number;

  /**
   * The criteria for sorting marketing copy.
   *
   * Only three possible values are available: view_count, like_count, and rank.
   *
   * @title Sort criteria
   */
  sort_by?: IConnector.MetricType;

  /**
   * Here are some reference materials for creating marketing copy.
   *
   * @title Reference Materials
   */
  reference_contents: IConnector.IReferenceContent[];

  /**
   * The purpose is to do marketing.
   *
   * @title Marketing Purpose
   */
  marketing_purpose: IMarketingPurpose;

  /**
   * Channel information for which the marketing plan will be used.
   *
   * @title Channel for which the marketing plan will be used
   */
  distribution_channels: IDistributionChannel[];
}

export interface IMarketingCopyComponents {
  /**
   * The title of your marketing copy.
   *
   * @title The title of your marketing copy
   */
  title: string;

  /**
   * This is the CTA phrase in your marketing copy.
   *
   * @title This is the CTA phrase in your marketing copy
   */
  cta: string;

  /**
   * Here is a description of the marketing copy.
   *
   * @title A description of the marketing copy
   */
  subtitle: string;
}

export interface IMarketingCopyImage {
  /**
   * Image URL of the generated marketing copy draft.
   *
   * @title Image URL of the generated marketing copy draft
   */
  imageUrl: string & tags.Format<"iri"> & tags.ContentMediaType<"image/*">;
}

export namespace IMarketingCopyGenerator {
  /**
   * @title Input for creating marketing copy
   */
  export interface IGenerateMarketingCopyInput {
    /**
     * Overall keywords in your marketing copy
     *
     * @title Keywords
     */
    keyword: IKeywordExtraction.IExtractKeywordOutput;

    /**
     * Purpose of marketing and product information
     *
     * @title Marketing Purpose
     */
    marketingPurpose: IMarketingPurpose;

    /**
     * Channel information for using marketing copy
     *
     * @title Marketing Channel
     */
    distributionChannel: IDistributionChannel;

    /**
     * References for Creating Marketing Copy
     *
     * @title References
     */
    referenceContent: IConnector.IReferenceContent;
  }

  /**
   * @title Marketing Copy Creation Results
   */
  export type IGenerateMarketingCopyOutput =
    MyPartial<IMarketingCopyComponents>;

  /**
   * @title Input for generating marketing copy images
   */
  export interface IGenerateMarketingCopyImageInput {
    /**
     * Marketing Copy Creation Results Related to Marketing Copy Image
     *
     * @title Marketing Copy Creation Results
     */
    copy: IGenerateMarketingCopyOutput;

    /**
     * Overall keywords for marketing copy images
     *
     * @title Keywords
     */
    keyword: IKeywordExtraction.IExtractKeywordOutput;

    /**
     * Purpose of marketing and product information
     *
     * @title Marketing Purpose
     */
    marketingPurpose: IMarketingPurpose;

    /**
     * Channel information for using marketing copy
     *
     * @title Marketing Channel
     */
    distributionChannel: IDistributionChannel;

    /**
     * References for Creating Marketing Copy
     *
     * @title References
     */
    referenceContent: IConnector.IReferenceContent;
  }

  /**
   * @title Marketing copy image creation results
   */
  export type IGenerateMarketingCopyImageOutput = IMarketingCopyImage;
}
