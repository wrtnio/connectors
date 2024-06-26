import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import {
  IGenerateStoryImageInput,
  IStoryImage,
} from "@wrtn/connector-api/lib/structures/connector/story_image_generator/IStoryImageGenerator";

import { StoryImageGeneratorProvider } from "../../../providers/connector/story_image_generator/StoryImageGeneratorProvider";

@Controller("connector/story-image-generator")
export class StoryImageGeneratorController {
  constructor(private storyImageGenerator: StoryImageGeneratorProvider) {}

  /**
   * 주어진 입력으로부터 이미지를 생성합니다.
   *
   * @summary 스토리 이미지 생성
   *
   * @param input 이미지 생성을 위한 입력
   *
   * @returns 생성된 이미지
   *
   * @tag 스토리 이미지 생성
   */
  @core.TypedRoute.Post()
  async generateImage(
    @core.TypedBody()
    input: IGenerateStoryImageInput,
  ): Promise<IStoryImage> {
    return await this.storyImageGenerator.generateImage(input);
  }
}
