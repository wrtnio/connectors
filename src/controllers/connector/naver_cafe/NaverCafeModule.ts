import { Module } from "@nestjs/common";
import { NaverCafeController } from "./NaverCafeController";

@Module({
  controllers: [NaverCafeController],
  providers: [],
})
export class NaverCafeModule {}
