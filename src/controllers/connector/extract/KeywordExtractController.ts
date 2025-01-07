import core, { HumanRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IKeywordExtraction } from "@wrtn/connector-api/lib/structures/connector/extract/IKeywordExtractor";

import { KeywordExtractorProvider } from "../../../providers/connector/extract/KeywordExtractorProvider";
import { retry } from "../../../utils/retry";
import { RouteIcon } from "@wrtnio/decorators";

@Controller("connector/extract/keyword")
export class KeywordExtractController {
  constructor(private keywordExtractProvider: KeywordExtractorProvider) {}

  /**
   * Extracts keywords highly related to the given input
   *
   * A connector used when generating marketing copy.
   *
   * @summary Keyword extraction
   * @param input Input for keyword extraction
   * @returns Extracted keywords
   *
   * @internal
   */
  @HumanRoute()
  @core.TypedRoute.Post()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/keyword.svg",
  )
  async extractKeyword(
    @core.TypedBody() input: IKeywordExtraction.IExtractKeywordInput,
  ): Promise<IKeywordExtraction.IExtractKeywordOutput> {
    return retry(() => this.keywordExtractProvider.extractKeyword(input))();
  }
}
