import { Module } from "@nestjs/common";

import { GoogleAdsController } from "./GoogleAdsController";

@Module({
  controllers: [GoogleAdsController],
})
export class GoogleAdsModule {}
