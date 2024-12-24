import { Module } from "@nestjs/common";

import { GoogleSheetProvider } from "../../../providers/connector/google_sheet/GoogleSheetProvider";
import { GoogleSheetController } from "./GoogleSheetController";

@Module({
  controllers: [GoogleSheetController],
  providers: [GoogleSheetProvider],
  exports: [GoogleSheetProvider],
})
export class GoogleSheetModule {}
