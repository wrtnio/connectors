import { Module } from "@nestjs/common";
import { NotionController } from "./NotionController";

@Module({
  controllers: [NotionController],
  providers: [],
})
export class NotionModule {}
