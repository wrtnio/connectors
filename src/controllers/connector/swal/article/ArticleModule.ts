import { Module } from "@nestjs/common";
import { ArticleController } from "./ArticleController";

@Module({
  controllers: [ArticleController],
  providers: [],
})
export class ArticleModule {}
