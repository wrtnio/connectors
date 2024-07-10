import type { Prerequisite } from "@wrtn/decorators";
import type { tags } from "typia";
import { StrictOmit } from "../../../../utils/strictOmit";
import { DeepStrictMerge } from "../../../../utils/types/DeepStrictMerge";
import { ICommon } from "../common/ISecretValue";

export namespace IGoogleAds {
  /**
   * @title 키워드 생성 조건
   */
  export interface ICreateKeywordInput {
    /**
     * @title 고객 리소스 이름
     */
    customerId: CustomerClient["id"];

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
     * @title 광고 그룹 리소스 명
     */
    resourceName: `customers/${number}/adGroups/${number}`;

    /**
     * @title 광고 그룹의 타입
     */
    type:
      | tags.Constant<"SEARCH_STANDARD", { title: "검색 광고" }>
      | tags.Constant<"DISPLAY_STANDARD", { title: "디스플레이 광고" }>; // campaign으로부터 가져오게 한다.
  }

  export interface IGetAdGroupInput {
    /**
     * @title 고객 리소스 이름
     */
    customerId: CustomerClient["id"];

    /**
     * @title 부모 캠페인의 아이디
     * @description 해당 캠페인의 아이디만 검색하고 싶을 경우
     */
    campaignId?: Campaign["id"] &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/get-campaigns";
        array: "return results";
        label: "return el.campaign.name";
        value: "return el.campaign.id";
      }>;

    /**
     * @title 광고 그룹의 리소스 명
     * @description 해당 광고 그룹 리소스 명으로만 검색하고 싶을 경우
     */
    adGroupResourceName?: AdGroup["resourceName"];
  }

  export interface IGetAdGroupOutput {
    results: IGetAdGroupOutputResult[];
  }

  export interface IGetAdGroupOutputResult {
    campaign: Pick<Campaign, "id" | "resourceName" | "status">;

    adGroup: Pick<AdGroup, "id" | "type" | "resourceName">;
  }

  export interface AdGroupAd {
    /**
     * @title 광고 그룹 광고의 리소스 명
     */
    resourceName: `customers/${number}/adGroupAds/${number}~${number}`;

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
  }

  /**
   * @title 광고 그룹 생성 조건
   */
  export interface ICreateAdGroupInput {
    /**
     * @title 고객 리소스 이름
     */
    customerId: CustomerClient["id"];

    /**
     * @title 캠페인 리소스 이름
     */
    campaignResourceName: Campaign["resourceName"];

    /**
     * @title 광고 그룹 타입
     */
    type: AdGroup["type"];
  }

  /**
   * @title 캠페인부터 광고까지 한 번에 만드는 요청 조건
   */
  export type ICreateAdGroupAdAtOnceInput = {
    /**
     * @title 고객 아이디
     */
    customerId: CustomerClient["id"];

    /**
     * @title 캠페인 생성 조건
     */
    campaign: StrictOmit<ICreateCampaignInput, "customerId">;

    /**
     * @title 광고 생성 조건
     */
    ad: StrictOmit<
      ICreateAdGroupAdInput,
      "campaignResourceName" | "type" | "customerId"
    >;
  };

  export interface Ad {
    ad: IGoogleAds.IGetAdGroupAdsOutputResult;
  }
  /**
   * @title 캠페인부터 광고까지 한 번에 만드는 요청에 대한 결과
   */
  export type ICreateAdGroupAdAtOnceOutput = DeepStrictMerge<
    IGoogleAds.ICreateCampaignsOutput,
    Ad
  >;

  /**
   * @title 광고 생성 조건
   */
  export interface ICreateAdGroupAdInput
    extends ICreateAdGroupInput,
      ICreateKeywordInput {
    /**
     * @title 광고의 대상이 되는 홈페이지
     */
    finalUrl: string & tags.Format<"uri">;

    /**
     * @title 제목 리스트
     */
    headlines: (string & tags.MinLength<1> & tags.MaxLength<30>)[] &
      tags.MinItems<3> &
      tags.MaxItems<3>;

    /**
     * @title 설명 리스트
     */
    descriptions: (string & tags.MinLength<1> & tags.MaxLength<90>)[] &
      tags.MinItems<2> &
      tags.MaxItems<2>;
  }

  export interface ICreateCampaignInput extends ICreateCampaignBudgetInput {
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
     */
    campaignName: string;
  }

  export interface ICreateCampaignBudgetInput {
    /**
     * @title 고객 아이디
     */
    customerId: CustomerClient["id"];

    /**
     * @title 광고 예산
     * @description 한국 통화 단위로써, 원화 단위
     */
    campaignBudget: number;
  }

  /**
   * @title 구글 광고 캠페인
   */
  export interface Campaign {
    /**
     * @title 캠페인 리소스 명
     */
    resourceName: `customers/${number}/campaigns/${number}`;

    /**
     * @title 캠페인 상태
     */
    status:
      | tags.Constant<"ENABLED", { title: "ENABLED" }>
      | tags.Constant<"PAUSED", { title: "PAUSED" }>
      | tags.Constant<"REMOVED", { title: "REMOVED" }>
      | tags.Constant<"UNKNOWN", { title: "UNKNOWN" }>
      | tags.Constant<"UNSPECIFIED", { title: "UNSPECIFIED" }>;

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
    id: `${number}`;

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
   * @title 광고 조회 조건
   */
  export interface IGetAdGroupAdsInput extends IGetAdGroupInput {
    /**
     * @title 조회할 고객 아이디
     */
    customerId: Prerequisite<{
      method: "post";
      path: "connector/google-ads/get-customers";
      array: "return response";
      label: "return el.descriptiveName ?? ''";
      value: "return el.id";
    }> &
      `${number}`;
  }

  /**
   * @title 광고 그룹 광고의 조회 결과
   */
  export type IGetAdGroupAdsOutput = IGetAdGroupAdsOutputResult[];

  export interface IGetAdGroupAdsOutputResult {
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
  }

  /**
   * @title 캠페인 조회 조건
   */
  export interface IGetCampaignsInput {
    /**
     * @title 조회할 고객 아이디
     */
    customerId: Prerequisite<{
      method: "post";
      path: "connector/google-ads/get-customers";
      array: "return response";
      label: "return el.descriptiveName ?? ''";
      value: "return el.id";
    }> &
      `${number}`;
  }

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
      details: {
        errors: {
          /**
           * 아래와 같이 에러 이름과 에러의 메시지가 담긴 객체
           *
           * @example
           * { managerLinkError: "ALREADY_INVITED_BY_THIS_MANAGER" }
           */
          errorCode: Record<string, string>;
        }[];
      }[];
    };
  }

  export type ISecret = ICommon.ISecret<
    "google-ads",
    ["https://www.googleapis.com/auth/adwords"]
  >;

  export interface CustomerClient {
    /**
     * @title 고객 아이디
     * @description 고객마다 고유한 값을 가지고 있다.
     */
    id: `${number}`;

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
    pageToken?: string &
      Prerequisite<{
        method: "post";
        path: "connector/google-ads/generateKeywordIdeas/url";
        array: "response.keywordIdeas";
        label: "elem.text";
        value: "elem.text";
      }>;
  }

  export type IGenerateKeywordIdeaByKeywordsAndUrlInput =
    IGenerateKeywordIdeaByKeywordsInput & IGenerateKeywordIdeaByURLInput;

  export interface IGenerateKeywordIdeaByKeywordsInput extends ICommonInput {
    /**
     * @title 키워드 생성을 위한 검색 키워드
     */
    keywords: string[] & tags.MinItems<1>;
  }

  export interface IGenerateKeywordIdeaByURLInput extends ICommonInput {
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
          { title: "낮은 경쟁률 경쟁 지수 범위는 [0, 33]입니다." }
        >
      | tags.Constant<
          "MEDIUM",
          {
            title: "경쟁이 보통입니다. 이에 대한 경쟁 지수의 범위는 [34, 66]입니다.";
          }
        >
      | tags.Constant<
          "HIGH",
          { title: "경쟁이 치열합니다. 경쟁 지수 범위는 [67, 100]입니다." }
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
