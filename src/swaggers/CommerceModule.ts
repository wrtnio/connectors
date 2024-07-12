import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { pinoLoggerParams } from "../common/logger/logger";
import { GoogleShoppingModule } from "../controllers/connector/google_shopping/GoogleShoppingModule";
import { LlmModule } from "../controllers/connector/llm/LlmModule";

@Module({
  imports: [
    LoggerModule.forRoot({ ...pinoLoggerParams }),
    LlmModule,
    GoogleShoppingModule,
  ],
})
export class CommerceModule {}
