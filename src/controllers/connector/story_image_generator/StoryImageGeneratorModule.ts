import { Module } from "@nestjs/common";

import { StoryImageGeneratorProvider } from "../../../providers/connector/story_image_generator/StoryImageGeneratorProvider";
import { OpenAIModule } from "../../../providers/open_ai/OpenAIModule";
import { StableDiffusionBetaModule } from "../stable_diffustion_beta/StableDiffusionBetaModule";
import { StoryImageGeneratorController } from "./StoryImageGeneratorController";

@Module({
  imports: [StableDiffusionBetaModule, OpenAIModule],
  providers: [StoryImageGeneratorProvider],
  controllers: [StoryImageGeneratorController],
})
export class StoryImageGeneratorModule {}
