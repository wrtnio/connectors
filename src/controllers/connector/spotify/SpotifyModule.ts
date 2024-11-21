import { Module } from "@nestjs/common";
import { SpotifyProvider } from "../../../providers/connector/spotify/SpotifyProvider";
import { SpotifyController } from "./SpotifyController";

@Module({
  controllers: [SpotifyController],
  providers: [SpotifyProvider],
})
export class SpotifyModule {}
