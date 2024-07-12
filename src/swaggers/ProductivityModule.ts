import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { pinoLoggerParams } from "../common/logger/logger";
import { CsvModule } from "../controllers/connector/csv/CsvModule";
import { DallE3Module } from "../controllers/connector/dall_e_3/DallE3Module";
import { DaumModule } from "../controllers/connector/daum/DaumModule";
import { ExcelModule } from "../controllers/connector/excel/ExcelModule";
import { FigmaModule } from "../controllers/connector/figma/FigmaModule";
import { GmailModule } from "../controllers/connector/gmail/GmailModule";
import { GoogleDocsModule } from "../controllers/connector/google-docs/GoogleDocsModule";
import { GoogleSheetModule } from "../controllers/connector/google-sheet/GoogleSheetModule";
import { GoogleCalendarModule } from "../controllers/connector/google_calendar/GoogleCalendarModule";
import { GoogleDriveModule } from "../controllers/connector/google_drive/GoogleDriveModule";
import { GoogleSlidesModule } from "../controllers/connector/google_slides/GoogleSlidesModule";
import { HancellModule } from "../controllers/connector/hancell/HancellModule";
import { HwpModule } from "../controllers/connector/hwp/HwpModule";
import { KakaoTalkModule } from "../controllers/connector/kakao_talk/KakaoTalkModule";
import { LlmModule } from "../controllers/connector/llm/LlmModule";
import { NaverModule } from "../controllers/connector/naver/NaverModule";
import { NotionModule } from "../controllers/connector/notion/NotionModule";
import { StableDiffusionBetaModule } from "../controllers/connector/stable_diffustion_beta/StableDiffusionBetaModule";

@Module({
  imports: [
    LoggerModule.forRoot({ ...pinoLoggerParams }),
    DaumModule,
    NaverModule,
    CsvModule,
    NotionModule,
    LlmModule,
    HwpModule,
    ExcelModule,
    GoogleDocsModule,
    GoogleSheetModule,
    GoogleCalendarModule,
    GoogleDriveModule,
    GmailModule,
    FigmaModule,
    HancellModule,
    KakaoTalkModule,
    GoogleSlidesModule,
    StableDiffusionBetaModule,
    DallE3Module,
  ],
})
export class ProductivityModule {}
