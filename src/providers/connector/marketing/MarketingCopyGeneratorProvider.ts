import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import typia from "typia";
import { v4 } from "uuid";

import {
  IMarketingCopyComponents,
  IMarketingCopyGenerator,
} from "@wrtn/connector-api/lib/structures/connector/marketing/IMarketingCopyGenerator";

import { IChainOfThought, OpenAIProvider, dump } from "../../open_ai/OpenAIProvider";
import { AwsProvider } from "../aws/AwsProvider";

@Injectable()
export class MarketingCopyGeneratorProvider {
  constructor(
    private openAIProvider: OpenAIProvider,
    private httpService: HttpService,
    private awsProvider: AwsProvider,
  ) {}

  async generateCopy(
    input: IMarketingCopyGenerator.IGenerateMarketingCopyInput,
  ): Promise<IMarketingCopyGenerator.IGenerateMarketingCopyOutput> {
    type GenerateMarketingCopy = IChainOfThought & IMarketingCopyComponents;

    const response = await this.openAIProvider.extractInterface(
      `
You are a marketing copywriter, given the task of writing a marketing copy.
You are given the marketing purpose, the distribution channel and the reference content, from which you should use the keyword to generate the marketing copy.
The marketing purpose is the following: ${dump(input.marketingPurpose)}
The distribution channel is the following: ${dump(input.distributionChannel.channel)}
The keyword is the following: ${dump(input.keyword)}
The reference content (content from which the keyword was extracted) is the following: ${dump(input.referenceContent)}
Unless specified by the user, always create the marketing copy in Korean.
I REPEAT: unless the user said otherwise, always use Korean.
Generate the marketing copy.
    `,
      typia.json.application<[GenerateMarketingCopy]>(),
      typia.createIs<GenerateMarketingCopy>(),
      "gpt-4-turbo",
    );
    typia.assert<GenerateMarketingCopy>(response);

    return input.distributionChannel.components.reduce(
      (acc, component) => ({
        ...acc,
        [component]: response[component],
      }),
      {},
    );
  }

  async generateCopyImage(
    input: IMarketingCopyGenerator.IGenerateMarketingCopyImageInput,
  ): Promise<IMarketingCopyGenerator.IGenerateMarketingCopyImageOutput> {
    const response = await this.openAIProvider.generateImage(`
You are a marketing designer and you are given the task of drawing an image for a marketing copy.
The marketing copy (generated by the copywriter) is the following: ${dump(input.copy)}
The marketing purpose is the following: ${dump(input.marketingPurpose)}
The distribution channel is the following: ${dump(input.distributionChannel.channel)}
The keyword is the following: ${dump(input.keyword)}
The reference content (content from which the keyword was extracted) is the following: ${dump(input.referenceContent)}
    `);
    const data = await firstValueFrom(this.httpService.get(response.url, { responseType: "arraybuffer" }));
    const imageUrl = await this.awsProvider.uploadObject({
      key: `connector/generate-marketing-copy/${v4()}`,
      data: data.data,
      contentType: "image/png",
    });

    return { imageUrl };
  }
}
