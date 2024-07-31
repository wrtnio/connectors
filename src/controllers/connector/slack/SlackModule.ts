import { Module } from "@nestjs/common";
import { SlackProvider } from "../../../providers/connector/slack/SlackProvider";
import { SlackController } from "./SlackController";

@Module({
  controllers: [SlackController],
  providers: [SlackProvider],
})
export class SlackModule {}
