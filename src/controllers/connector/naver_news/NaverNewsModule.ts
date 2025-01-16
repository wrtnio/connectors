import { Module } from "@nestjs/common";
import { NaverNewsController } from "./NaverNewsController";

@Module({
  controllers: [NaverNewsController],
  providers: [],
})
export class NaverNewsModule {}
