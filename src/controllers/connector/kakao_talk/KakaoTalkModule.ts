import { Module } from "@nestjs/common";

import { KakaoTalkController } from "./KakaoTalkController";

@Module({
  controllers: [KakaoTalkController],
  providers: [],
})
export class KakaoTalkModule {}
