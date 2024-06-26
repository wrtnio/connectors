import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RouteIcon } from "@wrtn/decorators";

import { IImage } from "@wrtn/connector-api/lib/structures/connector/image/IImage";

import { ImageProvider } from "../../../providers/connector/image/ImageProvider";

@Controller("connector/image")
export class ImageController {
  constructor(private readonly imageProvider: ImageProvider) {}

  /**
   * 이미지를 생성합니다.
   *
   * @summary 이미지 생성기 노드
   *
   * @param input 이미지 생성을 위한 정보
   *
   * @returns 생성된 이미지 Url
   */
  @ApiTags("이미지 생성기 노드")
  @core.TypedRoute.Post("/generate")
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/hwp.svg",
  // )
  async generateImage(
    @core.TypedBody() input: IImage.IRequest,
  ): Promise<IImage.IResponse> {
    return await this.imageProvider.generateImage(input);
  }
}
