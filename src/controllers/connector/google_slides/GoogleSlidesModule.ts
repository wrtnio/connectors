import { Module } from "@nestjs/common";

import { GoogleSlidesProvider } from "../../../providers/connector/google_slides/GoogleSlidesProvider";
import { AwsModule } from "../aws/AwsModule";
import { GoogleDriveModule } from "../google_drive/GoogleDriveModule";
import { GoogleModule } from "../internal/google/GoogleModule";
import { GoogleSlidesController } from "./GoogleSlidesController";

@Module({
  imports: [GoogleModule, GoogleDriveModule, AwsModule],
  controllers: [GoogleSlidesController],
  providers: [GoogleSlidesProvider],
  exports: [GoogleSlidesProvider],
})
export class GoogleSlidesModule {}
