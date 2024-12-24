import { Module } from "@nestjs/common";

import { GoogleSheetController } from "./GoogleSheetController";

@Module({
  controllers: [GoogleSheetController],
})
export class GoogleSheetModule {}
