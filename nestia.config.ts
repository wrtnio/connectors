// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { OpenApi } from "@samchon/openapi";

import { StudioModule } from "./src/StudioModule";
import { AirportInformationModule } from "./src/controllers/connector/airport_information/AirportInformationModule";
import { ArxivSearchModule } from "./src/controllers/connector/arxiv_search/ArxivSearchModule";
import { CalendlyModule } from "./src/controllers/connector/calendly/CalendlyModule";
import { CsvModule } from "./src/controllers/connector/csv/CsvModule";
import { DallE3Module } from "./src/controllers/connector/dall_e_3/DallE3Module";
import { DaumModule } from "./src/controllers/connector/daum/DaumModule";
import { DiscordModule } from "./src/controllers/connector/discord/DiscordModule";
import { ExcelModule } from "./src/controllers/connector/excel/ExcelModule";
import { FigmaModule } from "./src/controllers/connector/figma/FigmaModule";
import { GithubModule } from "./src/controllers/connector/github/GithubModule";
import { GmailModule } from "./src/controllers/connector/gmail/GmailModule";
import { GoogleDocsModule } from "./src/controllers/connector/google-docs/GoogleDocsModule";
import { GoogleSheetModule } from "./src/controllers/connector/google-sheet/GoogleSheetModule";
import { GoogleAdsModule } from "./src/controllers/connector/google_ads/GoogleAdsModule";
import { GoogleCalendarModule } from "./src/controllers/connector/google_calendar/GoogleCalendarModule";
import { GoogleDriveModule } from "./src/controllers/connector/google_drive/GoogleDriveModule";
import { GoogleFlightModule } from "./src/controllers/connector/google_flight/GoogleFlightModule";
import { GoogleHotelModule } from "./src/controllers/connector/google_hotel/GoogleHotelModule";
import { GoogleMapModule } from "./src/controllers/connector/google_map/GoogleMapModule";
import { GoogleScholarModule } from "./src/controllers/connector/google_scholar/GoolgeScholarModule";
import { GoogleSearchModule } from "./src/controllers/connector/google_search/GoogleSearchModule";
import { GoogleSearchCareerModule } from "./src/controllers/connector/google_search_career/GoogleSearchCareerModule";
import { GoogleShoppingAladinModule } from "./src/controllers/connector/google_shopping/google_shopping_aladine/GoogleShoppingAladinModule";
import { GoogleShoppingAliexpressModule } from "./src/controllers/connector/google_shopping/google_shopping_aliexpress/GoogleShoppingAliexpressModule";
import { GoogleShoppingCoupangModule } from "./src/controllers/connector/google_shopping/google_shopping_coupang/GoogleShoppingCoupangModule";
import { GoogleShoppingEqlModule } from "./src/controllers/connector/google_shopping/google_shopping_eql/GoogleShoppingEqlModule";
import { GoogleShoppingIherbModule } from "./src/controllers/connector/google_shopping/google_shopping_iherb/GoogleShoppingIherbModule";
import { GoogleShoppingMarketKurlyModule } from "./src/controllers/connector/google_shopping/google_shopping_market_kurly/GoogleShoppingMarketKurlyModule";
import { GoogleShoppingOcoModule } from "./src/controllers/connector/google_shopping/google_shopping_oco/GoogleShoppingOcoModule";
import { GoogleShoppingOliveYoungModule } from "./src/controllers/connector/google_shopping/google_shopping_olive_young/GoogleShoppingOliveYoungModule";
import { GoogleShoppingTwentyNineCentimeterModule } from "./src/controllers/connector/google_shopping/google_shopping_twenty_nine_cenetimeter/GoogleShoppingTwentyNineCentimeterModule";
import { GoogleShoppingUniqloModule } from "./src/controllers/connector/google_shopping/google_shopping_uniqlo/GoogleShoppingUniqloModule";
import { GoogleShoppingYesTwentyFourModule } from "./src/controllers/connector/google_shopping/google_shopping_yes_twenty_four/GoogleShoppingYesTwentyFourModule";
import { GoogleSlidesModule } from "./src/controllers/connector/google_slides/GoogleSlidesModule";
import { GoogleTrendModule } from "./src/controllers/connector/google_trend/GoogleTrendModule";
import { HancellModule } from "./src/controllers/connector/hancell/HancellModule";
import { HwpModule } from "./src/controllers/connector/hwp/HwpModule";
import { ImwebModule } from "./src/controllers/connector/imweb/ImwebModule";
import { JiraModule } from "./src/controllers/connector/jira/JiraModule";
import { KakaoMapModule } from "./src/controllers/connector/kakao_map/KakaoMapModule";
import { KakaoNaviModule } from "./src/controllers/connector/kakao_navi/KakaoNaviModule";
import { KakaoTalkModule } from "./src/controllers/connector/kakao_talk/KakaoTalkModule";
import { KoreaEximbankModule } from "./src/controllers/connector/korea_eximbank/KoreaEximbankModule";
import { NaverModule } from "./src/controllers/connector/naver/NaverModule";
import { NotionModule } from "./src/controllers/connector/notion/NotionModule";
import { OpenDataModule } from "./src/controllers/connector/open_data/OpenDataModule";
import { PromptModule } from "./src/controllers/connector/prompts/PromptModule";
import { RagModule } from "./src/controllers/connector/rag/RagModule";
import { SlackModule } from "./src/controllers/connector/slack/SlackModule";
import { StableDiffusionBetaModule } from "./src/controllers/connector/stable_diffustion_beta/StableDiffusionBetaModule";
import { SweetTackerModule } from "./src/controllers/connector/sweet_tracker/SweetTrackerModule";
import { TypeformModule } from "./src/controllers/connector/typeform/TypeformModule";
import { YoutubeSearchModule } from "./src/controllers/connector/youtube_search/YoutubeSearchModule";
// import { GoogleShoppingAmazonModule } from "./src/controllers/connector/google_shopping/google_shopping_amazon/GoogleShoppingAmazonModule";
// import { GoogleShoppingEbayModule } from "./src/controllers/connector/google_shopping/google_shopping_ebay/GoogleShoppingEbayModule";
// import { GoogleShoppingWalmartModule } from "./src/controllers/connector/google_shopping/google_shopping_walmart/GoogleShoppingWalmartModule";

const swagger = (props: {
  module: Function;
  info: Partial<OpenApi.IDocument.IInfo>;
  output: string;
}): sdk.INestiaConfig => ({
  input: () => NestFactory.create(props.module),
  swagger: {
    output: props.output,
    info: props.info,
    beautify: true,
    decompose: true,
    servers: [
      {
        url: "https://studio-connector-api.wrtn.ai",
        description: "Production Server",
      },
      {
        url: "https://studio-connector-poc.dev.wrtn.club",
        description: "Develop Server",
      },
      {
        url: "http://localhost:3003",
        description: "Local Server",
      },
    ],
  },
});

const NESTIA_CONFIG: sdk.INestiaConfig[] = [
  {
    input: async () => NestFactory.create(StudioModule),
    output: "src/api",
    swagger: {
      decompose: true,
      output: "packages/api/swagger.json",
      servers: [
        {
          url: "https://studio-connector-api.wrtn.ai",
          description: "Production Server",
        },
        {
          url: "https://studio-connector-poc.dev.wrtn.club",
          description: "Develop Server",
        },
        {
          url: "http://localhost:3003",
          description: "Local Server",
        },
      ],
      beautify: true,
    },
    distribute: "packages/api",
    simulate: true,
  },
  swagger({
    module: ArxivSearchModule,
    info: {
      title: "학술 논문 탐색기",
      summary: "최신 학술 논문을 손쉽게 찾아볼 수 있어요.",
      description:
        "아카이브를 통해 다양한 과학 분야의 최신 연구 논문을 효율적으로 검색하고 접근할 수 있어요. 물리학, 수학, 컴퓨터 과학 등 여러 분야의 프리프린트 논문을 찾아볼 수 있어요. 키워드 검색, 저자 검색, 카테고리별 검색 등 다양한 방식으로 원하는 논문을 빠르게 찾을 수 있어요. 최신 연구 동향을 파악하거나 관심 분야의 깊이 있는 정보를 얻는 데 매우 유용해요.",
    },
    output: "packages/api/connectors/arxiv-search.swagger.json",
  }),
  swagger({
    module: CsvModule,
    info: {
      title: "CSV 파일 데이터 처리기",
      summary: "CSV 파일을 쉽게 다룰 수 있어요.",
      description:
        "CSV 파일의 내용을 읽고, 새로운 CSV 파일을 만들 수 있어요. 또한 CSV 파일을 Excel 파일로 변환할 수도 있어요. 데이터 분석, 정보 정리, 대량의 데이터 처리 등 다양한 작업에 활용할 수 있어요.",
    },
    output: "packages/api/connectors/csv.swagger.json",
  }),
  swagger({
    module: DallE3Module,
    info: {
      title: "DALL-E 3 고급 이미지 생성",
      summary: "프롬프트로 AI가 독특한 이미지를 만들어요.",
      description:
        "텍스트 설명을 바탕으로 AI가 독특하고 창의적인 이미지를 생성해줘요. 추상적인 개념부터 구체적인 장면까지 다양한 유형의 이미지를 만들 수 있어요. 생성된 이미지의 스타일, 구도, 색감 등을 세밀하게 조정할 수 있어요. 광고 시안 제작, 일러스트레이션, 제품 디자인 아이디어 등 다양한 창작 분야에서 활용할 수 있어요.",
    },
    output: "packages/api/connectors/dalle3.swagger.json",
  }),
  swagger({
    module: DaumModule,
    info: {
      title: "다음 포털 콘텐츠 조회",
      summary: "다음에서 블로그와 카페 정보를 쉽게 찾아볼 수 있어요.",
      description:
        "다음의 블로그와 카페에서 원하는 정보를 효과적으로 검색할 수 있어요. 블로그 검색을 통해 개인의 경험담, 리뷰, 일상 이야기 등을 찾아볼 수 있고, 카페 검색으로 특정 주제에 대한 커뮤니티의 대화를 확인할 수 있어요. 키워드 검색, 최신순/인기순 정렬, 특정 기간 내 검색 등 다양한 옵션을 활용해 원하는 정보를 정확하게 찾을 수 있어요. 트렌드 파악, 제품 리뷰 확인, 여행 정보 수집 등 다양한 목적으로 활용할 수 있어요.",
    },
    output: "packages/api/connectors/daum.swagger.json",
  }),
  swagger({
    module: FigmaModule,
    info: {
      title: "피그마 디자인 협업 플랫폼",
      summary: "피그마 파일을 쉽게 관리하고 협업할 수 있어요.",
      description:
        "피그마 파일에 접근하고, 댓글을 가져오거나 추가할 수 있어요. 디자인 작업과 팀 협업을 효율적으로 진행할 수 있어요. 프로젝트의 진행 상황을 확인하고, 팀원들의 피드백을 실시간으로 주고받을 수 있어요. 디자인 에셋을 관리하고, 버전 히스토리를 추적할 수 있어요. UI/UX 디자인, 프로토타이핑, 그래픽 디자인 등 다양한 디자인 작업을 수행하고 관리할 수 있어요.",
    },
    output: "packages/api/connectors/figma.swagger.json",
  }),
  swagger({
    module: GoogleAdsModule,
    info: {
      title: "구글 광고 캠페인 운영",
      summary: "구글 광고를 쉽게 만들고 관리해요.",
      description:
        "키워드 검색을 통한 SEO 전략을 최적화하고, 노출 광고의 효과를 높여 잠재 고객에게 효과적으로 도달할 수 있어요.구글 광고에서 검색 광고, 디스플레이 광고, 동영상 광고 등 다양한 유형의 광고를 만들고 수정할 수 있어요. 이후 광고 상태를 관리하고, 성과를 조회할 수 있어요.",
    },
    output: "packages/api/connectors/google-ads.swagger.json",
  }),
  swagger({
    module: GmailModule,
    info: {
      title: "Gmail",
      summary: "Gmail로 메일을 관리해요",
      description:
        "메일을 보내거나 초안을 작성할 수 있어요. 필요하다면 파일도 첨부해 보낼 수 있어요",
    },
    output: "packages/api/connectors/gmail.swagger.json",
  }),
  swagger({
    module: GoogleCalendarModule,
    info: {
      title: "구글 일정 관리자",
      summary: "구글 캘린더로 일정을 손쉽게 관리해요.",
      description:
        "구글 캘린더를 통해 개인 및 팀의 일정을 효과적으로 관리할 수 있어요. 캘린더 목록을 가져오고, 새로운 캘린더를 만들거나 불필요한 캘린더를 삭제할 수 있어요. 특정 캘린더의 이벤트 목록을 조회하고, 새로운 이벤트를 빠르게 추가할 수 있어요. 기존 이벤트를 수정하거나 삭제할 수도 있고, 이벤트에 참석자를 추가할 수도 있어요. 이를 통해 개인 일정 관리는 물론, 팀 미팅 조율, 프로젝트 일정 관리, 중요 기념일 알림 등 다양한 목적으로 활용할 수 있어요. 여러 기기 간 동기화가 자동으로 이루어져 언제 어디서든 일정을 확인하고 관리할 수 있어요.",
    },
    output: "packages/api/connectors/google-calendar.swagger.json",
  }),
  swagger({
    module: GoogleDocsModule,
    info: {
      title: "구글 문서 작성 및 관리",
      summary: "구글 독스를 쉽게 만들고 관리할 수 있어요.",
      description:
        "구글 독스로 다양한 문서 작업을 할 수 있어요. 새로운 문서를 생성하고, 기존 문서에 접근 권한을 부여하거나 수정할 수 있어요. 문서를 복사하거나 삭제할 수도 있고, 특정 구글 드라이브 내의 모든 문서 목록을 가져올 수도 있어요. 문서에 새로운 텍스트를 추가하는 것도 가능해요. 이를 통해 팀 프로젝트, 개인 노트 작성, 보고서 작성 등 다양한 문서 작업을 클라우드 환경에서 효율적으로 수행할 수 있어요. 실시간 협업이 가능해 여러 사람이 동시에 작업할 수 있는 것도 큰 장점이에요. 주의할 점은 구글 슬라이드를 사용하려면 반드시 구글 드라이브 커넥터도 함께 사용해야 해요.",
    },
    output: "packages/api/connectors/google-docs.swagger.json",
  }),
  swagger({
    module: GoogleDriveModule,
    info: {
      title: "구글 클라우드 스토리지 관리",
      summary: "구글 드라이브로 파일을 쉽게 저장하고 공유해요.",
      description:
        "구글 드라이브를 사용해 파일과 폴더를 효율적으로 관리할 수 있어요. 드라이브 내의 폴더와 파일 목록을 가져오고, 새로운 폴더나 파일을 만들 수 있어요. 불필요한 파일이나 폴더는 삭제할 수 있고, 특정 파일이나 폴더에 대한 접근 권한을 다른 사용자에게 부여할 수도 있어요. 텍스트 파일의 경우 내용을 직접 추가하거나 읽을 수 있어요. 이를 통해 개인 파일 보관, 팀 프로젝트 자료 공유, 대용량 파일 전송 등 다양한 목적으로 활용할 수 있어요. 클라우드 기반이라 어느 기기에서든 접근이 가능하고, 자동 동기화 기능으로 항상 최신 버전의 파일을 유지할 수 있어요.",
    },
    output: "packages/api/connectors/google-drive.swagger.json",
  }),
  swagger({
    module: GoogleFlightModule,
    info: {
      title: "구글 항공권 검색 및 비교",
      summary: "항공편을 검색하고 최적의 옵션을 선택해요.",
      description:
        "출발지와 목적지, 날짜를 입력하면 다양한 항공편을 검색할 수 있어요. 직항/경유, 항공사, 가격 범위 등으로 검색 결과를 필터링할 수 있고, 가격, 소요 시간, 편의성 등을 기준으로 정렬할 수 있어요. 왕복 항공편 검색도 가능하며, 여러 날짜의 가격을 한눈에 비교할 수 있어요.",
    },
    output: "packages/api/connectors/google-flight.swagger.json",
  }),
  swagger({
    module: GoogleHotelModule,
    info: {
      title: "구글 호텔 정보 검색 및 예약",
      summary: "일정에 맞는 숙소를 쉽게 찾아볼 수 있어요.",
      description:
        "여행 일정에 맞는 호텔, 리조트, 펜션 등 다양한 숙소를 검색할 수 있어요. 목적지, 체크인/체크아웃 날짜, 인원 수 등을 입력하면 조건에 맞는 숙소 목록을 볼 수 있어요. 가격, 평점, 위치 등으로 검색 결과를 필터링하거나 정렬할 수 있어요. 또한 지도 보기를 통해 숙소의 위치를 직관적으로 파악할 수 있어, 여행 계획을 더욱 쉽고 효율적으로 세울 수 있어요.",
    },
    output: "packages/api/connectors/google-hotel.swagger.json",
  }),
  swagger({
    module: GoogleMapModule,
    info: {
      title: "Google Map",
      summary: "구글맵으로 원하는 장소를 찾아요.",
      description:
        "구글맵으로 식당이나 원하는 장소를 검색하고 리뷰를 미리 확인해볼 수 있어요.",
    },
    output: "packages/api/connectors/google-map.swagger.json",
  }),
  swagger({
    module: GoogleScholarModule,
    info: {
      title: "구글 학술 자료 통합 검색",
      summary:
        "구글 스칼라를 이용해 학술 자료를 빠르고 정확하게 찾을 수 있어요.",
      description:
        "구글 스칼라를 통해 논문, 학술지, 도서, 학위 논문 등 다양한 학술 자료를 효율적으로 검색하고 접근할 수 있어요. 키워드, 저자, 출판 연도 등으로 검색할 수 있고, 인용 횟수나 관련성에 따라 결과를 정렬할 수 있어요. 특정 논문의 인용 정보를 확인하거나, 관련 논문을 쉽게 찾아볼 수 있어요. 또한, 일부 자료의 경우 전문(full-text)을 바로 확인할 수 있어 연구나 학습에 매우 유용해요. 학생, 연구자, 그리고 지식에 관심 있는 모든 분들이 활용하기 좋은 도구예요.",
    },
    output: "packages/api/connectors/google-scholar.swagger.json",
  }),
  swagger({
    module: GoogleSearchCareerModule,
    info: {
      title: "통합 채용정보 검색",
      summary: "다양한 채용 사이트의 공고를 한 번에 검색해요.",
      description:
        "원티드, 인크루트, 사람인, 점핏, 커리어리 등 다양한 채용 사이트의 공고를 검색할 수 있어요. 직무, 지역, 경력 등으로 검색 조건을 설정할 수 있고, 각 사이트별로 제공하는 상세 정보(연봉, 기업 규모, 복지 등)를 비교해볼 수 있어요. 관심 있는 공고를 저장하거나 지원 현황을 관리할 수 있고, 유사한 공고 추천 기능도 활용할 수 있어요. 이를 통해 취업 준비나 이직을 고려 중인 사용자들이 효율적으로 채용 정보를 탐색하고 관리할 수 있어요.",
    },
    output: "packages/api/connectors/google-search-career.swagger.json",
  }),
  swagger({
    module: GoogleSearchModule,
    info: {
      title: "구글 웹 검색 엔진",
      summary: "구글 검색 기능을 쉽게 활용할 수 있어요.",
      description:
        "검색어를 통해 구글의 일반 검색 결과를 얻을 수 있어요. 웹페이지, 이미지, 뉴스 등 다양한 유형의 검색 결과를 가져올 수 있고, 검색 결과의 순위, URL, 제목, 설명 등 상세 정보를 확인할 수 있어요. 특정 사이트 내에서만 검색하거나, 특정 기간 동안의 결과만 찾는 등 고급 검색 옵션도 사용할 수 있어요. 이를 통해 정보 수집, 트렌드 분석, 경쟁사 모니터링 등 다양한 목적으로 활용할 수 있어요.",
    },
    output: "packages/api/connectors/google-search.swagger.json",
  }),
  swagger({
    module: GoogleSheetModule,
    info: {
      title: "구글 스프레드시트 데이터 관리",
      summary: "구글 스프레드시트로 데이터를 쉽게 관리해요.",
      description:
        "구글 스프레드시트를 사용해 다양한 데이터 관리 작업을 할 수 있어요. 스프레드시트의 헤더 정보를 가져오거나, 특정 사용자에게 접근 권한을 부여할 수 있어요. 새로운 헤더를 추가하거나, 워크시트 목록을 확인할 수 있고, 특정 행(Row)의 정보를 가져올 수도 있어요. 원하는 셀에 새로운 내용을 추가하거나 기존 내용을 수정할 수도 있어요. 이를 통해 예산 관리, 프로젝트 추적, 데이터 분석 등 다양한 작업을 효율적으로 수행할 수 있어요. 실시간 협업이 가능해 팀 단위의 데이터 관리에도 매우 유용해요. 주의할 점은 구글 시트를 사용하려면 반드시 구글 드라이브 커넥터도 함께 사용해야 해요.",
    },
    output: "packages/api/connectors/google-sheet.swagger.json",
  }),
  swagger({
    module: GoogleShoppingAladinModule,
    info: {
      title: "알라딘 상품 검색",
      summary: "알라딘 쇼핑몰의 상품을 한 번에 검색해요.",
      description:
        "알라딘 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격, 을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
    },
    output: "packages/api/connectors/google-shopping-aladine.swagger.json",
  }),
  swagger({
    module: GoogleShoppingAliexpressModule,
    info: {
      title: "알리익스프레스 상품 검색",
      summary: "알리식스프레스 쇼핑몰의 상품을 한 번에 검색해요.",
      description:
        "알리익스프레스 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
    },
    output: "packages/api/connectors/google-shopping-aliexpress.swagger.json",
  }),
  swagger({
    module: GoogleShoppingCoupangModule,
    info: {
      title: "쿠팡 상품 검색",
      summary: "쿠팡 쇼핑몰의 상품을 한 번에 검색해요.",
      description:
        "쿠팡 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
    },
    output: "packages/api/connectors/google-shopping-coupang.swagger.json",
  }),
  swagger({
    module: GoogleShoppingEqlModule,
    info: {
      title: "EQL 상품 검색",
      summary: "EQL 쇼핑몰의 상품을 한 번에 검색해요.",
      description:
        "EQL 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
    },
    output: "packages/api/connectors/google-shopping-eql.swagger.json",
  }),
  swagger({
    module: GoogleShoppingIherbModule,
    info: {
      title: "Iherb 상품 검색",
      summary: "Iherb 쇼핑몰의 상품을 한 번에 검색해요.",
      description:
        "Iherb 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
    },
    output: "packages/api/connectors/google-shopping-iherb.swagger.json",
  }),
  swagger({
    module: GoogleShoppingMarketKurlyModule,
    info: {
      title: "마켓컬리 상품 검색",
      summary: "마켓컬리 쇼핑몰의 상품을 한 번에 검색해요.",
      description:
        "마켓컬리 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
    },
    output: "packages/api/connectors/google-shopping-marketkurly.swagger.json",
  }),
  swagger({
    module: GoogleShoppingOcoModule,
    info: {
      title: "OCO 상품 검색",
      summary: "OCO 쇼핑몰의 상품을 한 번에 검색해요.",
      description:
        "OCO 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
    },
    output: "packages/api/connectors/google-shopping-oco.swagger.json",
  }),
  swagger({
    module: GoogleShoppingOliveYoungModule,
    info: {
      title: "올리브영 상품 검색",
      summary: "올리브영 쇼핑몰의 상품을 한 번에 검색해요.",
      description:
        "올리브영 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
    },
    output: "packages/api/connectors/google-shopping-oliveyoung.swagger.json",
  }),
  swagger({
    module: GoogleShoppingTwentyNineCentimeterModule,
    info: {
      title: "29cm 상품 검색",
      summary: "29cm 쇼핑몰의 상품을 한 번에 검색해요.",
      description:
        "29cm 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
    },
    output:
      "packages/api/connectors/google-shopping-twenty-nine-centimeter.swagger.json",
  }),
  swagger({
    module: GoogleShoppingUniqloModule,
    info: {
      title: "유니클로 상품 검색",
      summary: "유니클로 쇼핑몰의 상품을 한 번에 검색해요.",
      description:
        "유니클로 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
    },
    output: "packages/api/connectors/google-shopping-uniqlo.swagger.json",
  }),
  swagger({
    module: GoogleShoppingYesTwentyFourModule,
    info: {
      title: "Yes24 상품 검색",
      summary: "Yes24 쇼핑몰의 상품을 한 번에 검색해요.",
      description:
        "Yes24 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
    },
    output:
      "packages/api/connectors/google-shopping-yes-twenty-four.swagger.json",
  }),
  // swagger({
  //   module: GoogleShoppingAmazonModule,
  //   info: {
  //     title: "Amazon 상품 검색",
  //     summary: "Amazon 쇼핑몰의 상품을 한 번에 검색해요.",
  //     description:
  //       "Amazon 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
  //   },
  //   output: "packages/api/connectors/google-shopping-amazon.swagger.json",
  // }),
  // swagger({
  //   module: GoogleShoppingEbayModule,
  //   info: {
  //     title: "Ebay 상품 검색",
  //     summary: "Ebay 쇼핑몰의 상품을 한 번에 검색해요.",
  //     description:
  //       "Ebay 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
  //   },
  //   output: "packages/api/connectors/google-shopping-ebay.swagger.json",
  // }),
  // swagger({
  //   module: GoogleShoppingWalmartModule,
  //   info: {
  //     title: "Walmart 상품 검색",
  //     summary: "Walmart 쇼핑몰의 상품을 한 번에 검색해요.",
  //     description:
  //       "Walmart 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
  //   },
  //   output: "packages/api/connectors/google-shopping-walmart.swagger.json",
  // }),
  swagger({
    module: GoogleSlidesModule,
    info: {
      title: "구글 프레젠테이션 제작",
      summary: "구글 프레젠테이션을 쉽게 만들고 꾸밀 수 있어요.",
      description:
        "구글 슬라이드로 프레젠테이션을 만들고, 페이지를 추가하거나 수정할 수 있어요. 텍스트, 이미지, 도형을 추가하고 다양한 효과를 설정할 수 있어요. 슬라이드 전환 효과를 적용하고, 개체의 순서를 조정할 수 있어요. 슬라이드 노트를 작성하여 발표 준비를 할 수 있고, 프레젠테이션의 메타데이터를 수정할 수 있어요. 팀원들과 실시간으로 협업하며 프레젠테이션을 만들 수 있고, 완성된 프레젠테이션을 PDF로 내보낼 수도 있어요.",
    },
    output: "packages/api/connectors/google-slides.swagger.json",
  }),
  swagger({
    module: GoogleTrendModule,
    info: {
      title: "Google Trend",
      summary: "오늘의 트렌드를 검색해봐요",
    },
    output: "packages/api/connectors/google-trend.swagger.json",
  }),
  swagger({
    module: HancellModule,
    info: {
      title: "한셀 문서 데이터 관리",
      summary: "한셀 파일을 쉽게 다룰 수 있어요.",
      description:
        "한셀 파일의 내용을 가져오고, 워크시트를 수정하거나 새로운 파일을 만들 수 있어요. 셀 데이터를 읽고 쓸 수 있으며, 수식을 적용하거나 차트를 만들 수도 있어요. 여러 워크시트를 한 번에 관리할 수 있고, 데이터 필터링이나 정렬 기능을 사용할 수 있어요. 또한 한셀 파일을 다른 형식(CSV, PDF 등)으로 변환할 수 있어, 다양한 환경에서 데이터를 활용할 수 있어요. 이를 통해 재무 관리, 성적 관리, 재고 관리 등 다양한 업무를 효율적으로 처리할 수 있어요.",
    },
    output: "packages/api/connectors/hancell.swagger.json",
  }),
  swagger({
    module: HwpModule,
    info: {
      title: "한컴 오피스 HWP 한글 문서 파일 분석기",
      summary: "HWP 파일의 내용을 읽어올 수 있습니다.",
      description:
        "한국에서 널리 사용되는 한컴 오피스 HWP 한글 문서 형식을 쉽게 처리할 수 있어요. 문서의 텍스트 내용을 추출하거나, 문서 구조를 분석할 수 있어요. 이를 통해 대량의 한글 문서를 자동으로 처리하거나, 문서 내용을 기반으로 한 정보 검색 등의 작업을 수행할 수 있어요.",
    },
    output: "packages/api/connectors/hwp.swagger.json",
  }),
  swagger({
    module: ImwebModule,
    info: {
      title: "아임웹 상품 정보 관리",
      summary: "아임웹으로 상품 정보를 효과적으로 관리해요.",
      description:
        "아임웹에서 상품 리스트를 조회회할 수 있어요. 판매자 인증을 통해 API 토큰을 발급받아 더 많은 기능을 활용할 수 있어요.",
    },
    output: "packages/api/connectors/imweb.swagger.json",
  }),
  swagger({
    module: KakaoMapModule,
    info: {
      title: "카카오 지도 정보 검색",
      summary: "카카오 맵으로 원하는 장소를 쉽게 찾아요.",
      description:
        "카카오 맵에서 키워드로 장소를 검색할 수 있어요. 검색 결과로 장소의 이름, 주소, 전화번호, 카테고리 등 상세 정보를 얻을 수 있어요. 또한 장소의 좌표 정보를 얻어 지도에 표시하거나, 길찾기에 활용할 수 있어요. 이를 통해 여행 계획을 세우거나, 주변 맛집을 찾거나, 비즈니스 위치를 분석하는 등 다양한 목적으로 활용할 수 있어요.",
    },
    output: "packages/api/connectors/kakao-map.swagger.json",
  }),
  swagger({
    module: KakaoNaviModule,
    info: {
      title: "카카오 내비게이션 경로 안내",
      summary: "카카오 내비로 빠른 길을 찾아요.",
      description:
        "카카오 내비게이션을 통해 교통 정보를 조회하고 길찾기를 할 수 있어요. 출발지와 도착지를 설정하면 최적의 경로를 제안받을 수 있어요.",
    },
    output: "packages/api/connectors/kakao-navi.swagger.json",
  }),
  swagger({
    module: KakaoTalkModule,
    info: {
      title: "카카오톡 메시징 및 일정 관리",
      summary: "카카오톡으로 메시지를 보내고 일정을 관리해요.",
      description:
        "카카오톡으로 다양한 유형의 메시지를 보내고, 캘린더를 조회하고 일정을 추가할 수 있어요. 친구 목록도 조회할 수 있어요. 텍스트 메시지는 물론 이미지, 링크, 위치 정보 등을 포함한 다양한 형태의 메시지를 전송할 수 있어요. 개인 캘린더와 채널 캘린더를 관리하여 효율적인 일정 관리가 가능해요. 친구나 그룹채팅방에 일정을 공유하고, 알림을 설정할 수 있어 중요한 약속을 잊지 않을 수 있어요.",
    },
    output: "packages/api/connectors/kakao-talk.swagger.json",
  }),
  swagger({
    module: KoreaEximbankModule,
    info: {
      title: "실시간 환율 정보 제공",
      summary: "실시간 원화 환율 정보를 쉽게 확인해요.",
      description:
        "한국수출입은행의 API를 통해 실시간 환율 정보를 조회할 수 있어요. 주요 통화의 현재 환율은 물론, 과거 특정 날짜의 환율도 확인할 수 있어요. 환율 동향을 분석하고, 특정 기간의 평균 환율을 계산할 수도 있어요. 이를 통해 국제 거래나 여행 계획에 필요한 정보를 쉽게 얻을 수 있고, 환율 변동에 따른 리스크를 관리하는 데 도움을 받을 수 있어요.",
    },
    output: "packages/api/connectors/korea-eximbank.swagger.json",
  }),
  swagger({
    module: NaverModule,
    info: {
      title: "네이버 포털 정보 검색",
      summary: "네이버의 블로그와 카페 정보를 한눈에 볼 수 있어요.",
      description:
        "네이버의 블로그와 카페에서 필요한 정보를 빠르게 검색할 수 있어요. 블로그 검색을 통해 다양한 주제의 포스트를 찾아볼 수 있고, 카페 검색으로 특정 관심사를 공유하는 커뮤니티의 게시글을 확인할 수 있어요. 최신 트렌드, 상품 리뷰, 여행 후기, 요리 레시피 등 다양한 정보를 얻을 수 있어요. 검색 필터를 사용해 원하는 기간, 정확도, 최신순 등으로 결과를 정렬할 수 있어 더욱 효율적인 정보 탐색이 가능해요.",
    },
    output: "packages/api/connectors/naver.swagger.json",
  }),
  swagger({
    module: NotionModule,
    info: {
      title: "노션 워크스페이스 관리",
      summary: "노션 으로 작업 공간을 효율적으로 관리해요.",
      description:
        "노션 에서 페이지를 만들고, 내용을 추가하고, 데이터베이스를 관리할 수 있어요. 페이지 검색, 데이터베이스 아이템 관리 등 다양한 기능을 활용할 수 있어요. 프로젝트 관리, 노트 작성, 팀 협업, 지식 베이스 구축 등 다양한 목적으로 사용할 수 있어요. 텍스트, 이미지, 표, 리스트 등 다양한 형식의 콘텐츠를 조합하여 풍부한 문서를 만들 수 있고, 팀원들과 실시간으로 공유하고 협업할 수 있어요.",
    },
    output: "packages/api/connectors/notion.swagger.json",
  }),
  swagger({
    module: OpenDataModule,
    info: {
      title: "통합 공공정보 조회",
      summary: "다양한 공공 정보를 한 곳에서 확인해요.",
      description:
        "기업 주가, 날씨, 건축물 정보, 캠핑장, 약국, 관광지, 주택 가격 등 다양한 공공 데이터를 조회할 수 있어요. 지역별 상세 날씨 정보를 확인하고, 전국의 캠핑장 현황을 파악할 수 있어요. 주변 약국이나 병원 위치를 찾을 수 있고, 관심 있는 지역의 부동산 시세도 확인할 수 있어요. 또한 교통 정보, 환경 정보, 문화 행사 정보 등 일상생활에 유용한 다양한 정보를 얻을 수 있어 편리한 생활을 할 수 있어요.",
    },
    output: "packages/api/connectors/open-data.swagger.json",
  }),
  swagger({
    module: PromptModule,
    info: {
      title: "프롬프트",
      description: "",
    },
    output: "packages/api/connectors/prompt.swagger.json",
  }),
  swagger({
    module: RagModule,
    info: {
      title: "RAG",
      description: "",
    },
    output: "packages/api/connectors/rag.swagger.json",
  }),
  swagger({
    module: StableDiffusionBetaModule,
    info: {
      title: "Stable Diffusion 이미지 생성",
      summary: "프롬프트를 입력하여 AI로 이미지를 생성해요.",
      description:
        "텍스트 프롬프트를 입력하면 AI가 그에 맞는 이미지를 생성해줘요. 원하는 스타일, 분위기, 구체적인 요소들을 자세히 설명하면 그에 맞는 이미지를 만들 수 있어요. 생성된 이미지의 크기, 품질, 생성 속도 등을 조절할 수 있고, 여러 장의 이미지를 한 번에 생성할 수도 있어요. 디자인 아이디어 얻기, 콘텐츠 제작, 아트워크 생성 등 다양한 창작 활동에 활용할 수 있어요.",
    },
    output: "packages/api/connectors/stable-diffusion.swagger.json",
  }),
  swagger({
    module: SweetTackerModule,
    info: {
      title: "통합 택배 추적기",
      summary: "택배 정보를 쉽게 확인할 수 있어요.",
      description:
        "택배사를 조회하고, 송장번호에 맞는 택배사를 추천받을 수 있어요. 송장 조회로 택배 배송 상태를 실시간으로 확인할 수 있어요. 여러 택배사의 배송 정보를 한 번에 관리할 수 있고, 배송 알림을 설정할 수도 있어요. 개인 사용자는 물론 온라인 쇼핑몰 운영자나 물류 관리자들이 효율적으로 배송 상황을 추적하고 관리할 수 있어요.",
    },
    output: "packages/api/connectors/sweet-tacker.swagger.json",
  }),
  swagger({
    module: YoutubeSearchModule,
    info: {
      title: "유튜브 검색",
      summary: "유튜브에 원하는 영상을 검색해요",
      description: "유튜브에 원하는 영상을 검색해요",
    },
    output: "packages/api/connectors/youtube-search.swagger.json",
  }),
  swagger({
    module: SlackModule,
    info: {
      title: "Slack",
      summary: "슬랙에서 대화 내용을 가져오거나 메시지를 보낼 수 있어요.",
      description:
        "슬랙에서 우리 멤버들이 어떤 주제를 가지고 논의를 하는지 확인해요. 우리 워크스페이스에 있는 유저 그룹이나 동료의 프로필을 확인할 수도 있고, 동료에게 말을 걸 수도 있고, 채널에 메세지를 보내고, 또 답글을 달 수도 있어요.",
    },
    output: "packages/api/connectors/slack.swagger.json",
  }),
  swagger({
    module: JiraModule,
    info: {
      title: "Jira",
      summary: "Jira로 프로젝트 이슈를 관리해요.",
      description:
        "프로젝트에 이슈를 생성하고 담당자를 할당해요. 완료된 이슈가 있다면 상태를 변경할 수도 있고 댓글을 남겨 의견 교류도 가능해요.",
    },
    output: "packages/api/connectors/jira.swagger.json",
  }),
  swagger({
    module: DiscordModule,
    info: {
      title: "Discord",
      description: "디스코드로 메세지를 보내요.",
    },
    output: "packages/api/connectors/discord.swagger.json",
  }),
  swagger({
    module: AirportInformationModule,
    info: {
      title: "Airport Information",
      summary: "항공 정보를 조회해요.",
    },
    output: "packages/api/connectors/airport-information.swagger.json",
  }),
  swagger({
    module: CalendlyModule,
    info: {
      title: "Calendly",
      summary: "Calendly에서 고객과의 미팅을 잡을 수 있어요",
      description:
        "Calendly에서 미팅을 잡고 고객들을 초대하세요. 쉽고 빠르게 미팅을 관리할 수 있어요.",
    },
    output: "packages/api/connectors/calendly.swagger.json",
  }),
  swagger({
    module: GithubModule,
    info: {
      title: "Github",
      summary: "Github에서 코드를 읽고 분석하고 작성해요",
      description:
        "Github에서 유저나 코드를 조회하고 분석할 수 있어요. 직접 코드를 작성하고 커밋하고 PR을 날리거나, 또 코멘트를 남겨줄 수도 있습니다.",
    },
    output: "packages/api/connectors/github.swagger.json",
  }),
  swagger({
    module: ExcelModule,
    info: {
      title: "Excel",
      summary: "엑셀을 이용해서 알아보기 쉽게 데이터를 관리할 수 있어요",
      description:
        "엑셀에 시트를 넣거나 데이터를 추가하여 보기 쉽게 데이터를 관리할 수 있어요. 또 기존 파일을 업데이트해서 데이터를 누적해나갈 수도 있어요.",
    },
    output: "packages/api/connectors/excel.swagger.json",
  }),
  swagger({
    module: TypeformModule,
    info: {
      title: "Typeform",
      summary: "Typeform을 설문 조사를 만들거나 결과를 조회할 수 있어요",
      description: "",
    },
    output: "packages/api/connectors/typeform.swagger.json",
  }),
];
export default NESTIA_CONFIG;
