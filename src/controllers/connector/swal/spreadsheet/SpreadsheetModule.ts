import { Module } from "@nestjs/common";
import { SpreadsheetController } from "./SpreadsheetController";

@Module({
  controllers: [SpreadsheetController],
  providers: [],
})
export class SpreadsheetModule {}
