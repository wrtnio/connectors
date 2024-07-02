import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { StoryImageGeneratorProvider } from "../../../providers/connector/story_image_generator/StoryImageGeneratorProvider";
import { OpenAIModule } from "../../../providers/open_ai/OpenAIModule";
import { AwsModule } from "../aws/AwsModule";
import { StoryImageGeneratorController } from "./StoryImageGeneratorController";

@Module({
  imports: [OpenAIModule, AwsModule, HttpModule],
  providers: [StoryImageGeneratorProvider],
  controllers: [StoryImageGeneratorController],
})
export class StoryImageGeneratorModule {}
