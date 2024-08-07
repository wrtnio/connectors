import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";

import { AirportInformationModule } from "./airport_information/AirportInformationModule";
import { ArxivSearchModule } from "./arxiv_search/ArxivSearchModule";
import { AwsModule } from "./aws/AwsModule";
import { ChatbotModule } from "./chatbot/ChatbotModule";
import { CsvModule } from "./csv/CsvModule";
import { DallE3Module } from "./dall_e_3/DallE3Module";
import { DaumModule } from "./daum/DaumModule";
import { ExcelModule } from "./excel/ExcelModule";
import { KeywordExtractModule } from "./extract/KeywordExtractModule";
import { FigmaModule } from "./figma/FigmaModule";
import { GmailModule } from "./gmail/GmailModule";
import { GoogleDocsModule } from "./google-docs/GoogleDocsModule";
import { GoogleSheetModule } from "./google-sheet/GoogleSheetModule";
import { GoogleAdsModule } from "./google_ads/GoogleAdsModule";
import { GoogleCalendarModule } from "./google_calendar/GoogleCalendarModule";
import { GoogleDriveModule } from "./google_drive/GoogleDriveModule";
import { GoogleFlightModule } from "./google_flight/GoogleFlightModule";
import { GoogleHotelModule } from "./google_hotel/GoogleHotelModule";
import { GoogleScholarModule } from "./google_scholar/GoolgeScholarModule";
import { GoogleSearchModule } from "./google_search/GoogleSearchModule";
import { GoogleSlidesModule } from "./google_slides/GoogleSlidesModule";
import { HancellModule } from "./hancell/HancellModule";
import { HwpModule } from "./hwp/HwpModule";
import { ImwebModule } from "./imweb/ImwebModule";
import { GoogleModule } from "./internal/google/GoogleModule";
import { KakaoMapModule } from "./kakao_map/KakaoMapModule";
import { KakaoNaviModule } from "./kakao_navi/KakaoNaviModule";
import { KakaoTalkModule } from "./kakao_talk/KakaoTalkModule";
import { KoreaEximbankModule } from "./korea_eximbank/KoreaEximbankModule";
import { LlmModule } from "./llm/LlmModule";
import { MarketingCopyModule } from "./marketing/MarketingCopyModule";
import { NaverModule } from "./naver/NaverModule";
import { NotionModule } from "./notion/NotionModule";
import { OpenDataModule } from "./open_data/OpenDataModule";
import { PromptModule } from "./prompts/PromptModule";
import { RagModule } from "./rag/RagModule";
import { SlackModule } from "./slack/SlackModule";
import { RankModule } from "./sort/RankModule";
import { StableDiffusionBetaModule } from "./stable_diffustion_beta/StableDiffusionBetaModule";
import { StoryGeneratorModule } from "./story_generator/StoryGeneratorModule";
import { StoryImageGeneratorModule } from "./story_image_generator/StoryImageGeneratorModule";
import { StudentReportGeneratorModule } from "./student_report_generator/StudentReportGeneratorModule";
import { SweetTackerModule } from "./sweet_tracker/SweetTrackerModule";
import { ToolModule } from "./tool/ToolModule";
import { TypeformController } from "./typeform/TypeformController";
import { YoutubeSearchModule } from "./youtube_search/YoutubeSearchModule";
import { ZoomModule } from "./zoom/ZoomModule";
import { JiraModule } from "./jira/JiraModule";
import { GoogleTrendModule } from "./google_trend/GoogleTrendModule";
import { GoogleSearchCareerModule } from "./google_search_career/GoogleSearchCareerModule";
import { GoogleShoppingAladinModule } from "./google_shopping/google_shopping_aladine/GoogleShoppingAladinModule";
import { GoogleShoppingAliexpressModule } from "./google_shopping/google_shopping_aliexpress/GoogleShoppingAliexpressModule";
import { GoogleShoppingCoupangModule } from "./google_shopping/google_shopping_coupang/GoogleShoppingCoupangModule";
import { GoogleShoppingEqlModule } from "./google_shopping/google_shopping_eql/GoogleShoppingEqlModule";
import { GoogleShoppingIherbModule } from "./google_shopping/google_shopping_iherb/GoogleShoppingIherbModule";
import { GoogleShoppingMarketKurlyModule } from "./google_shopping/google_shopping_market_kurly/GoogleShoppingMarketKurlyModule";
import { GoogleShoppingOcoModule } from "./google_shopping/google_shopping_oco/GoogleShoppingOcoModule";
import { GoogleShoppingOliveYoungModule } from "./google_shopping/google_shopping_olive_young/GoogleShoppingOliveYoungModule";
import { GoogleShoppingYesTwentyFourModule } from "./google_shopping/google_shopping_yes_twenty_four/GoogleShoppingYesTwentyFourModule";
import { GoogleShoppingUniqloModule } from "./google_shopping/google_shopping_uniqlo/GoogleShoppingUniqloModule";
import { GoogleShoppingTwentyNineCentimeterModule } from "./google_shopping/google_shopping_twenty_nine_cenetimeter/GoogleShoppingTwentyNineCentimeterModule";
import { GoogleShoppingMusinsaModule } from "./google_shopping/google_shopping_musinsa/GoogleShoppingMusinsaModule";

@Module({
  // connectors that require DI of some sort shall be declared as modules
  // the rest can be simply imported as controllers
  imports: [
    KeywordExtractModule,
    RankModule,
    MarketingCopyModule,
    StudentReportGeneratorModule,
    AwsModule,
    RagModule,
    HwpModule,
    ExcelModule,
    GoogleDocsModule,
    GoogleSheetModule,
    GoogleCalendarModule,
    GoogleDriveModule,
    LlmModule,
    GoogleModule,
    GmailModule,
    LoggerModule,
    ToolModule,
    ChatbotModule,
    FigmaModule,
    ZoomModule,
    SweetTackerModule,
    HancellModule,
    KakaoTalkModule,
    KakaoMapModule,
    KakaoNaviModule,
    GoogleSlidesModule,
    ImwebModule,
    OpenDataModule,
    PromptModule,
    KoreaEximbankModule,
    StoryGeneratorModule,
    StoryImageGeneratorModule,
    StableDiffusionBetaModule,
    DallE3Module,
    GoogleSearchModule,
    GoogleSearchCareerModule,
    GoogleShoppingAladinModule,
    GoogleShoppingAliexpressModule,
    GoogleShoppingCoupangModule,
    GoogleShoppingEqlModule,
    GoogleShoppingIherbModule,
    GoogleShoppingMarketKurlyModule,
    GoogleShoppingOcoModule,
    GoogleShoppingOliveYoungModule,
    GoogleShoppingTwentyNineCentimeterModule,
    GoogleShoppingUniqloModule,
    GoogleShoppingYesTwentyFourModule,
    GoogleShoppingMusinsaModule,
    GoogleAdsModule,
    ArxivSearchModule,
    DaumModule,
    NaverModule,
    YoutubeSearchModule,
    GoogleScholarModule,
    CsvModule,
    NotionModule,
    GoogleHotelModule,
    AirportInformationModule,
    GoogleFlightModule,
    SlackModule,
    JiraModule,
    GoogleTrendModule,
  ],
  controllers: [TypeformController],
})
export class ConnectorModule {}
