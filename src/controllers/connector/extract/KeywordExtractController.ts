import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IKeywordExtraction } from "@wrtn/connector-api/lib/structures/connector/extract/IKeywordExtractor";

import { KeywordExtractorProvider } from "../../../providers/connector/extract/KeywordExtractorProvider";
import { retry } from "../../../utils/retry";
import { RouteIcon } from "@wrtnio/decorators";

@Controller("connector/extract/keyword")
export class KeywordExtractController {
  constructor(private keywordExtractProvider: KeywordExtractorProvider) {}

  /**
   * 주어진 입력과 관련 높은 키워드를 추출합니다
   *
   * 마케팅 카피를 생성할 때 사용하는 커넥터 입니다.
   *
   * @summary 키워드 추출
   * @param input 키워드 추출을 위한 입력
   * @returns 추출된 키워드
   */
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
