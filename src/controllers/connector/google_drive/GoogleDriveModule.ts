import { Module } from "@nestjs/common";

import { GoogleDriveController } from "./GoogleDriveController";

@Module({
  controllers: [GoogleDriveController],
})
export class GoogleDriveModule {}
