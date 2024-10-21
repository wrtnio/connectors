import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import {
  IGenerateStoryImageInput,
  IStoryImage,
} from "@wrtn/connector-api/lib/structures/connector/story_image_generator/IStoryImageGenerator";

import { RouteIcon } from "@wrtnio/decorators";
import { StoryImageGeneratorProvider } from "../../../providers/connector/story_image_generator/StoryImageGeneratorProvider";

@Controller("connector/story-image-generator")
export class StoryImageGeneratorController {
  constructor(private storyImageGenerator: StoryImageGeneratorProvider) {}

  /**
   * Generates an image from given input
   *
   * A connector that can be used when creating a chatbot workflow for picture book or story generation.
   *
   * @summary Generate story image
   * @param input Input for image generation
   * @returns Generated image
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/image.svg",
  )
  @core.TypedRoute.Post()
  async generateImage(
    @core.TypedBody()
    input: IGenerateStoryImageInput,
  ): Promise<IStoryImage> {
    return await this.storyImageGenerator.generateImage(input);
  }
}
