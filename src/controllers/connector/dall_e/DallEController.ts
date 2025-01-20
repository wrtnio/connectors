import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark } from "@wrtnio/decorators";

import { IDallE3 } from "@wrtn/connector-api/lib/structures/connector/dall_e_3/IDallE3";

import { ApiTags } from "@nestjs/swagger";
import { DallEProvider } from "../../../providers/connector/dall_e/DallEProvider";

@Controller("connector/dall-e")
export class DallEController {
  constructor(private readonly dallEProvider: DallEProvider) {}

  /**
   * Generate an image using the dall-e-3 model
   *
   * @summary dall-e-3 image generator node
   * @param input Information for image generation
   * @returns URL of the generated image
   */
  @SelectBenchmark("dall-e로 그림 그려줘")
  @core.TypedRoute.Post("/generate")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/dall_e.svg",
  )
  @ApiTags("Dall-e")
  async generateImage(
    @core.TypedBody() input: IDallE3.IRequest,
  ): Promise<IDallE3.IResponse> {
    return this.dallEProvider.generateImage(input);
  }
}
