import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import {
  IStoryGeneratorRequest,
  IStoryGeneratorResponse,
} from "../../../api/structures/connector/story_generator/IStoryGenerator";
import { StoryGeneratorProvider } from "../../../providers/connector/story_generator/StoryGeneratorProvider";

/**
 * StoryGeneratorNode controller.
 */
@Controller("connector/story-generator")
export class StoryGeneratorController {
  constructor(private storyGeneratorProvider: StoryGeneratorProvider) {}

  /**
   * 유저의 입력을 기반으로 스토리를 짭니다.
   *
   * 그림책 또는 이야기 생성을 위한 챗봇 워크플로우를 제작할 때 사용될 수 있는 커넥터입니다.
   *
   * @summary 스토리 생성
   *
   * @param input 스토리 생성을 위한 입력
   *
   * @returns 생성된 스토리 혹은 추가 정보 요청
   *
   * @tag Llm 스토리 생성
   */
  @core.TypedRoute.Post()
  public generate(
    @core.TypedBody() input: IStoryGeneratorRequest,
  ): Promise<IStoryGeneratorResponse> {
    return this.storyGeneratorProvider.generate(input);
  }
}
