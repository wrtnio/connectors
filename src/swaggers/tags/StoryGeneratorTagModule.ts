import { Module } from "@nestjs/common";
import { StoryGeneratorModule } from "../../controllers/connector/story_generator/StoryGeneratorModule";
import { StoryImageGeneratorModule } from "../../controllers/connector/story_image_generator/StoryImageGeneratorModule";

@Module({
  imports: [StoryGeneratorModule, StoryImageGeneratorModule],
})
export class StoryGeneratorTagModule {}
