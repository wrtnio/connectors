import { Module } from "@nestjs/common";
import { ArticlesProvider } from "../../../providers/connector/articles/ArticlesProvider";
import { ArticlesController } from "./ArticlesController";

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesProvider],
})
export class ArticlesModule {}
