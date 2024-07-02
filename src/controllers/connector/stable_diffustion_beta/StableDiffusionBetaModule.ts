import { Module } from "@nestjs/common";

import { StableDiffusionBetaProvider } from "../../../providers/connector/stable_diffusion_beta/StableDiffusionBetaProvider";
import { AwsModule } from "../aws/AwsModule";
import { StableDiffusionBetaController } from "./StableDiffusionBetaController";

@Module({
  imports: [AwsModule],
  providers: [StableDiffusionBetaProvider],
  controllers: [StableDiffusionBetaController],
  exports: [StableDiffusionBetaProvider],
})
export class StableDiffusionBetaModule {}
