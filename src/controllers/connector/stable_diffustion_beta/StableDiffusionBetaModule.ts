import { Module } from "@nestjs/common";

import { StableDiffusionBetaProvider } from "../../../providers/connector/stable_diffusion_beta/StableDiffusionBetaProvider";
import { StableDiffusionBetaController } from "./StableDiffusionBetaController";

@Module({
  imports: [],
  providers: [StableDiffusionBetaProvider],
  controllers: [StableDiffusionBetaController],
  exports: [StableDiffusionBetaProvider],
})
export class StableDiffusionBetaModule {}
