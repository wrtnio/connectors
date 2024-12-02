import { Module } from "@nestjs/common";
import { ArticlesController } from "./ArticlesController";

@Module({
  controllers: [ArticlesController],
  providers: [],
})
export class ArticlesModule {}
