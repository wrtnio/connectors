import { Module } from "@nestjs/common";
import { WebCrawlerProvider } from "../../../providers/connector/web_crawler/WebCrawlerProvider";
import { WebCrawlerController } from "./WebCrawlerController";

@Module({
  controllers: [WebCrawlerController],
  providers: [WebCrawlerProvider],
  exports: [WebCrawlerProvider],
})
export class WebCrawlerModule {}
