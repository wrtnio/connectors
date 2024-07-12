import { Module } from "@nestjs/common";
import { NaverController } from "./NaverController";

@Module({
  controllers: [NaverController],
  providers: [],
})
export class NaverModule {}
