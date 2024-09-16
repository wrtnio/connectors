import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IGoogleAds } from "@wrtn/connector-api/lib/structures/connector/google_ads/IGoogleAds";

import { RouteIcon, Standalone } from "@wrtnio/decorators";
import { GoogleAdsProvider } from "../../../providers/connector/google_ads/GoogleAdsProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-ads")
export class GoogleAdsController {
  constructor(private readonly googleAdsProvider: GoogleAdsProvider) {}

  /**
   * 구글 광고를 위한 키워드를 추천받아요!
   *
   * Google Ads에서 광고를 집행하기 위해서는 키워드들을 등록해야 합니다.
   * 키워드는 광고의 엔드 유저들을 타겟팅하기 위해 등록되어야 하며, 이는 Google Ads의
   * 리소스 중 `adGroup`에 매핑되는 `adGroupCriteria` 중 하나입니다.
   * 이 커넥터는 그러한 키워드를 추천받기 위한 기능으로 사용자가 등록하고자 했던
   * 키워드들과 URL을 입력 시 그에 파생될 수 있는 다른 키워드들을 추천해줍니다.
   *
   * 요청 결과는 키워드들의 목록과 각 키워드들의 경쟁 지수, 단가, 광고 등록 시 예상되는 지표 값들이 조회됩니다.
   *
   * 이 커넥터는 성인 광고를 위한 키워드를 제외하며, 언어적 조건은 한국어, 지리적 조건은 한국(South Korea)으로 설정되어 있습니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 키워드와 URL을 통한 키워드 생성
   * @param input URL을 담은 객체
   * @returns 추천 받은 키워드 목록과 각 키워드에 대한 경쟁 지수 및 지표, 단가 정보
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("generateKeywordIdeas/keywordsAndUrl")
  async keywordsAndUrl(
    @TypedBody() input: IGoogleAds.IGenerateKeywordIdeaByKeywordsAndUrlInput,
  ): Promise<IGoogleAds.IGenerateKeywordIdeaOutput> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return retry(
      () =>
        this.googleAdsProvider.generateKeywordIdeas({
          ...input,
          customerId,
        }),
      1,
    )();
  }

  /**
   * 구글 광고를 위한 키워드를 추천받아요!
   *
   * Google Ads에서 광고를 집행하기 위해서는 키워드들을 등록해야 합니다.
   * 키워드는 광고의 엔드 유저들을 타겟팅하기 위해 등록되어야 하며, 이는 Google Ads의
   * 리소스 중 `adGroup`에 매핑되는 `adGroupCriteria` 중 하나입니다.
   * 이 커넥터는 그러한 키워드를 추천받기 위한 기능으로 사용자가 등록하고자 했던
   * 키워드들을 입력 시 그에 파생될 수 있는 다른 키워드들을 추천해줍니다.
   *
   * 요청 결과는 키워드들의 목록과 각 키워드들의 경쟁 지수, 단가, 광고 등록 시 예상되는 지표 값들이 조회됩니다.
   *
   * 이 커넥터는 성인 광고를 위한 키워드를 제외하며, 언어적 조건은 한국어, 지리적 조건은 한국(South Korea)으로 설정되어 있습니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 키워드를 통한 키워드 생성
   * @param input URL을 담은 객체
   * @returns 추천 받은 키워드 목록과 각 키워드에 대한 경쟁 지수 및 지표, 단가 정보
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("generateKeywordIdeas/keywords")
  async keywords(
    @TypedBody() input: IGoogleAds.IGenerateKeywordIdeaByKeywordsInput,
  ): Promise<IGoogleAds.IGenerateKeywordIdeaOutput> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return retry(
      () =>
        this.googleAdsProvider.generateKeywordIdeas({
          ...input,
          customerId,
        }),
      1,
    )();
  }

  /**
   * 구글 광고를 위한 키워드를 추천받아요!
   *
   * Google Ads에서 광고를 집행하기 위해서는 키워드들을 등록해야 합니다.
   * 키워드는 광고의 엔드 유저들을 타겟팅하기 위해 등록되어야 하며, 이는 Google Ads의
   * 리소스 중 `adGroup`에 매핑되는 `adGroupCriteria` 중 하나입니다.
   * 이 커넥터는 그러한 키워드를 추천받기 위한 기능으로 사용자가 등록하고자 했던
   * URL을 입력 시 그에 파생될 수 있는 다른 키워드들을 추천해줍니다.
   *
   * 요청 결과는 키워드들의 목록과 각 키워드들의 경쟁 지수, 단가, 광고 등록 시 예상되는 지표 값들이 조회됩니다.
   *
   * 이 커넥터는 성인 광고를 위한 키워드를 제외하며, 언어적 조건은 한국어, 지리적 조건은 한국(South Korea)으로 설정되어 있습니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary URL을 통한 키워드 생성
   * @param input URL을 담은 객체
   * @returns 추천 받은 키워드 목록과 각 키워드에 대한 경쟁 지수 및 지표, 단가 정보
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("generateKeywordIdeas/url")
  async url(
    @TypedBody() input: IGoogleAds.IGenerateKeywordIdeaByURLInput,
  ): Promise<IGoogleAds.IGenerateKeywordIdeaOutput> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return retry(
      () =>
        this.googleAdsProvider.generateKeywordIdeas({
          ...input,
          customerId,
        }),
      1,
    )();
  }

  /**
   * 해당 유저의 광고 계정 관리자로 뤼튼을 지정해요
   *
   * 특정 구글 계정에 대하여 Google Ads API를 호출하기 위해서는 해당 광고 계정을 소유하거나 또는 관리자로 등록되어야 합니다.
   * 이 커넥터는 `Wrtn` 광고 계정을 고객의 관리자로 등록하기 위해 유저의 모든 구글 광고 계정에 일종의 초대장을 보내는 커넥터입니다.
   * 해당 커넥터가 실행된 다음 Gmail을 통해 고객 계정에 등록되어 있는 이메일이 전송됩니다.
   * 메일을 받으신 분께서는 해당 메일을 통해 대시보드로 이동하여 `Wrtn` 계정에 관리자 권한을 줄 수 있습니다.
   * `Wrtn`이 관리자로 등록된 경우, Google Ads에 생성되어 있는 다른 API들을 사용할 수 있게 됩니다.
   *
   * 이 관리자 지정은 키워드 추천 등 `customerId`를 인자로 받지 않는 커넥터들을 제외한 모든 Google Ads 커넥터 호출에 선행되어야 합니다.
   * 하지만 이 커넥터를 호출했다고 하더라도 유저의 승인 없이 `Wrtn`이 관리자로 지정되는 일은 없으니 걱정할 필요는 없습니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 뤼튼을 관리자로 등록하기
   * @param input 고객 정보
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("customerClientLink")
  async publish(@TypedBody() input: IGoogleAds.ISecret): Promise<void> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return this.googleAdsProvider.publish({ ...input, customerId });
  }

  /**
   * 고객의 광고 계정을 가져와요
   *
   * 유저의 액세스 토큰을 이용하여 `Wrtn`이 관리자로 있는 계정 중 해당 유저의 광고 계정, 즉 `customer`를 조회합니다.
   * 유저가 광고 계정이 있다고 하더라도 `Wrtn`이 관리자로 있지 않을 경우에는 리스트에 조회되지 않습니다.
   * 따라서 `Wrtn`을 관리자로 등록한 적이 없다면 `POST connector/google-ads/customerClientLink` 커넥터를 호출해야 합니다.
   *
   * 또한 이 커넥터에서는 한국 통화 단위인 `KRW`를 사용하지 않는 광고 계정은 필터링됩니다.
   * 이렇게 하는 까닭은 추후 다른 캠페인 예산 수정이나 광고 상태 변경 커넥터에서 실수가 발생할 일을 방지하기 위함입니다.
   * Google Ads 커넥터를 통해 광고를 생성할 때 각 계정의 통화 단위에 따라 예산 설정에 휴먼 에러가 발생할 수도 있기 때문입니다.
   * 예컨대 통화 단위가 `USD`인 계정을 `KRW`인 계정처럼 예산을 등록할 경우 그 환율만큼의 예산 차이가 발생할 수 있습니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 광고 계정을 조회합니다
   * @param input 고객 정보
   * @returns 광고 계정 목록
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("get-customers")
  async getCustomers(
    @TypedBody() input: IGoogleAds.IGetCustomerInput,
  ): Promise<IGoogleAds.IGetCustomerOutput> {
    return this.googleAdsProvider.getCustomers(input);
  }

  /**
   * 구글 고객 계정의 캠페인 목록을 가져와요
   *
   * 유저에게 `customerId`를 넘겨 받아 그 고객 광고 계정에 있는 캠페인들을 조회합니다.
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   * 캠페인은 구글 리소스 중 `campaign`에 해당하는 것이며 광고 채널, 예산과 광고들의 집행 시작 날짜, 종료 날짜를 담당합니다.
   * 채널에는 반응형 검색 광고(=responsive search ad), 반응형 디스플레이 광고(=responsive display ad) 등 구글 광고 상품을 의미합니다.
   * 만약 캠페인이 검색 광고라면 광고 그룹과 광고 역시 검색 광고만 존재합니다.
   * 유저는 이 커넥터를 통해 자신이 가진 캠페인과 캠페인의 상태를 조회하고, 원하는 캠페인에 광고 그룹을 생성하는 등 이후 액션에 활용할 수 있습니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 캠페인 목록을 조회합니다
   * @param input 고객 정보
   * @returns 캠페인 목록
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("get-campaigns")
  async getCampaigns(
    @TypedBody() input: IGoogleAds.IGetCampaignsInput,
  ): Promise<IGoogleAds.IGetCampaignsOutput> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return this.googleAdsProvider.getCampaigns({ ...input, customerId });
  }

  /**
   * 구글 고객 계정의 광고 그룹 목록을 가져와요
   *
   * 유저에게 `customerId`를 넘겨 받아 그 고객 광고 계정에 있는 광고 그룹(=adGroup)들을 조회합니다.
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   * 만약 `campaignId`를 함께 넘겨받을 경우 해당 캠페인의 자식 광고 그룹들만을 조회합니다.
   * 광고 그룹은 타겟팅을 담당하는 영역이며, 또한 광고(ad)의 부모 이기도 합니다.
   * 이 커넥터의 결과로는 광고 그룹의 부모가 되는 캠페인의 간단한 정보와 광고 그룹의 정보,
   * 해당 광고 그룹에 속한 광고의 목록 및 현재 상태, 간단한 정보들을 담고 있습니다.
   * 또한 광고 그룹에 연결되어 있는 키워드들의 정보 또한 담겨 있습니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 광고 그룹 목록을 조회합니다.
   * @param input 광고 그룹 목록 조회 조건
   * @returns 광고 그룹 목록
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("get-ad-groups")
  async getAdGroups(
    @TypedBody() input: IGoogleAds.IGetAdGroupInput,
  ): Promise<IGoogleAds.IGetAdGroupOutput> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return this.googleAdsProvider.getAdGroupDetails({ ...input, customerId });
  }

  /**
   * 구글 고객 계정의 광고 목록을 가져와요
   *
   * 유저에게 `customerId`를 넘겨 받아 그 고객 광고 계정에 있는 광고(=ad)들을 조회합니다.
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   * 광고는 캠페인, 광고 그룹, 광고로 이루어진 트리 구조의 말단에 존재하는 노드로 소재를 담당하는 구간이며,
   * 또한 엔드 유저에게 노출되는 단위입니다.
   * 광고 그룹(=adGroup)의 리소스 이름을 인자로 함께 전달할 경우 해당 광고 그룹에 속한 광고만을 조회합니다.
   * 이 커넥터의 목적은 유저의 광고가 현재 집행 중인 상태인지 아닌지 파악하기 위함입니다.
   * `Wrtn` 관리자의 경우 유저가 Google Ads 대시보드에서 직접 유저의 캠페인과 광고 그룹 상태를 변경하지 않는 한 캠페인과 광고 그룹을 `PAUSED` 상태로 변경하지 않습니다.
   * 따라서, 일반적인 경우, 광고의 상태가 `ENABLED`이면 광고는 집행되며 `PAUSED`이면 광고는 중단된 것으로 이해합니다.
   * 다시 말하지만, `Wrtn` 커넥터에서는 캠페인이나 광고 그룹의 상태는 변경하지 않습니다.
   *
   * 이 기능은 광고를 조회하는 것 외에 광고가 제대로 집행되고 있는지 체크하기 위해서 사용될 수도 있습니다.
   * 각 광고에서는 광고 심사 및 정책에 대한 평가 내역이 존재하는데, 이는 `PolicySummary` 라는 프로퍼티로 존재합니다.
   * 이 프로퍼티에는 광고의 승인 여부가 존재하며 `APPROVED` 상태는 곧 Google의 심사가 승인되어 적격 판정을 받은 것을 의미합니다.
   *
   * 광고 상태 변경은 `PATCH connector/google-ads/campaigns/ads/status`에서 변경할 수 있습니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 캠페인 광고 목록을 조회합니다
   * @param input 광고 목록 조회 조건
   * @returns 광고 목록
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("get-ads")
  async getAds(
    @TypedBody() input: IGoogleAds.IGetAdGroupAdInput,
  ): Promise<IGoogleAds.IGetAdGroupAdOutput> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return this.googleAdsProvider.getAdGroupAds({ ...input, customerId });
  }

  /**
   * 구글 고객 계정 광고 당 지표를 조회해요
   *
   * 유저에게 `customerId`를 넘겨 받아 그 고객 광고 그룹에 대하여 통계 지표들을 조회합니다.
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   * 유저는 이 커넥터를 통해 특정 날짜의 광고 지표를 조회할 수 있으며,
   * 이 지표에는 노출수, 클릭수, 비디오 조회 수, 비디오 재생 범위에 따른 조회 수, 평균 페이지 수를 확인할 수 있습니다.
   * 또한 광고 그룹의 리소스 이름 등 조회한 내역에 대한 간단한 정보를 확인하실 수 있습니다.
   * 이와 더불어 `costMicros` 정보를 제공하고 있는데, 이는 마이크로 단위의 광고 지출이며 실제로 집행된 금액을 의미합니다.
   * 만약 이 수치가 `1,000,000` 이라면 통화 단위가 `KRW`인 경우 1원을 사용한 것입니다.
   * 이 수치는 캠페인 예산과 달리 실제로 사용된 금액이며, 구글 정책 상 예산보다 약간 더 광고 비용이 지출될 수도 있습니다.
   * 또한, 해당 캠페인 내 광고 그룹의 지출 총합은 캠페인의 지출 총합과 같아야 합니다.
   *
   * 유저는 이 커넥터를 통해 자신의 광고가 비용과 성과 측면에서 효율적으로 집행되고 있는지를 확인할 수 있습니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 광고 그룹의 성과(metrics)를 조회합니다
   * @param input 광고 지표 조회 조건
   * @returns 지표 목록
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("ad-groups/get-metrics")
  async getMetrics(
    @TypedBody() input: IGoogleAds.IGetMetricInput,
  ): Promise<IGoogleAds.IGetMetricOutputResult[]> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return this.googleAdsProvider.getMetrics({ ...input, customerId });
  }

  /**
   * 구글 고객 계정의 광고에 검색 키워드를 추가해요
   *
   * 엄밀히 말해 광고 그룹(=adGroup)에 광고 키워드를 추가합니다.

   * 이 커넥터에서는 편의 상 광고의 리소스 명을 받아 해당 광고의 부모 광고 그룹을 찾은 다음 키워드를 넣게끔 되어 있습니다.
   * 이 커넥터의 결과 값은 키워드 추가 후 전체 키워드를 재조회하여 제대로 추가되어 있는지 유저가 확인할 수 있도록 돕습니다.
   * 하지만 키워드가 추가되었다고 해서 모두 광고에 사용되는 것은 아닙니다.
   * 키워드는 구글에서 심사를 통해 타겟팅에 사용되며, 이 때 키워드는 부적합 심사를 받아 광고 키워드에서 제외될 수도 있습니다.
   * 다만, 다른 키워드들이 있다면 광고는 무사히 동작할 것이기 때문에, 유저가 유입될 수 있도록 다양한 키워드들을 등록하는 것이 유리합니다.
   *
   * 키워드에 대한 추천 커넥터들 또한 존재합니다.
   * 
   * 이 커넥터는 고객 계정에 대한 인증으로서 광고 계정을 유저에게 인자로 전달받지만 이 또한 선택적입니다.
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   * 
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 광고에 키워드를 추가해요
   * @param input 키워드 추가 조건
   * @returns 키워드 목록
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("campaigns/ads/get-keywords")
  async getKeywords(
    @TypedBody() input: IGoogleAds.IGetKeywordsInput,
  ): Promise<IGoogleAds.IGetKeywordsOutput> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return this.googleAdsProvider.getKeywords({ ...input, customerId });
  }

  /**
   * 구글 고객 계정의 광고 상태를 변경해요
   *
   * 유저에게 광고 계정의 아이디와 광고그룹 내 광고의 리소스 이름 (=`adGroupAd`의 `ResourceName`) 을 전달 받아 광고 상태를 변경합니다.
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   *
   * 이 커넥터에서 지원하는 광고 상태는 `ENABLED`와 `PAUSED` 두 상태이며 각각 광고의 집행과 중단을 의미합니다.
   * `Wrtn` 관리자 계정은 캠페인과 광고 그룹의 상태는 변경하지 않으면서 광고의 상태만을 변경하기 때문에,
   * 유저가 Google Ads 대시보드에서 직접 캠페인과 광고 그룹의 상태를 변경하지 않은 이상 광고의 상태는 곧 지출이 발생하는지 여부를 의미합니다.
   * 만약 유저가 광고 그룹의 상태를 변경하고 싶다면 광고 그룹의 상태를 변경하는 대신 광고 그룹을 조회하여 해당 광고 그룹 내 모든 광고의 상태를 변경하십시오.
   * 만약 유저가 캠페인의 상태를 변경하고 싶다면 캠페인의 상태를 변경하는 대신 캠페인을 조회하여 해당 캠페인 내 모든 광고의 상태를 변경하십시오.
   * 단, 캠페인의 상태를 변경할 경우, Google Ads 광고 구조 상 캠페인, 광고 그룹을 타고 내려가 모든 광고를 종료하여야 합니다.
   *
   * 또한 우리 커넥터 상에서는 광고의 삭제를 지원하지 않습니다.
   * 만약 캠페인, 광고 그룹, 광고 등의 삭제를 원하는 유저가 있다면 해당 노드의 모든 자식 광고들을 `PAUSED` 상태로 변경하는 것을 추천합니다.
   * 광고의 삭제는 이전 성과와 지표를 조회할 수 있는 수단을 잃는 것이기 떄문에 광고 삭제 대신 광고를 종료하는 것이 추후 광고 재집행에도 유리합니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 광고의 상태를 변경해요
   * @param input 변경할 광고의 상태
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Patch("campaigns/ads/status")
  async setOnOff(@TypedBody() input: IGoogleAds.ISetOnOffInput): Promise<void> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return this.googleAdsProvider.updateAd({ ...input, customerId });
  }

  /**
   * 구글 고객 계정의 특정 광고에서 키워드를 삭제해요
   *
   * 유저에게 키워드 (=`AdGroupCriterion`)의 리소스 이름을 받아 모두 삭제합니다.
   * 키워드는 `AdGroupCriterion` 중 `type`이 `KEYWORD`인 것으로 다른 타입의 리소스가 존재할 수 있기 때문에 이에 주의해야 합니다.
   * 만약 모든 키워드가 삭제된 광고라면 키워드 삭제 시 광고 집행이 중단되는 등 영향이 갈 수 있기 때문에 주의해야 합니다.
   *
   * 또한, 광고의 키워드를 삭제할 경우, 해당 광고의 부모인 광고 그룹을 공유하는 다른 광고에도 영향이 갈 수 있습니다.
   *
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 광고에 키워드를 삭제해요
   * @param input 키워드 삭제 조건
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Delete("campaigns/ads/keywords")
  async deleteKeywords(
    @TypedBody() input: IGoogleAds.IDeleteAdGroupCriteriaInput,
  ): Promise<void> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return this.googleAdsProvider.deleteKeywords({ ...input, customerId });
  }

  /**
   * 구글 고객 계정의 광고에 검색 키워드를 추가해요
   *
   * 엄밀히 말해 해당 광고의 부모인 광고 그룹(=adGroup)에 키워드를 추가합니다.
   * 키워드는 광고 그룹에 추가되는 대상이기 때문에 자식 광고들에 모두 적용됩니다.
   *
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 광고에 키워드를 추가해요
   * @param input 키워드 추가 조건
   * @returns 추가된 키워드 리소스 이름
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("campaigns/ads/keywords")
  async addKeywords(
    @TypedBody() input: IGoogleAds.ICreateAdGroupCriteriaInput,
  ): Promise<IGoogleAds.ICreateAdGroupCriteriaOutput> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    const { adGroupResourceName, ...rest } = input;
    return this.googleAdsProvider.createAdGroupCriteria(adGroupResourceName, {
      ...rest,
      customerId,
    });
  }

  /**
   * 광고의 상세를 조회해요
   *
   * 캠페인에 따라 반응형 검색 광고(=responsive search ad) 혹은 반응형 디스플레이 광고(=responsive display ad) 입니다.
   *
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 광고 상세 조회
   * @param input 광고 상세 조회 조건
   * @returns 광고 상세
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("campaigns/ads/get-details")
  async getAdGroupAdDetail(
    @TypedBody() input: IGoogleAds.IGetAdGroupAdDetailInput,
  ): Promise<IGoogleAds.IGetAdGroupAdDetailOutput> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return this.googleAdsProvider.getAdGroupAdDetail({ ...input, customerId });
  }

  /**
   * 구글 고객 계정의 광고를 생성해요
   *
   * `Wrtn` 관리자는 편의 상 광고 그룹 당 광고를 1개 씩 생성하게 하고 있습니다.
   * 따라서 이 커넥터에서는 광고를 생성할 광고 그룹(=adGroup)의 리소스 이름이나 아이디를 받고 있지 않고 광고 생성 시 광고 그룹부터 생성이 됩니다.
   * 생성 가능한 광고의 타입은 캠페인에 달려 있기 때문에 캠페인을 조회한 후 생성해야 합니다.
   * 예를 들어, 검색 광고는 검색 캠페인에 생성해야 합니다.
   *
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   *
   * 광고는 생성 직후 바로 검토 중으로 넘어가며, 이 때 구글 심사가 통과되면 광고는 집행되여 지출이 발생하게 됩니다.
   * 하지만 이 커넥터로 광고를 생성할 경우에는 광고 상태가 `PAUSED`로 설정이 됩니다.
   * 이는 만약의 사태를 대비하여 유저가 캠페인, 광고 그룹, 광고 등을 재조회하여 자신이 원하는 상태로 만들어졌는지 체크하게 하기 위함입니다.
   * 따라서 광고의 검토가 끝나더라도 광고는 집행되지 않으며 성과와 지출 역시 발생하지 않습니다.
   * 광고가 올바른지 체크하였다면, 유저는 `광고 수정 커넥터`를 이용하여 광고의 상태(status)를 `ENABLED` 값으로 변경할 수 있습니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * @summary 광고를 생성해요
   * @param input 광고 생성 조건
   * @returns 생성된 광고 정보
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("campaigns/ads")
  async appendAd(
    @TypedBody()
    input: IGoogleAds.ICreateAdGroupAdInput,
  ): Promise<IGoogleAds.IGetAdGroupsOutputResult> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return this.googleAdsProvider.createAd({ ...input, customerId });
  }

  /**
   * 구글 고객 계정의 광고 캠페인을 수정해요
   *
   * 캠페인(campaign)을 수정합니다.
   * 캠페인에서 수정 가능한 대상은 캠페인의 이름과 예산, 그리고 종료 날짜 뿐입니다.
   * 캠페인의 이름은 사람이 인식하기 위한 값으로 광고에는 아무런 영향을 주지 않으니 편할대로 지정하면 됩니다.
   * 예산의 경우, 통화 단위 원화(KRW)에 맞춰 광고하고자 하는 예산을 기입하면 되며, 이 경우 하루 광고 지출은 예산의 위 아래로 형성됩니다.
   * 경우에 따라 예산보다 많이 지출되거나, 광고 최적화가 이루어지지 않은 경우 예산보다 더 적게 지출될 수도 있습니다.
   * 마지막의 종료 날짜는, 지정하지 않은 경우에는 광고가 종료되지 않고 계속 이루어지기 때문에 예약 종료 날짜로써 사용할 수 있습니다.
   * 단, 이미 지정한 종료 날짜를 지우지 않을 경우에는 추후 광고를 켜더라도 광고가 집행되지 않을 수도 있습니다.
   * 종료된 캠페인의 광고를 켜고 싶은 경우 캠페인의 종료 예정 날짜를 함께 변경하셔야 합니다.
   *
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * 원래라면 금액 제한이 없으나 만일의 사태를 대비하여 현재는 캠페인 당 10만원까지만 가능하도록 기능 제한합니다.
   *
   * @summary 캠페인을 수정해요
   * @param input 캠페인 수정 조건
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Patch("campaigns")
  async updateCampaign(
    @TypedBody() input: IGoogleAds.IUpdateCampaignInput,
  ): Promise<void> {
    const { secretKey, ...rest } = input; // secretKey가 updateCampaign에 들어가면 에러가 발생한다.

    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return this.googleAdsProvider.updateCampaign({ ...rest, customerId });
  }

  /**
   * 구글 고객 계정의 광고 캠페인을 생성해요
   *
   * 캠페인(=campaign)을 생성합니다.
   * 캠페인은 Google Ads에서 계정 아래에 귀속되며, 캠페인, 광고 그룹, 광고로 이루어지는 트리 구조 상 최상단에 위치하게 됩니다.
   * 캠페인은 광고 그룹을 묶기 위한 부모 개체로써, 광고의 기간과 예산, 목적, 채널 등을 담당합니다.
   * 캠페인 이름을 지정하지 않을 경우 무작위 이름으로 지정됩니다. 이 경우 식별하기 어려울 수 있습니다.
   * 따라서 권장은 캠페인의 목적에 따라 각기 다른 이름을 지어 구분할 수 있도록 하는 것입니다.
   * 캠페인의 이름은 유저가 식별하기 편하게 할 뿐으로써, 광고의 효력에는 전혀 영향을 미치지 않으므로 안심해도 좋습니다.
   *
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * 원래라면 금액 제한이 없으나 만일의 사태를 대비하여 현재는 캠페인 당 10만원까지만 가능하도록 기능 제한합니다.
   *
   * @summary 캠페인을 생성합니다
   * @param input 캠페인 생성 조건
   * @returns 생성된 캠페인 정보
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("campaigns")
  async createCampaign(
    @TypedBody() input: IGoogleAds.ICreateCampaignInput,
  ): Promise<IGoogleAds.ICreateCampaignsOutput> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    return this.googleAdsProvider.createCampaign({ ...input, customerId });
  }

  /**
   * 구글 고객 계정에 검색 광고를 한 번에 만들어요
   *
   * 구글 광고를 한 번에 생성하는 것은 Google Ads 트리 구조 상 존재하는 캠페인, 광고 그룹, 광고를 한꺼번에 생성하는 것을 의미합니다.
   * 이 경우, 어떤 캠페인에 대해서 광고를 생성할 것인지 지정하지 않아도 됩니다.
   * 왜냐하면 첫 리소스인 캠페인부터 광고까지를 한꺼번에 모두 생성하기 때문입니다.
   *
   * Google Ads의 캠페인 트리 구조는 최상단 캠페인 노드에서 예산을 담당하고, 광고가 최적화될 때 광고 그룹과 광고는 캠페인의 예산을 공유하는 형태가 됩니다.
   * 이는 쉽게 말해 캠페인 내에서 광고는 어떤 것이 엔드 유저에게 노출될지 스스로 학습되고 최적화되고 있음을 의미합니다.
   * 따라서 이를 한 번에 생성하는 커넥터 구조 상 광고 생성은 간편하나 만일 여러 개의 광고를 생성하고자 한다면 부적합할 수 있습니다.
   * 단, 광고 소재가 여러 개가 있어, 여러 개의 광고를 생성하고 비교할 목적이 아니라면 간편하게 광고를 집행할 수 있어 매우 편리할 것입니다.
   *
   * 대부분의 경우에는 이 방식으로 광고를 생성하더라도 문제가 되지 않습니다.
   *
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   *
   * 광고는 생성 직후 바로 검토 중으로 넘어가며, 이 때 구글 심사가 통과되면 광고는 집행되여 지출이 발생하게 됩니다.
   * 하지만 이 커넥터로 광고를 생성할 경우에는 광고 상태가 `PAUSED`로 설정이 됩니다.
   * 이는 만약의 사태를 대비하여 유저가 캠페인, 광고 그룹, 광고 등을 재조회하여 자신이 원하는 상태로 만들어졌는지 체크하게 하기 위함입니다.
   * 따라서 광고의 검토가 끝나더라도 광고는 집행되지 않으며 성과와 지출 역시 발생하지 않습니다.
   * 광고가 올바른지 체크하였다면, 유저는 `광고 수정 커넥터`를 이용하여 광고의 상태(status)를 `ENABLED` 값으로 변경할 수 있습니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * 원래라면 금액 제한이 없으나 만일의 사태를 대비하여 현재는 캠페인 당 10만원까지만 가능하도록 기능 제한합니다.
   *
   * @summary 구글 고객 계정에 반응형 검색 광고를 한 번에 만들어요
   * @param input 캠페인부터 광고까지 한 번에 생성하는 조건
   * @returns 생성된 캠페인부터 광고까지의 정보
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("search-ads")
  async createSearchAd(
    @TypedBody()
    input: IGoogleAds.ICreateAdGroupSearchAdAtOnceInput,
  ): Promise<IGoogleAds.ICreateAdGroupAdAtOnceOutput> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    const { campaign, campaignBudget } =
      await this.googleAdsProvider.createCampaign({
        ...input.campaign,
        advertisingChannelType: "SEARCH",
        customerId,
      });

    const ad = await this.googleAdsProvider.createAd({
      ...input.ad,
      customerId: customerId,
      campaignResourceName: campaign.resourceName,
      type: `SEARCH_STANDARD`,
    });

    return { campaign, campaignBudget, ad };
  }

  /**
   * 구글 고객 계정에 디스플레이 광고를 한 번에 만들어요
   *
   * 구글 광고를 한 번에 생성하는 것은 Google Ads 트리 구조 상 존재하는 캠페인, 광고 그룹, 광고를 한꺼번에 생성하는 것을 의미합니다.
   * 이 경우, 어떤 캠페인에 대해서 광고를 생성할 것인지 지정하지 않아도 됩니다.
   * 왜냐하면 첫 리소스인 캠페인부터 광고까지를 한꺼번에 모두 생성하기 때문입니다.
   *
   * Google Ads의 캠페인 트리 구조는 최상단 캠페인 노드에서 예산을 담당하고, 광고가 최적화될 때 광고 그룹과 광고는 캠페인의 예산을 공유하는 형태가 됩니다.
   * 이는 쉽게 말해 캠페인 내에서 광고는 어떤 것이 엔드 유저에게 노출될지 스스로 학습되고 최적화되고 있음을 의미합니다.
   * 따라서 이를 한 번에 생성하는 커넥터 구조 상 광고 생성은 간편하나 만일 여러 개의 광고를 생성하고자 한다면 부적합할 수 있습니다.
   * 단, 광고 소재가 여러 개가 있어, 여러 개의 광고를 생성하고 비교할 목적이 아니라면 간편하게 광고를 집행할 수 있어 매우 편리할 것입니다.
   *
   * 대부분의 경우에는 이 방식으로 광고를 생성하더라도 문제가 되지 않습니다.
   *
   * 만약 `customerId`를 전달하지 않을 경우에는 해당 유저에게서 `Wrtn`이 접근 가능한 광고 계정이 단 1개인 경우에 한하여 자동으로 선택합니다.
   *
   * 광고는 생성 직후 바로 검토 중으로 넘어가며, 이 때 구글 심사가 통과되면 광고는 집행되여 지출이 발생하게 됩니다.
   * 하지만 이 커넥터로 광고를 생성할 경우에는 광고 상태가 `PAUSED`로 설정이 됩니다.
   * 이는 만약의 사태를 대비하여 유저가 캠페인, 광고 그룹, 광고 등을 재조회하여 자신이 원하는 상태로 만들어졌는지 체크하게 하기 위함입니다.
   * 따라서 광고의 검토가 끝나더라도 광고는 집행되지 않으며 성과와 지출 역시 발생하지 않습니다.
   * 광고가 올바른지 체크하였다면, 유저는 `광고 수정 커넥터`를 이용하여 광고의 상태(status)를 `ENABLED` 값으로 변경할 수 있습니다.
   *
   * 기능을 호출하기 전 유저에게 `customerId`를 물어봐야 하며 따라서 `customerId`를 확인할 수 있는 커넥터를 제안해야 합니다.
   *
   * 원래라면 금액 제한이 없으나 만일의 사태를 대비하여 현재는 캠페인 당 10만원까지만 가능하도록 기능 제한합니다.
   *
   * @summary 구글 계정 광고에 반응형 디스플레이 광고를 한 번에 만들어요
   * @param input 캠페인부터 광고까지 한 번에 생성하는 조건
   * @returns 생성된 캠페인부터 광고까지의 정보
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/googleAD_full.svg",
  )
  @core.TypedRoute.Post("display-ads")
  async createDisplayAd(
    @TypedBody()
    input: IGoogleAds.ICreateAdGroupDisplayAdAtOnceInput,
  ): Promise<IGoogleAds.ICreateAdGroupAdAtOnceOutput> {
    const customerId = await this.googleAdsProvider.getTargetCustomerId(input);
    const { campaign, campaignBudget } =
      await this.googleAdsProvider.createCampaign({
        ...input.campaign,
        advertisingChannelType: "DISPLAY",
        customerId,
      });

    const ad = await this.googleAdsProvider.createAd({
      ...input.ad,
      customerId: customerId,
      campaignResourceName: campaign.resourceName,
      type: `DISPLAY_STANDARD`,
    });

    return { campaign, campaignBudget, ad };
  }
}
