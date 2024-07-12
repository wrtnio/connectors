import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { pinoLoggerParams } from "../common/logger/logger";
import { DallE3Module } from "../controllers/connector/dall_e_3/DallE3Module";
import { LlmModule } from "../controllers/connector/llm/LlmModule";
import { StableDiffusionBetaModule } from "../controllers/connector/stable_diffustion_beta/StableDiffusionBetaModule";
import { YoutubeSearchModule } from "../controllers/connector/youtube_search/YoutubeSearchModule";

@Module({
  imports: [
    LoggerModule.forRoot({ ...pinoLoggerParams }),
    YoutubeSearchModule,
    LlmModule,
    StableDiffusionBetaModule,
    DallE3Module,
  ],
})
export class ImageVideoModule {}
