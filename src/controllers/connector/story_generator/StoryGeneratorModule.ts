import { Module } from "@nestjs/common";

import { StoryGeneratorProvider } from "../../../providers/connector/story_generator/StoryGeneratorProvider";
import { OpenAIModule } from "../../../providers/open_ai/OpenAIModule";
import { StoryGeneratorController } from "./StoryGeneratorController";

@Module({
  imports: [OpenAIModule],
  providers: [StoryGeneratorProvider],
  controllers: [StoryGeneratorController],
})
export class StoryGeneratorModule {}
