import { Module } from "@nestjs/common";

import { ExcelController } from "./ExcelController";
import { ExcelProvider } from "../../../providers/connector/excel/ExcelProvider";
import { AwsProvider } from "../../../providers/connector/aws/AwsProvider";

@Module({
  controllers: [ExcelController],
  providers: [ExcelProvider, AwsProvider],
  exports: [],
})
export class ExcelModule {}
