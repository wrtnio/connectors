import { Module } from "@nestjs/common";

import { ExcelProvider } from "../../../providers/connector/excel/ExcelProvider";
import { ExcelController } from "./ExcelController";

@Module({
  controllers: [ExcelController],
  providers: [ExcelProvider],
  exports: [ExcelProvider],
})
export class ExcelModule {}
