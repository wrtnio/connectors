import { Module } from "@nestjs/common";
import { YoutubeSearchModule } from "../controllers/connector/youtube_search/YoutubeSearchModule";

@Module({
  imports: [YoutubeSearchModule],
})
export class MusicModule {}
