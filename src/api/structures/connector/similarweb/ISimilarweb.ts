export namespace ISimilarweb {
  /**
   * @title Output interface for getting domain information
   * @description Contains the response details for domain information retrieval
   */
  export interface IGetDomainInfoOutput {
    /**
     * @title Description
     * @description Description of the domain information
     */
    description: string;

    /**
     * @title Status
     * @description Status code of the response
     */
    status: number;

    /**
     * @title Data
     * @description Detailed domain information
     */
    data: DomainInfo;
  }

  /**
   * @title Input interface for getting domain information
   * @description Contains the input parameters for domain information retrieval
   */
  export interface IGetDomainInfoInput {
    /**
     * @title Domain
     * Domain name to retrieve information for. (e.g, 'wrtn.ai' or 'https://wrtn.ai')
     */
    domain: string;
  }

  /**
   * @title Domain Information
   * @description Detailed information about the domain
   */
  export interface DomainInfo {
    /**
     * @title Version
     * @description Version number of the data
     */
    Version: number;

    /**
     * @title Site Name
     * @description Name of the site
     */
    SiteName: string;

    /**
     * @title Description
     * @description Description of the site
     */
    Description: string;

    /**
     * @title Top Country Shares
     * @description Shares of top countries
     */
    TopCountryShares: TopCountryShare[];

    /**
     * @title Title
     * @description Title of the site
     */
    Title: string;

    /**
     * @title Engagements
     * @description Engagement metrics
     */
    Engagments: Engagments;

    /**
     * Estimated monthly visits.
     * Key is date(YYYY-MM-DD) format and value is number. (e.g. { "2024-07-01": number } )
     *
     * @title Estimated Monthly Visits
     */
    EstimatedMonthlyVisits: Record<string, number>;

    /**
     * @title Global Rank
     * @description Global rank of the site
     */
    GlobalRank: GlobalRank;

    /**
     * @title Country Rank
     * @description Country-specific rank
     */
    CountryRank: CountryRank;

    /**
     * @title Category Rank
     * @description Category-specific rank
     */
    CategoryRank: CategoryRank;

    /**
     * @title Global Category Rank
     * @description Global category rank
     */
    GlobalCategoryRank: any;

    /**
     * @title Is Small
     * @description Indicates if the site is small
     */
    IsSmall: boolean;

    /**
     * @title Policy
     * @description Policy number
     */
    Policy: number;

    /**
     * @title Traffic Sources
     * @description Sources of traffic
     */
    TrafficSources: TrafficSources;

    /**
     * @title Category
     * @description Category of the site
     */
    Category: string;

    /**
     * @title Large Screenshot
     * @description URL of the large screenshot
     */
    LargeScreenshot: string;

    /**
     * @title Is Data From GA
     * @description Indicates if data is from Google Analytics
     */
    IsDataFromGa: boolean;

    /**
     * @title Competitors
     * @description Competitors information
     */
    Competitors: Competitors;

    /**
     * @title Notification
     * @description Notification details
     */
    Notification: Notification;

    /**
     * @title Top Keywords
     * @description Top keywords for the site
     */
    TopKeywords: TopKeyword[];

    /**
     * @title Snapshot Date
     * @description Date of the snapshot
     */
    SnapshotDate: string;
  }

  /**
   * @title Top Country Share
   * @description Information about top country shares
   */
  export interface TopCountryShare {
    /**
     * @title Country
     * @description Country code as a number
     */
    Country: number;

    /**
     * @title Country Code
     * @description Country code as a string
     */
    CountryCode: string;

    /**
     * @title Value
     * @description Share value
     */
    Value: number;
  }

  /**
   * @title Engagements
   * @description Engagement metrics
   */
  export interface Engagments {
    /**
     * @title Bounce Rate
     * @description Bounce rate percentage
     */
    BounceRate: string;

    /**
     * @title Month
     * @description Month of the data
     */
    Month: string;

    /**
     * @title Year
     * @description Year of the data
     */
    Year: string;

    /**
     * @title Page Per Visit
     * @description Average pages per visit
     */
    PagePerVisit: string;

    /**
     * @title Visits
     * @description Total visits
     */
    Visits: string;

    /**
     * @title Time On Site
     * @description Average time spent on site
     */
    TimeOnSite: string;
  }

  /**
   * @title Global Rank
   * @description Global rank information
   */
  export interface GlobalRank {
    /**
     * @title Rank
     * @description Rank number
     */
    Rank: number;
  }

  /**
   * @title Country Rank
   * @description Country-specific rank information
   */
  export interface CountryRank {
    /**
     * @title Country
     * @description Country code as a number
     */
    Country: number;

    /**
     * @title Country Code
     * @description Country code as a string
     */
    CountryCode: string;

    /**
     * @title Rank
     * @description Rank number
     */
    Rank: number;
  }

  /**
   * @title Category Rank
   * @description Category-specific rank information
   */
  export interface CategoryRank {
    /**
     * @title Rank
     * @description Rank number
     */
    Rank: string;

    /**
     * @title Category
     * @description Category name
     */
    Category: string;
  }

  /**
   * @title Traffic Sources
   * @description Traffic sources information
   */
  export interface TrafficSources {
    /**
     * @title Social
     * @description Percentage of traffic from social media
     */
    Social: number;

    /**
     * @title Paid Referrals
     * @description Percentage of traffic from paid referrals
     */
    "Paid Referrals": number;

    /**
     * @title Mail
     * @description Percentage of traffic from email
     */
    Mail: number;

    /**
     * @title Referrals
     * @description Percentage of traffic from referrals
     */
    Referrals: number;

    /**
     * @title Search
     * @description Percentage of traffic from search engines
     */
    Search: number;

    /**
     * @title Direct
     * @description Percentage of direct traffic
     */
    Direct: number;
  }

  /**
   * @title Country
   * @description Country information
   */
  export interface Country {
    /**
     * @title Code
     * @description Country code
     */
    Code: string;

    /**
     * @title URL Code
     * @description URL code for the country
     */
    UrlCode: string;

    /**
     * @title Name
     * @description Country name
     */
    Name: string;
  }

  /**
   * @title Competitors
   * @description Competitors information
   */
  export interface Competitors {
    /**
     * @title Top Similarity Competitors
     * @description List of top similarity competitors
     */
    TopSimilarityCompetitors: any[];
  }

  /**
   * @title Notification
   * @description Notification details
   */
  export interface Notification {
    /**
     * @title Content
     * @description Content of the notification
     */
    Content: any;
  }

  /**
   * @title Top Keyword
   * @description Top keyword information
   */
  export interface TopKeyword {
    /**
     * @title Name
     * @description Keyword name
     */
    Name: string;

    /**
     * @title Estimated Value
     * @description Estimated value of the keyword
     */
    EstimatedValue: number;

    /**
     * @title Volume
     * @description Search volume of the keyword
     */
    Volume: number;

    /**
     * @title CPC
     * @description Cost per click for the keyword
     */
    Cpc: number | null;
  }
}
