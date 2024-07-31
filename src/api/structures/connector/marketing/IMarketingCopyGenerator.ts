import { tags } from "typia";
import { IConnector } from "../../common/IConnector";
import { IKeywordExtraction } from "../extract/IKeywordExtractor";

/**
 * 마케팅 카피를 사용할 채널 목록.
 *
 * @title 마케팅 카피를 사용할 채널.
 */
type ContentChannel =
  | "facebook"
  | "instagram_feed"
  | "instagram_story"
  | "youtube"
  | "naver"
  | "kakao";

/**
 * 마케팅 카피를 사용할 채널에서 가져올 정보.
 *
 * @title 마케팅 카피를 사용할 채널에서 가져올 정보.
 */
type ContentChannelComponent = "title" | "cta" | "subtitle";

/**
 * - `sign_up`: 회원가입
 * - `purchase`: 구매
 * - `visit`: 방문
 *
 * @title 마케팅 하려는 목적.
 */
type MarketingDesiredAction = "sign_up" | "purchase" | "visit";

export interface IMarketingPurpose {
  /**
   * 마케팅을 하려는 목적입니다.
   *
   * 가능한 값으로는 sign_up, purchase, visit 3가지만 가능합니다.
   *
   * @title 마케팅 목적.
   */
  purpose: MarketingDesiredAction;

  /**
   * 마케팅을 할 상품명입니다.
   *
   * @title 마케팅 할 상품명.
   */
  product_name: string;

  /**
   * 상품의 셀링 포인트입니다.
   *
   * @title 상품의 셀링 포인트.
   */
  unique_selling_point: string[];

  /**
   * 마케팅 하려는 제품의 베네핏입니다.
   *
   * @title 마케팅 하려는 제품의 베네핏.
   */
  user_benefit: string[];
}

export interface IDistributionChannel {
  /**
   * 마케팅 카피를 사용할 채널 입니다.
   *
   * 가능한 값으로 facebook, instagram_feed, instagram_story, youtube, naver, kakao 6가지만 가능합니다.
   *
   * @title 마케팅 카피를 사용할 채널.
   */
  channel: ContentChannel;

  /**
   * 마케팅 카피를 사용할 채널에서 가져올 정보입니다.
   *
   * 가능한 값으로 title, cta, subtitle 3가지만 가능합니다.
   *
   * @title 마케팅 카피를 사용할 채널에서 가져올 정보.
   */
  components: ContentChannelComponent[];
}

export interface IMarketingCopyGeneratorRequest {
  /**
   * 마케팅 카피 시안을 생성할 갯수입니다.
   *
   * @title 마케팅 카피 시안을 생성할 갯수.
   */
  number_of_copies: number;

  /**
   * 마케팅 카피 시안을 정렬할 기준입니다.
   *
   * 가능한 값으로 view_count, like_count, rank 3가지만 가능합니다.
   *
   * @title 정렬 기준.
   */
  sort_by?: IConnector.MetricType;

  /**
   * 마케팅 카피 시안 생성시 참고할 자료입니다.
   *
   * @title 참고 자료.
   */
  reference_contents: IConnector.IReferenceContent[];

  /**
   * 마케팅을 하려는 목적입니다.
   *
   * @title 마케팅 목적.
   */
  marketing_purpose: IMarketingPurpose;

  /**
   * 마케팅 시안을 사용할 채널 정보입니다.
   *
   * @title 마케팅 시안을 사용할 채널.
   */
  distribution_channels: IDistributionChannel[];
}

export interface IMarketingCopyComponents {
  /**
   * 마케팅 카피의 제목입니다.
   *
   * @title 마케팅 카피의 제목.
   */
  title: string;

  /**
   * 마케팅 카피의 CTA 문구입니다.
   *
   * @title 마케팅 카피의 CTA 문구.
   */
  cta: string;

  /**
   * 마케팅 카피의 설명입니다.
   *
   * @title 마케팅 카피의 설명.
   */
  subtitle: string;
}

export interface IMarketingCopyImage {
  /**
   * 생성된 마케팅 카피 시안의 이미지 URL입니다.
   *
   * @title 마케팅 카피 시안의 이미지 URL.
   */
  imageUrl: string & tags.Format<"uri"> & tags.ContentMediaType<"image/*">;
}

export namespace IMarketingCopyGenerator {
  /**
   * @title 마케팅 카피 생성을 위한 입력
   */
  export interface IGenerateMarketingCopyInput {
    /**
     * 마케팅 카피의 전반적인 키워드
     *
     * @title 키워드
     */
    keyword: IKeywordExtraction.IExtractKeywordOutput;

    /**
     * 마케팅을 하려는 목적 및 상품 정보
     *
     * @title 마케팅 목적
     */
    marketingPurpose: IMarketingPurpose;

    /**
     * 마케팅 카피를 사용할 채널 정보
     *
     * @title 마케팅 채널
     */
    distributionChannel: IDistributionChannel;

    /**
     * 마케팅 카피 생성을 위한 참고 자료
     *
     * @title 참고 자료
     */
    referenceContent: IConnector.IReferenceContent;
  }

  /**
   * @title 마케팅 카피 생성 결과
   */
  export type IGenerateMarketingCopyOutput = Partial<IMarketingCopyComponents>;

  /**
   * @title 마케팅 카피 이미지 생성을 위한 입력
   */
  export interface IGenerateMarketingCopyImageInput {
    /**
     * 마케팅 카피 이미지과 관련된 마케팅 카피 생성 결과
     *
     * @title 마케팅 카피 생성 결과
     */
    copy: IGenerateMarketingCopyOutput;

    /**
     * 마케팅 카피 이미지의 전반적인 키워드
     *
     * @title 키워드
     */
    keyword: IKeywordExtraction.IExtractKeywordOutput;

    /**
     * 마케팅을 하려는 목적 및 상품 정보
     *
     * @title 마케팅 목적
     */
    marketingPurpose: IMarketingPurpose;

    /**
     * 마케팅 카피를 사용할 채널 정보
     *
     * @title 마케팅 채널
     */
    distributionChannel: IDistributionChannel;

    /**
     * 마케팅 카피 생성을 위한 참고 자료
     *
     * @title 참고 자료
     */
    referenceContent: IConnector.IReferenceContent;
  }

  /**
   * @title 마케팅 카피 이미지 생성 결과
   */
  export type IGenerateMarketingCopyImageOutput = IMarketingCopyImage;
}
