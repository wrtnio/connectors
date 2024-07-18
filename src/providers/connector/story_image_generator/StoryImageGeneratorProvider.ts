import { Injectable } from "@nestjs/common";

import {
  IGenerateStoryImageInput,
  IStoryImage,
} from "@wrtn/connector-api/lib/structures/connector/story_image_generator/IStoryImageGenerator";

import { dump } from "../../open_ai/OpenAIProvider";
import { StableDiffusionBetaProvider } from "../stable_diffusion_beta/StableDiffusionBetaProvider";

@Injectable()
export class StoryImageGeneratorProvider {
  constructor(
    private stableDiffusionBetaProvider: StableDiffusionBetaProvider,
  ) {}

  async generateImage(input: IGenerateStoryImageInput): Promise<IStoryImage> {
    const prompt = `
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
        `;
    const response = await this.stableDiffusionBetaProvider.generateImage({
      prompt: prompt,
      image_ratio: "square",
      style_preset: "digital-art",
    });
    return { imageUrl: response.imgUrl };
  }
}
