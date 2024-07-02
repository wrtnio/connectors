import { Module } from "@nestjs/common";

import { KakaoMapController } from "./KakaoMapController";

@Module({
  controllers: [KakaoMapController],
  providers: [],
})
export class KakaoMapModule {}
