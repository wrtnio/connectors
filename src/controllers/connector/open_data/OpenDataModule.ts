import { Module } from "@nestjs/common";

import { OpenDataController } from "./OpenDataController";

@Module({
  controllers: [OpenDataController],
  providers: [],
})
export class OpenDataModule {}
