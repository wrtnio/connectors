import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { pinoLoggerParams } from "../common/logger/logger";
import { ArxivSearchModule } from "../controllers/connector/arxiv_search/ArxivSearchModule";
import { CsvModule } from "../controllers/connector/csv/CsvModule";
import { ExcelModule } from "../controllers/connector/excel/ExcelModule";
import { FigmaModule } from "../controllers/connector/figma/FigmaModule";
import { GmailModule } from "../controllers/connector/gmail/GmailModule";
import { GoogleDocsModule } from "../controllers/connector/google-docs/GoogleDocsModule";
import { GoogleSheetModule } from "../controllers/connector/google-sheet/GoogleSheetModule";
import { GoogleCalendarModule } from "../controllers/connector/google_calendar/GoogleCalendarModule";
import { GoogleDriveModule } from "../controllers/connector/google_drive/GoogleDriveModule";
import { GoogleScholarModule } from "../controllers/connector/google_scholar/GoolgeScholarModule";
import { GoogleSlidesModule } from "../controllers/connector/google_slides/GoogleSlidesModule";
import { HwpModule } from "../controllers/connector/hwp/HwpModule";
import { LlmModule } from "../controllers/connector/llm/LlmModule";
import { NotionModule } from "../controllers/connector/notion/NotionModule";

/**
 * IT/개발
 */
@Module({
  imports: [
    LoggerModule.forRoot({ ...pinoLoggerParams }),
    ArxivSearchModule,
    GoogleScholarModule,
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
    GoogleSlidesModule,
  ],
})
export class ITDevelopmentModule {}
