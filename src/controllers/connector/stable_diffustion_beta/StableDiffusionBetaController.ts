import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { IStableDiffusionBeta } from "@wrtn/connector-api/lib/structures/connector/stable_diffustion_beta/IStableDiffusionBeta";

import { StableDiffusionBetaProvider } from "../../../providers/connector/stable_diffusion_beta/StableDiffusionBetaProvider";

@Controller("connector/stable-diffusion-beta")
export class StableDiffusionBetaController {
  constructor(
    private readonly stableDiffusionBetaProvider: StableDiffusionBetaProvider,
  ) {}

  /**
   * 스테이블 디퓨전 모델을 이용하여 이미지를 생성합니다.
   *
   * @summary 스테이블 디퓨전 이미지 생성기 노드
   *
   * @param input 이미지 생성을 위한 정보
   *
   * @returns 생성된 이미지 URL
   */
  @ApiTags("스테이블 디퓨전 이미지 생성기 노드")
  @core.TypedRoute.Post("/generate")
  async generateImage(
    @core.TypedBody() input: IStableDiffusionBeta.IRequest,
  ): Promise<IStableDiffusionBeta.IResponse> {
    return await this.stableDiffusionBetaProvider.generateImage(input);
  }
}
