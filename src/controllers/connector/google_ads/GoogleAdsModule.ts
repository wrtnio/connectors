import { Module } from "@nestjs/common";

import { GoogleModule } from "../internal/google/GoogleModule";
import { GoogleAdsController } from "./GoogleAdsController";

@Module({
  imports: [GoogleModule],
  controllers: [GoogleAdsController],
  providers: [],
  exports: [],
})
export class GoogleAdsModule {}
