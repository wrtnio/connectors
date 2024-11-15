import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { RouteIcon } from "@wrtnio/decorators";
import {
  IStoryGeneratorRequest,
  IStoryGeneratorResponse,
} from "../../../api/structures/connector/story_generator/IStoryGenerator";
import { StoryGeneratorProvider } from "../../../providers/connector/story_generator/StoryGeneratorProvider";

@Controller("connector/story-generator")
export class StoryGeneratorController {
  constructor(private storyGeneratorProvider: StoryGeneratorProvider) {}

  /**
   * Create a story based on user input
   *
   * This connector can be used when creating a chatbot workflow for creating picture books or stories.
   * Please use it in conjunction with the Story Image Generation connector.
   * Please create an image based on the story created using the connector/story-image-generator connector.
   * Please export the created story and image using Google Slides.
   * Please export the created story and image using the connector/google-slides/presentations connector to Google Slides.
   *
   * @summary Create a story
   * @param input Input for creating a story
   * @returns The generated story or a request for additional information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Marketing_full.svg",
  )
  @core.TypedRoute.Post()
  public generate(
    @core.TypedBody() input: IStoryGeneratorRequest,
  ): Promise<IStoryGeneratorResponse> {
    return this.storyGeneratorProvider.generate(input);
  }
}
