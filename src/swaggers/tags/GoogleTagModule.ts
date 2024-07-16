import { Module } from "@nestjs/common";
import { GoogleDocsModule } from "../../controllers/connector/google-docs/GoogleDocsModule";
import { GoogleSheetModule } from "../../controllers/connector/google-sheet/GoogleSheetModule";
import { GoogleDriveModule } from "../../controllers/connector/google_drive/GoogleDriveModule";
import { GoogleSlidesModule } from "../../controllers/connector/google_slides/GoogleSlidesModule";

@Module({
  imports: [
    GoogleDocsModule,
    GoogleSheetModule,
    GoogleDriveModule,
    GoogleSlidesModule,
  ],
})
export class GoogleTagModule {}
