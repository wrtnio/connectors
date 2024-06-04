import { Module } from "@nestjs/common";

import { ZoomController } from "./ZoomController";

@Module({
  controllers: [ZoomController],
  providers: [],
  exports: [],
})
export class ZoomModule {}
