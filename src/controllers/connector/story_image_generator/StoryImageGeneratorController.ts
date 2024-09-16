import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import {
  IGenerateStoryImageInput,
  IStoryImage,
} from "@wrtn/connector-api/lib/structures/connector/story_image_generator/IStoryImageGenerator";

import { StoryImageGeneratorProvider } from "../../../providers/connector/story_image_generator/StoryImageGeneratorProvider";
import { RouteIcon } from "@wrtnio/decorators";

@Controller("connector/story-image-generator")
export class StoryImageGeneratorController {
  constructor(private storyImageGenerator: StoryImageGeneratorProvider) {}

  /**
   * 주어진 입력으로부터 이미지를 생성합니다.
   *
   * 그림책 또는 이야기 생성을 위한 챗봇 워크플로우를 제작할 때 사용될 수 있는 커넥터입니다.
   *
   * @summary 스토리 이미지 생성
   *
   * @param input 이미지 생성을 위한 입력
   *
   * @returns 생성된 이미지
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
