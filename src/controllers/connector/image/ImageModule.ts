import { Module } from "@nestjs/common";

import { ImageProvider } from "../../../providers/connector/image/ImageProvider";
import { ImageController } from "./ImageController";

@Module({
  providers: [ImageProvider],
  controllers: [ImageController],
  exports: [ImageProvider],
})
export class ImageModule {}
