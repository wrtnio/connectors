import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { ImageProvider } from "../../../providers/connector/image/ImageProvider";
import { OpenAIModule } from "../../../providers/open_ai/OpenAIModule";
import { AwsModule } from "../aws/AwsModule";
import { ImageController } from "./ImageController";

@Module({
  imports: [OpenAIModule, AwsModule, HttpModule],
  providers: [ImageProvider],
  controllers: [ImageController],
  exports: [ImageProvider],
})
export class ImageModule {}
