import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { pinoLoggerParams } from "../common/logger/logger";
import { DallE3Module } from "../controllers/connector/dall_e_3/DallE3Module";
import { FigmaModule } from "../controllers/connector/figma/FigmaModule";
import { StableDiffusionBetaModule } from "../controllers/connector/stable_diffustion_beta/StableDiffusionBetaModule";

@Module({
  imports: [
    LoggerModule.forRoot({ ...pinoLoggerParams }),
    FigmaModule,
    StableDiffusionBetaModule,
    DallE3Module,
  ],
})
export class GraphicDesignModule {}
