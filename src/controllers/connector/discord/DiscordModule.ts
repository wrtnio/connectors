import { Module } from "@nestjs/common";
import { DiscordController } from "./DiscordController";
import { DiscordProvider } from "../../../providers/connector/discord/DiscordProvider";

@Module({
  imports: [],
  controllers: [DiscordController],
  providers: [DiscordProvider],
  exports: [DiscordProvider],
})
export class DiscordModule {}
