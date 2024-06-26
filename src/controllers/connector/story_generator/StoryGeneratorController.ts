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

  @core.TypedRoute.Post()
  public generate(
    @core.TypedBody() input: IStoryGeneratorRequest,
  ): Promise<IStoryGeneratorResponse> {
    return this.storyGeneratorProvider.generate(input);
  }
}
