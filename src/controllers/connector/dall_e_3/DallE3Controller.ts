import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Standalone, RouteIcon } from "@wrtnio/decorators";

import { IDallE3 } from "@wrtn/connector-api/lib/structures/connector/dall_e_3/IDallE3";

import { DallE3Provider } from "../../../providers/connector/dall_e_3/DallE3Provider";

@Controller("connector/dall-e-3")
export class DallE3Controller {
  constructor(private readonly dallE3Provider: DallE3Provider) {}

  /**
   * dall-e-3 모델을 이용하여 이미지를 생성합니다.
   *
   * @summary dall-e-3 이미지 생성기 노드
   *
   * @param input 이미지 생성을 위한 정보
   *
   * @returns 생성된 이미지 URL
   */
  @Standalone()
  @core.TypedRoute.Post("/generate")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Dall-e3_full.svg",
  )
  async generateImage(
    @core.TypedBody() input: IDallE3.IRequest,
  ): Promise<IDallE3.IResponse> {
    return this.dallE3Provider.generateImage(input);
  }
}
