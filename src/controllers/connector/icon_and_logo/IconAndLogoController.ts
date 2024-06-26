import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { IIconAndLogo } from "@wrtn/connector-api/lib/structures/connector/icon_and_logo/IIconAndLogo";

import { IconAndLogoProvider } from "../../../providers/connector/icon_and_logo/IconAndLogoProvider";

@Controller("connector/icon-and-logo")
export class IconAndLogoController {
  constructor(private readonly iconAndLogoProvider: IconAndLogoProvider) {}

  /**
   * 아이콘 또는 로고를 생성합니다.
   *
   * @summary 아이콘/로고 생성기 노드
   *
   * @param input 아이콘/로고 생성을 위한 정보
   *
   * @returns 생성된 아이콘/로고 Url
   */
  @ApiTags("아이콘/로고 생성기 노드")
  @core.TypedRoute.Post("/generate")
  async generateIconAndLogo(
    @core.TypedBody() input: IIconAndLogo.IRequest,
  ): Promise<IIconAndLogo.IResponse> {
    return await this.iconAndLogoProvider.generateImage(input);
  }
}
