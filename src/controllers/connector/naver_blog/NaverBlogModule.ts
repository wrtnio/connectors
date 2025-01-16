import { Module } from "@nestjs/common";
import { NaverBlogController } from "./NaverBlogController";

@Module({
  controllers: [NaverBlogController],
  providers: [],
})
export class NaverBlogModule {}
