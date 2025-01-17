import { Module } from "@nestjs/common";
import { DaumBlogController } from "./DaumBlogController";

@Module({
  controllers: [DaumBlogController],
  providers: [],
})
export class DaumBlogModule {}
