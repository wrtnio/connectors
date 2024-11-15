import { Module } from "@nestjs/common";
import { YoutubeSearchController } from "./YoutubeSearchController";
import { YoutubeSearchProvider } from "../../../providers/connector/youtube_search/YoutubeSearchProvider";

@Module({
  controllers: [YoutubeSearchController],
  providers: [YoutubeSearchProvider],
})
export class YoutubeSearchModule {}
