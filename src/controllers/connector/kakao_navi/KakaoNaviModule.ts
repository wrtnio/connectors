import { Module } from "@nestjs/common";

import { KakaoNaviController } from "./KakaoNaviController";

@Module({
  controllers: [KakaoNaviController],
  providers: [],
})
export class KakaoNaviModule {}
