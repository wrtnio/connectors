import { Module } from "@nestjs/common";
import { YoutubeSearchController } from "./YoutubeSearchController";

@Module({
  controllers: [YoutubeSearchController],
  providers: [],
})
export class YoutubeSearchModule {}
