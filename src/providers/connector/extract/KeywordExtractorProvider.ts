import { Injectable } from "@nestjs/common";
import typia from "typia";

import { IKeywordExtraction } from "@wrtn/connector-api/lib/structures/connector/extract/IKeywordExtractor";

import {
  IChainOfThought,
  OpenAIProvider,
  dump,
} from "../../open_ai/OpenAIProvider";

@Injectable()
export class KeywordExtractorProvider {
  constructor(private openAIProvider: OpenAIProvider) {}

  /**
   * Extract keyword from the content.
   *
   * @param referenceContent Content to extract keyword from.
   * @param context Any context to help LLM understand the content. Note that this has `any` type, because it can be anything such as a string, object, or array.
   * @returns
   */
  async extractKeyword(
    input: IKeywordExtraction.IExtractKeywordInput,
  ): Promise<IKeywordExtraction.IExtractKeywordOutput> {
    try {
      type ExtractKeyword = IChainOfThought &
        IKeywordExtraction.IExtractKeywordOutput;

      const { title } = input.referenceContent;
      const response = await this.openAIProvider.extractInterface(
        `You are a marketing copywriter.
  You are to extract keywords from the title of reference contents that you can refer to create contents that create a lot of traffic.
  For example, given the title "Who is Santa Claus, really?" you would extract the keyword "Santa Claus"
  The title to use is the following: ${dump(title)}
  You must refer to the context: ${dump(input.context)}
      `,
        typia.json.application<[ExtractKeyword]>(),
        typia.createIs<ExtractKeyword>(),
        // gpt-4-turbo has issues when function-calling in Korean.. https://platform.openai.com/docs/guides/function-calling
        "gpt-4-turbo",
      );

      return { keyword: response.keyword };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }
}
