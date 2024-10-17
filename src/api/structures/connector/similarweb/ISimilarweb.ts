export namespace ISimilarweb {
  export interface IGetDomainInfoOutput {
    description: string;
    status: number;
    data: DomainInfo;
  }

  export interface IGetDomainInfoInput {
    domain: string;
  }

  export interface DomainInfo {
    Version: number;
    SiteName: string;
    Description: string;
    TopCountryShares: TopCountryShare[];
    Title: string;
    Engagments: Engagments;
    EstimatedMonthlyVisits: EstimatedMonthlyVisits;
    GlobalRank: GlobalRank;
    CountryRank: CountryRank;
    CategoryRank: CategoryRank;
    GlobalCategoryRank: any;
    IsSmall: boolean;
    Policy: number;
    TrafficSources: TrafficSources;
    Category: string;
    LargeScreenshot: string;
    IsDataFromGa: boolean;
    Countries: Country[];
    Competitors: Competitors;
    Notification: Notification;
    TopKeywords: TopKeyword[];
    SnapshotDate: string;
  }

  export interface TopCountryShare {
    Country: number;
    CountryCode: string;
    Value: number;
  }

  export interface Engagments {
    BounceRate: string;
    Month: string;
    Year: string;
    PagePerVisit: string;
    Visits: string;
    TimeOnSite: string;
  }

  export interface EstimatedMonthlyVisits {
    "2024-07-01": number;
    "2024-08-01": number;
    "2024-09-01": number;
  }

  export interface GlobalRank {
    Rank: number;
  }

  export interface CountryRank {
    Country: number;
    CountryCode: string;
    Rank: number;
  }

  export interface CategoryRank {
    Rank: string;
    Category: string;
  }

  export interface TrafficSources {
    Social: number;
    "Paid Referrals": number;
    Mail: number;
    Referrals: number;
    Search: number;
    Direct: number;
  }

  export interface Country {
    Code: string;
    UrlCode: string;
    Name: string;
  }

  export interface Competitors {
    TopSimilarityCompetitors: any[];
  }

  export interface Notification {
    Content: any;
  }

  export interface TopKeyword {
    Name: string;
    EstimatedValue: number;
    Volume: number;
    Cpc: number;
  }
}
