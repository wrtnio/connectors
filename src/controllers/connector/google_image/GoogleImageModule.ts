import { Module } from "@nestjs/common";
import { GoogleImageController } from "./GoogleImageController";
import { GoogleImageProvider } from "../../../providers/google_image/GoogleImageProvider";

@Module({
  controllers: [GoogleImageController],
  providers: [GoogleImageProvider],
  exports: [GoogleImageProvider],
})
export class GoogleImageModule {}
