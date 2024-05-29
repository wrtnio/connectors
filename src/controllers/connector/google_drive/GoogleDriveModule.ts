import { Module } from "@nestjs/common";

import { GoogleDriveProvider } from "../../../providers/connector/google_drive/GoogleDriveProvider";
import { GoogleModule } from "../internal/google/GoogleModule";
import { GoogleDriveController } from "./GoogleDriveController";

@Module({
  imports: [GoogleModule],
  controllers: [GoogleDriveController],
  providers: [GoogleDriveProvider],
  exports: [GoogleDriveProvider],
})
export class GoogleDriveModule {}
