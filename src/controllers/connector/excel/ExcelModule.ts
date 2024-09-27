import { Module } from "@nestjs/common";

import { ExcelController } from "./ExcelController";
import { ExcelProvider } from "../../../providers/connector/excel/ExcelProvider";
import { AwsModule } from "../aws/AwsModule";

@Module({
  imports: [AwsModule],
  controllers: [ExcelController],
  providers: [ExcelProvider],
  exports: [],
})
export class ExcelModule {}
