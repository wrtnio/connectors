import { Module } from "@nestjs/common";

import { GoogleSlidesController } from "./GoogleSlidesController";

@Module({
  controllers: [GoogleSlidesController],
})
export class GoogleSlidesModule {}
