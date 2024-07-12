import { Module } from "@nestjs/common";
import { ExcelModule } from "../controllers/connector/excel/ExcelModule";
import { GmailModule } from "../controllers/connector/gmail/GmailModule";
import { GoogleDocsModule } from "../controllers/connector/google-docs/GoogleDocsModule";
import { GoogleSheetModule } from "../controllers/connector/google-sheet/GoogleSheetModule";
import { GoogleCalendarModule } from "../controllers/connector/google_calendar/GoogleCalendarModule";
import { GoogleDriveModule } from "../controllers/connector/google_drive/GoogleDriveModule";
import { GoogleSlidesModule } from "../controllers/connector/google_slides/GoogleSlidesModule";
import { HwpModule } from "../controllers/connector/hwp/HwpModule";

@Module({
  imports: [
    HwpModule,
    ExcelModule,
    GoogleDocsModule,
    GoogleSheetModule,
    GoogleCalendarModule,
    GoogleDriveModule,
    GmailModule,
    GoogleSlidesModule,
  ],
})
export class BusinessModule {}
