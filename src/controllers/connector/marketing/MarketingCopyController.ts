import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IMarketingCopyGenerator } from "@wrtn/connector-api/lib/structures/connector/marketing/IMarketingCopyGenerator";

import { MarketingCopyGeneratorProvider } from "../../../providers/connector/marketing/MarketingCopyGeneratorProvider";
import { RouteIcon } from "@wrtnio/decorators";

@Controller("connector/marketing-copy")
export class MarketingCopyController {
  constructor(private marketingCopyGenerator: MarketingCopyGeneratorProvider) {}

  /**
   * Generates marketing copy from given input.
   *
   * @summary Generate marketing copy
   *
   * @param input Input for generating marketing copy
   *
   * @returns Generated marketing copy
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
   * Generates a marketing copy image from the given input.
   *
   * @summary Generate a marketing copy image
   *
   * @param input Input for generating a marketing copy image
   *
   * @returns Generated marketing copy image
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
