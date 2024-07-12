import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { pinoLoggerParams } from "../common/logger/logger";
import { LlmModule } from "../controllers/connector/llm/LlmModule";

@Module({
  imports: [LoggerModule.forRoot({ ...pinoLoggerParams }), LlmModule],
})
export class NewsMediaModule {}
