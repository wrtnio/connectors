import { Module } from "@nestjs/common";

import { GoogleAdsProvider } from "../../../providers/connector/google_ads/GoogleAdsProvider";
import { GoogleModule } from "../internal/google/GoogleModule";
import { GoogleAdsController } from "./GoogleAdsController";

@Module({
  imports: [GoogleModule],
  controllers: [GoogleAdsController],
  providers: [GoogleAdsProvider],
  exports: [],
})
export class GoogleAdsModule {}
