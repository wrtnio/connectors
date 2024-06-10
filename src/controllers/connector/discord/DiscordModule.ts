import { Module } from "@nestjs/common";

import { DiscordController } from "./DiscordController";

@Module({
  controllers: [DiscordController],
  providers: [],
  exports: [],
})
export class DiscordModule {}
