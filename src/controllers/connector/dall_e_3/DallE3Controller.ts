import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Standalone, RouteIcon } from "@wrtnio/decorators";

import { IDallE3 } from "@wrtn/connector-api/lib/structures/connector/dall_e_3/IDallE3";

import { DallE3Provider } from "../../../providers/connector/dall_e_3/DallE3Provider";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/dall-e-3")
export class DallE3Controller {
  constructor(private readonly dallE3Provider: DallE3Provider) {}

  /**
   * Generate an image using the dall-e-3 model.
   *
   * @summary dall-e-3 image generator node
   *
   * @param input Information for image generation
   *
   * @returns URL of the generated image
   */
  @core.TypedRoute.Post("/generate")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Dall-e3_full.svg",
  )
  @ApiTags("Dall-e-3")
  async generateImage(
    @core.TypedBody() input: IDallE3.IRequest,
  ): Promise<IDallE3.IResponse> {
    return this.dallE3Provider.generateImage(input);
  }
}
