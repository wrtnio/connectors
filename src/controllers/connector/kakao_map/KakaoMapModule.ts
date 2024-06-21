import { Module } from "@nestjs/common";

import { KakaoMapController } from "./KakaoController";

@Module({
  controllers: [KakaoMapController],
  providers: [],
})
export class KakaoMapModule {}
