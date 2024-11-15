import { Module } from "@nestjs/common";
import { RedditProvider } from "../../../providers/connector/reddit/RedditProvider";
import { RedditController } from "./RedditController";

@Module({
  controllers: [RedditController],
  providers: [RedditProvider],
})
export class RedditModule {}
