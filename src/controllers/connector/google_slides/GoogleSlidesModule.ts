import { Module } from "@nestjs/common";

import { GoogleSlidesController } from "./GoogleSlidesController";

@Module({
  imports: [],
  controllers: [GoogleSlidesController],
})
export class GoogleSlidesModule {}
