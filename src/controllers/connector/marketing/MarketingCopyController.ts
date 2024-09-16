import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IMarketingCopyGenerator } from "@wrtn/connector-api/lib/structures/connector/marketing/IMarketingCopyGenerator";

import { MarketingCopyGeneratorProvider } from "../../../providers/connector/marketing/MarketingCopyGeneratorProvider";
import { RouteIcon } from "@wrtnio/decorators";

@Controller("connector/marketing-copy")
export class MarketingCopyController {
  constructor(private marketingCopyGenerator: MarketingCopyGeneratorProvider) {}

  /**
   * 주어진 입력으로부터 마케팅 카피를 생성합니다.
   *
   * @summary 마케팅 카피 생성
   *
   * @param input 마케팅 카피 생성을 위한 입력
   *
   * @returns 생성된 마케팅 카피
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Marketing_full.svg",
  )
  @core.TypedRoute.Post("generate-copy")
  async generateCopy(
    @core.TypedBody()
    input: IMarketingCopyGenerator.IGenerateMarketingCopyInput,
  ): Promise<IMarketingCopyGenerator.IGenerateMarketingCopyOutput> {
    return await this.marketingCopyGenerator.generateCopy(input);
  }

  /**
   * 주어진 입력으로부터 마케팅 카피 이미지를 생성합니다.
   *
   * @summary 마케팅 카피 이미지 생성
   *
   * @param input 마케팅 카피 이미지 생성을 위한 입력
   *
   * @returns 생성된 마케팅 카피 이미지
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Marketing_full.svg",
  )
  @core.TypedRoute.Post("generate-copy-image")
  async generateCopyImage(
    @core.TypedBody()
    input: IMarketingCopyGenerator.IGenerateMarketingCopyImageInput,
  ): Promise<IMarketingCopyGenerator.IGenerateMarketingCopyImageOutput> {
    return await this.marketingCopyGenerator.generateCopyImage(input);
  }
}
