import type { JMESPath, Placeholder, Prerequisite } from "@wrtnio/decorators";
import type { tags } from "typia";
import { DeepStrictMerge } from "../../../../utils/types/DeepStrictMerge";
import { MyPartial } from "../../../../utils/types/MyPartial";
import { ICommon } from "../common/ISecretValue";

export namespace IGoogleAds {
  export interface IGetMetricInput extends IGoogleAds.ISecret {
    /**
     * @title 통계 조회 날짜
     */
    date: string & tags.Format<"date">;
  }

  export interface IGetMetricOutputResult {
    metrics: {
      /**
       * @title 노출 수
       */
      impressions: `${number & tags.Type<"int64">}`;

      /**
       * @title 클릭 수
       */
      clicks: `${number & tags.Type<"int64">}`;

      /**
       * @title 광고 지출 (마이크로 단위)
       * @description 1,000,000분의 1로 원화 가치 표시
       */
      costMicros: `${number & tags.Type<"int64">}`;

      /**
       * @title 비디오 뷰
       */
      videoViews: `${number & tags.Type<"int64">}`;

      /**
       * @title 평균 페이지 뷰
       */
      averagePageViews?: `${number & tags.Type<"int64">}`;

      /**
       * @title 동영상을 25% 본 수
       */
      videoQuartileP25Rate?: `${number & tags.Type<"int64">}`;

      /**
       * @title 동영상을 50% 본 수
       */
      videoQuartileP50Rate?: `${number & tags.Type<"int64">}`;

      /**
       * @title 동영상을 75% 본 수
       */
      videoQuartileP75Rate?: `${number & tags.Type<"int64">}`;

      /**
       * @title 동영상을 100% 본 수
       */
      videoQuartileP100Rate?: `${number & tags.Type<"int64">}`;
    };

    adGroupAd: Pick<AdGroupAd, "resourceName">;
  }

  export interface IGetAdGroupAdInput extends IGoogleAds.ISecret {
    /**
     * @title 광고 그룹 광고의 리소스 명
     */
    adGroupAdResourceName?: IGoogleAds.AdGroupAd["resourceName"] &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/get-ads";
        jmesPath: JMESPath<
          IGetAdGroupAdOutput,
          "[].{value:resourceName, label:resourceName}"
        >;
      }>;
  }

  export type IGetAdGroupAdOutput = Pick<
    AdGroupAd,
    "resourceName" | "policySummary" | "status"
  >[];

  export interface IGetAdGroupAdDetailInput extends IGoogleAds.ISecret {
    /**
     * @title 광고 그룹 광고의 리소스 명
     */
    adGroupAdResourceName: IGoogleAds.AdGroupAd["resourceName"] &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/get-ads";
        jmesPath: JMESPath<
          IGetAdGroupAdOutput,
          "[].{value:resourceName, label:resourceName}"
        >;
      }>;
  }

  export interface Ad {
    resourceName: `customers/${number}/ads/${number}`;

    status: Status;
  }

  export interface IGetAdGroupAdDetailOutput {
    /**
     * @title 광고 그룹 광고의 리소스 명
     */
    resourceName: AdGroupAd["resourceName"];

    /**
     * @title 광고의 현재 상태
     */
    status: Ad["status"];

    /**
     * @title 조회한 광고 내역
     */
    ad: {
      /**
       * @title 광고의 리소스 명
       */
      resourceName: Ad["resourceName"];

      /**
       * @title 광고 소재 정보
       */
      detail: ResponsiveSearchAd | ResponsiveDisplayAd;
    };
  }

  export interface ResponsiveSearchAd {
    /**
     * @title 설명 목록
     */
    descriptions: {
      /**
       * @title 등록된 설명
       */
      text: string;
    }[];

    /**
     * @title 제목 목록
     */
    headlines: {
      /**
       * @title 등록된 제목
       */
      text: string;
    }[];
  }

  export interface ResponsiveDisplayAd extends ResponsiveSearchAd {
    /**
     * @title 긴 제목
     */
    longHeadline: any;

    /**
     * @title 브랜드 이름
     */
    businessName: any;

    marketingImages: any;
    squareMarketingImages: any;
    squareLogoImages: any;
  }
  export interface IUpdateSearchAdInput {
    /**
     * @title 광고 그룹 광고의 리소스 명
     */
    adGroupAdResourceName: IGoogleAds.AdGroupAd["resourceName"] &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/get-ads";
        jmesPath: JMESPath<
          IGetAdGroupAdOutput,
          "[].{value:resourceName, label:resourceName}"
        >;
      }>;
  }

  export interface ISetOnOffInput extends IGoogleAds.ISecret {
    /**
     * @title 광고 그룹 광고의 리소스 명
     */
    adGroupAdResourceName: AdGroupAd["resourceName"] &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/get-ads";
        jmesPath: JMESPath<
          IGetAdGroupAdOutput,
          "[].{value:resourceName, label:resourceName}"
        >;
      }>;

    /**
     * @title 광고 상태
     */
    status:
      | tags.Constant<"ENABLED", { title: "ENABLED" }>
      | tags.Constant<"PAUSED", { title: "PAUSED" }>;
  }

  /**
   * @title 키워드 삭제 조건
   */
  export interface IDeleteAdGroupCriteriaInput extends IGoogleAds.ISecret {
    /**
     * @title 삭제할 키워드의 아이디
     */
    resourceNames: (AdGroupCriterion["resourceName"] &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/get-keywords";
        jmesPath: JMESPath<
          IGetKeywordsOutput,
          "[].adGroupCriterion.{value:resourceName, label:text}"
        >;
      }>)[];
  }

  /**
   * @title 키워드 생성 결과
   */
  export type ICreateAdGroupCriteriaOutput = Array<
    IGoogleAds.AdGroupCriterion["resourceName"]
  >;

  export interface ICreateAdGroupCriteriaInput
    extends Omit<ICreateKeywordInput, "customerId">,
      IGoogleAds.ISecret {
    /**
     * @title 키워드를 추가할 광고 그룹의 리소스 네임
     */
    adGroupResourceName: AdGroup["resourceName"] &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/get-ad-groups";
        jmesPath: JMESPath<
          IGetAdGroupOutput,
          "[].adGroup.{value:resourceName, label:resourceName}"
        >;
      }>;
  }

  export interface Keyword {
    /**
     * @title 키워드 텍스트
     */
    text: string;

    /**
     * @title 키워드 일치 타입
     */
    matchType:
      | tags.Constant<"UNSPECIFIED", { title: "명시되지 않음" }>
      | tags.Constant<"UNKNOWN", { title: "알 수 없음" }>
      | tags.Constant<"EXACT", { title: "완전일치" }>
      | tags.Constant<"PHRASE", { title: "구문일치" }>
      | tags.Constant<"BROAD", { title: "확장검색" }>;
  }

  export type AdGroupCriterion = {
    /**
     * @title 광고 그룹 표준 리소스 이름
     *
     * `customers/${number}/adGroupCriteria/number~${number}` 형식
     */
    resourceName: string &
      tags.Pattern<"(customers\\/(.*)\\/adGroupCriteria\\/[+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?~[+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)"> &
      Placeholder<"customers/1/adGroupCriteria/1">;

    /**
     * @title 타입
     */
    type: "KEYWORD";

    /**
     * @title 광고 그룹 표준 아이디
     */
    criterionId: `${number}`;

    /**
     * @title 키워드
     */
    keyword: Keyword;

    /**
     * @title 광고 그룹 표준 상태
     */
    status: IGoogleAds.Status;
  };

  export interface IGetKeywordsOutputResult {
    adGroupCriterion: Pick<
      AdGroupCriterion,
      | "criterionId"
      | "resourceName"
      | "type"
      | "criterionId"
      | "keyword"
      | "status"
    > &
      Keyword;
  }

  /**
   * @title 키워드 조회 결과
   */
  export type IGetKeywordsOutput = IGetKeywordsOutputResult[];

  /**
   * @title 키워드 조회 조건
   */
  export interface IGetKeywordsInput extends IGoogleAds.ISecret {
    /**
     * @title 광고 그룹 리소스 명
     */
    adGroupResourceName: AdGroup["resourceName"] &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/get-ad-groups";
        jmesPath: JMESPath<
          IGetAdGroupOutput,
          "[].adGroup.{value:resourceName, label:resourceName}"
        >;
      }>;
  }

  /**
   * @title 키워드 생성 조건
   */
  export interface ICreateKeywordInput
    extends Required<Pick<IGoogleAds.ISecret, "customerId">> {
    /**
     * @title 생성할 키워드
     */
    keywords: string[];
  }

  export interface AdGroup {
    /**
     * @title 광고 그룹의 아이디
     */
    id: `${number}`;

    /**
     * `customers/${number}/adGroups/${number}` 형식
     *
     * @title 광고 그룹 리소스 명
     */
    resourceName: string &
      tags.Pattern<"(customers\\/[+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\/adGroups\\/[+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)"> &
      Placeholder<"customers/1/adGroups/1">;

    /**
     * @title 광고 그룹 이름
     */
    name: string;

    /**
     * @title 광고 그룹의 타입
     */
    type:
      | tags.Constant<"SEARCH_STANDARD", { title: "검색 광고" }>
      | tags.Constant<"DISPLAY_STANDARD", { title: "디스플레이 광고" }>; // campaign으로부터 가져오게 한다.
  }

  export interface IGetAdGroupInput
    extends Pick<IGoogleAds.ISecret, "customerId">,
      Pick<IGoogleAds.ISecret, "secretKey"> {
    /**
     * @title 부모 캠페인의 아이디
     * @description 해당 캠페인의 아이디만 검색하고 싶을 경우
     */
    campaignId?: Campaign["id"] &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/get-campaigns";
        jmesPath: JMESPath<
          IGetCampaignsOutput,
          "[].campaign.{value:name, label:id}"
        >;
      }>;

    /**
     * @title 광고 그룹의 리소스 명
     * @description 해당 광고 그룹 리소스 명으로만 검색하고 싶을 경우
     */
    adGroupResourceName?: AdGroup["resourceName"];
  }

  export interface IGetGoogleAdGroupOutput {
    results: IGetAdGroupOutputResult[];
  }

  export interface IGetAdGroupOutputResult {
    campaign: Pick<Campaign, "id" | "resourceName" | "status">;

    adGroup: Pick<AdGroup, "id" | "type" | "name" | "resourceName">;
  }

  export interface AdGroupAd {
    /**
     * `customers/${number}/adGroupAds/${number}~${number}` 형식
     *
     * @title 광고 그룹 광고의 리소스 명
     */
    resourceName: string &
      tags.Pattern<"(customers\\/[+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\/adGroupAds\\/[+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?~[+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)"> &
      Placeholder<"customers/1/adGroupAds/1~1">;

    /**
     * @title 광고 심사 및 정책에 대한 평가 내역
     */
    policySummary: {
      /**
       * @title 광고의 승인 여부
       * @description 구글에서 해당 광고가 송출되어도 무방한지 판단한 내용입니다.
       */
      approvalStatus:
        | tags.Constant<"APPROVED", { title: "승인됨" }>
        | tags.Constant<"APPROVED_LIMITED", { title: "제한된 승인" }>
        | tags.Constant<
            "AREA_OF_INTEREST_ONLY",
            { title: "특정 영역에 대한 허용" }
          >
        | tags.Constant<"DISAPPROVED", { title: "비승인" }>
        | tags.Constant<"UNKNOWN", { title: "알 수 없음" }>
        | tags.Constant<"UNSPECIFIED", { title: "명시되지 않음" }>;

      /**
       * @title 광고의 검토 상태
       * @description 검토가 완료된 광고만이 승인, 비승인 여부를 알 수 있습니다.
       */
      reviewStatus:
        | tags.Constant<"ELIGIBLE_MAY_SERVE", { title: "자격을 갖춤" }>
        | tags.Constant<"REVIEWED", { title: "검토되었음" }>
        | tags.Constant<"REVIEW_IN_PROGRESS", { title: "검토 중임" }>
        | tags.Constant<"UNDER_APPEAL", { title: "심사 중임" }>
        | tags.Constant<"UNKNOWN", { title: "알 수 없음" }>
        | tags.Constant<"UNSPECIFIED", { title: "명시되지 않음" }>;
    };

    /**
     * @title 광고의 상태
     */
    status: IGoogleAds.Status;
  }

  /**
   * @title 광고 그룹 생성 조건
   */
  export type ICreateAdGroupInput =
    | ICreateSearchAdGroupInput
    | ICreateDisplayAdGroupInput;

  /**
   * @title 광고 그룹 생성 공통
   */
  export interface ICreateAdGroupCommon
    extends Required<Pick<IGoogleAds.ISecret, "customerId">> {
    /**
     * @title 캠페인 리소스 이름
     */
    campaignResourceName: Campaign["resourceName"] &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/get-campaigns";
        jmesPath: JMESPath<
          IGetCampaignsOutput,
          "[].campaign.{value:name, label:id}"
        >;
      }>;
  }

  /**
   * @title 검색 광고 그룹 생성 조건
   */
  export interface ICreateSearchAdGroupInput extends ICreateAdGroupCommon {
    /**
     * @title 광고 그룹 타입
     */
    type: Extract<AdGroup["type"], "SEARCH_STANDARD">;
  }

  /**
   * @title 디스플레이 광고 그룹 생성 조건
   */
  export interface ICreateDisplayAdGroupInput extends ICreateAdGroupCommon {
    /**
     * @title 광고 그룹 타입
     */
    type: Extract<AdGroup["type"], "DISPLAY_STANDARD">;
  }

  export type ICreateAdGroupAdAtOnceInput =
    | ICreateAdGroupSearchAdAtOnceInput
    | ICreateAdGroupDisplayAdAtOnceInput;

  export interface ICreateAdGroupSearchAdAtOnceInputCommon {
    /**
     * @title 캠페인 생성 조건
     */
    campaign: Omit<ICreateCampaignInput, "customerId" | "type" | "secretKey">;
  }

  /**
   * @title 구글 검색 캠페인부터 광고까지 한 번에 만드는 요청 조건
   */
  export interface ICreateAdGroupSearchAdAtOnceInput
    extends ICreateAdGroupSearchAdAtOnceInputCommon,
      IGoogleAds.ISecret {
    /**
     * @title 광고 생성 조건
     */
    ad: Omit<
      ICreateAdGroupSearchAdInput,
      "campaignResourceName" | "type" | "customerId"
    >;
  }

  /**
   * @title 구글 디스플레이 캠페인부터 광고까지 한 번에 만드는 요청 조건
   */
  export interface ICreateAdGroupDisplayAdAtOnceInput
    extends ICreateAdGroupSearchAdAtOnceInputCommon,
      IGoogleAds.ISecret {
    /**
     * @title 광고 생성 조건
     */
    ad: Omit<
      ICreateAdGroupDisplayAdInput,
      "campaignResourceName" | "type" | "customerId"
    >;
  }

  /**
   * @title 광고 정보
   */
  export interface AdWrapper {
    /**
     * @title 광고 정보
     */
    ad: IGoogleAds.IGetAdGroupsOutputResult;
  }
  /**
   * @title 캠페인부터 광고까지 한 번에 만드는 요청에 대한 결과
   */
  export type ICreateAdGroupAdAtOnceOutput = DeepStrictMerge<
    IGoogleAds.ICreateCampaignsOutput,
    AdWrapper
  >;

  /**
   * @title 광고 생성 조건
   */
  export type ICreateAdGroupAdInput = IGoogleAds.ISecret &
    ICreateAdGroupAdInputCommon;

  export type IUpdateAdGroupAdInput = Pick<
    AdGroupAd,
    "resourceName" | "status"
  > &
    ICreateAdGroupAdInputCommon;

  /**
   * @title 광고 생성 조건
   */
  export type ICreateAdGroupAdInputCommon =
    | ICreateAdGroupSearchAdInput
    | ICreateAdGroupDisplayAdInput;

  /**
   * @title 검색 광고 생성 조건
   */
  export interface ICreateAdGroupSearchAdInput
    extends Required<Pick<IGoogleAds.ISecret, "customerId">>,
      ICreateSearchAdGroupInput,
      ICreateKeywordInput {
    /**
     * @title 광고의 대상이 되는 홈페이지
     */
    finalUrl: string & tags.Format<"uri">;

    /**
     * @title 제목 리스트
     */
    headlines: (string & tags.MinLength<1> & tags.MaxLength<30>)[] &
      tags.MinItems<1> &
      tags.MaxItems<15>;

    /**
     * @title 설명 리스트
     */
    descriptions: (string & tags.MinLength<1> & tags.MaxLength<90>)[] &
      tags.MinItems<1> &
      tags.MaxItems<4>;
  }

  /**
   * @title 디스플레이 광고 생성 조건
   */
  export interface ICreateAdGroupDisplayAdInput
    extends Required<Pick<IGoogleAds.ISecret, "customerId">>,
      ICreateDisplayAdGroupInput,
      ICreateKeywordInput {
    /**
     * @title 광고의 대상이 되는 홈페이지
     */
    finalUrl: string & tags.Format<"uri">;

    /**
     * @title 짧은 제목 리스트
     */
    headlines: (string & tags.MinLength<1> & tags.MaxLength<30>)[] &
      tags.MinItems<1> &
      tags.MaxItems<5>;

    /**
     * @title 긴 제목
     */
    longHeadline: string & tags.MinLength<1> & tags.MaxLength<90>;

    /**
     * @title 설명 리스트
     */
    descriptions: (string & tags.MinLength<1> & tags.MaxLength<90>)[] &
      tags.MinItems<1> &
      tags.MaxItems<5>;

    /**
     * @title 비즈니스 및 브랜드 이름
     */
    businessName: string & tags.MinLength<1> & tags.MaxLength<25>;

    /**
     * @title 가로형 이미지
     * @description 1.91:1의 가로형 이미지이며 권장은 5장
     */
    landscapeImages: (string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"image/*">)[] &
      tags.MinItems<1> &
      tags.MaxItems<15>;

    /**
     * @title 로고 이미지
     * @description 정방형 이미지로 최소 크기는 128x128px, 권장은 1200x1200px
     */
    logoImages: (string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"image/*">)[] &
      tags.MinItems<1> &
      tags.MaxItems<5>;

    /**
     * @title 정방형 이미지
     * @description 1.91:1의 가로형 이미지이며 최소 크기는 300x300px, 권장은 600x600px
     */
    squareImages: (string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"image/*">)[] &
      tags.MinItems<1> &
      tags.MaxItems<15>;
  }

  /**
   * @title 캠페인 수정 조건
   */
  export interface IUpdateCampaignInput
    extends MyPartial<
        Pick<
          ICreateCampaignInput,
          "campaignName" | "campaignBudget" | "endDate"
        >
      >,
      Pick<IGoogleAds.ISecret, "secretKey">,
      IGoogleAds.ISecret {
    /**
     * @title 수정할 캠페인의 리소스 아이디
     */
    campaignResourceName: Campaign["resourceName"] &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/get-campaigns";
        jmesPath: JMESPath<
          IGetCampaignsOutput,
          "[].campaign.{value:name, label:id}"
        >;
      }>;
  }

  export interface ICreateCampaignInput
    extends Omit<ICreateCampaignBudgetInput, "customerId">,
      IGoogleAds.ISecret {
    /**
     * @title 캠페인 타입
     */
    advertisingChannelType:
      | tags.Constant<
          "SEARCH",
          {
            title: "검색 광고";
            description: "Google 검색에서 구매 의도가 높은 고객에게 적시에 노출";
          }
        >
      | (tags.Constant<
          "DISPLAY",
          {
            title: "디스플레이 광고";
            description: "눈에 잘 띄는 광고 소재로 3백만 사이트와 앱에서 고객에게 도달";
          }
        > &
          tags.Default<"SEARCH">);

    /**
     * @title 캠페인 이름
     *
     * 이름이 비어있을 경우 무작위 이름이 생성됩니다. 이름은 기존에 생성된 캠페인과 중복되서는 안 됩니다.
     */
    campaignName?: string;

    /**
     * @title 캠페인 시작 시간
     */
    startDate?: string & tags.Format<"date">;

    /**
     * @title 캠페인 종료 시간
     */
    endDate?: string & tags.Format<"date">;
  }

  export interface ICreateCampaignBudgetInput
    extends Required<Pick<IGoogleAds.ISecret, "customerId">> {
    /**
     * @title 광고 예산
     * @description 한국 통화 단위로써, 원화 단위
     */
    campaignBudget: number;
  }

  /**
   * @title 구글 리소스 상태
   */
  export type Status =
    | tags.Constant<"ENABLED", { title: "ENABLED" }>
    | tags.Constant<"PAUSED", { title: "PAUSED" }>
    | tags.Constant<"REMOVED", { title: "REMOVED" }>
    | tags.Constant<"UNKNOWN", { title: "UNKNOWN" }>
    | tags.Constant<"UNSPECIFIED", { title: "UNSPECIFIED" }>;

  /**
   * @title 구글 광고 캠페인
   */
  export interface Campaign {
    /**
     * @title 캠페인 리소스 명
     */
    resourceName: string &
      tags.Pattern<"(customers\\/[+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\/campaigns\\/[+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)"> &
      Placeholder<"customers/1/campaigns/1">;

    /**
     * @title 캠페인 상태
     */
    status: Status;

    /**
     * @title 캠페인 광고 채널
     */
    advertisingChannelType:
      | tags.Constant<"DEMAND_GEN", { title: "DEMAND_GEN" }>
      | tags.Constant<"DISPLAY", { title: "DISPLAY" }>
      | tags.Constant<"HOTEL", { title: "HOTEL" }>
      | tags.Constant<"LOCAL", { title: "LOCAL" }>
      | tags.Constant<"LOCAL_SERVICES", { title: "LOCAL_SERVICES" }>
      | tags.Constant<"MULTI_CHANNEL", { title: "MULTI_CHANNEL" }>
      | tags.Constant<"PERFORMANCE_MAX", { title: "PERFORMANCE_MAX" }>
      | tags.Constant<"SEARCH", { title: "SEARCH" }>
      | tags.Constant<"SHOPPING", { title: "SHOPPING" }>
      | tags.Constant<"SMART", { title: "SMART" }>
      | tags.Constant<"TRAVEL", { title: "TRAVEL" }>
      | tags.Constant<"UNKNOWN", { title: "UNKNOWN" }>
      | tags.Constant<"UNSPECIFIED", { title: "UNSPECIFIED" }>
      | tags.Constant<"VIDEO", { title: "VIDEO" }>;

    /**
     * @title 캠페인 이름
     */
    name: string;

    /**
     * @title 캠페인 아이디
     */
    id: string &
      tags.Pattern<"([+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)"> &
      Placeholder<"1">;

    /**
     * @title 캠페인 시작 일자
     */
    startDate: string & tags.Format<"date">;

    /**
     * @title 캠페인 종료 일자
     */
    endDate: string & tags.Format<"date">;
  }

  export interface CampaignBudget {
    /**
     * @title 캠페인 예산 리소스 명
     */
    resourceName: `customers/${number}/campaignBudgets/${number}`;

    /**
     * @title 예산 (마이크로 단위)
     */
    amountMicros: `${number}`;
  }

  /**
   * @title 캠페인 생성 결과
   */
  export type ICreateCampaignsOutput = IGetCampaignsOutputResult;

  /**
   * @title 캠페인 조회 결과
   */
  export type IGetCampaignsOutput = IGetCampaignsOutputResult[];

  /**
   * @title 캠페인 정보
   */
  export interface IGetCampaignsOutputResult {
    /**
     * @title 캠페인 정보
     */
    campaign: Campaign;

    /**
     * @title 캠페인 예산 정보
     */
    campaignBudget: CampaignBudget;
  }

  /**
   * @title 광고 그룹 광고의 조회 결과
   */
  export type IGetAdGroupOutput = IGetAdGroupsOutputResult[];

  export interface IGetAdGroupsOutputResult {
    /**
     * @title 캠페인
     */
    campaign: Pick<IGoogleAds.Campaign, "resourceName" | "id" | "status">;

    /**
     * @title 광고 그룹
     */
    adGroup: Pick<AdGroup, "id" | "resourceName" | "type">;

    /**
     * @title 광고 그룹 광고의 목록
     */
    adGroupAds: Pick<AdGroupAd, "resourceName" | "policySummary">[];

    /**
     * @title 키워드 목록
     */
    keywords: DeepStrictMerge<
      Keyword,
      Pick<AdGroupCriterion, "criterionId" | "resourceName">
    >[];
  }

  /**
   * @title 캠페인 조회 조건
   */
  export type IGetCampaignsInput = IGoogleAds.ISecret;

  /**
   * @title 클라이언트 초대
   */
  export interface ICreateClientLinkOutput {
    result: {
      resourceName: `cusotmers/${number}/customerClientLinks/${number}~${number}`;
    };
  }

  /**
   * @title Google Ads Error Object
   * @description 에러를 판별하기 위한 최소한의 객체 구조
   */
  export interface GoogleAdsError {
    error: {
      code: number;
      message: string;
      status: string;
      details: {
        "@type": string;
        requestId: string;
        errors: {
          /**
           * 아래와 같이 에러 이름과 에러의 메시지가 담긴 객체
           *
           * @example
           * { managerLinkError: "ALREADY_INVITED_BY_THIS_MANAGER" }
           */
          errorCode: Record<string, string>;
          message: string;
          details: object;
        }[];
      }[];
    };
  }

  export interface RESOURCE_EXHAUSTED_ERROR {
    errorCode: Record<string, string>;
    message: string;
    details: {
      quotaErrorDetails: {
        rateScope: string;
        rateName: string;
        retryDelay: `${number}s`;
      };
    };
  }

  export type IGetCustomerInput = Pick<IGoogleAds.ISecret, "secretKey">;

  export interface ISecret
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/adwords"]
    > {
    /**
     * 고객의 리소스 아이디이다.
     *
     * `customers/${number}` 형식에서 'custmers/'을 제거한 나머지 숫자 형식을 의미한다.
     *
     * `Wrtn`의 `google ads` 관련 커넥터들은 해당 고객이 가지고 있는 광고 계정, 즉 customer 중 어떤 광고 계정을 사용할 것인지를 `customerId` 라는 프로퍼티로 받아야 하는데,
     *
     * 이 때 대부분의 유저들은 광고 계정이 1개이기 때문에 `customerId`를 인자로 주지 않으면 무조건 0번쨰로 조회되는 광고 계정을 사용한다.
     *
     * 만약 광고 계정이 2개 이상인 유저가 `customerId`를 주지 않을 경우에는 무조건 실패로 간주한다.
     *
     * @title 고객 리소스 아이디
     */
    customerId?: CustomerClient["id"] &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/get-customers";
        jmesPath: JMESPath<IGetCustomerOutput, "[].{value:id, label:id}">;
      }>;
  }

  export interface Customer {
    id: string;

    resourceName: `customers/${number}`;
  }

  export interface CustomerClient {
    /**
     * @title 고객 아이디
     * @description 고객마다 고유한 값을 가지고 있다.
     */
    id: string &
      tags.Pattern<"([+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)"> &
      Placeholder<"1">;

    /**
     * @title 고객 리소스 명
     */
    resourceName: `customers/${number}/customerClients/${number}`;

    /**
     * @title 지정된 이름
     */
    descriptiveName?: string;

    /**
     * @title 통화 단위, 통화 코드
     * @description 'USD', 'EUR', 'KRW' 등을 의미
     */
    currencyCode: string;
  }

  /**
   * @title 고객 조회 결과
   */
  export type IGetCustomerOutput = CustomerClient[];

  export interface IGetlistAccessibleCustomersOutput {
    /**
     * @title 접근 가능한 계정의 리소스 이름
     */
    resourceNames: `customers/${number}`[];
  }

  export interface ICommonInput {
    /**
     * @title 한 페이지 당 결과의 수
     */
    pageSize?: number &
      tags.Type<"int32"> &
      tags.Minimum<1> &
      tags.Maximum<10000>;

    /**
     * @title 다음 페이지 토큰
     * @description 이전 요청으로부터 받을 수 있는 페이지 토큰을 사용한다.
     */
    pageToken?: string;
  }

  export type IGenerateKeywordIdeaByKeywordsAndUrlInput =
    IGenerateKeywordIdeaByKeywordsInput & IGenerateKeywordIdeaByURLInput;

  export interface IGenerateKeywordIdeaByKeywordsInput
    extends ICommonInput,
      IGoogleAds.ISecret {
    /**
     * @title 키워드 생성을 위한 검색 키워드
     */
    keywords: string[] & tags.MinItems<1>;
  }

  export interface IGenerateKeywordIdeaByURLInput
    extends ICommonInput,
      IGoogleAds.ISecret {
    /**
     * @title 광고 키워드 아이디어 생성에 참조할 URL.
     */
    url: string;
  }

  export interface IGenerateKeywordIdeaOutput {
    /**
     * @title 결과 목록
     */
    results: GeneratedKeyword[];

    /**
     * @title 전체 결과 수
     */
    totalSize: `${number}`;

    /**
     * @title 다음 페이지를 조회할 때 사용할 수 있는 토큰
     * @description 다음 페이지가 없을 경우에는 조회 불가능
     */
    nextPageToken?: string | null;
  }

  export interface GeneratedKeyword {
    /**
     * @title 키워드에 대한 지표
     */
    keywordIdeaMetrics: KeywordIdeaMetrics;

    /**
     * @title 키워드
     */
    text: string;
  }

  export interface KeywordIdeaMetrics {
    /**
     * @title 검색어에 대한 경쟁 수준
     */
    competition?:
      | tags.Constant<
          "LOW",
          {
            title: "낮음";
            description: "낮은 경쟁률 경쟁 지수 범위는 [0, 33]입니다.";
          }
        >
      | tags.Constant<
          "MEDIUM",
          {
            title: "중간";
            description: "경쟁이 보통입니다. 이에 대한 경쟁 지수의 범위는 [34, 66]입니다.";
          }
        >
      | tags.Constant<
          "HIGH",
          {
            title: "높음";
            description: "경쟁이 치열합니다. 경쟁 지수 범위는 [67, 100]입니다.";
          }
        >;

    /**
     * @title 지난 12개월 동안 이 검색어가 실행된 대략적인 검색 횟수
     */
    monthlySearchVolumes: MonthlySearchVolumes[];

    /**
     * @title 지난 12개월 간의 이 검색어에 대한 대략적인 월별 검색 수
     */
    avgMonthlySearches: `${number & tags.Type<"int64"> & tags.Minimum<0>}`;

    /**
     * @title 경쟁 지수
     */
    competitionIndex: `${number &
      tags.Type<"int64"> &
      tags.Minimum<0> &
      tags.Maximum<100>}`;

    /**
     * @title 키워드의 마이크로 단위 페이지 상단 입찰가 하위 범위 (20번째 백분위수)
     */
    lowTopOfPageBidMicros?: `${number & tags.Type<"int64"> & tags.Minimum<0>}`;

    /**
     * @title 키워드의 상세 페이지 상단 입찰가 (80번째 백분위수)
     */
    highTopOfPageBidMicros?: `${number & tags.Type<"int64"> & tags.Minimum<0>}`;
  }

  export interface MonthlySearchVolumes {
    /**
     * @title 검색량이 발생한 달
     */
    month: Month;

    /**
     * @title 검색량이 발생한 연도
     */
    year: string;

    /**
     * @title 해당 달의 대략적인 검색 수
     * @description null 값은 해당 월에 대한 검색량을 확인할 수 없음을 나타냅니다.
     */
    monthlySearches: `${number & tags.Type<"int64"> & tags.Minimum<0>}` | null;
  }

  export type Month =
    | tags.Constant<"JANUARY", { title: "January" }>
    | tags.Constant<"FEBRUARY", { title: "February" }>
    | tags.Constant<"MARCH", { title: "March" }>
    | tags.Constant<"APRIL", { title: "April" }>
    | tags.Constant<"MAY", { title: "May" }>
    | tags.Constant<"JUNE", { title: "June" }>
    | tags.Constant<"JULY", { title: "July" }>
    | tags.Constant<"AUGUST", { title: "August" }>
    | tags.Constant<"SEPTEMBER", { title: "September" }>
    | tags.Constant<"OCTOBER", { title: "October" }>
    | tags.Constant<"NOVEMBER", { title: "November" }>
    | tags.Constant<"DECEMBER", { title: "December" }>;
}
