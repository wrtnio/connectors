export namespace ICrunchbase {
  export interface CrunchbaseResponse {
    description: string;
    status: number;
    data: OrganizationData;
  }

  export interface OrganizationData {
    organizationExists: boolean;
    organization: Organization;
  }

  export interface Organization {
    id: string;
    name: string;
    url: string;
    rank_company: number;
    locations: Location[];
    address: string;
    about: string;
    full_description: string;
    industries: string[];
    operating_status: string;
    founded_date: string;
    company_type: string;
    social_media: SocialMedia[];
    num_employees: string;
    website: string;
    ipo_status: string;
    contact_email: string;
    contact_phone: string;
    funding_info: FundingInfo[];
    similar_companies: SimilarCompany[];
    logo: string;
    semrush_monthly_visits: number;
    semrush_monthly_visits_growth: number;
    semrush_last_updated: string;
    num_contacts: number;
    num_employee_profiles: number;
    total_active_products: number;
    num_news: number;
    funding_rounds: FundingRounds;
    bombora_last_updated: string;
    num_investors: number;
    legal_name: string;
    num_event_appearances: number | null;
    num_acquisitions: number | null;
    num_investments: number | null;
    num_advisor_positions: number | null;
    num_exits: number | null;
    num_investments_lead: number | null;
    num_sub_organizations: number | null;
    num_alumni: number | null;
    num_founder_alumni: number | null;
    num_diversity_spotlight_investments: number | null;
    num_funds: number | null;
    stock_symbol: string | null;
    contacts: Contact[];
    event_appearances: any[];
    sub_organizations: any[];
    alumni: any[];
    diversity_investments: any[];
    funds: any[];
    layoff: any[];
    ipo: IPO;
    funds_total: number | null;
    acquired_by: AcquiredBy;
    investor_type: string | null;
    investment_stage: string | null;
    current_employees: CurrentEmployee[];
    semrush_location_list: SemrushLocation[];
    siftery_products: any[];
    funding_rounds_list: FundingRound[];
    overview_timeline: OverviewTimeline[];
    bombora: Bombora[];
    investors: Investor[];
    acquisitions: any[];
    funds_raised: any[];
    investments: any[];
    apptopia: any[];
    current_advisors: any[];
    exits: any[];
    news: News[];
    aberdeen_it_spend: any;
    headquarters_regions: HeadquartersRegion[];
    financials_highlights: FinancialsHighlights;
    ipqwery: IPQwery;
    overview_highlights: OverviewHighlights;
    people_highlights: PeopleHighlights;
    technology_highlights: TechnologyHighlights;
    founders: Founder[];
  }

  export interface Location {
    value: string;
    location_type: string;
  }

  export interface SocialMedia {
    name: string;
    link: string;
  }

  export interface FundingInfo {
    title: string;
    org_num: number;
    org_num_investors: number;
    org_funding_total: FundingTotal;
  }

  export interface FundingTotal {
    value_usd: number;
    currency: string;
    value: number;
  }

  export interface SimilarCompany {
    name: string;
    url: string;
  }

  export interface FundingRounds {
    last_funding_at: string;
    last_funding_type: string;
    num_funding_rounds: number;
    value: FundingTotal;
  }

  export interface Contact {
    name: string;
    linkedin_id: string;
    levels: string[];
    departments: any;
  }

  export interface IPO {
    date: string | null;
    stock_link: string | null;
    stock_symbol: string | null;
  }

  export interface AcquiredBy {
    acquirer: string | null;
    acquirer_permalink: string | null;
    acquisition_price: string | null;
    date: string | null;
    transaction_name: string | null;
  }

  export interface CurrentEmployee {
    image: string;
    name: string;
    permalink: string;
    title: string;
  }

  export interface SemrushLocation {
    locations: LocationDetail[];
    rank: number;
    rank_mom_pct: number;
    visits_mom_pct: number;
    visits_pct: number;
  }

  export interface LocationDetail {
    name: string;
    permalink: string;
  }

  export interface FundingRound {
    announced_on: string;
    id: string;
    image_id: string;
    num_investors: number;
    lead_investors: LeadInvestor[];
    money_raised: FundingTotal;
  }

  export interface LeadInvestor {
    image: string;
    name: string;
    permalink: string;
  }

  export interface OverviewTimeline {
    announced_on: string;
    id: string | null;
    image_id: string | null;
    lead_investors: LeadInvestor[];
    money_raised: FundingTotal;
    title: string;
    uuid: string;
  }

  export interface Bombora {
    category: string;
    score: number;
    topic: string;
    weeks_surging: number;
    wow_growth: number | null;
  }

  export interface Investor {
    funding_round: FundingRoundDetail;
    id: string;
    investor: InvestorDetail;
    lead_investor: boolean | null;
    type: string;
    value: string;
  }

  export interface FundingRoundDetail {
    id: string;
    image_id: string;
    type: string;
    value: string;
  }

  export interface InvestorDetail {
    id: string;
    image_id: string;
    type: string;
    value: string;
  }

  export interface News {
    date: string;
    organization: string;
    publisher: string;
    thumbnail_url: string | null;
    title: string;
    url: string;
  }

  export interface HeadquartersRegion {
    id: string;
    value: string;
  }

  export interface FinancialsHighlights {
    funding_total: FundingTotal;
    num_funding_rounds: number;
    num_investors: number;
    num_lead_investors: number;
  }

  export interface IPQwery {
    ipqwery_popular_patent_category: string;
    ipqwery_popular_trademark_class: string;
    ipqwery_num_trademark_registered: number;
    ipqwery_num_patent_granted: number;
  }

  export interface OverviewHighlights {
    num_org_similarities: number;
    num_current_positions: number;
    num_investors: number;
    num_contacts: number;
    funding_total: FundingTotal;
  }

  export interface PeopleHighlights {
    num_contacts: number;
    num_current_positions: number;
  }

  export interface TechnologyHighlights {
    builtwith_num_technologies_used: number;
    semrush_visits_latest_month: number;
    semrush_visits_mom_pct: number;
  }

  export interface Founder {
    id: string;
    type: string;
    value: string;
  }
}
