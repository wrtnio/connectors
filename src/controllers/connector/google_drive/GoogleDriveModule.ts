import { Module } from "@nestjs/common";

import { GoogleDriveProvider } from "../../../providers/connector/google_drive/GoogleDriveProvider";
import { GoogleDriveController } from "./GoogleDriveController";

@Module({
  controllers: [GoogleDriveController],
  providers: [GoogleDriveProvider],
  exports: [GoogleDriveProvider],
})
export class GoogleDriveModule {}
