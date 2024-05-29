import { Module } from "@nestjs/common";

import { GoogleSheetProvider } from "../../../providers/connector/google_sheet/GoogleSheetProvider";
import { GoogleModule } from "../internal/google/GoogleModule";
import { GoogleSheetController } from "./GoogleSheetController";

@Module({
  imports: [GoogleModule],
  controllers: [GoogleSheetController],
  providers: [GoogleSheetProvider],
  exports: [GoogleSheetProvider],
})
export class GoogleSheetModule {}
