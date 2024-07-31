import { Module } from "@nestjs/common";
import { SlackController } from "./SlackController";

@Module({
  controllers: [SlackController],
  providers: [],
})
export class SlackModule {}
