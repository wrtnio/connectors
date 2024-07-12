import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { pinoLoggerParams } from "../common/logger/logger";
import { CsvModule } from "../controllers/connector/csv/CsvModule";
import { ExcelModule } from "../controllers/connector/excel/ExcelModule";
import { GoogleSlidesModule } from "../controllers/connector/google_slides/GoogleSlidesModule";
import { HancellModule } from "../controllers/connector/hancell/HancellModule";
import { LlmModule } from "../controllers/connector/llm/LlmModule";

@Module({
  imports: [
    LoggerModule.forRoot({ ...pinoLoggerParams }),
    CsvModule,
    LlmModule,
    ExcelModule,
    HancellModule,
    GoogleSlidesModule,
  ],
})
export class DataAnalyticsModule {}
