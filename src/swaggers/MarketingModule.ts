import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { pinoLoggerParams } from "../common/logger/logger";
import { DaumModule } from "../controllers/connector/daum/DaumModule";
import { LlmModule } from "../controllers/connector/llm/LlmModule";
import { NaverModule } from "../controllers/connector/naver/NaverModule";

/**
 * 마케팅/광고
 */
@Module({
  imports: [
    LoggerModule.forRoot({ ...pinoLoggerParams }),
    DaumModule,
    NaverModule,
    LlmModule,
  ],
})
export class MarketingModule {}
