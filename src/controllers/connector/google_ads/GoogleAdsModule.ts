import { Module } from "@nestjs/common";

import { GoogleAdsProvider } from "../../../providers/connector/google_ads/GoogleAdsProvider";
import { GoogleAdsController } from "./GoogleAdsController";

@Module({
  controllers: [GoogleAdsController],
  providers: [GoogleAdsProvider],
  exports: [],
})
export class GoogleAdsModule {}
