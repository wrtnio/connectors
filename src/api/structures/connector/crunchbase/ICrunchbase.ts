import { Placeholder } from "@wrtnio/decorators";

export namespace ICrunchbase {
  /**
   * @title Represents the output of an autocomplete response.
   */
  export interface IAutocompleteOutput {
    /**
     * @title Description
     *
     * A description of the autocomplete result, which is always "OK".
     */
    description: string & Placeholder<"OK">;

    /**
     * @title Status
     *
     * The status code of the response, which is always 200 (success).
     */
    status: number & Placeholder<"200">;

    /**
     * @title Response Data
     */
    data: {
      /**
       * @title Entities
       *
       * An array of entities related to the organization.
       */
      entities: {
        /**
         * @title organization_identifier for crunchbase api
         *
         * The unique identifier of the organization
         */
        organization_identifier: string & Placeholder<"wrtn-technologies">;

        /**
         * @title short_description
         *
         * A brief description of the organization
         */
        short_description: string;

        /**
         * @title organization_name
         *
         * The name of the organization
         */
        organization_name: string & Placeholder<"Wrtn Technologies">;
      }[];

      /**
       * @title hasEntities
       *
       * A flag indicating if there are any entities in the response.
       */
      hasEntities: boolean;
    };
  }

  export interface IAutocompleteInput {
    /**
     * @title query
     *
     * As a search word, regardless of whether it is Korean or English, you can enter keywords related to the company you want to see.
     * You can use the company name to obtain an identifier that can be used by the company's name or Crunchbase.
     */
    query: string;
  }

  /**
   * @title Crunchbase 응답
   * @description Crunchbase API의 응답 형식을 정의합니다.
   */
  export interface CrunchbaseResponse {
    /**
     * @title 설명
     */
    description: string;
    /**
     * @title 상태 코드
     */
    status: number;
    /**
     * @title 데이터
     */
    data: OrganizationData;
  }

  /**
   * @title 조직 데이터
   * @description 조직의 존재 여부와 조직 정보를 포함합니다.
   */
  export interface OrganizationData {
    /**
     * @title 조직 존재 여부
     */
    organizationExists: boolean;
    /**
     * @title 조직 정보
     */
    organization: Organization;
  }

  /**
   * @title 조직
   * @description 조직의 세부 정보를 포함합니다.
   */
  export interface Organization {
    /**
     * @title 조직 ID
     */
    id: string;
    /**
     * @title 조직 이름
     */
    name: string;
    /**
     * @title 조직 URL
     */
    url: string;
    /**
     * @title 회사 순위
     */
    rank_company: number;
    /**
     * @title 위치 목록
     */
    locations: Location[];
    /**
     * @title 주소
     */
    address: string;
    /**
     * @title 소개
     */
    about: string;
    /**
     * @title 전체 설명
     */
    full_description: string;
    /**
     * @title 산업 분야
     */
    industries: string[];
    /**
     * @title 운영 상태
     */
    operating_status: string;
    /**
     * @title 설립 날짜
     */
    founded_date: string;
    /**
     * @title 회사 유형
     */
    company_type: string;
    /**
     * @title 소셜 미디어
     */
    social_media: SocialMedia[];
    /**
     * @title 직원 수
     */
    num_employees: string;
    /**
     * @title 웹사이트
     */
    website: string;
    /**
     * @title IPO 상태
     */
    ipo_status: string;
    /**
     * @title 연락 이메일
     */
    contact_email: string;
    /**
     * @title 연락 전화번호
     */
    contact_phone: string;
    /**
     * @title 자금 정보
     */
    funding_info: FundingInfo[];
    /**
     * @title 유사 회사
     */
    similar_companies: SimilarCompany[];
    /**
     * @title 로고
     */
    logo: string;
    /**
     * @title SEMrush 월간 방문자 수
     */
    semrush_monthly_visits: number;
    /**
     * @title SEMrush 월간 방문자 성장률
     */
    semrush_monthly_visits_growth: number;
    /**
     * @title SEMrush 마지막 업데이트
     */
    semrush_last_updated: string;
    /**
     * @title 연락처 수
     */
    num_contacts: number;
    /**
     * @title 직원 프로필 수
     */
    num_employee_profiles: number;
    /**
     * @title 활성 제품 수
     */
    total_active_products: number;
    /**
     * @title 뉴스 수
     */
    num_news: number;
    /**
     * @title 자금 조달 라운드
     */
    funding_rounds: FundingRounds;
    /**
     * @title Bombora 마지막 업데이트
     */
    bombora_last_updated: string;
    /**
     * @title 투자자 수
     */
    num_investors: number;
    /**
     * @title 법적 이름
     */
    legal_name: string;
    /**
     * @title 이벤트 출연 수
     */
    num_event_appearances?: number;
    /**
     * @title 인수 수
     */
    num_acquisitions?: number;
    /**
     * @title 투자 수
     */
    num_investments?: number;
    /**
     * @title 자문직 수
     */
    num_advisor_positions?: number;
    /**
     * @title 종료 수
     */
    num_exits?: number;
    /**
     * @title 리드 투자 수
     */
    num_investments_lead?: number;
    /**
     * @title 하위 조직 수
     */
    num_sub_organizations?: number;
    /**
     * @title 동문 수
     */
    num_alumni?: number;
    /**
     * @title 창립자 동문 수
     */
    num_founder_alumni?: number;
    /**
     * @title 다양성 투자 수
     */
    num_diversity_spotlight_investments?: number;
    /**
     * @title 펀드 수
     */
    num_funds?: number;
    /**
     * @title 주식 심볼
     */
    stock_symbol?: string;
    /**
     * @title 연락처
     */
    contacts: Contact[];
    /**
     * @title 이벤트 출연
     */
    event_appearances: any[];
    /**
     * @title 하위 조직
     */
    sub_organizations: any[];
    /**
     * @title 동문
     */
    alumni: any[];
    /**
     * @title 다양성 투자
     */
    diversity_investments: any[];
    /**
     * @title 펀드
     */
    funds: any[];
    /**
     * @title 해고
     */
    layoff: any[];
    /**
     * @title IPO 정보
     */
    ipo: IPO;
    /**
     * @title 총 펀드
     */
    funds_total?: number;
    /**
     * @title 인수 정보
     */
    acquired_by: AcquiredBy;
    /**
     * @title 투자자 유형
     */
    investor_type?: string;
    /**
     * @title 투자 단계
     */
    investment_stage?: string;
    /**
     * @title 현재 직원
     */
    current_employees: CurrentEmployee[];
    /**
     * @title SEMrush 위치 목록
     */
    semrush_location_list: SemrushLocation[];
    /**
     * @title Siftery 제품
     */
    siftery_products: any[];
    /**
     * @title 자금 조달 라운드 목록
     */
    funding_rounds_list: FundingRound[];
    /**
     * @title 개요 타임라인
     */
    overview_timeline: OverviewTimeline[];
    /**
     * @title Bombora
     */
    bombora: Bombora[];
    /**
     * @title 투자자
     */
    investors: Investor[];
    /**
     * @title 인수
     */
    acquisitions: any[];
    /**
     * @title 펀드 조달
     */
    funds_raised: any[];
    /**
     * @title 투자
     */
    investments: any[];
    /**
     * @title Apptopia
     */
    apptopia: any[];
    /**
     * @title 현재 자문
     */
    current_advisors: any[];
    /**
     * @title 종료
     */
    exits: any[];
    /**
     * @title 뉴스
     */
    news: News[];
    /**
     * @title Aberdeen IT 지출
     */
    aberdeen_it_spend: any;
    /**
     * @title 본사 지역
     */
    headquarters_regions: HeadquartersRegion[];
    /**
     * @title 재무 하이라이트
     */
    financials_highlights: FinancialsHighlights;
    /**
     * @title IPQwery
     */
    ipqwery: IPQwery;
    /**
     * @title 개요 하이라이트
     */
    overview_highlights: OverviewHighlights;
    /**
     * @title 인물 하이라이트
     */
    people_highlights: PeopleHighlights;
    /**
     * @title 기술 하이라이트
     */
    technology_highlights: TechnologyHighlights;
    /**
     * @title 창립자
     */
    founders: Founder[];
  }

  /**
   * @title 위치
   * @description 조직의 위치 정보를 포함합니다.
   */
  export interface Location {
    /**
     * @title 값
     */
    value: string;
    /**
     * @title 위치 유형
     */
    location_type: string;
  }

  /**
   * @title 소셜 미디어
   * @description 조직의 소셜 미디어 정보를 포함합니다.
   */
  export interface SocialMedia {
    /**
     * @title 이름
     */
    name: string;
    /**
     * @title 링크
     */
    link: string;
  }

  /**
   * @title 자금 정보
   * @description 조직의 자금 정보를 포함합니다.
   */
  export interface FundingInfo {
    /**
     * @title 제목
     */
    title: string;
    /**
     * @title 조직 수
     */
    org_num: number;
    /**
     * @title 투자자 수
     */
    org_num_investors: number;
    /**
     * @title 총 자금
     */
    org_funding_total: FundingTotal;
  }

  /**
   * @title 자금 총액
   * @description 자금의 총액 정보를 포함합니다.
   */
  export interface FundingTotal {
    /**
     * @title USD 값
     */
    value_usd: number;
    /**
     * @title 통화
     */
    currency: string;
    /**
     * @title 값
     */
    value: number;
  }

  /**
   * @title 유사 회사
   * @description 유사한 회사 정보를 포함합니다.
   */
  export interface SimilarCompany {
    /**
     * @title 이름
     */
    name: string;
    /**
     * @title URL
     */
    url: string;
  }

  /**
   * @title 자금 조달 라운드
   * @description 자금 조달 라운드 정보를 포함합니다.
   */
  export interface FundingRounds {
    /**
     * @title 마지막 자금 조달 날짜
     */
    last_funding_at: string;
    /**
     * @title 마지막 자금 조달 유형
     */
    last_funding_type: string;
    /**
     * @title 자금 조달 라운드 수
     */
    num_funding_rounds: number;
    /**
     * @title 값
     */
    value: FundingTotal;
  }

  /**
   * @title 연락처
   * @description 조직의 연락처 정보를 포함합니다.
   */
  export interface Contact {
    /**
     * @title 이름
     */
    name: string;
    /**
     * @title LinkedIn ID
     */
    linkedin_id: string;
    /**
     * @title 레벨
     */
    levels: string[];
    /**
     * @title 부서
     */
    departments: any;
  }

  /**
   * @title IPO
   * @description IPO 정보를 포함합니다.
   */
  export interface IPO {
    /**
     * @title 날짜
     */
    date?: string;
    /**
     * @title 주식 링크
     */
    stock_link?: string;
    /**
     * @title 주식 심볼
     */
    stock_symbol?: string;
  }

  /**
   * @title 인수 정보
   * @description 인수 정보를 포함합니다.
   */
  export interface AcquiredBy {
    /**
     * @title 인수자
     */
    acquirer?: string;
    /**
     * @title 인수자 permalink
     */
    acquirer_permalink?: string;
    /**
     * @title 인수 가격
     */
    acquisition_price?: string;
    /**
     * @title 날짜
     */
    date?: string;
    /**
     * @title 거래 이름
     */
    transaction_name?: string;
  }

  /**
   * @title 현재 직원
   * @description 현재 직원 정보를 포함합니다.
   */
  export interface CurrentEmployee {
    /**
     * @title 이미지
     */
    image: string;
    /**
     * @title 이름
     */
    name: string;
    /**
     * @title permalink
     */
    permalink: string;
    /**
     * @title 직함
     */
    title: string;
  }

  /**
   * @title SEMrush 위치
   * @description SEMrush 위치 정보를 포함합니다.
   */
  export interface SemrushLocation {
    /**
     * @title 위치 목록
     */
    locations: LocationDetail[];
    /**
     * @title 순위
     */
    rank: number;
    /**
     * @title 순위 MoM 비율
     */
    rank_mom_pct: number;
    /**
     * @title 방문 MoM 비율
     */
    visits_mom_pct: number;
    /**
     * @title 방문 비율
     */
    visits_pct: number;
  }

  /**
   * @title 위치 세부 정보
   * @description 위치의 세부 정보를 포함합니다.
   */
  export interface LocationDetail {
    /**
     * @title 이름
     */
    name: string;
    /**
     * @title permalink
     */
    permalink: string;
  }

  /**
   * @title 자금 조달 라운드
   * @description 자금 조달 라운드 정보를 포함합니다.
   */
  export interface FundingRound {
    /**
     * @title 발표 날짜
     */
    announced_on: string;
    /**
     * @title ID
     */
    id: string;
    /**
     * @title 이미지 ID
     */
    image_id: string;
    /**
     * @title 투자자 수
     */
    num_investors: number;
    /**
     * @title 리드 투자자
     */
    lead_investors: LeadInvestor[];
    /**
     * @title 모금액
     */
    money_raised: FundingTotal;
  }

  /**
   * @title 리드 투자자
   * @description 리드 투자자 정보를 포함합니다.
   */
  export interface LeadInvestor {
    /**
     * @title 이미지
     */
    image: string;
    /**
     * @title 이름
     */
    name: string;
    /**
     * @title permalink
     */
    permalink: string;
  }

  /**
   * @title 개요 타임라인
   * @description 개요 타임라인 정보를 포함합니다.
   */
  export interface OverviewTimeline {
    /**
     * @title 발표 날짜
     */
    announced_on: string;
    /**
     * @title ID
     */
    id?: string;
    /**
     * @title 이미지 ID
     */
    image_id?: string;
    /**
     * @title 리드 투자자
     */
    lead_investors: LeadInvestor[];
    /**
     * @title 모금액
     */
    money_raised: FundingTotal;
    /**
     * @title 제목
     */
    title: string;
    /**
     * @title UUID
     */
    uuid: string;
  }

  /**
   * @title Bombora
   * @description Bombora 정보를 포함합니다.
   */
  export interface Bombora {
    /**
     * @title 카테고리
     */
    category: string;
    /**
     * @title 점수
     */
    score: number;
    /**
     * @title 주제
     */
    topic: string;
    /**
     * @title 주간 서징
     */
    weeks_surging: number;
    /**
     * @title WoW 성장
     */
    wow_growth?: number;
  }

  /**
   * @title 투자자
   * @description 투자자 정보를 포함합니다.
   */
  export interface Investor {
    /**
     * @title 자금 조달 라운드
     */
    funding_round: FundingRoundDetail;
    /**
     * @title ID
     */
    id: string;
    /**
     * @title 투자자
     */
    investor: InvestorDetail;
    /**
     * @title 리드 투자자 여부
     */
    lead_investor?: boolean;
    /**
     * @title 유형
     */
    type: string;
    /**
     * @title 값
     */
    value: string;
  }

  /**
   * @title 자금 조달 라운드 세부 정보
   * @description 자금 조달 라운드의 세부 정보를 포함합니다.
   */
  export interface FundingRoundDetail {
    /**
     * @title ID
     */
    id: string;
    /**
     * @title 이미지 ID
     */
    image_id: string;
    /**
     * @title 유형
     */
    type: string;
    /**
     * @title 값
     */
    value: string;
  }

  /**
   * @title 투자자 세부 정보
   * @description 투자자의 세부 정보를 포함합니다.
   */
  export interface InvestorDetail {
    /**
     * @title ID
     */
    id: string;
    /**
     * @title 이미지 ID
     */
    image_id: string;
    /**
     * @title 유형
     */
    type: string;
    /**
     * @title 값
     */
    value: string;
  }

  /**
   * @title 뉴스
   * @description 뉴스 정보를 포함합니다.
   */
  export interface News {
    /**
     * @title 날짜
     */
    date: string;
    /**
     * @title 조직
     */
    organization: string;
    /**
     * @title 발행자
     */
    publisher: string;
    /**
     * @title 썸네일 URL
     */
    thumbnail_url?: string;
    /**
     * @title 제목
     */
    title: string;
    /**
     * @title URL
     */
    url: string;
  }

  /**
   * @title 본사 지역
   * @description 본사 지역 정보를 포함합니다.
   */
  export interface HeadquartersRegion {
    /**
     * @title ID
     */
    id: string;
    /**
     * @title 값
     */
    value: string;
  }

  /**
   * @title 재무 하이라이트
   * @description 재무 하이라이트 정보를 포함합니다.
   */
  export interface FinancialsHighlights {
    /**
     * @title 총 자금
     */
    funding_total: FundingTotal;
    /**
     * @title 자금 조달 라운드 수
     */
    num_funding_rounds: number;
    /**
     * @title 투자자 수
     */
    num_investors: number;
    /**
     * @title 리드 투자자 수
     */
    num_lead_investors: number;
  }

  /**
   * @title IPQwery
   * @description IPQwery 정보를 포함합니다.
   */
  export interface IPQwery {
    /**
     * @title 인기 특허 카테고리
     */
    ipqwery_popular_patent_category: string;
    /**
     * @title 인기 상표 클래스
     */
    ipqwery_popular_trademark_class: string;
    /**
     * @title 등록된 상표 수
     */
    ipqwery_num_trademark_registered: number;
    /**
     * @title 승인된 특허 수
     */
    ipqwery_num_patent_granted: number;
  }

  /**
   * @title 개요 하이라이트
   * @description 개요 하이라이트 정보를 포함합니다.
   */
  export interface OverviewHighlights {
    /**
     * @title 유사 조직 수
     */
    num_org_similarities: number;
    /**
     * @title 현재 직위 수
     */
    num_current_positions: number;
    /**
     * @title 투자자 수
     */
    num_investors: number;
    /**
     * @title 연락처 수
     */
    num_contacts: number;
    /**
     * @title 총 자금
     */
    funding_total: FundingTotal;
  }

  /**
   * @title 인물 하이라이트
   * @description 인물 하이라이트 정보를 포함합니다.
   */
  export interface PeopleHighlights {
    /**
     * @title 연락처 수
     */
    num_contacts: number;
    /**
     * @title 현재 직위 수
     */
    num_current_positions: number;
  }

  /**
   * @title 기술 하이라이트
   * @description 기술 하이라이트 정보를 포함합니다.
   */
  export interface TechnologyHighlights {
    /**
     * @title 사용된 기술 수
     */
    builtwith_num_technologies_used: number;
    /**
     * @title SEMrush 최신 월 방문자 수
     */
    semrush_visits_latest_month: number;
    /**
     * @title SEMrush MoM 방문자 비율
     */
    semrush_visits_mom_pct: number;
  }

  /**
   * @title 창립자
   * @description 창립자 정보를 포함합니다.
   */
  export interface Founder {
    /**
     * @title ID
     */
    id: string;
    /**
     * @title 유형
     */
    type: string;
    /**
     * @title 값
     */
    value: string;
  }
}
