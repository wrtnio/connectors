import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IStableDiffusionBeta } from "@wrtn/connector-api/lib/structures/connector/stable_diffustion_beta/IStableDiffusionBeta";

import { StableDiffusionBetaProvider } from "../../../providers/connector/stable_diffusion_beta/StableDiffusionBetaProvider";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/stable-diffusion-beta")
export class StableDiffusionBetaController {
  constructor(
    private readonly stableDiffusionBetaProvider: StableDiffusionBetaProvider,
  ) {}

  /**
   * Generate an image using the stable diffusion model.
   *
   * @summary Stable diffusion image generator node
   *
   * @param input Information for image generation
   *
   * @returns URL of the generated image
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/StableDifusion_full.svg",
  )
  @ApiTags("Stable Diffusion")
  @Standalone()
  @core.TypedRoute.Post("/generate")
  async generateImage(
    @core.TypedBody() input: IStableDiffusionBeta.IRequest,
  ): Promise<IStableDiffusionBeta.IResponse> {
    return await this.stableDiffusionBetaProvider.generateImage(input);
  }
}
