import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { v4 } from "uuid";

import {
  IGenerateStoryImageInput,
  IStoryImage,
} from "@wrtn/connector-api/lib/structures/connector/story_image_generator/IStoryImageGenerator";

import { OpenAIProvider, dump } from "../../open_ai/OpenAIProvider";
import { AwsProvider } from "../aws/AwsProvider";

@Injectable()
export class StoryImageGeneratorProvider {
  constructor(
    private openAIProvider: OpenAIProvider,
    private httpService: HttpService,
    private awsProvider: AwsProvider,
  ) {}

  async generateImage(input: IGenerateStoryImageInput): Promise<IStoryImage> {
    const response = await this.openAIProvider.generateImage(`
<instruction>
You are an expert illustrator for children's books.
Given a story line, generate an image that describes the story.
You are also given the previous story lines, which you can use to get the context of the story line.
</instruction>
<task>
The stories up to this point are the following:
<previous_story_lines>
${dump(input.previousStories)}
</previous_story_lines>
<story_line>
${dump(input.storyLine)}
</story_line>
</task>
    `);
    const data = await firstValueFrom(
      this.httpService.get(response.url, { responseType: "arraybuffer" }),
    );
    const imageUrl = await this.awsProvider.uploadObject({
      key: `connector/generate-story-copy/${v4()}`,
      data: data.data,
      contentType: "image/png",
    });

    return { imageUrl };
  }
}
