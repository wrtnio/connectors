import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IKeywordExtraction } from "@wrtn/connector-api/lib/structures/connector/extract/IKeywordExtractor";

import { KeywordExtractorProvider } from "../../../providers/connector/extract/KeywordExtractorProvider";

@Controller("connector/extract/keyword")
export class KeywordExtractController {
  constructor(private keywordExtractProvider: KeywordExtractorProvider) {}

  /**
   * 주어진 입력과 관련 높은 키워드를 추출합니다.
   *
   * @summary 키워드 추출
   *
   * @param input 키워드 추출을 위한 입력
   *
   * @returns 추출된 키워드
   *
   * @tag Llm 키워드 추출 생성
   */
  @core.TypedRoute.Post()
  async extractKeyword(
    @core.TypedBody() input: IKeywordExtraction.IExtractKeywordInput,
  ): Promise<IKeywordExtraction.IExtractKeywordOutput> {
    return await this.keywordExtractProvider.extractKeyword(input);
  }
}
